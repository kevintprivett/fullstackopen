const ShowButton = ({ country, setFilterName }) => {
  const handleShowButton = () => {
    setFilterName(country.name.common)
  }

  return (
    <>
      <button type="button" onClick={handleShowButton}>show</button>
    </>
  )
}

export default ShowButton