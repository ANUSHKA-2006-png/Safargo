import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Landing } from "../pages/Landing";

describe("App", () => {
  it("renders the landing page", () => {
    render(
      <MemoryRouter>
        <Landing />
      </MemoryRouter>
    );

    expect(screen.getAllByText("Safargo").length).toBeGreaterThan(0);
    expect(screen.getByText(/Plan trips/i)).toBeInTheDocument();
  });
});
