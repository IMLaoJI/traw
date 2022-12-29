import React from 'react';

import { TLBounds } from '@tldraw/core';

interface EditWidgetProps {
  bounds: TLBounds;
  camera: {
    point: number[];
    zoom: number;
  };
}

const EditWidget = ({ bounds, camera }: EditWidgetProps) => {
  return (
    <div
      style={{
        top: (bounds.minY + camera.point[1]) * camera.zoom,
        left: (bounds.minX + camera.point[0]) * camera.zoom,
      }}
      className={`z-10 absolute`}
    >
      <div className="absolute ">Editor widget</div>
    </div>
  );
};

export default EditWidget;
