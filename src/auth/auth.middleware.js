import { verifyToken } from '../utils/jwt.js';
export function authenticate(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Token não fornecido.' });
    }
    const token = authHeader.split(' ')[1];
    try {
        const payload = verifyToken(token);
        req.userId = payload.userId;
        next();
    }
    catch {
        return res.status(401).json({ error: 'Token inválido ou expirado.' });
    }
}
