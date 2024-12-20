import { Request, Response, NextFunction } from 'express';
import { IUser } from '../interfaces/auth.interface';
import { JwtPayload} from 'jsonwebtoken';
import * as jwt from "jsonwebtoken";


export const auth = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization'];

    try {
        if (!token) {
         return   res.status(401).json({ error: 'Valid token is required' }); 
        }

        const _token = token.replace(/(Bearer\s|bearer\s)/, '');
        
        const secret = process.env.SECRET as string
        const decoded = await jwt.verify(_token, secret) as JwtPayload;

        const user: IUser = {
            id: decoded.id,
            email: decoded.email,
            client: decoded.client
        };
    
        req.user = user;
        
        next();
    } catch (err) {
        next(err);
    }
};
