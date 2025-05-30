import express from 'express';

export function handleError(res: express.Response, error: any, customMessage?: string) {
    const status = error.response?.status || 500;
    const message = customMessage || error.message || 'An unexpected error occurred';
    console.error(error);
    res.status(status).json({ error: message });
};