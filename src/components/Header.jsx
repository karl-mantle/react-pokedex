import React, { useEffect, useState } from 'react';
import '../css/header.css';

const Header = ({ globalLoading, showEntry }) => {
  const [lightRed, setLightRed] = useState(false);
  const [lightYellow, setLightYellow] = useState(false);
  const [lightGreen, setLightGreen] = useState(false);
  const [lightBlue, setLightBlue] = useState(showEntry);

  useEffect(() => {
    let resetTime, yellowTime, yellowTimeOff, greenTime;

    if (globalLoading) {
      setLightRed(true);
      const yellowTime = setTimeout(() => setLightYellow(true), 100);
      const greenTime = setTimeout(() => {
        setLightGreen(true);
        setLightRed(false);
      }, 200);
      const yellowTimeOff = setTimeout(() => setLightYellow(false), 300);

      return () => {
        clearTimeout(yellowTime);
        clearTimeout(greenTime);
        clearTimeout(yellowTimeOff);
      };
    }
    else {
      setLightRed(false);
      resetTime = setTimeout(() => {
        setLightYellow(false);
        setLightGreen(false);
      }, 2000);
    }

    setLightBlue(showEntry);
    
    return () => {
      clearTimeout(resetTime);
      clearTimeout(yellowTime);
      clearTimeout(greenTime);
      clearTimeout(yellowTimeOff);
    };

  }, [globalLoading, showEntry]);

  return (
    <div className="sticky">
      <header>
          <div className="lights">
            <div className={`light large${ lightBlue ? ' blue' : '' }`}></div>
            <div className="lights">
              <div className={`light${lightRed ? ' red' : ''}`}></div>
              <div className={`light${lightYellow ? ' yellow' : ''}`}></div>
              <div className={`light${lightGreen ? ' green' : ''}`}></div>
            </div>
          </div>

          <div className="content">
          </div>
      </header>
    </div>
  )
}

export default Header;