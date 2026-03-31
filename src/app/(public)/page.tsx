import AboutFounderSection from '@/features/public_assets/Home/AboutFounderSection';
import AboutSection from '@/features/public_assets/Home/AboutSection';
import { Advantages } from '@/features/public_assets/Home/Advantages';
import Course from '@/features/public_assets/Home/Course';
import ImpactSection from '@/features/public_assets/Home/ImpactSection';
import Instructors from '@/features/public_assets/Home/Instructors';
import LatestNewsSection from '@/features/public_assets/Home/LatestNewsSection';
import { NewsSection } from '@/features/public_assets/Home/NewsSection';
import Slider from '@/features/public_assets/Home/Slider';
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
        <AboutSection></AboutSection>
        <Course></Course>
        <SuccessStudents></SuccessStudents>
        <ImpactSection></ImpactSection>
        <Testimonials></Testimonials>
        <NewsSection></NewsSection>
        <LatestNewsSection></LatestNewsSection>
        </div>
    );
};

export default page;