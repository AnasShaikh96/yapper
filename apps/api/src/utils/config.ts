import dotenv from 'dotenv'
dotenv.config();

export const config = {
    jwt_secret: process.env.JWT_SECRET ?? '',
    cookieOptions: {
        httpOnly: true,
        // secure only in production; localhost over http needs false
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax' as const,
        path: '/',
    }
}