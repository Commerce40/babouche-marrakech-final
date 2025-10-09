import React from 'react';
import { motion } from 'framer-motion';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 },
};

const ReturnPolicyPage = ({ t }) => { // Accepter 't'
  return (
    <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} className="max-w-4xl mx-auto px-4 py-16">
      <title>{t('returnPolicyTitle')}</title>
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900">{t('returnPolicyHeader')}</h1>
        <p className="mt-4 text-lg text-gray-600">{t('returnPolicySubtitle')}</p>
      </div>
      <div className="bg-white p-8 rounded-xl border shadow-sm text-gray-700 leading-relaxed space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800">{t('returnPolicyH1')}</h2>
        <p>{t('returnPolicyT1')}</p>
        <h2 className="text-2xl font-semibold text-gray-800">{t('returnPolicyH2')}</h2>
        <ol className="list-decimal list-inside space-y-2">
          <li>{t('returnPolicyT2_1')}</li>
          <li>{t('returnPolicyT2_2')}</li>
          <li>{t('returnPolicyT2_3')}</li>
        </ol>
        <h2 className="text-2xl font-semibold text-gray-800">{t('returnPolicyH3')}</h2>
        <p>{t('returnPolicyT3')}</p>
        <h2 className="text-2xl font-semibold text-gray-800">{t('returnPolicyH4')}</h2>
        <p>{t('returnPolicyT4')}</p>
      </div>
    </motion.div>
  );
};

export default ReturnPolicyPage;