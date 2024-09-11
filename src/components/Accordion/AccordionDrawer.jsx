import React, { useState, useRef, useEffect, cloneElement } from 'react';
import './accordion.css';

const AccordionDrawer = ({ title, children }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const drawerRef = useRef(null);

  useEffect(() => {
    if (drawerOpen && drawerRef.current) {
      setTimeout(() => {
        drawerRef.current.scrollIntoView({ behavior: "smooth" });
      }, 0);
    }
  }, [drawerOpen]);

  return (
    <div className="drawer">
      <div onClick={() => setDrawerOpen(!drawerOpen)} className={`title ${drawerOpen ? 'active' : ''}`} ref={drawerRef}>
        <h3>{title}</h3>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5" />
        </svg>
      </div>
      {drawerOpen && (
        <div className="content">
          {React.Children.map(children, child => 
            cloneElement(child, { drawerOpen })
          )}
        </div>
      )}
    </div>
  );
};

export default AccordionDrawer;
