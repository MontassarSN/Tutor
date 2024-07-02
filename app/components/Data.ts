import { Category, Course, Instructor } from '../Types';

// Function to generate an array of dates from 12 days ago until today
function generateDates(): string[] {
  const dates: string[] = [];
  for (let i = 12; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    dates.push(date.toLocaleDateString());
  }
  return dates;
}

// Get the dates
const dates: string[] = generateDates();

export const categories: Category[] = [
  {
    text: "Label",
    pic: "/TopCat/Cpu.png",
    courses: "63,476",
    color: "bg-pink-100"
  },
  {
    text: "Business",
    pic: "/TopCat/Handshake.png",
    courses: "63,476",
    color: "bg-green-100"
  },
  {
    text: "Finance & Accounting",
    pic: "/TopCat/CreditCard.png",
    courses: "63,476",
    color: "bg-orange-100"
  },
  {
    text: "IT & Software",
    pic: "/TopCat/ChartBarHorizontal.png",
    courses: "63,476",
    color: "bg-rose-100"
  },
  {
    text: "Personal Development",
    pic: "/TopCat/BugDroid.png",
    courses: "63,476",
    color: "bg-white-100"
  },
  {
    text: "Office Productivity",
    pic: "/TopCat/Receipt.png",
    courses: "63,476",
    color: "bg-gray-50"
  },
  {
    text: "Marketing",
    pic: "/TopCat/MegaphoneSimple.png",
    courses: "63,476",
    color: "bg-pink-100"
  },
  {
    text: "Photography & Video",
    pic: "/TopCat/Camera.png",
    courses: "63,476",
    color: "bg-gray-50"
  },
  {
    text: "Lifestyle",
    pic: "/TopCat/Package.png",
    courses: "63,476",
    color: "bg-orange-100"
  },
  {
    text: "Design",
    pic: "/TopCat/PenNib.png",
    courses: "63,476",
    color: "bg-rose-100"
  },
  {
    text: "Health & Fitness",
    pic: "/TopCat/FirstAidKit.png",
    courses: "63,476",
    color: "bg-green-100"
  },
  {
    text: "Music",
    pic: "/TopCat/Headphones.png",
    courses: "63,476",
    color: "bg-orange-100"
  },
];

export const courses: Course[] = [
  {
    label: "Design",
    price: "$57",
    title: "Machine Learning A-Z™: Hands-On Python & R In Data Science",
    pic: "/BestSellingCourses/Course1.png",
    stars: "⭐ 5.0",
    students: "265.7K",
    colors: "bg-rose-100 text-rose-500",
    date: dates[0]
  },
  {
    label: "Developments",
    price: "$57",
    title: "The Complete 2021 Web Development Bootcamp",
    pic: "/BestSellingCourses/Course2.png",
    stars: "⭐ 5.0",
    students: "265.7K",
    colors: "bg-pink-100 text-pink-500",
    date: dates[1]
  },
  {
    label: "Business",
    price: "$57",
    title: "Learn Python Programming Masterclass",
    pic: "/BestSellingCourses/Course3.png",
    stars: "⭐ 5.0",
    students: "265.7K",
    colors: "bg-green-100 text-green-500",
    date: dates[2]
  },
  {
    label: "Marketing",
    price: "$57",
    title: "The Complete Digital Marketing Course - 12 Courses in 1",
    pic: "/BestSellingCourses/Course4.png",
    stars: "⭐ 5.0",
    students: "265.7K",
    colors: "bg-pink-100 text-pink-500",
    date: dates[3]
  },
  {
    label: "IT & Software",
    price: "$57",
    title: "Reiki Level I, II and Master/Teacher Program",
    pic: "/BestSellingCourses/Course5.png",
    stars: "⭐ 5.0",
    students: "265.7K",
    colors: "bg-rose-100 text-rose-500",
    date: dates[4]
  },
  {
    label: "Music",
    price: "$57",
    title: "The Complete Foundation Stock Trading Course",
    pic: "/BestSellingCourses/Course6.png",
    stars: "⭐ 5.0",
    students: "265.7K",
    colors: "bg-orange-100 text-orange-500",
    date: dates[5]
  },
  {
    label: "Marketing",
    price: "$57",
    title: "Beginner to Pro in Excel: Financial Modeling and Valuation",
    pic: "/BestSellingCourses/Course7.png",
    stars: "⭐ 5.0",
    students: "265.7K",
    colors: "bg-pink-100 text-pink-500",
    date: dates[6]
  },
  {
    label: "Health & Fitness",
    price: "$57",
    title: "The Python Mega Course: Build 10 Real World Applications",
    pic: "/BestSellingCourses/Course8.png",
    stars: "⭐ 5.0",
    students: "265.7K",
    colors: "bg-green-100 text-green-500",
    date: dates[7]
  },
  {
    label: "Design",
    price: "$57",
    title: "Copywriting - Become a Freelance Copywriter, your own boss",
    pic: "/BestSellingCourses/Course9.png",
    stars: "⭐ 5.0",
    students: "265.7K",
    colors: "bg-rose-100 text-rose-500",
    date: dates[8]
  },
  {
    label: "Lifestyle",
    price: "$57",
    title: "Google Analytics Certification - Learn How To Pass The Exam",
    pic: "/BestSellingCourses/Course10.png",
    stars: "⭐ 5.0",
    students: "265.7K",
    colors: "bg-orange-100 text-orange-500",
    date: dates[9]
  },
  {
    label: "Design",
    price: "$57",
    title: "The Python Mega Course: Build 10 Real World Applications",
    pic: "/BestSellingCourses/Course11.png",
    stars: "⭐ 5.0",
    students: "245K",
    colors: "bg-orange-100 text-orange-500",
    date: dates[10]
  },
  {
    label: "Developments",
    price: "$57",
    title: "2021 Complete Python Bootcamp From Zero to Hero in Python",
    pic: "/BestSellingCourses/Course12.png",
    stars: "⭐ 5.0",
    students: "250K",
    colors: "bg-orange-100 text-orange-500",
    date: dates[11]
  },
];

// Function to parse the number of students and convert it to a numerical value
function parseStudents(students: string): number {
  if (students.endsWith('K')) {
    return parseFloat(students) * 1000;
  }
  return parseFloat(students);
}

// Sort the courses based on the number of students
const sortedCourses = [...courses].sort((a, b) => parseStudents(b.students) - parseStudents(a.students));

// Take the top 10 courses
export const Top10Courses: Course[] = sortedCourses.slice(0, 10);

const sortedCoursesByDate = [...courses].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

// Take the top 4 newest courses
export const Top4NewestCourses: Course[] = sortedCoursesByDate.slice(0, 4);

export const instructors: Instructor[] = [
  {
    name: "Devon Lane",
    pic: "/Instructors/DevonLane.png",
    title: "Senior Developer",
    raiting: "4.6",
    students: "854",
  },
  {
    name: "Darrell Steward",
    pic: "/Instructors/DarrellSteward.png",
    title: "Digital Product Designer",
    raiting: "4.9",
    students: "451,444",
  },
  {
    name: "Albert Flores",
    pic: "/Instructors/AlbertFlores.png",
    title: "Adobe Instructor",
    raiting: "4.7",
    students: "511,123",
  },
  {
    name: "Jane Cooper",
    pic: "/Instructors/JaneCooper.png",
    title: "UI/UX Designer",
    raiting: "4.8",
    students: "123,324",
  },
  {
    name: "Bessie Cooper",
    pic: "/Instructors/KathrynMurphy.png",
    title: "Photographer",
    raiting: "4.5",
    students: "54,343",
  },
];
