import About from '@/features/public_assets/about/About/About';
import { AboutHero } from '@/features/public_assets/about/AboutHero';
import FeaturesGrid from '@/features/public_assets/about/components/FeaturesGrid';
import ProjectSpecialty from '@/features/public_assets/about/components/ProjectSpecialty';
import VisionMission from '@/features/public_assets/about/components/VisionMission';
import WhyChooseUs from '@/features/public_assets/about/components/WhyChooseUs';
import LoadingScreen from '@/features/public_assets/about/LoadingScreen';

import React from 'react';

const page = () => {
    return (
      <div className="flex flex-col gap-6">
        <LoadingScreen></LoadingScreen>
        <AboutHero></AboutHero>
        <About></About>
       
<VisionMission></VisionMission>
<FeaturesGrid></FeaturesGrid>
<ProjectSpecialty></ProjectSpecialty>
<WhyChooseUs></WhyChooseUs>
      </div>
    );
};

export default page;