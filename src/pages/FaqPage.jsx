import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 },
};

const FaqPage = ({ t }) => { // Accepter 't'
  const faqs = [
    { question: t('faqQ1'), answer: t('faqA1') },
    { question: t('faqQ2'), answer: t('faqA2') },
    { question: t('faqQ3'), answer: t('faqA3') },
    { question: t('faqQ4'), answer: t('faqA4'), link: { to: "/guide-des-tailles", text: t('faqL4') } },
    { question: t('faqQ5'), answer: t('faqA5') },
    { question: t('faqQ6'), answer: t('faqA6') }
  ];

  return (
    <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} className="max-w-4xl mx-auto px-4 py-16">
      <title>{t('faqTitle')}</title>
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900">{t('faqHeader')}</h1>
        <p className="mt-4 text-lg text-gray-600">{t('faqSubtitle')}</p>
      </div>
      <div className="space-y-8">
        {faqs.map((faq, index) => (
          <motion.div key={index} className="bg-white p-6 rounded-lg border shadow-sm" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">{faq.question}</h3>
            <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
            {faq.link && <Link to={faq.link.to} className="mt-3 inline-block text-indigo-600 hover:underline font-semibold">{faq.link.text}</Link>}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default FaqPage;