import React from 'react';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';

interface IPhotoViewerProps {
  imgSrces: string[];
}

const PhotoViewer = ({ imgSrces }: IPhotoViewerProps) => {
  return (
    <PhotoProvider>
      {imgSrces?.map((src) => {
        return (
          <PhotoView key={src} src={src}>
            <img src={src} alt={src} />
          </PhotoView>
        );
      })}
    </PhotoProvider>
  );
};

export default PhotoViewer;
