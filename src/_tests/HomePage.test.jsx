import React from 'react';
import { render, screen } from '@testing-library/react';
import { expect, test } from "vitest";
import "@testing-library/jest-dom/vitest";

import HomePage from '../pages/HomePage.jsx';

test("mostra Clima App", () => {
  render(<HomePage />);
  expect(screen.getByText(/Clima App/i)).toBeInTheDocument();  
});
