import './Button.css';
import ShowIcon from '../assets/desktop/down-arrow.svg';
import HideIcon from '../assets/desktop/up-arrow.svg';
import { useMediaQuery } from 'react-responsive';
import { useState } from 'react';

const Button = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isDesktop = useMediaQuery({ minWidth: 1024 });
  const contentWrapper = document.querySelector('.content-wrapper');
  const clockInfo = document.querySelector('.clock-info');

  const showInfo = () => {
    setIsExpanded(true);
    contentWrapper.style.top = isDesktop ? '-44%' : '-40%';
    clockInfo.style.bottom = '0';
  };

  const hideInfo = () => {
    setIsExpanded(false);
    contentWrapper.style.top = '0';
    clockInfo.style.bottom = '-50%';
  };

  return (
    <button onClick={isExpanded ? hideInfo : showInfo} className='btn'>
      <h6>{isExpanded ? 'LESS' : 'MORE'}</h6>
      <img src={isExpanded ? HideIcon : ShowIcon} alt='' />
    </button>
  );
};

export default Button;
