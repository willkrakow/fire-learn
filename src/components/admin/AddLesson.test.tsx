import React from "react";
import { render, screen } from "@testing-library/react";
import AddLesson from "./AddLesson";
import { MemoryRouter } from "react-router";
import { act } from "react-dom/test-utils";

const COURSE_ID = "BVFgHIHwwHdQWOto41Fv";

test("renders button", () => {
  render(
    <MemoryRouter>
      <AddLesson courseId={COURSE_ID} />
    </MemoryRouter>
  );
  const renderedButton = screen.getByText("Add lesson");
  expect(renderedButton).toBeInTheDocument();
});

test("creates lesson", () => {
  render(
    <MemoryRouter>
      <AddLesson courseId={COURSE_ID} />
    </MemoryRouter>
  );

  act(() => {
    const button = screen.getByText("Add lesson");
    button.click();
  });

  expect(window.location.pathname).toContain(
    "/admin/courses/BVFgHIHwwHdQWOto41Fv/lessons/"
  );
});
