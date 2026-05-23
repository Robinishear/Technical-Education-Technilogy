import AboutFounderSection from '@/features/public_assets/Home/AboutFounderSection/AboutFounderSection';
import { Advantages } from '@/features/public_assets/Home/Advantages';
import CircularProgress from '@/features/public_assets/Home/CircularProgress/CircularProgress';
import Coursess from '@/features/public_assets/Home/Coursess/Coursess';
import Instructors from '@/features/public_assets/Home/Instructors/Instructors';
import Slider from '@/features/public_assets/Home/Slider/Slider';
import SuccessStudents from '@/features/public_assets/Home/SuccessStudents/successStudents';
import Testimonials from '@/features/public_assets/Home/Testimonials/Testimonials';
import React from 'react';

const page = () => {

    return (
        <div className='flex flex-col gap-6'>
        <Slider></Slider>
        <Advantages></Advantages>
        <AboutFounderSection></AboutFounderSection>
        <Coursess></Coursess>
        <Instructors></Instructors>

        <SuccessStudents></SuccessStudents>

       <CircularProgress></CircularProgress>

        <Testimonials></Testimonials>
     
        </div>
    );
};

export default page;