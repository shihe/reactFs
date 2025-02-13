const Course = ({ course }) => {
  return (
    <div>
      <Header name={course.name} />
      <Content data={course.parts} />
      <Total data={course.parts} />
    </div>
  )
}

const Header = ({ name }) => {
  return (
    <h2>{name}</h2>
  )
}

const Part = ({ data }) => {
  return (
    <p>{data.name} {data.exercises}</p>
  )
}

const Content = ({ data }) => {
  return (
    <div>
      {data.map(part =>
        <Part key={part.id} data={part} />
      )}
    </div>
  )
}

const Total = ({ data }) => {
  return (
    <p>
      <b>
      total of {data.reduce((sum, curr) =>
        sum + curr.exercises, 0
      )} exercises
      </b>
    </p>
  )
}

export default Course