import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import { Request, Response, NextFunction } from 'express';

// Explicitly configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "articles",
    allowed_formats: ["pdf", "doc", "docx"],
    resource_type: "raw",
  } as any,
});

const fileFilter = (
  req: any,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  const allowedMimes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error("Invalid file type. Only PDF and Word documents are allowed.")
    );
  }
};

const multerUpload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});

// Wrapped middleware with error handling
export const wrappedUploadMiddleware = (fieldName: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    multerUpload.single(fieldName)(req, res, (err: any) => {
      if (err) {
        console.error('Upload error:', err);
        return res.status(400).json({
          error: 'File upload error',
          details: err.message
        });
      }
      next();
    });
  };
};

export default wrappedUploadMiddleware;
