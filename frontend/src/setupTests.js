import '@testing-library/jest-dom';

// Mock scrollIntoView for jsdom
Element.prototype.scrollIntoView = jest.fn();