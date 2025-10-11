import bcrypt from 'bcryptjs';
import { getDatabase } from '@/lib/mongodb';
import { Admin } from '@/models/types';

export async function createFirstAdmin() {
    try {
        const db = await getDatabase();
        const adminsCollection = db.collection('admins');

        // Check if any admin already exists
        const existingAdmin = await adminsCollection.findOne({});
        if (existingAdmin) {
            return;
        }

        // Create first admin with default credentials
        const defaultAdmin = {
            username: 'admin',
            email: 'admin@alkainat.edu',
            password: await bcrypt.hash('admin123', 12), // Change this password!
            role: 'admin',
            createdAt: new Date()
        };

        await adminsCollection.insertOne(defaultAdmin);
    } catch (error) {
        console.error('Error creating first admin:', error);
    }
}

// Call this function when your app starts
if (process.env.NODE_ENV === 'development') {
    createFirstAdmin();
}