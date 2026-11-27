import React from 'react';
import { Music, VolumeX } from 'lucide-react';

interface AudioFabProps {
  isAudioPlaying: boolean;
  onToggleAudio: () => void;
}

export const AudioFab: React.FC<AudioFabProps> = ({ isAudioPlaying, onToggleAudio }) => (
  <div
    data-audio-fab
    data-audio-playing={isAudioPlaying ? 'true' : 'false'}
    className="fixed bottom-6 right-6 z-[60] flex items-center justify-center"
  >
    {isAudioPlaying && (
      <span
        className="audio-fab-ring absolute inset-0 rounded-full bg-[#AA954B]/45 pointer-events-none"
        aria-hidden="true"
      />
    )}
    <button
      type="button"
      onClick={onToggleAudio}
      aria-label={isAudioPlaying ? 'Mute wedding music' : 'Play wedding music'}
      title={isAudioPlaying ? 'Mute music' : 'Play music'}
      aria-pressed={isAudioPlaying}
      className={`relative flex items-center justify-center w-12 h-12 rounded-full text-[#FAF6EE] shadow-lg active:scale-[0.95] transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#AA954B] focus-visible:ring-offset-2 ${
        isAudioPlaying
          ? 'bg-[#AA954B] hover:bg-[#96823F]'
          : 'bg-[#AA954B]/80 hover:bg-[#AA954B]'
      }`}
    >
      {isAudioPlaying ? (
        <Music className="w-5 h-5" strokeWidth={1.85} />
      ) : (
        <VolumeX className="w-5 h-5" strokeWidth={1.85} />
      )}
    </button>
  </div>
);
