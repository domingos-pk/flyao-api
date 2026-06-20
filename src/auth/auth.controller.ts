import { Request, Response } from 'express';
import * as authService from './auth.service.js';

export async function registerHandler(req: Request, res: Response) {
  try {
    const result = await authService.register(req.body);
    res.status(201).json(result);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}

export async function verifyOtpHandler(req: Request, res: Response) {
  try {
    const { phone, code } = req.body;
    const result = await authService.verifyOtp(phone, code);
    res.json(result);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}

export async function loginHandler(req: Request, res: Response) {
  try {
    const { phone } = req.body;
    const result = await authService.requestLoginOtp(phone);
    res.json(result);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}

export async function getMeHandler(req: Request, res: Response) {
  try {
    const userId = (req as any).userId;
    const user = await authService.getMe(userId);
    res.json(user);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}