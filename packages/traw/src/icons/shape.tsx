import * as React from 'react';
const SvgShape = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    style={{
      enableBackground: 'new 0 0 512 512',
    }}
    xmlSpace="preserve"
    {...props}
  >
    <path
      d="M405.3 0H106.7C47.8.1.1 47.8 0 106.7v298.7C.1 464.2 47.8 511.9 106.7 512h298.7c58.9-.1 106.6-47.8 106.7-106.7V106.7C511.9 47.8 464.2.1 405.3 0zm64 405.3c0 35.3-28.7 64-64 64H106.7c-35.3 0-64-28.7-64-64V106.7c0-35.3 28.7-64 64-64h298.7c35.3 0 64 28.7 64 64v298.6h-.1z"
      style={{
        fill: '#5b5f80',
      }}
    />
  </svg>
);
export default SvgShape;
