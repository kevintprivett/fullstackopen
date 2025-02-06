const Filter = ({ filterName, handleFilterNameChange }) => {
  return (
    <form>
      <div>
        find countries <input
          value={filterName}
          onChange={handleFilterNameChange}
        />
      </div>
    </form>
  )
}

export default Filter