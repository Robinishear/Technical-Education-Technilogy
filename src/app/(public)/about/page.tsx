import About from '@/features/public_assets/about/About/About';
import { AboutHero } from '@/features/public_assets/about/AboutHero';
import LoadingScreen from '@/features/public_assets/about/LoadingScreen';

import React from 'react';

const page = () => {
    return (
        <div className='flex flex-col gap-6'>
            <LoadingScreen></LoadingScreen>
            <AboutHero></AboutHero>
            <About></About>
          
        </div>
    );
};

export default page;