import type { CoursePart } from "../types";
import Part from "./Part";

const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
  return (
    <div>
      {courseParts.map((course) => (
        <Part key={course.name} part={course}/>
      ))}
    </div>
  );
};

export default Content;