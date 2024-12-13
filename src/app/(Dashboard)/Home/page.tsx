"use client"
import React from 'react';
import HomeHeader from './components/HomeHeader';
import TopCat from './components/TopCat';
import MostSellingCourses from './components/MostSellingCourses';
import Features from './components/Features';
import RecentlyAdded from './components/RecentlyAdded';
import BecomeInstructor from './components/BecomeInstructor';
import Instructors from './components/TopInstructors';
import Companies from '@/components/Companies';
import { useSearch } from '@/Contexts/SearchContext';
import ResearchForCourses from '@/components/ResearchForCourses';
import useCurrentUser from '@/queries/useCurrentUser';
import { redirect } from 'next/navigation';

export default function Page(){
    const {data : user} = useCurrentUser();
    if(user?.role === 'admin'){
        redirect('/admin_dashboard')
    }
    const {searchQuery} = useSearch();

    return (
        <div className='bg-gray-100 flex flex-col'>
            {searchQuery ?
            <ResearchForCourses/>
            :
            <>
                <HomeHeader />
                <TopCat />
                <MostSellingCourses />
                <Features />
                <RecentlyAdded />
                <BecomeInstructor />
                <Instructors />
                <Companies />
            </>

            }
           
        </div>
    );
}
