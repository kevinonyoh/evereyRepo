

class ErrorHandler extends Error {
    
     statusCode: number;

    constructor( statusCode: number, message: string ){
        super();
        this.statusCode = statusCode;
        this.message = message;
    }
}

export default ErrorHandler;