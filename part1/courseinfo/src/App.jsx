const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Part = (props) => {
  return (
    <p>{props.data.part} {props.data.exercises}</p>
  )
}

const Content = (props) => {
  return (
    <>
      <Part data={props.data[0]} />
      <Part data={props.data[1]} />
      <Part data={props.data[2]} />
    </>
  )
}

const Total = (props) => {
  return (
    <p>Number of exercises {props.data[0].exercises + props.data[1].exercises + props.data[2].exercises}</p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const contentData = [
    { part: 'Fundamentals of React', exercises: 10 },
    { part: 'Using props to pass data', exercises: 7 },
    { part: 'State of a component', exercises: 14 }
  ]

  return (
    <div>
      <Header course={course} />
      <Content data={contentData} />
      <Total data={contentData} />
    </div>
  )
}

export default App