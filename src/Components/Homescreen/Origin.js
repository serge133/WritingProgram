import React from 'react';
import styled from 'styled-components';
import { colors } from '../../default-styles';
import rightArrowPNG from '../../assets/right-arrow.png';

export default function Origin({ origin, setOrigin }) {
  const originArray = origin.split('/');
  // Fixes the array
  // originArray.pop();
  originArray.shift();

  const goToOrigin = pathIndex => {
    const newOrigin = '/' + [...originArray].slice(0, pathIndex + 1).join('/');
    setOrigin(newOrigin);
  };

  const Container = styled.div`
    display: flex;
    margin-left: 20px;
    width: fit-content;
    border-radius: 30px;
    margin-bottom: 20px;
    height: 100%;
  `;

  const Path = styled.div`
    display: flex;
    align-items: center;
  `;

  const PathButton = styled.section`
    transition-duration: 500ms;
    cursor: pointer;
    height: 35px;
    padding: 0 5px;
    display: flex;
    align-items: center;
    justify-self: center;
    font-family: montserrat;
    color: ${colors.white};
    border-radius: 30px;

    :hover {
      color: ${colors.accent};
    }
  `;

  const Seperator = styled.img`
    width: 20px;
  `;

  return (
    <Container>
      {originArray.map((p, index) => (
        <Path key={p} onClick={() => goToOrigin(index)}>
          <PathButton className='path-button'>
            <h4>{p}</h4>
          </PathButton>
          {p !== originArray[originArray.length - 1] && (
            <Seperator src={rightArrowPNG} alt='-->' />
          )}
        </Path>
      ))}
    </Container>
  );
}
