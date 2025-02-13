const Persons = ({ personsToShow }) => {
  return (
    <div>
      {personsToShow.map(person => <Person key={person.name} person={person} />)}
    </div>
  )
}

const Person = ({ person }) => {
  return (
    <div>{person.name} {person.phone}</div>
  )
}

export default Persons