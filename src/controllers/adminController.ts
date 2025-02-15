import { NextFunction, Request, Response } from 'express';
import Admin from '../models/admin';
import ErrorHandler from '../utils/ErrorHandler';
import * as bcrypt from "bcrypt";
import { emailTransporter } from '../utils/notification';
import responseHandler from '../utils/responseHandler';
import { generate6DigitPin } from '../utils/helper';
import { redisSet, redisValidate } from '../utils/redis';
import { Readable } from 'stream';
import csvParser from 'csv-parser';
import User from '../models/User';
import * as jwt from "jsonwebtoken";
import { statusPublish } from '../interfaces/model.interface';
import Article from '../models/Article';
import { addJob } from '../utils/emailQueue';
import { EMAIL_VERIFICATION, PUBLICATION_NOTIFICATION, REGISTRATION } from '../utils/email-template';



export const createAdmin = async (req: Request, res: Response, next: NextFunction) => {
    
    const { email, password, ...rest} = req.body;
    
    try {
        
        const user = await Admin.findOne({where: {email}});

        if(user) throw new ErrorHandler(400, "this email address already exist");

        const hash = await bcrypt.hashSync(password, 10);

        const payload = {
            email,
            password: hash,
            ...rest
        }

        const token = generate6DigitPin();


        await redisSet(email, token);

      

         const data = await Admin.create(payload);

        const { password: _ , ...filterData } = data.toJSON();

         await addJob(email, REGISTRATION.body(data.name, token),  REGISTRATION.subject);

        //  await addJob(email, EMAIL_VERIFICATION.body(data.name),  EMAIL_VERIFICATION.subject);

         responseHandler(res, filterData, "account created succesfully", 201);


    } catch (error) {
        next(error);
    }

}


export const verifyEmail = async (req: Request, res: Response, next: NextFunction) => {
  
    const {token} = req.body;
  
    try {
        
        const email = await redisValidate(token);

        if(!email) throw new ErrorHandler(400, "incorrect token");
        
        const user = await Admin.update({status: true}, {where: {email}});

        responseHandler(res, null, "admin verified successfully", 200);
        
    } catch (error) {
        next(error);
    }
} 


export const loginAdmin = async (req: Request, res: Response, next: NextFunction) => {


    try {

     const data = req.body;
     const {email} = data;
        
     const user = await Admin.findOne({where: {email}});

     const resp = user?.toJSON();

     if(!user) throw new ErrorHandler(400, `${data.email} does not exist`);

    

     if(! await bcrypt.compare(data.password, resp.password)) throw new ErrorHandler(400, "incorrect password");


     const {password, ...rest} = resp;

     const secret = process.env.SECRET as string;

     const accessToken = jwt.sign({ email: resp.email, id: resp.id, client: "Admin" }, secret);
    
     const value = {
       ...rest,
       accessToken
    }

     responseHandler(res, value, "admin login successful", 200);

     } catch (error) {
        next(error);
     }
}

export const createBulkUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
     
      if (!req.file) throw new ErrorHandler(400, 'No file uploaded');

      const {institutionId } = req.body;



    const data: any[] = [];
    const stream = Readable.from(req.file.buffer);
  
     
      stream
        .pipe(csvParser())
        .on('data', (row) => data.push(row))
        .on('end', async () => {
          const failedRows: any[] = [];
          const successfulRows: any[] = [];
  
          for (const row of data) {
            const { email, firstName, lastName, phoneNumber, gender, department, academicRole } = row;
  
           
            if (!email) {
              failedRows.push({ row, message: "Email doesn't exist for this user" });
              continue;
            }
  
            const exists = await User.findOne({ where: { email } });
  
            if (exists) {
              failedRows.push({ row, message: "Email already exists" });
              continue;
            }
  
            try {
              
              const payload = {
                email,
                firstName,
                lastName,
                phoneNumber,
                gender,
                department,
                academicRole,
                institutionId
              };

  
              
              await User.create(payload);

              const token = generate6DigitPin();

              await addJob(email, REGISTRATION.body(firstName, token),  REGISTRATION.subject);

              successfulRows.push(payload);
            } catch (error) {
              failedRows.push({ row, message: "Database insertion error" });
            }
          }
  
          responseHandler(res, { successfulRows, failedRows }, "Data successfully processed", 201);
        })
        .on('error', (error) => {
          throw new ErrorHandler(400, `Error parsing CSV: ${error.message}`);
        });
    } catch (error) {
      next(error);
    }
  };


  export const viewArticles = async (req: Request, res: Response, next: NextFunction) => {
    try {

      const { limit, page, status} = req.query;

      if( !limit && !page ) throw new ErrorHandler(400, "include the pagination limit and page")
  
      const offset = ( Number(page) - 1) * Number(limit);
  
      const includeOptions = {
        limit: Number(limit),
        offset,
       }
     
     const article = await Article.findAll({where:{status}, ...includeOptions});

     responseHandler(res, article, `All articles`, 200);

    } catch (error) {
      next(error);
    }
  }


  export const updateArticleStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
      
      const { id } = req.params;

     const { status } = req.body;

      const includeOptions = [
        {
          model: User,
          as: "user", 
          attributes: { exclude: ["password"] },
        },
      ]

      let publicationDate: Date;

      if(status.includes(statusPublish.PUBLISHED)) publicationDate = new Date(); 

      const article = await Article.findOne({where: {id}, include: includeOptions});
    
      if(!article) throw new ErrorHandler(404, "Article not found");

      await article.update({ status, publicationDate });

      const user = article.getDataValue("user") as User;

      if (user) {

     
       await addJob(user.email, PUBLICATION_NOTIFICATION.body(user.firstName),  REGISTRATION.subject);

    
      }

      responseHandler(res, null, "Article status updated and email sent successfully", 200);



      
    } catch (error) {
      next(error);
    }
  }

  



