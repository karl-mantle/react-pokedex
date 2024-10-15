import { useEffect, useState } from 'react';
import header from './header.module.css';
import lights from './lights.module.css';

const Header = ({ globalLoading, modalShow }) => {
  const [lightRed, setLightRed] = useState(false);
  const [lightYellow, setLightYellow] = useState(false);
  const [lightGreen, setLightGreen] = useState(false);
  const [lightBlue, setLightBlue] = useState(modalShow);

  useEffect(() => {
    let resetTime, yellowTime, yellowTimeOff, greenTime;

    if (globalLoading) {
      setLightRed(true);
      yellowTime = setTimeout(() => setLightYellow(true), 100);
      greenTime = setTimeout(() => {
        setLightGreen(true);
        setLightRed(false);
      }, 200);
      yellowTimeOff = setTimeout(() => setLightYellow(false), 300);
    } else {
      setLightRed(false);
      resetTime = setTimeout(() => {
        setLightYellow(false);
        setLightGreen(false);
      }, 2000);
    }

    setLightBlue(modalShow);

    return () => {
      clearTimeout(resetTime);
      clearTimeout(yellowTime);
      clearTimeout(greenTime);
      clearTimeout(yellowTimeOff);
    };
  }, [globalLoading, modalShow]);

  return (
    <header>
      <div className={`${header.wrapper} ${header.background} ${header['clip-path']}`}>
          <div className={lights.wrapper}>
            <div className={`${lights.light} ${lights.large} ${ lightBlue ? lights.blue : '' }`}></div>
            <div className={lights.wrapper}>
              <div className={`${lights.light} ${ lightRed ? lights.red : '' }`}></div>
              <div className={`${lights.light} ${ lightYellow ? lights.yellow : '' }`}></div>
              <div className={`${lights.light} ${ lightGreen ? lights.green : '' }`}></div>
            </div>
          </div>
      </div>
    </header>
  )
}

export default Header;