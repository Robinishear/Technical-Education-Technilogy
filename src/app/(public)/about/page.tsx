import { AboutHero } from '@/features/public_assets/about/AboutHero';
import LoadingScreen from '@/features/public_assets/about/LoadingScreen';

import React from 'react';

const page = () => {
    return (
        <div>
            <LoadingScreen></LoadingScreen>
            <AboutHero></AboutHero>
          
        </div>
    );
};

export default page;