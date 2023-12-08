import './BackgroundImage.css';
import desktopDaytimeImg from '../assets/desktop/bg-image-daytime.jpg';
import desktopNighttimeImg from '../assets/desktop/bg-image-nighttime.jpg';

const BackgroundImage = ({ timeOfDay }) => {
  return (
    <img
      loading='lazy'
      className='bg-img'
      src={timeOfDay === 'EVENING' ? desktopNighttimeImg : desktopDaytimeImg}
      alt=''
    />
  );
};

export default BackgroundImage;
