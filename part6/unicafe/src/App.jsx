import { useSelector, useDispatch } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()
  const unicafe = useSelector(state => state)

  const good = () => {
    dispatch({
      type: 'GOOD'
    })
  }

  const ok = () => {
    dispatch({
      type: 'OK'
    })
  }

  const bad = () => {
    dispatch({
      type: 'BAD'
    })
  }

  const zero = () => {
    dispatch({
      type: 'ZERO'
    })
  }

  return (
    <div>
      <button onClick={good}>good</button> 
      <button onClick={ok}>ok</button> 
      <button onClick={bad}>bad</button>
      <button onClick={zero}>reset stats</button>
      <div>good {unicafe.good}</div>
      <div>ok {unicafe.ok}</div>
      <div>bad {unicafe.bad}</div>
    </div>
  )
}

export default App