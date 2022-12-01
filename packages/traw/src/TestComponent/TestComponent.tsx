import React from "react";

import { TestComponentProps } from "./TestComponent.types";

import "./TestComponent.css";

const TestComponent: React.FC<TestComponentProps> = ({ heading, content }) => (
  <div data-testid="test-component" className="test-component bg-slate-100 font-bold">
    <h1 data-testid="test-component__heading" className="heading font-bold">
      {heading}
    </h1>
    <div data-testid="test-component__content">{content}</div>
  </div>
);

export default TestComponent;
