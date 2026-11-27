import React, { useEffect, useState } from 'react';
import { GuestWish, weddingConfig } from './config/weddingConfig';
import { fetchApprovedWishes } from './services/rsvpService';
import { useWeddingAudio } from './hooks/useWeddingAudio';
import { useMotionSystem } from './motion/useMotionSystem';
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
  const { isPlaying, start, toggle } = useWeddingAudio(weddingConfig.media.audioUrl);

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

  const handleEnterInvitation = () => {
    setEntered(true);
    start();
  };

  const handleWishAdded = (wish: GuestWish) => {
    setWishes((prev) => [wish, ...prev]);
  };

  return (
    <div className="min-h-screen w-full bg-[#FFFDFC] text-[#3C2A12] overflow-x-clip">
      {!entered && (
        <SplashCover monogram={weddingConfig.monogram} onEnter={handleEnterInvitation} />
      )}

      <main aria-hidden={!entered}>
        <HeroSection
          config={weddingConfig}
          isAudioPlaying={isPlaying}
          onToggleAudio={toggle}
          showFab={entered}
        />
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
