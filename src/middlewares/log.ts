import { Request, Response, NextFunction } from 'express';

function logHandler(req: Request, res: Response, next: NextFunction): void {
    const start = Date.now();
    res.on('finish', () => {
        const duration = Date.now() - start;
        const log = [
            `[${new Date().toISOString()}]`,
            `"${req.method} ${req.originalUrl}"`,
            res.statusCode,
            `${duration}ms`
        ].join(' ');
        console.log(log);
    });
    next();
}

export default logHandler;