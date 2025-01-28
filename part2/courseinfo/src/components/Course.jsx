const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ parts }) => 
    <b>
      Number of exercises {parts.reduce((accumulator, part) => 
        accumulator + part.exercises, 0)}
    </b>

const Part = ({ part }) =>
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => 
  <>
    {parts.map((part) => <Part key= {part.id} part={ part }/>)}
  </>


const Course = ({ course }) => {
  const { name } = course
  const { parts } = course

  return (
    <>
      <Header course={ name } />
      <Content parts={ parts } />
      <Total parts= { parts } />
    </>
  )
}

export default Course
