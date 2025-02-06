import { useState } from "react"

import Languages from "./Languages"
import Weather from "./Weather"

const Country = ({ country, isDetailed }) => {

  if (isDetailed) {
    return(
      <div>

        <h2>{country.name.common}</h2>

        <div>capital {country.capital[0]}</div>
        <div>area {country.area}</div>

        <Languages country={country} />

        <img src={country.flags.png} alt={country.flags.alt} width="150"/>

        <Weather country={country} />
      
      </div>
    )
  }

  return (
    <>{country.name.common}</>
  )
}

export default Country