import { useEffect, useState } from 'react';

export const useAudioStream = () => {
  const [audioStream, setAudioStream] = useState<MediaStream | null>(null);

  const getAudioStream = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      setAudioStream(stream);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    void getAudioStream();
  }, []);

  return { audioStream };
};
