import '@testing-library/jest-dom';
import * as ResizeObserverModule from 'resize-observer-polyfill';

(global as any).ResizeObserver = ResizeObserverModule.default;

// Mock scrollIntoView
Element.prototype.scrollIntoView = jest.fn();
