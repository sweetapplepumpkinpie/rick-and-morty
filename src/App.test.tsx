import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders characters", () => {
  render(<App />);
  const titleElement = screen.getByText(/characters/i);
  expect(titleElement).toBeInTheDocument();
});
