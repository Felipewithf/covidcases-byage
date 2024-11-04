import { useState } from 'react'

import './App.css'

function App() {
  const [activeAgeGroup, setActiveAgeGroup] = useState(null);
  const [showVirus, setShowVirus] = useState(true);

  const circle = 'circle';
  const virus = 'virus';
  const variable = showVirus ? virus: circle;


  // Default image
  const defaultImage = 'trendLineByAge-all.png';

  // Determine image source based on active button
  const imageSrc = activeAgeGroup ? `trendLineByAge-${activeAgeGroup}.png` : defaultImage;

  const [monthIndex, setMonthIndex] = useState(6);

  // Array of months (can add/remove months as needed)
  const months = ["OCT", "NOV", "DEC", "JAN", "FEB", "MAR", "APR", "MAY"];


  // Function to handle slider change
  const handleSliderChange = (e) => {
    setMonthIndex(parseInt(e.target.value, 10));
  };

  const toggleImageType = () => {
    setShowVirus((prev) => !prev);
  };


  // Handle button click
  const handleButtonClick = (ageGroup) => {
    // Toggle the active state of the button
    setActiveAgeGroup((prevGroup) => (prevGroup === ageGroup ? null : ageGroup));
  };

  return (
    <>
      <h1>Visualization of COVID-19 Cases</h1>
      <h5>Data from Ontario, Canada from October 1, 2021 to May 31, 2022 </h5>
      <h5><em>(Rate of COVID-19 cases per 100,000)</em></h5>
      <div className='dailyRates'>
        <div className='virusGraphHolder'>
          <div className='titleVirus'>
          
          <button onClick={toggleImageType} className={showVirus ? "active" : ""}>
            <img src="icon-virus.png" />
      </button>
      <h3>Average of Daily Rates by Age Group</h3>
      </div>
          <input
        type="range"
        min="0"
        max={months.length - 1}
        value={monthIndex}
        onChange={handleSliderChange}
        className="slider"
        orient="vertical"
      />
      {/* Display the selected month */}
      <div className="monthLabel">
      {months.map((month, index) => (
          <div
            key={index}
            data-slider={index}
            className={index === monthIndex ? "active" : ""}
          >
            {month}
          </div>
        ))}
        </div>
          <div className='virusGraph'>
            <img 
          src={`${variable}-${months[monthIndex].toLowerCase()}.png`}
          alt={`${variable.charAt(0).toUpperCase() + variable.slice(1)} Graph for ${months[monthIndex]}`}
          />
          </div>
          
        </div>
        <div className='trendGraphsHolder'>
          <div className='totalTrendGrapHolder'>
          <h3>Trend Graph of Average Daily Rates from All Age Groups</h3>
          <div className='trendGraph'></div>
          </div>
          <div className='TrendLineAgeGroupHolder'>
          <h3>Trend Graph of Average Daily Rates by Age Group</h3>
          <div className='AgeSelector'>
          <button 
          onClick={() => handleButtonClick('0')}
          className={activeAgeGroup === '0' ? 'active' : ''}>
          <img src="icon0-4y.png" alt="0-4 years" /> 0-4y
        </button>
        <button onClick={() => handleButtonClick('5')}
        className={activeAgeGroup === '5' ? 'active' : ''}>
          <img src="icon5-11y.png" alt="5-11 years" /> 5-11y
        </button>
        <button onClick={() => handleButtonClick('12')}
        className={activeAgeGroup === '12' ? 'active' : ''}>
          <img src="icon12-17y.png" alt="12-17 years" /> 12-17y
        </button>
        <button onClick={() => handleButtonClick('18')}
        className={activeAgeGroup === '18' ? 'active' : ''}>
          <img src="icon18-39y.png" alt="18-39 years" /> 18-39y
        </button>
        <button onClick={() => handleButtonClick('40')}
        className={activeAgeGroup === '40' ? 'active' : ''}>
          <img src="icon40-59y.png" alt="40-59 years" /> 40-59y
        </button>
        <button onClick={() => handleButtonClick('60')}
        className={activeAgeGroup === '60' ? 'active' : ''}>
          <img src="icon60y.png" alt="60+ years" /> 60+y
        </button>
          </div>
          <div className='trendLine'>
          <img src={imageSrc} alt="Trend line graph" />
          </div>
          </div>
          
        </div>
      </div>
    </>
  )
}

export default App
