import { NextFunction, Request, Response } from 'express';
import AuthService from '../services/Auth';

const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await AuthService.login(req.body.email, req.body.password);
        return res.status(200).json(result);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(401).json({ message: error.message });
        }

        return res.status(401).json({ message: 'No autorizado.' });
    }
};

export default {
    login
};
