import { NextFunction, Request, Response } from 'express';
import User from '../models/User';
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { generate6DigitPin } from '../utils/helper';
import { emailTransporter } from '../utils/notification';
import { redisSet, redisValidate } from '../utils/redis';
import { validationResult } from 'express-validator';
import ErrorHandler from '../utils/errorHandler';
import responseHandler from '../utils/responseHandler';
import Institution from '../models/institution';
import { AcademicRole } from '../interfaces/model.interface';

export const createResearcherUser = async (req: Request, res: Response, next: NextFunction) => {
   
    const { firstName, lastName, email, password} = req.body;
    try {
 
        const users = await User.findOne({where: {email}});

        if(users) throw new ErrorHandler(400, "this email address already exist");
        

        const hash = await bcrypt.hashSync(password, 10);
        
        const payload = {
            firstName,
            lastName,
            email,
            academicRole: AcademicRole.RESEARCHER,
            isReseacher: true,
            password: hash
        }

         // const token = generate6DigitPin();

        
         
         emailNotification(email, `Dear ${firstName},
         We’re excited to have you on board! Thank you for joining everey. 
         we look forward to helping you achieve your goals and make the most of your experience.`,  'Welcome to everey')

         const data = await User.create(payload);

         responseHandler(res, data.toJSON(), "account created succesfully", 201);
       
    } catch (error) {
      next(error);
    }
};

export const createInstitution = async (req: Request, res: Response, next: NextFunction) => {
    const {name, email, password} = req.body;

    try {
        const institution = await Institution.findOne({where: {email}});

        if(institution) throw new ErrorHandler(400, "this institution email address already exist");

        const hash = await bcrypt.hashSync(password, 10);
        
        const payload = {
            name,
            email,
            password: hash
        }

         // const token = generate6DigitPin();

         const token = "123456";

         await redisSet(email, token);
         
         emailNotification(email, `your institution verification pin is = ${token}`,  'verification pin');

        const data = await Institution.create(payload);
       
        responseHandler(res, data.toJSON(), "institution profile created successfully", 201);
        
    } catch (error) {
      next(error);   
    }
}

export const createUserByInstitution = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const data = req.body?.users;

        const emails = data.map((v: any) => v.email);

        
        const existingUsers = await User.findAll({
        where: { email: emails },
        });

        if (existingUsers.length) {
        const duplicateEmails = existingUsers.map((u) => u.email);
        return res.status(400).json({
        error: "Duplicate emails found",
        emails: duplicateEmails,
        });
        }

        const payload = data.map((v: any) => ({
            ...v,
            institutionId: req.user?.id,
            isResearcher: false, 
          }));
        

          await User.bulkCreate(payload);

          responseHandler(res, null, "users created successfully", 201);

    } catch (error) {
        next(error);
    }
}

export const resendOtp =async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email } = req.body
          // const token = generate6DigitPin();

          const token = "123456";

          await redisSet(email, token);
          
          emailNotification(email, `your new pin is = ${token}`,  'resend token');
         
          responseHandler(res, null, "check email for otp", 200);

    } catch (error) {
        next(error);
    }
}

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      
        const user = await User.findOne({where: {email: req.user?.email}});

        responseHandler(res, user?.toJSON(), "user profile", 200);

    } catch (error) {
       next(error)
    }
};


export const geInstitution = async (req: Request, res: Response, next: NextFunction) => {
    try {
      
        const user = await Institution.findOne({where: {email: req.user?.email}});

        responseHandler(res, user?.toJSON(), "institution profile", 200);

    } catch (error) {
       next(error)
    }
};

export const loginUser = async (req: Request, res: Response, next: NextFunction) =>{
     const {email} = req.body;
     try {

        const users = await User.findOne({where: {email}});
        
       await login(users, res);

     } catch (error) {
        next(error)
     }
}

export const loginInstitution = async (req: Request, res: Response, next: NextFunction) =>{
    const {email} = req.body;
    try {

       const users = await Institution.findOne({where: {email}});
       
      await login(users, res);

    } catch (error) {
       next(error)
    }
}

export const verifyLoginPinUser = async (req: Request, res: Response, next: NextFunction) => {
     const {token} = req.body;
     try {
         const email = await redisValidate(token);

         if(!email) throw new ErrorHandler(400, "incorrect pin");

         const user = await User.findOne({where: {email}});

        await verifyLoginPin(user, "user", res);        

     } catch (error) {
       next(error);
     }
}

export const verifyLoginPinInstitution = async (req: Request, res: Response, next: NextFunction) => {
    const {token} = req.body;
    try {
        const email = await redisValidate(token);

        if(!email) throw new ErrorHandler(400, "incorrect pin");

        const user = await Institution.findOne({where: {email}});

       await verifyLoginPin(user, "institution", res);        

    } catch (error) {
      next(error);
    }
}



export const updateProfile =async (req:Request, res: Response, next: NextFunction) => {
    try {
        
        const payload = req.body;
       
        const data = await User.update(payload, {where: {email: req.user?.email}, returning: true});

        responseHandler(res, data, "data updated successfully", 200);

    } catch (error) {
       next(error);
    }
}

export const updateInstitutionProfile = async(req: Request, res: Response, next: NextFunction) => {
    try {
        
        const payload = req.body;

        const data = await Institution.update(payload, {where: {email: req.user?.email}, returning: true});

        responseHandler(res, data, "data updated successfully", 200);

    } catch (error) {
        next(error);
    }
}



const emailNotification = async (email: string, message: string, subject: string ) => {

    const mailOptions = {
        from: `${process.env.MAIL_FROM}`,
        to: email,
        subject,
        text:  message,
      };

     await emailTransporter(mailOptions);
}

const login = async (user: any, res: Response) => {
    if(!user) throw new ErrorHandler(400, "email does not exist");

    // const token = generate6DigitPin();

    const token = "123456";

    await redisSet(user?.email, token);
    
    emailNotification(user?.email, `your login pin is = ${token}`,  'your login pin')

    responseHandler(res, null, "check your email for your login pin", 200);

}


const verifyLoginPin = async (user:any, client: string, res: Response) => {
    
    const data = user?.toJSON();

    const secret = process.env.SECRET as string;
 
    const accessToken = jwt.sign({ email: data.email, id: data.id, client }, secret);
    const value = {
       ...data,
       accessToken
    }
    
    responseHandler(res, value, "login successful", 200);

}