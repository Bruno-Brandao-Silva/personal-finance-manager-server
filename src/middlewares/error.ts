import { Request, Response, NextFunction } from 'express';

class ErrorWithStatus extends Error {
    status?: number;

    constructor(message: string, status?: number) {
        super(message);
        this.name = 'ErrorWithStatus';
        this.status = status;
        Object.setPrototypeOf(this, ErrorWithStatus.prototype);
    }
}

function errorHandler(err: ErrorWithStatus,
    req: Request,
    res: Response,
) {
    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';

    res.status(status).json({
        error: {
            message,
            status,
        },
    });

}

export default errorHandler;