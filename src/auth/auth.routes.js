import { Router } from 'express';
import { registerHandler, verifyOtpHandler, loginHandler, getMeHandler, } from './auth.controller.js';
import { authenticate } from './auth.middleware.js';
const router = Router();
// Registo → recebe OTP por SMS
router.post('/register', registerHandler);
// Verifica OTP → retorna JWT (usado após register E após login)
router.post('/verify-otp', verifyOtpHandler);
// Login → envia novo OTP por SMS
router.post('/login', loginHandler);
// Perfil → rota protegida
router.get('/me', authenticate, getMeHandler);
export default router;
