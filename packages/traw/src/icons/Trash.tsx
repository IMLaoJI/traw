import * as React from 'react';
const SvgTrash = (props: any) => (
  <svg width={15} height={15} fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M5.5 1a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4ZM3 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 0 1H11v8a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V4h-.5a.5.5 0 0 1-.5-.5ZM5 4h5v8H5V4Z"
      fill="currentColor"
      fillRule="evenodd"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgTrash;
