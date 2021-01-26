import React from 'react';
import styled from 'styled-components';
import { colors } from '../../default-styles';
import './HomescreenComponents.css';

export default function FolderCarousel({ folders, setOrigin }) {
  const changePath = folderName => {
    setOrigin(prevState => prevState + `/${folderName}`);
  };

  const Container = styled.section`
    width: 100%;
  `;

  const Folder = styled.div`
    display: inline-block;
    width: 150px;
    height: 105px;
    margin-right: 20px;
    margin-bottom: 20px;
    position: relative;
    background-color: ${colors.blue3};
    border-radius: 0 6px 6px 6px;
    box-shadow: 0 5px 5px 0 rgba(154, 160, 185, 0.05),
      0 5px 30px 0 rgba(166, 173, 201, 0.22);
    cursor: pointer;
    ::before {
      content: '';
      width: 50%;
      height: 12px;
      border-radius: 0 20px 0 0;
      background-color: ${colors.blue3};
      position: absolute;
      top: -12px;
      left: 0px;
    }
  `;

  const FolderName = styled.span`
    width: 100%;
    height: 100%;
    padding: 10px;
    color: ${colors.white};
    font-size: 12px;
    font-weight: 700;
  `;

  return (
    <Container>
      {folders.map(folder => (
        <Folder key={folder.id} onClick={() => changePath(folder.name)}>
          <FolderName>{folder.name}</FolderName>
        </Folder>
      ))}
    </Container>
  );
}
