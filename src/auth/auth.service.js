import twilio from 'twilio';
import { prisma } from '../config/prisma.js';
import { signToken } from '../utils/jwt.js';
const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
// ─── Helpers ────────────────────────────────────────────
function generateOtp(length = 6) {
    const max = Math.pow(10, length);
    const min = Math.pow(10, length - 1);
    return Math.floor(min + Math.random() * (max - min)).toString();
}
function otpExpiresAt(minutes = 10) {
    return new Date(Date.now() + minutes * 60 * 1000);
}
async function sendSms(phone, code) {
    await twilioClient.messages.create({
        body: `O teu código FlyAO é: ${code}. Válido por 10 minutos.`,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: phone,
    });
}
// ─── Register ───────────────────────────────────────────
export async function register(data) {
    // Verifica se o telefone já existe e está activo
    const existing = await prisma.user.findUnique({ where: { phone: data.phone } });
    if (existing && existing.status === 'ACTIVE') {
        throw new Error('Este número já tem conta activa. Faz login.');
    }
    // Se existe mas está PENDING, reutiliza e reenvia OTP
    let user = existing;
    if (!user) {
        user = await prisma.user.create({
            data: {
                name: data.name,
                phone: data.phone,
                email: data.email ?? null,
                provider: 'PHONE',
                status: 'PENDING_VERIFICATION',
            },
        });
    }
    // Invalida OTPs anteriores do mesmo telefone
    await prisma.verificationOtp.deleteMany({ where: { phone: data.phone } });
    // Cria novo OTP
    const code = generateOtp(6);
    await prisma.verificationOtp.create({
        data: {
            code,
            phone: data.phone,
            userId: user.id,
            expiresAt: otpExpiresAt(10),
        },
    });
    await sendSms(data.phone, code);
    return { message: 'Código enviado para o teu número. Válido por 10 minutos.' };
}
// ─── Verify OTP ─────────────────────────────────────────
export async function verifyOtp(phone, code) {
    const otpRecord = await prisma.verificationOtp.findFirst({
        where: { phone, code },
        orderBy: { createdAt: 'desc' },
    });
    if (!otpRecord)
        throw new Error('Código inválido.');
    if (otpRecord.expiresAt < new Date())
        throw new Error('Código expirado. Solicita um novo.');
    // Activa o utilizador
    const user = await prisma.user.update({
        where: { id: otpRecord.userId },
        data: {
            status: 'ACTIVE',
            phoneVerified: true,
            phoneVerifiedAt: new Date(),
            lastLoginAt: new Date(),
        },
    });
    // Apaga o OTP usado
    await prisma.verificationOtp.delete({ where: { id: otpRecord.id } });
    const token = signToken({ userId: user.id });
    return {
        token,
        user: {
            id: user.id,
            name: user.name,
            phone: user.phone,
            role: user.role,
            status: user.status,
        },
    };
}
// ─── Login (envia novo OTP) ──────────────────────────────
export async function requestLoginOtp(phone) {
    const user = await prisma.user.findUnique({ where: { phone } });
    if (!user)
        throw new Error('Número não registado.');
    if (user.status === 'SUSPENDED')
        throw new Error('Conta suspensa. Contacta o suporte.');
    // Invalida OTPs anteriores
    await prisma.verificationOtp.deleteMany({ where: { phone } });
    const code = generateOtp(6);
    await prisma.verificationOtp.create({
        data: {
            code,
            phone,
            userId: user.id,
            expiresAt: otpExpiresAt(10),
        },
    });
    await sendSms(phone, code);
    return { message: 'Código de login enviado.' };
}
// ─── Me ─────────────────────────────────────────────────
export async function getMe(userId) {
    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
            id: true,
            name: true,
            phone: true,
            email: true,
            avatarUrl: true,
            role: true,
            status: true,
            phoneVerified: true,
            lastLoginAt: true,
            createdAt: true,
        },
    });
    if (!user)
        throw new Error('Utilizador não encontrado.');
    return user;
}
