import { useCallback, useEffect, useState } from 'react';

const useDeviceDetect: any = () => {
  const [isBrowser, setIsBrowser] = useState<boolean>(true);
  const [height, setHeight] = useState(window.innerHeight);
  const [width, setWidth] = useState(window.innerWidth);

  const handleResize = useCallback(() => {
    setHeight(window.innerHeight);
    setWidth(window.innerWidth);
    const width = window.document.body.clientWidth;
    if (!width) return;
    width > 768 ? setIsBrowser(true) : setIsBrowser(false);
  }, []);

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);

  return {
    isBrowser,
    width,
    height,
  };
};

export default useDeviceDetect;
