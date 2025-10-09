import React, { createContext, useContext, useState, useRef, useEffect } from 'react';

const AudioContext = createContext();

export const useAudio = () => useContext(AudioContext);

export const AudioProvider = ({ children }) => {
  const [isMuted, setIsMuted] = useState(false);
  const backgroundMusicRef = useRef(null);
  const welcomeSoundRef = useRef(null);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Fonction pour tout démarrer
  const startAudioExperience = () => {
    // Si on a déjà interagi, on ne fait rien
    if (hasInteracted) return;

    // Jouer le son de bienvenue
    if (welcomeSoundRef.current) {
      welcomeSoundRef.current.play().catch(e => console.error("Erreur voix:", e));
    }
    
    // Jouer la musique de fond
    if (backgroundMusicRef.current) {
      backgroundMusicRef.current.play().catch(e => console.error("Erreur musique:", e));
    }

    // On note que l'interaction a eu lieu pour ne pas le refaire
    setHasInteracted(true);
  };

  const toggleMute = () => {
    setIsMuted(prev => !prev);
  };
  
  useEffect(() => {
    if (backgroundMusicRef.current) {
      backgroundMusicRef.current.muted = isMuted;
    }
    if (welcomeSoundRef.current) {
      welcomeSoundRef.current.muted = isMuted;
    }
  }, [isMuted]);

  // Écouteur pour la première interaction
  useEffect(() => {
    // On attache l'écouteur au premier chargement
    window.addEventListener('click', startAudioExperience);
    
    // On nettoie l'écouteur si le composant est détruit
    return () => {
      window.removeEventListener('click', startAudioExperience);
    };
  }, [hasInteracted]); // On le ré-évalue si hasInteracted change (pour le retirer)

  const value = {
    isMuted,
    toggleMute,
    // On n'a plus besoin d'exposer les fonctions de lecture
    backgroundMusicRef,
    welcomeSoundRef,
  };

  return <AudioContext.Provider value={value}>{children}</AudioContext.Provider>;
};