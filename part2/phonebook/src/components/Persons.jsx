const Number = ({ person, removePerson }) => {
  return (
    <div>
      {person.name} {person.number}
      <button type="button" onClick={() => removePerson(person.id)}>Delete</button>
    </div>
  )
}

const Persons = ({ filteredPersons, removePerson }) => {

  return (
    <>
      {
        filteredPersons.map(person =>
          <Number key={person.name} person={person} removePerson={removePerson} />
        )
      }
    </>
  )
}

export default Persons