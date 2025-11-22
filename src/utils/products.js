// On importe CHAQUE image utilisée dans le fichier
import imgJaune1 from '/images/Babouche-Jaune-naturel-1.png';
import imgJaune2 from '/images/Babouche-Jaune-naturel-2.png';
import imgJaune3 from '/images/Babouche-Jaune-naturel-3.jpeg';

import imgMercedes1 from '/images/Babouche-Mercedes-1.jpeg';
import imgMercedes2 from '/images/Babouche-Mercedes-2.jpeg';
import imgMercedes3 from '/images/Babouche-Mercedes-3.jpeg';
const imgMercedes = imgMercedes1; 

import imgClassique1 from '/images/Babouche-classique-1.png';
import imgClassique2 from '/images/Babouche-classique-2.png';
import imgClassique3 from '/images/Babouche-classique-3.png';

import imgDaim1 from '/images/Babouche en Daim Coupe 1.jpeg';
import imgDaim2 from '/images/Babouche en Daim Coupe 2.jpeg';
import imgDaim3 from '/images/Babouche en Daim Coupe 3.jpeg';
const imgDaim = imgDaim1;

export const PRODUCTS = [
  {
    id: 1,
    title: { 
      fr: "Babouche Royal Jaune Naturel",
      ar: "بابوش ملكي أصفر طبيعي", 
      wo: "Babouche Royal Jaune Naturel" 
    },
    price: 18900,
    oldPrice: 25000,
    description: {
      fr: "Babouche royale en cuir pleine fleur, broderies fines et semelle renforcée. Un classique intemporel pour les grandes occasions.",
      ar: "بابوش ملكي من جلد طبيعي، تطريز يدوي ونعل معزز.",
      wo: "Babouche ci cuir, broderie yu rafet ak nàll yu rafet.",
    },
    image: imgJaune1,
    gallery: [
      imgJaune1,
      imgJaune2,
      imgJaune3,
    ],
    sku: "BM-001",
  },
  {
    id: 4,
    title: { 
      fr: "Babouche Royal Mercedes", 
      ar: "بابوش رويال مرسيدس", 
      wo: "Babouche Royal Mercedes" 
    },
    price: 18000,
    oldPrice: 20000,
    description: {
      fr: "Le design iconique 'Mercedes' revisité. Un modèle prisé pour son style unique et son confort exceptionnel.",
      ar: "تصميم 'مرسيدس' الأيقوني بلمسة جديدة. نموذج مطلوب لأسلوبه الفريد وراحته الاستثنائية.",
      wo: "Designu 'Mercedes' bu bees. Model bu ñépp bëgg ngir stileem ak confortam.",
    },
    image: imgMercedes,
    gallery: [
      imgMercedes1,
      imgMercedes2,
      imgMercedes3,
    ],
    sku: "BM-004",
  },
  {
    id: 2,
    title: { 
      fr: "Babouche Royal Classique", 
      ar: "بابوش ملكي كلاسيكي", 
      wo: "Babouche Royal Classique" 
    },
    price: 12000,
  specialOffer: "3 paires = 30 000 FCFA", // La nouvelle offre
  shippingInfo: "Livraison gratuite sur Dakar", // Nouvelle info de livraison
    description: {
      fr: "Velours premium, intérieur cuir, semelle souple fait main. L'alliance parfaite du confort et de l'élégance au quotidien.",
      ar: "مخمل فاخر وباطن من الجلد، نعل يدوي مرن.",
      wo: "Velours premium, ndoxum cuir ci digg.",
    },
    image: imgClassique2,
    gallery: [
      imgClassique1,
      imgClassique2,
      imgClassique3,
    ],
    sku: "BM-002",
  },
  {
    id: 3,
    title: { 
      fr: "Babouche Royal en Daim", 
      ar: "بابوش ملكي من جلد الغزال", 
      wo: "Babouche Royal en Daim" 
    },
    price: 15000,
    description: {
      fr: "La douceur du daim véritable, avec des détails de couture artisanale. Un modèle raffiné pour un look distingué.",
      ar: "نعومة جلد الغزال الأصلي، مع تفاصيل خياطة يدوية.",
      wo: "Daim bu neex, ak ñaw bu rafet.",
    },
    image: imgDaim,
    gallery: [
      imgDaim1,
      imgDaim2,
      imgDaim3,
    ],
    sku: "BM-003",
  },
];
