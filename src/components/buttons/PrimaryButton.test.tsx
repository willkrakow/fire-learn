import React from "react";
import { render, screen,  } from "@testing-library/react";
import PrimaryButton from "./PrimaryButton";
import { MemoryRouter } from "react-router";

const course: Course = {
  id: "1",
  data: {
    name: "test name",
    description: "test description",
    price: 24.99,
    image_path: "test",
    author: "test author",
    organization: "test organization",
    published: true,
    image_url: "test",
  },
};

test("renders card", () => {
  render(
    <MemoryRouter>
      <PrimaryButton onClick={() => console.log("click worked")} >
    Click here
          </PrimaryButton>
    </MemoryRouter>
  );
  const renderedButton = screen.getByText("Click here")
  expect(renderedButton).toBeInTheDocument();
});
