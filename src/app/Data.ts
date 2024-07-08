import { Category, Course, Instructor } from './Types';

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


// Function to parse the number of students and convert it to a numerical value


// Sort the courses based on the number of students



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
