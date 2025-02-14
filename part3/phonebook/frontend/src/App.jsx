import { useState,useEffect } from 'react'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personsService from './services/personsService'
import PersonConfirmation from './components/PersonConfirmation'
import RemoveError from './components/RemoveError'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')
  const [confirmationMessage, setConfirmationMessage] = useState(null)
  const [removeErrorMessage, setRemoveErrorMessage] = useState(null)

  useEffect(() => {
    personsService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const exists = persons.reduce(
      (found, person) => found || person.name === newName,
      false
    )

    const personObject = {
      name: newName,
      number: newNumber
    }

    if (exists) {
      alert(`${newName} is already added to phonebook, replace the old number with a new one?`)
      const newId = persons.find(person => person.name === newName).id
      personsService
        .update(newId, personObject)
        .then(returnedPerson => {
          setConfirmationMessage(
            `Updated ${newName}`
          )
          setTimeout(() => {
            setConfirmationMessage(null)
          }, 3000)
          setPersons(persons.map(person => person.id === newId ? returnedPerson : person))
          setNewName('')
          setNewNumber('')
        })
      return
    }

    personsService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        setConfirmationMessage(
          `Added ${newName}`
        )
        setTimeout(() => {
          setConfirmationMessage(null)
        }, 3000)
      })
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterNameChange = (event) => {
    setFilterName(event.target.value)
  }

  const handleRemoveError = (name) => {
    setRemoveErrorMessage(
      `Information of ${name} has already been removed from server`
    )
    setTimeout(() => {
      setRemoveErrorMessage(null)
    }, 3000)
  } 

  const removePerson = (id) => {
    const name = persons.find(person => person.id === id).name
    if (window.confirm(`Delete ${name}?`)) {
      personsService
        .remove(id, name, handleRemoveError)
      setPersons(persons.filter(person => person.id !== id))
    }
  }

  const filteredPersons = filterName === ""
    ? persons
    : persons.filter(person => person.name.startsWith(filterName))

  return (
    <div>
      <h2>Phonebook</h2>

      <PersonConfirmation message={confirmationMessage} />
      <RemoveError message={removeErrorMessage} />
      <Filter filterName={filterName} handleFilterNameChange={handleFilterNameChange} />

      <h2>add a new</h2>

      <PersonForm 
        newName={newName} 
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
      />

      <h2>Numbers</h2>

      <Persons filteredPersons={filteredPersons} removePerson={removePerson} />
    </div>
  )
}

export default App
