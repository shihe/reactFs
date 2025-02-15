const CountryDetails = ({ country }) => {
  if (country === null) {
    return null
  }

  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>capital {country.capital[0]}</div>
      <div>area {country.area}</div>
      <h2>languages:</h2>
      <ul>
        {Object.values(country.languages).map(language =>
          <li key={language}>{language}</li>
        )}
      </ul>
      <img src={country.flags.png} width='100' />
      <h2>Weather in {country.capital[0]}</h2>
      <div>temperature {country.weather.temp_c} Celcius</div>
      <img src={country.weather.condition.icon} width='50' />
      <div>wind {country.weather.wind_kph} km/h</div>
    </div>
  )
}

const Countries = ({ countriesToShow, countryDetailsToShow, showCountryDetails }) => {
  if (countriesToShow.length === 1) {
    showCountryDetails(countriesToShow[0])
    return <CountryDetails country={countryDetailsToShow} />
  } else if (countriesToShow.length <= 10) {
    return (
      <div>
        <CountryDetails country={countryDetailsToShow} />
        <br />
        {countriesToShow.map(country => <Country key={country.cca2} country={country} showCountryDetails={showCountryDetails} />)}
      </div>
    )
  } else {
    return (
      <div>Too many matches, specify another filter</div>
    )
  }
}

const Country = ({ country, showCountryDetails }) => {
  return (
    <div>
      {country.name.common} <button onClick={() => showCountryDetails(country)}>Show</button>
    </div>
  )
}

export default Countries