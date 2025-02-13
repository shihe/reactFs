const PersonForm = ({ addPerson, newName, handleName, newPhone, handlePhone }) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input id='name' autoComplete='off' value={newName} onChange={handleName} />
      </div>
      <div>
        number: <input id='phone' autoComplete='off' value={newPhone} onChange={handlePhone} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm