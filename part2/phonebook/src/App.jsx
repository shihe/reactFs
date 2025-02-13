import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [nameFilter, setNameFilter] = useState('')
  
  useEffect(() => {
    personService
      .getAll()
      .then(persons => {
        setPersons(persons)
      })
      .catch(error => {
        console.log('failed to fetch persons', error)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    const person = {
      name : newName,
      number : newPhone
    }

    personService
      .create(person)
      .then(personResponse => {
        console.log(personResponse)
        setPersons(persons.concat(personResponse))
        setNewName('')
        setNewPhone('')
      })
      .catch(error => {
        alert('failed to create person', error)
      })
  }

  const deletePerson = (personToDelete) => {
    if (window.confirm(`Delete ${personToDelete.name} ?`)) {
      personService
        .remove(personToDelete.id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== personToDelete.id))
        })
        .catch(error => {
          alert('failed to delete person', error)
        })
    }
  }

  const handleName = (event) => {
    setNewName(event.target.value)
  }

  const handlePhone = (event) => {
    setNewPhone(event.target.value)
  }

  const handleNameFilter = (event) => {
    setNameFilter(event.target.value)
  }

  const personsToShow = nameFilter === ''
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(nameFilter))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter nameFilter={nameFilter} handleNameFilter={handleNameFilter} />
      <h3>Add a new</h3>
      <PersonForm addPerson={addPerson} newName={newName} handleName={handleName} newPhone={newPhone} handlePhone={handlePhone} />
      <h3>Numbers</h3>
      <Persons personsToShow={personsToShow} deletePerson={deletePerson} />
    </div>
  )
}

export default App