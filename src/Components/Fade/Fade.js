import React, { useEffect, useState } from 'react';
import './Fade.css';

const Fade = ({ display, className, children }) => {
  const [deattachElement, setDeattachElement] = useState(true);

  useEffect(() => {
    if (display) {
      setDeattachElement(false);
    } else {
      const timeout = setTimeout(() => setDeattachElement(true), 250);
      return () => clearTimeout(timeout);
    }
  }, [display]);

  return (
    <div
      className={[className, display ? 'fade-in_fade' : 'fade-out_fade'].join(
        ' '
      )}
      style={{
        display: deattachElement && 'none',
      }}
    >
      {children}
    </div>
  );
};

export default Fade;
