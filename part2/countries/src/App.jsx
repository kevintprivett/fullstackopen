import { useEffect } from 'react'
import { useState } from 'react'

import Countries from './components/Countries'
import countriesService from './services/countriesService'
import Filter from './components/Filter'

function App() {
  const [countries, setCountries] = useState([])
  const [showCountryNames, setShowCountryNames] = useState(false)
  const [filterName, setFilterName] = useState('')

  useEffect(() => {
    countriesService
      .getAll()
      .then( countries => {
        setCountries(countries)
        setShowCountryNames(filteredCountries(filterName).length <= 10)
      })
  }, [])

  const handleFilterNameChange = (event) => {
    const newFilterName = event.target.value
    setFilterName(newFilterName)
    setShowCountryNames(filteredCountries(newFilterName).length <= 10)
  }

  const filteredCountries = (filterName) => {
    return (
      filterName === ""
      ? countries
      : countries.filter(country => country.name.common.startsWith(filterName))
    )
  }

  return (
    <>
      <Filter 
        filterName={filterName} 
        handleFilterNameChange={handleFilterNameChange}
      />

      <Countries 
        countries={filteredCountries(filterName)}
        showCountryNames={showCountryNames}
        filterName={filterName}
        setFilterName={setFilterName}
      />
    </>
  )
}

export default App
