import React from 'react';
import HomeHeader from '../components/HomeHeader';
import TopCat from '../components/TopCat';
import MostSellingCourses from '../components/MostSellingCourses';
import Features from '../components/Features';
import RecentlyAdded from '../components/RecentlyAdded';
import BecomeInstructor from '../components/BecomeInstructor';
import Instructors from '../components/Instructors';
import Companies from '../components/Companies';

const Home: React.FC = () => {
    return (
        <div className='bg-gray-100 flex flex-col'>
            <HomeHeader />
            <TopCat />
            <MostSellingCourses />
            <Features />
            <RecentlyAdded />
            <BecomeInstructor />
            <Instructors />
            <Companies />
        </div>
    );
}

export default Home;
