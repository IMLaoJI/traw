import * as React from 'react';
const SvgTransparency = (props: any) => (
  <svg width={15} height={15} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      opacity={0.25}
      d="M0 0h3v3H0V0Zm6 3H3v3H0v3h3v3H0v3h3v-3h3v3h3v-3h3v3h3v-3h-3V9h3V6h-3V3h3V0h-3v3H9V0H6v3Zm0 3V3h3v3H6Zm0 3H3V6h3v3Zm3 0V6h3v3H9Zm0 0H6v3h3V9Z"
      fill="currentColor"
      fillRule="evenodd"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgTransparency;
