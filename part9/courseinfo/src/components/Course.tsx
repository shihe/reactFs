import { CoursePart } from "../types"
import Part from "./Part"

const Course = ({ courseParts }: { courseParts: CoursePart[] }) => {
  return (
    <div>
      {courseParts.map(part =>
        <Part key={part.name} part={part} />
      )}
      <Total data={courseParts} />
    </div>
  )
}

const Total = ({ data }: { data: CoursePart[] }) => {
  return (
    <div>
      Number of exercises {data.reduce((sum, curr) =>
        sum + curr.exerciseCount, 0
      )}
    </div>
  )
}

export default Course