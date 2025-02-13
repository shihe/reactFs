const Filter = ({ nameFilter, handleNameFilter }) => {
  return (
    <div>
      filter shown with<input id='nameFilter' value={nameFilter} onChange={handleNameFilter}/>
    </div>
  )
}

export default Filter