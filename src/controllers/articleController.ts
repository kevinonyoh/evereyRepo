import { Request, Response, NextFunction } from "express";
import { v2 as cloudinary } from "cloudinary";
import Article from "../models/Article";
import responseHandler from "../utils/responseHandler";
import ErrorHandler from "../utils/ErrorHandler";
import { statusPublish } from "../interfaces/model.interface";

import { Op } from "sequelize";
import { SUBMISSION_CONFIRMATION, emailNotification } from "../utils/email-template";
import User from "../models/User";


export const draftArticle = async(req: Request, res: Response, next: NextFunction) => {
   const data = req.body;
   try {

    const payload = {
      ...data,
      userId: req.user?.id
    }

 
    const article = await Article.create(payload);

    responseHandler(res, article, "draft article created successfully", 201);

    } catch (error) {
      next(error);
    }
}

export const uploadArticle = async (req: Request, res: Response, next: NextFunction) => {
  try {
   
    const { id } = req.params;

    
    const file = req.file;

    let uploadResult;
    if (file) {

      uploadResult = await cloudinary.uploader.upload(file.path, {
        resource_type: "auto",
        unique_filename: false,
        overwrite: true,
      });
      
      const payload = {
      
        filePath: uploadResult?.secure_url,
        fileType: file?.mimetype,
        cloudinaryPublicId: uploadResult?.public_id
    
      }

      const article = await Article.update(payload, {where: {userId: req.user?.id, id}, returning: true});

      const users = await User.findOne({where: {email: req.user?.email}});

      const resp = users?.toJSON();

      emailNotification(resp.email, SUBMISSION_CONFIRMATION.body(resp.firstName, id), SUBMISSION_CONFIRMATION.subject)

      responseHandler(res, article, "article uploaded successfully", 201);

    }

  } catch (err) {
    next(err);
  }
};

export const getArticles = async (req: Request, res: Response, next: NextFunction) => {

  try {

    const {limit, page} = req.query;

    if( !limit && !page ) throw new ErrorHandler(400, "include the pagination limit and page")

    const offset = ( Number(page) - 1) * Number(limit);

    const includeOptions = {
      limit: Number(limit),
      offset,
     }

    const articles = await Article.findAll({where: { status: statusPublish.PUBLISHED}});
   
    responseHandler(res, articles, "articles", 200);

  } catch (error) {
    next(error);
  }
};

export const getArticleById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    
    const { id } = req.params;

    const article = await Article.findOne({where: {id}});

    if (!article) throw new ErrorHandler(404, "Article not found");

    responseHandler(res,  article, "article", 200);

  } catch (error) {
    next(error);
  }
};

export const getArticlesByPublicationType =async (req: Request, res: Response, next: NextFunction) => {
  
  try {
    
    const { publicationType, limit, page} = req.query;

    if( !limit && !page ) throw new ErrorHandler(400, "include the pagination limit and page")

    const offset = ( Number(page) - 1) * Number(limit);

    const includeOptions = {
      limit: Number(limit),
      offset,
     }


    const article = await Article.findAll({where: { publicationType },
       ...includeOptions,
      order: [['publicationDate', 'DESC']]})

     responseHandler(res, article, "article by publication type", 200);

  } catch (error) {
    next(error);
  }

}

export const getArticleByDate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { startDate, endDate, limit, page } = req.query;

    if (!startDate || !endDate) {
      throw new ErrorHandler(400, "Include both startDate and endDate");
    }

    if (!limit || !page || Number(limit) <= 0 || Number(page) <= 0) {
      throw new ErrorHandler(400, "Include a valid pagination limit and page");
    }

    const start = new Date(startDate as string);
    const end = new Date(endDate as string);
    const pageNum = Number(page);
    const limitNum = Number(limit);
    const offset = (pageNum - 1) * limitNum;

    const whereOption = {
      publicationDate: {
        [Op.between]: [start, end]
      },
      status: statusPublish.PUBLISHED
    };

    const articles = await Article.findAll({
      where: whereOption,
      limit: limitNum,
      offset
    });

    responseHandler(res, articles, "Articles", 200);

  } catch (error) {

    console.log(error.message);
    
    next(error);
    
  }
};

