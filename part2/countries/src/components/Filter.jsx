const Filter = ({ nameFilter, handleNameFilter }) => {
  return (
    <div>
      find countries <input id='nameFilter' value={nameFilter} onChange={handleNameFilter}/>
    </div>
  )
}

export default Filter