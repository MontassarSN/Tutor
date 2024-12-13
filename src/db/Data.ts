import { Category } from "../types/Types";

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
    color: "bg-pink-100",
  },
  {
    text: "Business",
    pic: "/TopCat/Handshake.png",
    courses: "63,476",
    color: "bg-green-100",
  },
  {
    text: "Finance & Accounting",
    pic: "/TopCat/CreditCard.png",
    courses: "63,476",
    color: "bg-orange-100",
  },
  {
    text: "IT & Software",
    pic: "/TopCat/ChartBarHorizontal.png",
    courses: "63,476",
    color: "bg-rose-100",
  },
  {
    text: "Personal Development",
    pic: "/TopCat/BugDroid.png",
    courses: "63,476",
    color: "bg-white shadow-sm-100",
  },
  {
    text: "Office Productivity",
    pic: "/TopCat/Receipt.png",
    courses: "63,476",
    color: "bg-gray-50",
  },
  {
    text: "Marketing",
    pic: "/TopCat/MegaphoneSimple.png",
    courses: "63,476",
    color: "bg-pink-100",
  },
  {
    text: "Photography & Video",
    pic: "/TopCat/Camera.png",
    courses: "63,476",
    color: "bg-gray-50",
  },
  {
    text: "Lifestyle",
    pic: "/TopCat/Package.png",
    courses: "63,476",
    color: "bg-orange-100",
  },
  {
    text: "Design",
    pic: "/TopCat/PenNib.png",
    courses: "63,476",
    color: "bg-rose-100",
  },
  {
    text: "Health & Fitness",
    pic: "/TopCat/FirstAidKit.png",
    courses: "63,476",
    color: "bg-green-100",
  },
  {
    text: "Music",
    pic: "/TopCat/Headphones.png",
    courses: "63,476",
    color: "bg-orange-100",
  },
];

