import jwt from 'jsonwebtoken';
import User from '../models/User';
import { config } from '../config/config';

const login = async (email: string, password: string) => {
    const normalizedEmail = email.trim().toLowerCase();

    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
        throw new Error('Credenciales incorrectas.');
    }

    const isValidPassword = await user.comparePassword(password);

    if (!isValidPassword) {
        throw new Error('Credenciales incorrectas.');
    }

    if (!config.jwt.secret) {
        throw new Error('JWT_SECRET no está configurado en el servidor.');
    }

    const token = jwt.sign(
        {
            sub: String(user._id),
            email: user.email,
            username: user.username
        },
        config.jwt.secret,
        {
            expiresIn: config.jwt.expiresIn as jwt.SignOptions['expiresIn']
        }
    );

    return {
        token,
        user: {
            _id: String(user._id),
            name: user.name,
            surname: user.surname,
            username: user.username,
            email: user.email,
            enabled: user.enabled
        }
    };
};

export default {
    login
};
