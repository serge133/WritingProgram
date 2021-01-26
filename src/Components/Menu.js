import React from 'react';
import styled from 'styled-components';
import { colors } from '../default-styles';

// Images
import downArrowPNG from '../assets/arrow-down.png';
import folderPNG from '../assets/folder.png';
import homePNG from '../assets/home.png';
import FolderStructure from './FolderStructure';

export default function Menu({ allFolders }) {
  const Container = styled.div`
    height: 100vh;
    width: 200px;
    // background-color: ${colors.blue3 + 'DD'};
    display: inline-block;
    position: fixed;
    top: 0;
    left: 0;
    background: rgb(46, 52, 73);
    background: -moz-linear-gradient(
      0deg,
      rgba(46, 52, 73, 1) 60%,
      rgba(46, 52, 73, 0.7) 100%
    );
    background: -webkit-linear-gradient(
      0deg,
      rgba(46, 52, 73, 1) 60%,
      rgba(46, 52, 73, 0.7) 100%
    );
    background: linear-gradient(
      0deg,
      rgba(46, 52, 73, 1) 60%,
      rgba(46, 52, 73, 0.7) 100%
    );
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#2e3449",endColorstr="#2e3449",GradientType=1);
  `;

  const CompanyName = styled.h3`
    color: ${colors.white};
    width: 100%;
    height: 45px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 300;
    letter-spacing: 5px;
    font-family: montserrat;
    background-color: ${colors.blue3};
  `;

  const StyledList = styled.ul`
    // background-color: ${colors.blue2};
    // border-radius: 15px;
  `;

  const StyledListItem = styled.li`
    padding: 20px 20px 20px 10px;
    color: ${colors.white};
    cursor: pointer;
    font-family: montserrat;
    ${props =>
      props.selected
        ? `border-left: 5px solid ${colors.accent}; font-weight: 700;`
        : 'border-left: 5px solid transparent'}
    display: flex;
    align-items: center;
    width: 100%;
  `;

  const Image = styled.img`
    width: 20px;
    margin-right: 10px;
  `;

  const DownArrow = styled.img`
    width: 10px;
    margin-left: 10px;
  `;

  return (
    <Container>
      <CompanyName>DESCLR</CompanyName>
      <StyledList>
        <StyledListItem selected>
          <Image src={homePNG} alt='home' />
          Home
        </StyledListItem>
        <StyledListItem>
          <Image src={folderPNG} alt='folder' />
          Directory
          <DownArrow src={downArrowPNG} alt='down arrow' />
        </StyledListItem>
        <FolderStructure allFolders={allFolders} />
      </StyledList>
    </Container>
  );
}
