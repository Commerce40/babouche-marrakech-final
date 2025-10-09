import React from 'react';
import { motion } from 'framer-motion';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 },
};

const CONTACT_WHATSAPP_LINK = "https://wa.me/221761421653"; // Votre numéro direct

const SizeGuidePage = ({ t }) => { // Accepter 't'
return (
<motion.div initial="initial" animate="in" exit="out" variants={pageVariants} className="max-w-4xl mx-auto px-4 py-16">
<title>{t('sizeGuideTitle')}</title>
<div className="text-center mb-12">
<h1 className="text-4xl font-bold text-gray-900">{t('sizeGuideHeader')}</h1>
<p className="mt-4 text-lg text-gray-600">{t('sizeGuideSubtitle')}</p>
</div>
<div className="bg-white p-8 rounded-xl border shadow-sm space-y-8">
<div>
<h2 className="text-2xl font-semibold text-gray-800 mb-4">{t('sizeGuideOurAdvice')}</h2>
<p className="text-gray-600 leading-relaxed">{t('sizeGuideAdviceText')}</p>
</div>
<div className="overflow-x-auto border rounded-lg">
<table className="w-full text-left">
<thead className="bg-gray-50">
<tr>
<th className="p-4 font-semibold text-gray-800">{t('sizeGuideTableCol1')}</th>
<th className="p-4 font-semibold text-gray-800">{t('sizeGuideTableCol2')}</th>
</tr>
</thead>
<tbody className="divide-y">
{/* Les données du tableau restent les mêmes */}
<tr className="hover:bg-gray-50"><td className="p-4">39</td><td className="p-4">24.8</td></tr>
<tr className="hover:bg-gray-50"><td className="p-4">40</td><td className="p-4">25.4</td></tr>
<tr className="hover:bg-gray-50"><td className="p-4">41</td><td className="p-4">26.0</td></tr>
<tr className="hover:bg-gray-50"><td className="p-4">42</td><td className="p-4">26.7</td></tr>
<tr className="hover:bg-gray-50"><td className="p-4">43</td><td className="p-4">27.3</td></tr>
<tr className="hover:bg-gray-50"><td className="p-4">44</td><td className="p-4">27.9</td></tr>
<tr className="hover:bg-gray-50"><td className="p-4">45</td><td className="p-4">28.6</td></tr>
<tr className="hover:bg-gray-50"><td className="p-4">46</td><td className="p-4">29.2</td></tr>
</tbody>
</table>
</div>
<div className="text-center bg-green-50 border-l-4 border-green-500 p-8 rounded-lg">
<h2 className="text-2xl font-bold text-green-800 mb-3">{t('sizeGuideBestAdvice')}</h2>
<p className="text-lg text-green-700 leading-relaxed">{t('sizeGuideBestAdviceText')}</p>
<a href={CONTACT_WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg shadow-sm hover:shadow-md transition-all">
<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
{t('sizeGuideDiscuss')}
</a>
</div>
</div>
</motion.div>
);
};
export default SizeGuidePage;