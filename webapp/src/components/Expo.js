import React from 'react';
import Viewer from 'react-viewer';

const IMG_SERVER_URL = "http://localhost:3000";

const Expo = ({images, visible, handlerClose, imageAlt}) => (
    <Viewer
        visible={visible}
        onClose={handlerClose}
        images={images.map(name => ({
            src: `${IMG_SERVER_URL}/${name}`,
            alt: imageAlt
        }))}
        zoomSpeed={0.3}
        noResetZoomAfterChange
    />
);

export default Expo;