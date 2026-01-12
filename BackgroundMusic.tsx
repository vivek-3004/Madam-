import { useEffect, useRef } from "react";

interface Props {
  play: boolean;
}

const BackgroundMusic: React.FC<Props> = ({ play }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(require("./assets/sound/music.mp3"));
      audioRef.current.loop = true;
      audioRef.current.volume = 0.5;
    }

    if (play) {
      audioRef.current.play().catch(() => {});
    } else {
      audioRef.current.pause();
    }
  }, [play]);

  return null;
};

export default BackgroundMusic;
