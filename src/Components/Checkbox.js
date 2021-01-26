import React from 'react';
import styled from 'styled-components';
import { colors } from '../default-styles';
//// import './Checkbox.css';

export default function Checkbox({ isChecked, handleToggleCheck }) {
  const Container = styled.div`
    width: 25px;
    height: 25px;
    border: 2px solid ${colors.accent};
    border-radius: 4px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  `;

  const Dot = styled.div`
    height: 10px;
    width: 10px;
    border-radius: 7.5px;
    background-color: ${colors.accent};
  `;

  return (
    <Container onClick={handleToggleCheck}>{isChecked && <Dot />}</Container>
  );
}
