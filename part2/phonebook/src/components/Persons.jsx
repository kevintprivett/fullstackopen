const Number = ({ person }) => {
  return (
    <div>{person.name} {person.number}</div>
  )
}

const Persons = ({ filteredPersons }) => {

  return (
    <>
      {
        filteredPersons.map(person =>
          <Number key={person.name} person={person} />
        )
      }
    </>
  )
}

export default Persons