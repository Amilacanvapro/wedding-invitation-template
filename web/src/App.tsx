import React, { useEffect, useState } from 'react';
import { GuestWish, weddingConfig } from './config/weddingConfig';
import { fetchApprovedWishes } from './services/rsvpService';
import { useWeddingAudio } from './hooks/useWeddingAudio';
import { useMotionSystem } from './motion/useMotionSystem';
import { AudioFab } from './components/AudioFab';
import { SplashCover } from './components/sections/SplashCover';
import { HeroSection } from './components/sections/HeroSection';
import { CountdownSection } from './components/sections/CountdownSection';
import { LoveStorySection } from './components/sections/LoveStorySection';
import { HappyCoupleSection } from './components/sections/HappyCoupleSection';
import { WeddingDetailsSection } from './components/sections/WeddingDetailsSection';
import { OrderOfEventsSection } from './components/sections/OrderOfEventsSection';
import { RsvpSection } from './components/sections/RsvpSection';
import { WordsOfLoveSection } from './components/sections/WordsOfLoveSection';
import { ClosingAndFooter } from './components/sections/ClosingAndFooter';

export const App: React.FC = () => {
  const [entered, setEntered] = useState(false);
  const [wishes, setWishes] = useState<GuestWish[]>(weddingConfig.wordsOfLove.wishes);
  const { audioRef, isPlaying, start, toggle } = useWeddingAudio(weddingConfig.media.audioUrl);

  useMotionSystem(entered);

  useEffect(() => {
    let active = true;
    fetchApprovedWishes(weddingConfig.slug, weddingConfig.wordsOfLove.wishes).then((loaded) => {
      if (active) setWishes(loaded);
    });
    return () => {
      active = false;
    };
  }, []);

  const handleOpenStart = () => {
    // Synchronous call inside VIEW INVITATION click handler unlocks browser audio immediately
    start();
  };

  const handleEnterInvitation = () => {
    setEntered(true);
  };

  const handleWishAdded = (wish: GuestWish) => {
    setWishes((prev) => [wish, ...prev]);
  };

  return (
    <div className="min-h-screen w-full bg-[#FFFDFC] text-[#3C2A12] overflow-x-clip">
      {/* Persistent in-DOM wedding soundtrack audio element */}
      {weddingConfig.media.audioUrl && (
        <audio
          ref={audioRef}
          src={weddingConfig.media.audioUrl}
          loop
          preload="auto"
          playsInline
          aria-label={weddingConfig.media.audioTitle}
        />
      )}

      {!entered && (
        <SplashCover
          monogram={weddingConfig.monogram}
          onOpenStart={handleOpenStart}
          onEnter={handleEnterInvitation}
        />
      )}

      {entered && <AudioFab isAudioPlaying={isPlaying} onToggleAudio={toggle} />}

      <main aria-hidden={!entered}>
        <HeroSection config={weddingConfig} />
        <CountdownSection config={weddingConfig} />
        <LoveStorySection config={weddingConfig} />
        <HappyCoupleSection config={weddingConfig} />
        <WeddingDetailsSection config={weddingConfig} />
        <OrderOfEventsSection config={weddingConfig} />
        <RsvpSection config={weddingConfig} onWishAdded={handleWishAdded} />
        <WordsOfLoveSection config={weddingConfig} wishes={wishes} />
      </main>

      <ClosingAndFooter config={weddingConfig} />
    </div>
  );
};

export default App;
