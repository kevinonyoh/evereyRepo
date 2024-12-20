
import {  Response } from 'express';
import logger from './logger';

function responseHandler( res: Response, data: any, message: string, statusCode: number ){
    if( !data ){
        logger.info( 'Response Payload', {
            success: true,
            message,
            status: statusCode
        } );
        return res.status(statusCode).json({
            success: true,
            message,
            status: statusCode
        });
    }
    
    logger.info( 'Response Payload', {
        data,
        success: true,
        message,
        status: statusCode
    } );

    res.status(statusCode).json({
        data,
        success: true,
        message
    });
}

export default responseHandler;

