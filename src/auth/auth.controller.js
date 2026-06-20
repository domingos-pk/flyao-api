import * as authService from './auth.service.js';
export async function registerHandler(req, res) {
    try {
        const result = await authService.register(req.body);
        res.status(201).json(result);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
}
export async function verifyOtpHandler(req, res) {
    try {
        const { phone, code } = req.body;
        const result = await authService.verifyOtp(phone, code);
        res.json(result);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
}
export async function loginHandler(req, res) {
    try {
        const { phone } = req.body;
        const result = await authService.requestLoginOtp(phone);
        res.json(result);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
}
export async function getMeHandler(req, res) {
    try {
        const userId = req.userId;
        const user = await authService.getMe(userId);
        res.json(user);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
}
