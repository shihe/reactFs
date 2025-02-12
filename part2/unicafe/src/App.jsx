import { useState } from 'react'

const Button = ({ onClick, text }) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}

const Counter = ({ counter, text }) => {
  return (
    <div>
      {text} {counter}
    </div>
  )
}

const CounterWithPercent = ({ counter, text }) => {
  return (
    <div>
      {text} {counter} %
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const incrementGood = () => setGood(good + 1)
  const incrementNeutral = () => setNeutral(neutral + 1)
  const incrementBad = () => setBad(bad + 1)

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={incrementGood} text='good' />
      <Button onClick={incrementNeutral} text='neutral' />
      <Button onClick={incrementBad} text='bad' />
      <h1>statistics</h1>
      <Counter counter={good} text='good' />
      <Counter counter={neutral} text='neutral' />
      <Counter counter={bad} text='bad' />
      <Counter counter={good + neutral + bad} text='all' />
      <Counter counter={(good - bad) / (good + neutral + bad)} text='average' />
      <CounterWithPercent counter={(good / (good + neutral + bad)) * 100} text='positive' />
    </div>
  )
}

export default App