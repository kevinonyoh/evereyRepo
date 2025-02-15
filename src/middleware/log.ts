import logger from "../utils/logger";
import { NextFunction, Request, Response } from 'express';

 function logs(req: Request, res: Response, next: NextFunction) { 
	logger.info('Requests Information', {
        url: req.url,
        method: req.method,
        headers: req.headers,
        body: req.body
    })
	next();
}

export default logs;

 