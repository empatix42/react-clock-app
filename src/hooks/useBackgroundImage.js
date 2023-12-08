import { useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useLocation } from 'react-router-dom';

const useBackgroundImage = ({ desktopImg, tabletImg, mobileImg }) => {
  const isDesktop = useMediaQuery({ minWidth: 1024 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 });

  const location = useLocation();
  const mainRoute = location.pathname;

  useEffect(() => {
    const background = isDesktop ? desktopImg : isTablet ? tabletImg : mobileImg;

    const backgroundImg = document.querySelector('#background-img');

    backgroundImg.style.backgroundImage = `url('${background}')`;

    if (mainRoute !== '/') {
      backgroundImg.style.filter = 'brightness(85%)';
    }

    return () => {
      backgroundImg.style.backgroundImage = '';
      backgroundImg.style.filter = 'none';
    };
  }, [isDesktop, isTablet, desktopImg, mobileImg, tabletImg, mainRoute]);
};

export default useBackgroundImage;
