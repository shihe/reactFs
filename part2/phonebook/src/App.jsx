import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [nameFilter, setNameFilter] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  // Db fetch
  useEffect(() => {
    personService
      .getAll()
      .then(persons => {
        setPersons(persons)
      })
      .catch(error => {
        handleError('failed to fetch persons')
      })
  }, [])

  // Handlers
  const handleName = (event) => {
    setNewName(event.target.value)
  }

  const handlePhone = (event) => {
    setNewPhone(event.target.value)
  }

  const handleNameFilter = (event) => {
    setNameFilter(event.target.value)
  }

  const resolveNewPerson = (person) => {
    setSuccessMessage(`Added ${person.name}`)
    setTimeout(() => {
      setSuccessMessage(null)
    }, 5000)
    setNewName('')
    setNewPhone('')
  }

  const handleError = (errorMessage) => {
    setErrorMessage(errorMessage)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.some(person => person.name === newName)) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const person = persons.find(person => person.name === newName)
        const changedPerson = { ...person, number: newPhone }
        personService
          .update(person.id, changedPerson)
          .then(updatedPerson => {
            // Update state with updated person, keep all other entries the same
            setPersons(persons.map(person => person.id === updatedPerson.id ? updatedPerson : person))
            resolveNewPerson(updatedPerson)
          })
          .catch(error => {
            handleError('failed to update person')
          })
      }
    } else {
      const person = {
        name: newName,
        number: newPhone
      }

      personService
        .create(person)
        .then(personResponse => {
          setPersons(persons.concat(personResponse))
          resolveNewPerson(personResponse)
        })
        .catch(error => {
          handleError('failed to create person')
        })
    }
  }

  const deletePerson = (personToDelete) => {
    if (window.confirm(`Delete ${personToDelete.name} ?`)) {
      personService
        .remove(personToDelete.id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== personToDelete.id))
        })
        .catch(error => {
          handleError('failed to delete person')
        })
    }
  }

  const personsToShow = nameFilter === ''
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(nameFilter))

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={successMessage} className='success' />
      <Notification message={errorMessage} className='error' />
      <Filter nameFilter={nameFilter} handleNameFilter={handleNameFilter} />
      <h3>Add a new</h3>
      <PersonForm addPerson={addPerson} newName={newName} handleName={handleName} newPhone={newPhone} handlePhone={handlePhone} />
      <h3>Numbers</h3>
      <Persons personsToShow={personsToShow} deletePerson={deletePerson} />
    </div>
  )
}

export default App