import { Request, Response, NextFunction } from 'express';
import { validate, ValidationError } from 'class-validator';
import { plainToInstance } from 'class-transformer';

export function validationMiddleware(type: any) {
  return (req: Request, res: Response, next: NextFunction) => {
    const dtoObject = plainToInstance(type, req.body);
    validate(dtoObject, { whitelist: true, forbidNonWhitelisted: true }).then((errors: ValidationError[]) => {
      if (errors.length > 0) {
        const formattedErrors = errors.map((error) =>
          Object.values(error.constraints || {}).join(', ')
        );
        return res.status(400).json({ errors: formattedErrors });
      }
      next();
    });
  };
}
