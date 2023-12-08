import './ClockInfo.css';

const ClockInfo = ({ timeData, timeOfDay }) => {
  return (
    timeData && (
      <div className={`clock-info ${timeOfDay === 'EVENING' ? 'dark' : ''}`}>
        <div className='info-block'>
          <div>
            <h6>CURRENT TIMEZONE</h6>
            <h2>{timeData.timezone}</h2>
          </div>
          <div>
            <h6>DAY OF THE YEAR</h6>
            <h2>{timeData.day_of_year}</h2>
          </div>
        </div>
        <div className='info-block'>
          <div>
            <h6>DAY OF THE WEEK</h6>
            <h2>{timeData.day_of_week}</h2>
          </div>
          <div>
            <h6>WEEK NUMBER</h6>
            <h2>{timeData.week_number}</h2>
          </div>
        </div>
      </div>
    )
  );
};

export default ClockInfo;
