import React from 'react';
import { Hero } from '../components/Hero';
import { FeaturedSystem } from '../components/FeaturedSystem';
import { Skills } from '../components/Skills';
import { InferenceLab } from '../components/InferenceLab';
import { Projects } from '../components/Projects';
import { Architecture } from '../components/Architecture';
import { Experience } from '../components/Experience';
import { CertCarousel } from '../components/CertCarousel';
import { RecruiterAI } from '../components/RecruiterAI';

export const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <FeaturedSystem />
      <Projects />
      <Skills />
      <InferenceLab />
      <Experience />
      <CertCarousel />
      <RecruiterAI />
    </>
  );
};