import React from 'react';
import { motion } from 'framer-motion';
// On importe les icônes dont on a besoin
import { Eye, MapPin, Award, Truck, Users } from 'lucide-react';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 },
};

const AboutPage = ({ t }) => { // Accepter 't'
  const storySteps = [
    { icon: MapPin, title: t('aboutStep1Title'), description: t('aboutStep1Desc') },
    { icon: Eye, title: t('aboutStep2Title'), description: t('aboutStep2Desc') },
    { icon: Award, title: t('aboutStep3Title'), description: t('aboutStep3Desc') },
    { icon: Truck, title: t('aboutStep4Title'), description: t('aboutStep4Desc') },
    { icon: Users, title: t('aboutStep5Title'), description: t('aboutStep5Desc') }
  ];

  return (
    <motion.div initial="initial" animate="in" exit="out" variants={pageVariants}>
      <title>{t('aboutTitle')}</title>
      <div className="relative h-72 bg-gray-900">
        <img src="/images/artisan-hands (1).jpg" alt="Artisan marocain au travail" className="w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.h1 className="text-4xl md:text-5xl font-extrabold text-white text-center drop-shadow-lg" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1, transition: { delay: 0.2, duration: 0.5 } }}>
            {t('aboutHeader').split(', ').map((part, i) => <span key={i} className="block">{part}</span>)}
          </motion.h1>
        </div>
      </div>
      <div className="bg-white">
        <div className="max-w-4xl mx-auto px-4 py-20">
          <div className="relative">
            <div className="absolute left-10 top-0 h-full w-0.5 bg-gray-200" aria-hidden="true"></div>
            <div className="space-y-16">
              {storySteps.map((step, index) => (
                <motion.div key={index} className="relative flex items-start pl-20" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.5, delay: index * 0.1 }}>
                  <div className="absolute left-0 top-0 flex items-center justify-center w-20 h-20 bg-indigo-600 text-white rounded-full shadow-lg">
                    <step.icon size={32} />
                  </div>
                  <div className="bg-gray-50 p-6 rounded-lg border flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          <motion.div className="mt-20 text-center border-t pt-12" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.7 }}>
            <h3 className="text-3xl font-bold text-gray-800">{t('aboutConclusion')}</h3>
            <p className="mt-4 text-lg text-gray-600">{t('aboutSlogan')}</p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};
export default AboutPage;
