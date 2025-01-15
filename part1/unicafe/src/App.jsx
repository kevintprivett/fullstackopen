import { useState } from 'react'

const Statistics = ({good, neutral, bad}) => {
  if (good + neutral + bad === 0) {
    return (
      <>
        <h2>statistics</h2>
        <div>No feedback given</div>
      </>
    )
  }

  return (
    <>
      <h2>statistics</h2>
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={good + neutral + bad} />
          <StatisticLine text="average" value={(good * 1 + bad * -1) / (good + neutral + bad)} />
          <StatisticLine text="positive" value={good / (good + neutral + bad) * 100} endText=" %" />
        </tbody>
      </table>
    </>
  )
}

const StatisticLine = ({text, value, endText}) => {
  return(
    <tr>
      <td>{text}</td>
      <td>{value}{endText}</td>
    </tr>
  )
}

const Button = ({text, value, setValue}) => (
  <button onClick={() => setValue(value + 1)}>{text}</button>
)

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <>
      <h2>give feedback</h2>
      <Button text="good" value={good} setValue={setGood} />
      <Button text="neutral" value={neutral} setValue={setNeutral} />
      <Button text="bad" value={bad} setValue={setBad} />
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </>
  )
}

export default App
