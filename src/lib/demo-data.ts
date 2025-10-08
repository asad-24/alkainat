// Demo image generator for courses and teachers
export function generateDemoImage(
    type: 'course' | 'teacher' | 'hero' | 'about',
    subject?: string,
    width: number = 400,
    height: number = 300
): string {
    const baseUrl = 'https://picsum.photos'

    // Create different seed numbers for consistent images
    const seeds = {
        // Course images
        quran: 100,
        arabic: 200,
        english: 300,
        technology: 400,
        programming: 500,
        web: 600,

        // Teacher images
        teacher1: 700,
        teacher2: 800,
        teacher3: 900,
        teacher4: 1000,

        // Hero/background images
        hero: 1100,
        about: 1200,
        learning: 1300
    }

    let seed: number

    if (type === 'course') {
        switch (subject?.toLowerCase()) {
            case 'quran':
            case 'tajweed':
                seed = seeds.quran
                break
            case 'arabic':
                seed = seeds.arabic
                break
            case 'english':
                seed = seeds.english
                break
            case 'technology':
            case 'tech':
                seed = seeds.technology
                break
            case 'programming':
            case 'coding':
                seed = seeds.programming
                break
            case 'web':
                seed = seeds.web
                break
            default:
                seed = seeds.quran
        }
    } else if (type === 'teacher') {
        const teacherNumber = parseInt(subject || '1')
        seed = seeds[`teacher${teacherNumber}` as keyof typeof seeds] || seeds.teacher1
    } else if (type === 'hero') {
        seed = seeds.hero
    } else {
        seed = seeds.about
    }

    return `${baseUrl}/seed/${seed}/${width}/${height}?blur=1`
}

// Course demo data with better images
export const demoCoursesData = [
    {
        id: 1,
        title: "Quran Recitation (Tajweed)",
        description: "Learn proper pronunciation and recitation rules with qualified instructors.",
        image: generateDemoImage('course', 'quran', 480, 220),
        level: "Beginner",
        duration: "8 weeks",
        instructor: "Sheikh Ahmad Hassan",
        rating: 4.9,
        students: 150,
        color: "var(--accent)"
    },
    {
        id: 2,
        title: "Arabic Language Foundations",
        description: "Build strong foundations in reading, writing, and speaking Arabic.",
        image: generateDemoImage('course', 'arabic', 480, 220),
        level: "Beginner",
        duration: "10 weeks",
        instructor: "Dr. Fatima Al-Zahra",
        rating: 4.8,
        students: 200,
        color: "var(--chart-4)"
    },
    {
        id: 3,
        title: "English Communication",
        description: "Improve speaking, listening, and vocabulary for better communication.",
        image: generateDemoImage('course', 'english', 480, 220),
        level: "Intermediate",
        duration: "6 weeks",
        instructor: "Sarah Johnson",
        rating: 4.7,
        students: 180,
        color: "var(--chart-2)"
    },
    {
        id: 4,
        title: "Web Development Basics",
        description: "Learn HTML, CSS, and JavaScript fundamentals for web development.",
        image: generateDemoImage('course', 'web', 480, 220),
        level: "Beginner",
        duration: "12 weeks",
        instructor: "Ahmed Khan",
        rating: 4.9,
        students: 120,
        color: "var(--chart-1)"
    },
    {
        id: 5,
        title: "Python Programming",
        description: "Master Python programming from basics to advanced concepts.",
        image: generateDemoImage('course', 'programming', 480, 220),
        level: "Intermediate",
        duration: "14 weeks",
        instructor: "Dr. Maria Silva",
        rating: 4.8,
        students: 95,
        color: "var(--chart-5)"
    },
    {
        id: 6,
        title: "Digital Marketing",
        description: "Learn modern digital marketing strategies and tools.",
        image: generateDemoImage('course', 'technology', 480, 220),
        level: "Beginner",
        duration: "8 weeks",
        instructor: "Ali Rahman",
        rating: 4.6,
        students: 75,
        color: "var(--chart-3)"
    }
]

// Teacher demo data
export const demoTeachersData = [
    {
        id: 1,
        name: "Sheikh Ahmad Hassan",
        specialization: "Quran & Tajweed",
        experience: "15+ years",
        image: generateDemoImage('teacher', '1', 300, 300),
        rating: 4.9,
        courses: 8,
        students: 500,
        bio: "Certified Qari with Ijazah in multiple Qira'at. Specializes in Tajweed and Quranic studies."
    },
    {
        id: 2,
        name: "Dr. Fatima Al-Zahra",
        specialization: "Arabic Language",
        experience: "12+ years",
        image: generateDemoImage('teacher', '2', 300, 300),
        rating: 4.8,
        courses: 6,
        students: 400,
        bio: "PhD in Arabic Literature. Expert in classical and modern Arabic language instruction."
    },
    {
        id: 3,
        name: "Sarah Johnson",
        specialization: "English Communication",
        experience: "10+ years",
        image: generateDemoImage('teacher', '3', 300, 300),
        rating: 4.7,
        courses: 5,
        students: 350,
        bio: "TESOL certified with extensive experience in English language teaching."
    },
    {
        id: 4,
        name: "Ahmed Khan",
        specialization: "Web Development",
        experience: "8+ years",
        image: generateDemoImage('teacher', '4', 300, 300),
        rating: 4.9,
        courses: 4,
        students: 250,
        bio: "Full-stack developer and instructor with expertise in modern web technologies."
    },
    {
        id: 5,
        name: "Dr. Maria Silva",
        specialization: "Programming",
        experience: "14+ years",
        image: generateDemoImage('teacher', '1', 300, 300),
        rating: 4.8,
        courses: 7,
        students: 300,
        bio: "Computer Science PhD with specialization in Python and software development."
    },
    {
        id: 6,
        name: "Ali Rahman",
        specialization: "Digital Marketing",
        experience: "6+ years",
        image: generateDemoImage('teacher', '2', 300, 300),
        rating: 4.6,
        courses: 3,
        students: 150,
        bio: "Digital marketing expert with proven track record in online business growth."
    }
]