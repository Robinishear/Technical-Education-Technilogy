import AboutHero from '@/features/public_assets/about/AboutHero';
// import ContactPage from '@/features/public_assets/about/ContactPage';
import MissionSection from '@/features/public_assets/about/MissionSection';
import ServicesPage from '@/features/public_assets/about/ServicesPage';
import StatsSection from '@/features/public_assets/about/StatsSection';
import TeamSection from '@/features/public_assets/about/TeamSection';
import React from 'react';

const page = () => {
    return (
        <div>
            <AboutHero></AboutHero>
            <MissionSection></MissionSection>
            <TeamSection></TeamSection>
            <StatsSection></StatsSection>
            <ServicesPage></ServicesPage>
            {/* <ContactPage></ContactPage> */}
        </div>
    );
};

export default page;