import { useState } from 'react'

const Button = ({ onClick, text }) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}

const Statistics = ({ good, neutral, bad, total }) => {
  if (total > 0) {
    return (
      <div>
        <StatisticLine value={good} text='good' />
        <StatisticLine value={neutral} text='neutral' />
        <StatisticLine value={bad} text='bad' />
        <StatisticLine value={total} text='all' />
        <StatisticLine value={(good - bad) / total} text='average' />
        <StatisticLineWithPercent value={good / total * 100} text='positive' />
      </div>
    )
  } else {
    return (
      <div>No feedback given</div>
    )
  }
}

const StatisticLine = ({ value, text }) => {
  return (
    <div>
      {text} {value}
    </div>
  )
}

const StatisticLineWithPercent = ({ value, text }) => {
  return (
    <div>
      {text} {value} %
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)

  const incrementGood = () => {
    setGood(good + 1)
    setTotal(total + 1)
  }
  const incrementNeutral = () => {
    setNeutral(neutral + 1)
    setTotal(total + 1)
  }
  const incrementBad = () => {
    setBad(bad + 1)
    setTotal(total + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={incrementGood} text='good' />
      <Button onClick={incrementNeutral} text='neutral' />
      <Button onClick={incrementBad} text='bad' />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} total={total} />
    </div>
  )
}

export default App