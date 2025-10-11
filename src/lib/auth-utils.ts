import { NextRequest } from 'next/server';
import { Admin } from '@/models/types';

export function getAdminFromRequest(request: NextRequest): Admin | null {
    try {
        const token = request.cookies.get('admin-token')?.value;

        if (!token) {
            return null;
        }

        const decoded = JSON.parse(Buffer.from(token, 'base64').toString());

        // Check if token is expired (24 hours)
        const loginTime = new Date(decoded.loginTime);
        const now = new Date();
        const hoursDiff = (now.getTime() - loginTime.getTime()) / (1000 * 60 * 60);

        if (hoursDiff > 24) {
            return null;
        }

        return decoded;
    } catch (error) {
        console.error('Error decoding admin token:', error);
        return null;
    }
}

export function requireAdmin(request: NextRequest) {
    const admin = getAdminFromRequest(request);

    if (!admin) {
        throw new Error('Unauthorized: Admin access required');
    }

    return admin;
}