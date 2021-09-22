import React from "react";
import { render, screen } from "@testing-library/react";
import CourseCard from "./CourseCard";
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
      <CourseCard course={course} />
    </MemoryRouter>
  );
  const backgroundImageElement = screen.getByTitle(course.data.name);
  const nameElement = screen.getByText(course.data.name);
  expect(backgroundImageElement).toBeInTheDocument();
  expect(nameElement).toBeInTheDocument();
});
