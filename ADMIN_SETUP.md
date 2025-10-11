# Admin Panel Setup Guide

## Overview

This admin panel allows administrators to manage teachers and courses for the Al Kainaat Education Portal.

## Features

- ✅ Admin authentication with session management
- ✅ Teacher management (add/delete)
- ✅ Course management (add/delete)
- ✅ Dashboard with statistics
- ✅ Responsive design with modern UI
- ✅ MongoDB integration

## Setup Instructions

### 1. MongoDB Atlas Setup

1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Create a free account and cluster
3. Get your connection string (should look like: `mongodb+srv://username:password@cluster.mongodb.net/`)
4. Add your IP address to the whitelist

### 2. Environment Variables

Update your `.env.local` file with:

```bash
# MongoDB Atlas Connection
MONGODB_URI=your_mongodb_atlas_connection_string_here

# Admin Authentication
ADMIN_SECRET=your_secure_admin_secret_here
NEXTAUTH_SECRET=your_nextauth_secret_here
NEXTAUTH_URL=http://localhost:3000
```

### 3. First Admin Creation

The system will automatically create a default admin user on first run:

- **Username:** admin
- **Password:** admin123
- **Email:** admin@alkainat.edu

⚠️ **IMPORTANT:** Change this password immediately after first login!

### 4. Access the Admin Panel

1. Start your development server: `npm run dev`
2. Go to: `http://localhost:3000/admin/login`
3. Login with the default credentials
4. Navigate through the admin panel

## Admin Panel Routes

- `/admin/login` - Admin login page
- `/admin/dashboard` - Main dashboard with statistics
- `/admin/teachers` - Teacher management (add/delete teachers)
- `/admin/courses` - Course management (add/delete courses)

## API Endpoints

- `POST /api/admin/login` - Admin login
- `POST /api/admin/logout` - Admin logout
- `POST /api/admin/create` - Create admin (development only)
- `GET/POST /api/teachers/add` - Get all teachers / Add new teacher
- `DELETE /api/teachers/delete` - Delete teacher
- `GET/POST /api/courses/add` - Get all courses / Add new course
- `DELETE /api/courses/delete` - Delete course

## Security Features

- Session-based authentication with HTTP-only cookies
- Token expiration (24 hours)
- Admin route protection via middleware
- Password hashing with bcrypt
- Input validation on all endpoints

## Usage Guide

### Adding Teachers

1. Go to `/admin/teachers`
2. Click "Add New Teacher"
3. Fill in the required information:
   - Name (required)
   - Email (required)
   - Subject (required)
   - Bio (required)
   - Experience level (required)
   - Avatar URL (optional)

### Adding Courses

1. Go to `/admin/courses`
2. Click "Add New Course"
3. Fill in the required information:
   - Title (required)
   - Description (required)
   - Instructor (required)
   - Level (Beginner/Intermediate/Advanced)
   - Duration (required)
   - Image URL (optional)
   - Color theme (optional)

### Deleting Items

1. In any management page, click the "Delete" button next to an item
2. Confirm the deletion in the modal popup
3. The item will be permanently removed from the database

## Development Notes

- The admin panel is completely separate from the main website
- All admin routes are protected by middleware
- The system uses MongoDB for data storage
- UI components are built with Radix UI and Tailwind CSS
- Error handling is implemented for all operations

## Troubleshooting

1. **Cannot connect to MongoDB:** Check your connection string and IP whitelist
2. **Authentication errors:** Clear cookies and try logging in again
3. **Build errors:** Make sure all environment variables are set correctly
4. **API errors:** Check the browser console and server logs for details

## Production Deployment

For production deployment on Vercel:

1. Set all environment variables in Vercel dashboard
2. Make sure your MongoDB Atlas cluster allows connections from `0.0.0.0/0`
3. Change the default admin password immediately
4. Consider implementing additional security measures like rate limiting

## Security Recommendations

- Change default admin credentials immediately
- Use strong passwords and secrets
- Regularly update dependencies
- Monitor access logs
- Consider implementing 2FA for admin accounts
- Use HTTPS in production
