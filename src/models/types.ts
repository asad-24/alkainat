import { ObjectId } from 'mongodb';

export interface Teacher {
    _id?: ObjectId | string;
    name: string;
    email: string;
    phone?: string;
    subject: string;
    bio: string;
    avatar?: string;
    rating?: number;
    students?: number;
    experience: string;
    degrees: Degree[];
    gender: Gender;
    backgrounds: string[];
    languages: string[];
    createdAt?: Date;
    updatedAt?: Date;
}

export interface Course {
    _id?: ObjectId | string;
    title: string;
    description: string;
    details?: string;
    instructor: string;
    level: 'Beginner' | 'Intermediate' | 'Advanced';
    duration: string;
    image?: string;
    interestingStudents?: number;
    color?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface Admin {
    _id?: ObjectId | string;
    username: string;
    email: string;
    password: string;
    role: 'admin';
    createdAt?: Date;
    lastLogin?: Date;
}

export interface Degree {
    degree: string;
    university: string;
}

export type Gender = 'male' | 'female';