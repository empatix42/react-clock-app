import { useEffect, useState } from 'react';
import BackgroundImage from './BackgroundImage';
import IconSun from '../assets/desktop/icon-sun.svg';
import IconMoon from '../assets/desktop/icon-moon.svg';
import Quote from './Quote';
import Button from './Button';
import ClockInfo from './ClockInfo';
import { useMediaQuery } from 'react-responsive';
import './Clock.css';
const { format } = require('date-fns');

const Clock = () => {
  const TIME_URL = 'http://worldtimeapi.org/api/ip';
  const IP_URL = 'http://ip-api.com/json/';

  const [timeData, setTimeData] = useState(null);
  const [locationData, setLocationData] = useState(null);
  const [timeOfDay, setTimeOfDay] = useState('');
  const isMobile = useMediaQuery({ maxWidth: 767 });

  useEffect(() => {
    const fetchTimeData = () => {
      fetch(TIME_URL)
        .then((data) => data.json())
        .then((json) => {
          const dateTime = new Date(json.datetime);
          const currentHour = dateTime.getHours();
          const formattedTime = format(dateTime, 'HH:mm');

          let newTimeOfDay = '';
          if (currentHour >= 6 && currentHour <= 12) {
            newTimeOfDay = 'MORNING';
          } else if (currentHour > 12 && currentHour < 18) {
            newTimeOfDay = 'AFTERNOON';
          } else {
            newTimeOfDay = 'EVENING';
          }

          setTimeData({ ...json, formattedTime, currentHour });
          setTimeOfDay(newTimeOfDay);
        })
        .catch((error) => console.error('Error fetching time data:', error));
    };

    fetchTimeData();

    const interval = setInterval(fetchTimeData, 10000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (timeData) {
      fetch(IP_URL + timeData.client_ip)
        .then((data) => data.json())
        .then((json) => setLocationData(json))
        .catch((error) => console.error('Error fetching IP data:', error));
    }
  }, [timeData]);

  return (
    <main className='content-wrapper'>
      <Quote />
      <div className='clock-container'>
        {timeData && locationData && (
          <div className='clock-content'>
            <div>
              <div className='clock-heading'>
                <img src={timeOfDay === 'EVENING' ? IconMoon : IconSun} alt='sun icon' />
                <h4>GOOD {timeOfDay}{!isMobile && ", IT'S CURRENTLY"}</h4>
              </div>
              <h1>
                {timeData.formattedTime}
                <span>{timeData.abbreviation}</span>
              </h1>
              <h3>
                IN {locationData.regionName.toUpperCase()}, {locationData.countryCode}
              </h3>
            </div>

            <Button />
          </div>
        )}
        <ClockInfo timeData={timeData} timeOfDay={timeOfDay} />
        <BackgroundImage timeOfDay={timeOfDay} />
      </div>
    </main>
  );
};

export default Clock;
