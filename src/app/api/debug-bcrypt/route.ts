import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

export async function GET() {
    try {
        const password = 'admin123';
        const hash = '$2b$12$hnaI96KlszCkEv0oIB1I.uPhuwgsb6j7s345e3tkjg1TaZVZiY2Ni';

        const isValid = await bcrypt.compare(password, hash);

        return NextResponse.json({
            success: true,
            password,
            hash,
            isValid
        });
    } catch (error) {
        return NextResponse.json({
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    }
}