export const getUserArticle = async (req: Request, res: Response, next: NextFunction) => {
  try {

    const {limit, page} = req.query;

    if( !limit && !page ) throw new ErrorHandler(400, "include the pagination limit and page")

    const userId = req.user?.id;

    const offset = ( Number(page) - 1) * Number(limit);

    const includeOptions = {
      limit: Number(limit),
      offset
     }

    const articles = await Article.findAll({
      where: {
        userId: { [Op.eq]: userId } 
      },
      ...includeOptions,
      order: [['publicationDate', 'DESC']]
    });

    responseHandler(res, articles, "user articles", 200);

  } catch (error) {
    next(error);
  }
}


export const updateDraftArticle = async (req: Request, res: Response, next: NextFunction) => {
   try {
    
    const { id } = req.params;

    const data = req.body;

    const article = await Article.findOne({where: {id, userId: req.user?.id, status: statusPublish.DRAFT}});

    if(!article) throw new ErrorHandler(404, "Article not found");

    const payload = {
      ...data
    }

    const val = await Article.update(payload, {where: {id, userId: req.user?.id, status: statusPublish.DRAFT},  returning: true});

    responseHandler(res, val, "article updated successfully", 200);


   } catch (error) {
     next(error);
   }
}

export const updateArticle = async (req: Request, res: Response, next: NextFunction) => {
  try {
   
    const { id } = req.params;
  
    const file = req.file;

    const article = await Article.findOne({where: {id, userId: req.user?.id, status: statusPublish.DRAFT}});

   
    if(!article) throw new ErrorHandler(404, "Article not found");
    

    let uploadResult;
    if (file) {
     
      uploadResult = await cloudinary.uploader.upload(file.path, {
        resource_type: "auto",
        public_id: article.cloudinaryPublicId, 
        overwrite: true,
      });

      article.filePath = uploadResult.secure_url;
      article.cloudinaryPublicId = uploadResult.public_id;
      article.fileType = file.mimetype;

      await article.save();

      responseHandler(res, article, "updated successful", 200);
    
    } 

  } catch (error) {
    
    next(error);

}
};



export const deleteArticle = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const article = await Article.findOne({where: {id, userId: req.user?.id}});

    if (!article)  throw new ErrorHandler(404, "Article not found") ;
  

    if (article.cloudinaryPublicId) {
      try {
        await cloudinary.uploader.destroy(article.cloudinaryPublicId);
      } catch (error) {
        console.error("Cloudinary delete error:", error);
      }
    }

    await article.destroy();

    responseHandler(res, null, "Article deleted successfully", 204);
    
  } catch (error) {

    next(error);
  
  }
};

export const downloadArticle = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const article = await Article.findByPk(id);

    if (!article) throw new ErrorHandler(404,"Article not found" );
    

    if (article.status === statusPublish.DRAFT) throw new ErrorHandler(403, "Cannot download draft articles");
    

    if (!article.cloudinaryPublicId) throw new ErrorHandler(404, "No file associated with this article");
      

   
    const supportedFormats = ["pdf", "doc", "docx"];
    const fileExtension = article.fileType?.split("/")[1]; 
    if (!supportedFormats.includes(fileExtension || "")) throw new ErrorHandler(400, `Unsupported file format. Only ${supportedFormats.join(", ")} are allowed.`)

    const signedUrl = cloudinary.url(article.cloudinaryPublicId, {
      resource_type: "raw",
      type: "authenticated",
      format: fileExtension, 
      sign_url: true,
      expires_at: Math.floor(Date.now() / 1000) + 3600, 
    });

    return res.status(200).json({
      message: "Download URL generated successfully",
      downloadUrl: signedUrl,
    });
  } catch (error) {
    next(error);
  }
};
