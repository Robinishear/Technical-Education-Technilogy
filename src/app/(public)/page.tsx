import AboutFounderSection from '@/features/public_assets/Home/AboutFounderSection/AboutFounderSection';
import { Advantages } from '@/features/public_assets/Home/Advantages';
import CircularProgress from '@/features/public_assets/Home/CircularProgress';
import Instructors from '@/features/public_assets/Home/Instructors';
import Slider from '@/features/public_assets/Home/Slider/Slider';
import SuccessStudents from '@/features/public_assets/Home/successStudents';
import Testimonials from '@/features/public_assets/Home/Testimonials';
import React from 'react';

const page = () => {

    return (
        <div>
        <Slider></Slider>
        <Advantages></Advantages>
        <AboutFounderSection></AboutFounderSection>
        <Instructors></Instructors>
        <SuccessStudents></SuccessStudents>
<CircularProgress></CircularProgress>

        <Testimonials></Testimonials>
     
        </div>
    );
};

export default page;