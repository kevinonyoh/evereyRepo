import { NextFunction, Request, Response } from "express";


export const hasRole = (roles: string) => {

    return async function(req: Request, res: Response, next: NextFunction) {
     
      if ( !req.user?.client  || !roles.includes(req.user?.client) ) {
        return res.status(403).send({error: { status:403, message:'Access denied.'}});
      }
      next();
    }
    
  }