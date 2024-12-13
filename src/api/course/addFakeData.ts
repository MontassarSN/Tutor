import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://your-supabase-url.supabase.co';
const supabaseKey = 'your-anon-key';
const supabase = createClient(supabaseUrl, supabaseKey);

const fakeCourses = [
  {
    audience: ["Beginners", "Students"],
    congratsmessage: "Congratulations on completing the course!",
    description: "An introductory course on web development.",
    discount: 20,
    duration: 10,
    instructor_ids: ["8010c784-95b8-4264-bc1c-8887348b536c"],
    label: 1,
    language: "English",
    level: "Beginner",
    numberOfRatings: 45,
    pic: "https://zcchljrmiprrszpsszaw.supabase.co/storage/v1/object/public/pictures/courseDefault.jpg",
    price: 100,
    rating: 4.5,
    requirements: ["Basic computer skills"],
    status: "active",
    students: 300,
    subjects: ["HTML", "CSS", "JavaScript"],
    sublabel: 1,
    subtitle: "Learn the basics of web development",
    subtitle_language: "English",
    title: "Web Development for Beginners",
    topic: "Web Development",
    trailer: "https://zcchljrmiprrszpsszaw.supabase.co/storage/v1/object/public/pictures/8010c784-95b8-4264-bc1c-8887348b536c/splash.mp4",
    user_id: "8010c784-95b8-4264-bc1c-8887348b536c",
    welcomemessage: "Welcome to the course!",
  },
  {
    audience: ["Intermediate learners"],
    congratsmessage: "Well done on completing this advanced course!",
    description: "A comprehensive guide to JavaScript.",
    discount: 15,
    duration: 20,
    instructor_ids: ["8010c784-95b8-4264-bc1c-8887348b536c"],
    label: 2,
    language: "English",
    level: "Intermediate",
    numberOfRatings: 150,
    pic: "https://zcchljrmiprrszpsszaw.supabase.co/storage/v1/object/public/pictures/courseDefault.jpg",
    price: 150,
    rating: 4.8,
    requirements: ["Basic HTML and CSS knowledge"],
    status: "active",
    students: 500,
    subjects: ["JavaScript", "DOM Manipulation", "ES6+"],
    sublabel: 2,
    subtitle: "Master JavaScript for Web Development",
    subtitle_language: "English",
    title: "JavaScript Mastery",
    topic: "Programming",
    trailer: "https://zcchljrmiprrszpsszaw.supabase.co/storage/v1/object/public/pictures/8010c784-95b8-4264-bc1c-8887348b536c/splash.mp4",
    user_id: "8010c784-95b8-4264-bc1c-8887348b536c",
    welcomemessage: "Welcome to the JavaScript Mastery course!",
  },
  // Add more course objects as needed
];

async function addCourses() {
  const { data, error } = await supabase
    .from('courses')
    .insert(fakeCourses);

  if (error) {
    console.error('Error inserting courses:', error);
  } else {
    console.log('Courses added successfully:', data);
  }
}

// Run the function to insert the courses
addCourses();
