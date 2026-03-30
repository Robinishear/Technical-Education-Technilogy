import AboutFounderSection from '@/features/public_assets/Home/AboutFounderSection';
import { Advantages } from '@/features/public_assets/Home/Advantages';
import ImpactSection from '@/features/public_assets/Home/ImpactSection';
import { NewsSection } from '@/features/public_assets/Home/NewsSection';
import TeachersSection from '@/features/public_assets/Home/TeachersSection';
import React from 'react';

const page = () => {
    return (
        <div>
        <Advantages></Advantages>
        <AboutFounderSection></AboutFounderSection>
        <TeachersSection></TeachersSection>
        <ImpactSection></ImpactSection>
        <NewsSection></NewsSection>
        </div>
    );
};

export default page;