import React from "react";
import { BrowserRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders characters", () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  const titleElement = screen.getByText(/characters/i);
  expect(titleElement).toBeInTheDocument();
});
