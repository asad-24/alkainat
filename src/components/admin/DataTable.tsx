import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Teacher, Course } from '@/models/types';
import { ObjectId } from 'mongodb';

interface DataTableProps<T> {
    data: T[];
    columns: Array<{
        key: keyof T | string;
        label: string;
        render?: (item: T) => React.ReactNode;
    }>;
    onEdit?: (item: T) => void;
    onDelete?: (item: T) => void;
    loading?: boolean;
}

export function DataTable<T extends { _id?: string | ObjectId }>({
    data,
    columns,
    onEdit,
    onDelete,
    loading
}: DataTableProps<T>) {
    if (loading) {
        return (
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                <div className="p-8 text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500 mx-auto"></div>
                    <p className="mt-2 text-gray-300">Loading...</p>
                </div>
            </div>
        );
    }

    if (data.length === 0) {
        return (
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                <div className="p-8 text-center">
                    <p className="text-gray-400">No data available</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full min-w-max">
                    <thead>
                        <tr className="border-b border-white/10 bg-white/5">
                            {columns.map((column) => (
                                <th
                                    key={column.key as string}
                                    className="h-12 px-4 text-left align-middle font-medium text-gray-300 whitespace-nowrap min-w-[120px]"
                                >
                                    {column.label}
                                </th>
                            ))}
                            {(onEdit || onDelete) && (
                                <th className="h-12 px-4 text-left align-middle font-medium text-gray-300 whitespace-nowrap min-w-[120px]">
                                    Actions
                                </th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={item._id?.toString() || index} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                {columns.map((column) => (
                                    <td
                                        key={column.key as string}
                                        className="p-4 align-middle text-gray-200 min-w-[120px]"
                                    >
                                        {column.render
                                            ? column.render(item)
                                            : String(item[column.key as keyof T] || '')}
                                    </td>
                                ))}
                                {(onEdit || onDelete) && (
                                    <td className="p-4 align-middle">
                                        <div className="flex gap-2">
                                            {onEdit && (
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => onEdit(item)}
                                                    className="border-white/20 bg-white/10 text-white hover:bg-white/20 hover:border-white/30 cursor-pointer"
                                                >
                                                    Edit
                                                </Button>
                                            )}
                                            {onDelete && (
                                                <Button
                                                    variant="destructive"
                                                    size="sm"
                                                    onClick={() => onDelete(item)}
                                                    className="bg-red-500/20 border-red-500/30 text-red-300 hover:bg-red-500/30 hover:border-red-500/50 cursor-pointer"
                                                >
                                                    Delete
                                                </Button>
                                            )}
                                        </div>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

// Predefined columns for teachers
export const teacherColumns = [
    {
        key: 'avatar',
        label: 'Avatar',
        render: (teacher: Teacher) => (
            <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-600 flex items-center justify-center">
                {teacher.avatar ? (
                    <img
                        src={teacher.avatar}
                        alt={teacher.name}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <span className="text-white text-lg font-semibold">
                        {teacher.name.charAt(0).toUpperCase()}
                    </span>
                )}
            </div>
        ),
    },
    {
        key: 'name',
        label: 'Name',
    },
    {
        key: 'email',
        label: 'Email',
    },
    {
        key: 'phone',
        label: 'Phone',
    },
    {
        key: 'subject',
        label: 'Subject',
    },
    {
        key: 'bio',
        label: 'Bio',
        render: (teacher: Teacher) => (
            <div className="max-w-xs truncate" title={teacher.bio}>
                {teacher.bio}
            </div>
        ),
    },
    {
        key: 'experience',
        label: 'Experience',
    },
    {
        key: 'gender',
        label: 'Gender',
        render: (teacher: Teacher) => (
            <Badge variant="outline" className='text-gray-200'>
                {teacher.gender}
            </Badge>
        ),
    },
    {
        key: 'degrees',
        label: 'Degrees',
        render: (teacher: Teacher) => (
            <div className="space-y-1">
                {teacher.degrees?.map((degree, index) => (
                    <div key={index} className="text-sm">
                        <Badge variant="secondary" className="mr-1">
                            {degree.degree}
                        </Badge>
                        <span className="text-gray-400">from {degree.university}</span>
                    </div>
                )) || 'No degrees'}
            </div>
        ),
    },
    {
        key: 'backgrounds',
        label: 'Backgrounds',
        render: (teacher: Teacher) => (
            <div className="flex flex-wrap gap-1">
                {teacher.backgrounds?.map((bg, index) => (
                    <Badge key={index} variant="outline" className="text-xs text-gray-200">
                        {bg}
                    </Badge>
                )) || 'No backgrounds'}
            </div>
        ),
    },
    {
        key: 'languages',
        label: 'Languages',
        render: (teacher: Teacher) => (
            <div className="flex flex-wrap gap-1">
                {teacher.languages?.map((lang, index) => (
                    <Badge key={index} variant="default" className="text-xs">
                        {lang}
                    </Badge>
                )) || 'No languages'}
            </div>
        ),
    },
    {
        key: 'rating',
        label: 'Rating',
        render: (teacher: Teacher) => (
            <Badge variant="secondary">
                ⭐ {teacher.rating?.toFixed(1) || '4.5'}
            </Badge>
        ),
    },
    {
        key: 'students',
        label: 'Students',
        render: (teacher: Teacher) => (
            <span className="text-muted-foreground">
                {teacher.students || 0}
            </span>
        ),
    },
];

// Predefined columns for courses
export const courseColumns = [
    {
        key: 'title',
        label: 'Title',
        render: (course: Course) => (
            <div className="max-w-xs">
                <div className="font-medium text-white truncate" title={course.title}>
                    {course.title}
                </div>
                {course.details && (
                    <div className="text-xs text-gray-400 mt-1 line-clamp-2" title={course.details}>
                        {course.details}
                    </div>
                )}
            </div>
        ),
    },
    {
        key: 'description',
        label: 'Description',
        render: (course: Course) => (
            <div className="w-80">
                <div className="text-sm text-gray-300 whitespace-normal break-words" title={course.description}>
                    {course.description}
                </div>
            </div>
        ),
    },
    {
        key: 'instructor',
        label: 'Instructor',
        render: (course: Course) => (
            <div className="text-sm text-white font-medium">
                {course.instructor}
            </div>
        ),
    },
    {
        key: 'level',
        label: 'Level',
        render: (course: Course) => (
            <Badge
                variant={
                    course.level === 'Beginner'
                        ? 'secondary'
                        : course.level === 'Intermediate'
                            ? 'default'
                            : 'destructive'
                }
            >
                {course.level}
            </Badge>
        ),
    },
    {
        key: 'duration',
        label: 'Duration',
        render: (course: Course) => (
            <span className="text-sm text-gray-300">
                {course.duration}
            </span>
        ),
    },
    {
        key: 'interestingStudents',
        label: 'Interesting Students',
        render: (course: Course) => (
            <div className="flex items-center gap-1">
                <span className="text-yellow-400">👁️</span>
                <span className="text-sm text-gray-300">
                    {course.interestingStudents || 0}
                </span>
            </div>
        ),
    },
    {
        key: 'image',
        label: 'Image',
        render: (course: Course) => (
            course.image ? (
                <img
                    src={course.image}
                    alt={course.title}
                    className="w-12 h-12 object-cover rounded-md border border-white/10"
                />
            ) : (
                <div className="w-12 h-12 bg-gray-600 rounded-md flex items-center justify-center text-xs text-gray-400">
                    No Image
                </div>
            )
        ),
    },
];