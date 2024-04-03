import axios from 'axios'

export const fetchCountryData = async () => {
  try {
    const response = await axios.get('https://restcountries.com/v3.1/all')
    return response.data.map(country => ({
      label: country.name.common,
      value:
        country.idd.root +
        (country.idd.suffixes ? country.idd.suffixes[0] : ''),
    }))
  } catch (error) {
    console.error('Error fetching country data:', error)
    return []
  }
}
