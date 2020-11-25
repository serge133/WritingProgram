import React from 'react';
import './HomescreenComponents.css';

export default function Origin({ origin, setOrigin }) {
  const originArray = origin.split('/');
  // Fixes the array
  // originArray.pop();
  originArray.shift();

  const goToOrigin = pathIndex => {
    const newOrigin = '/' + [...originArray].slice(0, pathIndex + 1).join('/');
    setOrigin(newOrigin);
  };

  return (
    <div className='origin-path'>
      {originArray.map((p, index) => (
        <div className='path' key={p} onClick={() => goToOrigin(index)}>
          <section className='path-button'>
            <h4>{p}</h4>
          </section>
          {p !== originArray[originArray.length - 1] && ' ---> '}
        </div>
      ))}
    </div>
  );
}
