import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Countries from './components/Countries'
import countryService from './services/countries'

const App = () => {
  const [countries, setCountries] = useState([])
  const [nameFilter, setNameFilter] = useState('')
  const [countryDetailsToShow, setCountryDetailsToShow] = useState(null)

  // Db fetch
  useEffect(() => {
    countryService
      .getAll()
      .then(countries => {
        setCountries(countries)
      })
      .catch(() => {
        console.log('failed to fetch countries')
      })
  }, [])

  // Handlers
  const handleNameFilter = (event) => {
    setNameFilter(event.target.value)
    setCountryDetailsToShow(null)
  }

  const countriesToShow = nameFilter === ''
    ? countries
    : countries
        .filter(country => country.name.common.toLowerCase().includes(nameFilter))

  const showCountryDetails = (country) => {
    countryService
      .getWeather(country.capital[0])
      .then(weather => {
        const countryWithWeather = {
          ...country,
          weather: weather.current
        }
        setCountryDetailsToShow(countryWithWeather)
      })
  }

  return (
    <div>
      <Filter nameFilter={nameFilter} handleNameFilter={handleNameFilter} />
      <Countries countriesToShow={countriesToShow} countryDetailsToShow={countryDetailsToShow} showCountryDetails={showCountryDetails} />
    </div>
  )
}

export default App