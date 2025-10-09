import React from 'react';
import { motion } from 'framer-motion';
import { Hero } from '../components/Hero';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 },
};

const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.5,
};

const HomePage = ({ t }) => {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="max-w-6xl mx-auto px-4 py-8"
    >
      <title>{t('siteTitle')}</title>
      <meta name="description" content={t('heroSubtitle')} />
      <Hero t={t} />
    </motion.div>
  );
};

export default HomePage;