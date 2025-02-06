import Country from './Country'
import ShowButton from './ShowButton'

const Countries = ( { countries, showCountryNames, filterName, setFilterName }) => {
  if (filterName === '') {
    return (<></>)
  }

  if (countries.length === 1) {
    return (
      <div>
        <Country
          country={countries[0]}
          isDetailed={true}
        />
      </div>
    )
  }

  if (showCountryNames) {
    return (
      <div>
        {countries.map(country =>
          <div key={country.cca2}>
            <Country 
              country={country}
              isDetailed={false}
            />
            <ShowButton country={country} setFilterName={setFilterName} />
          </div>
        )}
      </div>
    )
  }

  return (
    <div>
      Too many matches, specify another filter
    </div>
  )
}

export default Countries