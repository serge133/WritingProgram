import React from 'react';
import styled from 'styled-components';
import { colors } from '../default-styles';

export default function FolderStructure({ allFolders }) {
  const Container = styled.section`
    width: 100%;
    padding-left: 15px;
    color: ${colors.white};
  `;

  const Folder = styled.div``;

  const FolderName = styled.h5`
    font-weight: 400;
    font-family: montserrat;
    cursor: pointer;
    :hover {
      color: ${colors.accent};
    }
  `;

  let longestOriginLength = 0,
    longestPath = [];

  // This finds the longest path so that it can render an array of folders in directory mode
  for (let i of allFolders) {
    if (i.origin.length > longestOriginLength)
      longestOriginLength = i.origin.length;
  }

  if (longestOriginLength > 0) {
    const longestOrigin = allFolders.find(
      folder => folder.origin.length === longestOriginLength
    ).origin;

    longestPath = longestOrigin.split('/');
    // Clean up the array by removing the empty item in the beginning
    longestPath.shift();
  }

  // ! I will get slapped at Berkely if I ever show this to them lmfaooo
  const generateFolderStructure = () => {
    let homeFolders = allFolders.filter(folder => folder.origin === '/');

    homeFolders.forEach(homeFolder => {
      // Puts folders that are in the home folders
      homeFolder.folders = allFolders.filter(
        folder => folder.origin === `/${homeFolder.id}`
      );

      homeFolder.folders.forEach(folder => {
        folder.folders = allFolders.filter(
          _folder => _folder.origin === `/${homeFolder.id}/${folder.id}`
        );

        folder.folders.forEach(_folder => {
          _folder.folders = allFolders.filter(
            __folder =>
              __folder.origin === `/${homeFolder.id}/${folder.id}/${_folder.id}`
          );
        });
      });
    });
    return homeFolders;
  };

  const folderStructure = generateFolderStructure();

  const originDeepness = origin => {
    // origin is a string
    const originArray = origin.split('/');
    originArray.shift();
    let string = '';
    // let i = 0;
    // while (originArray.length > i) {
    //   string += '>';
    //   i++;
    // }
    for (let i = 0; i < originArray.length; i++) {
      string += '>';
    }
    return string;
  };

  return (
    <Container>
      {/* {allFolders.map(folder => {
        const { id, name, origin } = folder;
        const path = origin.split('/');
        // Clean up the array by removing the empty item in the beginning
        path.shift();

        return (
          <div key={id}>
            <Folder>{name}</Folder>
            <OpenArrowDirectory />
          </div>
        );
      })} */}
      {/* {folderStructure.map(folder => (
        <Folder key={folder.id}>
          <FolderName>{folder.name}</FolderName>
          {folder.folders.map(_folder => (
            <Folder key={_folder.id}>
              <FolderName>{'> ' + _folder.name}</FolderName>
              {_folder.folders.map(__folder => (
                <Folder key={__folder.id}>
                  <FolderName>{'>> ' + __folder.name}</FolderName>
                  {__folder.folders.map(___folder => (
                    <Folder key={___folder.id}>
                      <FolderName>{'>>> ' + ___folder.name}</FolderName>
                    </Folder>
                  ))}
                </Folder>
              ))}
            </Folder>
          ))}
        </Folder>
      ))} */}
      {allFolders.map(folder => (
        <Folder key={folder.id}>
          <FolderName>{originDeepness(folder.origin) + folder.name}</FolderName>
        </Folder>
      ))}
    </Container>
  );
}
