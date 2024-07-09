import { useQuery } from 'react-query';
import { supabase } from '../lib/supabaseClient'; // Adjust path as needed

export const fetchCourses = async () => {
  const { data, error } = await supabase.from('courses').select('*');
  if (error) {
    throw new Error(`Error fetching courses: ${error.message}`);
  }
  return data.map(course => ({
    label: course.label,
    price: course.price,
    title: course.title,
    picurl: course.pic,
    stars: course.stars,
    students: course.students,
    colors: course.colors,
    date: course.created_at
  }));
};

export const useCourses = () => {
  return useQuery('courses', fetchCourses);
};
