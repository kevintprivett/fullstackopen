const Filter = ({ filterName, handleFilterNameChange}) => {
  
  return (
    <form>
      <div>
        filter shown with <input
          value={filterName}
          onChange={handleFilterNameChange}
        />
      </div>
    </form>
  )
}

export default Filter