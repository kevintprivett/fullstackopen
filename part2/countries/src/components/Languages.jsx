const Languages = ({ country }) => {
  return (
    <>
      <h4>languages:</h4>
      {Object.entries(country.languages).map( language =>
        <li key={language[0]}>{language[1]}</li>
      )}
      <br />
    </>
  )
}

export default Languages