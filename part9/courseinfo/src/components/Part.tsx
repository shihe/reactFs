import { CoursePart } from "../types"

const Part = ({ part }: { part: CoursePart }) => {
  switch (part.kind) {
    case "basic":
      return (
        <>
          <div><b>{part.name} {part.exerciseCount}</b></div>
          <div><i>{part.description}</i></div>
          <br />
        </>
      )
    case "group":
      return (
        <>
          <div><b>{part.name} {part.exerciseCount}</b></div>
          <div>project exercises {part.groupProjectCount}</div>
          <br />
        </>
      )
    case "background":
      return (
        <>
          <div><b>{part.name} {part.exerciseCount}</b></div>
          <div><i>{part.description}</i></div>
          <div>required background: {part.backgroundMaterial}</div>
          <br />
        </>
      )
    case "special":
      return (
        <>
          <div><b>{part.name} {part.exerciseCount}</b></div>
          <div><i>{part.description}</i></div>
          <div>required skills: {part.requirements.join(", ")}</div>
          <br />
        </>
      )
    default:
      return assertNever(part)
  }
}

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

export default Part