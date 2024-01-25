// GLOBAL VARIABLES
const searchBar = document.querySelector('#citySearch')
const measureSystemToggle = document.querySelector('#toggleMeasuringSystem')
let isInMetric = false


// FUNCTIONS
const toggleMeasuringSystem = () => {
    isInMetric = !isInMetric
    isInMetric ? measureSystemToggle.innerHTML = 'Metric' : measureSystemToggle.innerHTML = 'Imperial'
    document.querySelectorAll('.temperatureUnit').forEach(unit => unit.innerHTML = isInMetric ? 'Cº' : 'Fº')
    displayResult()
}

const displayResult = async () => {
    //event.preventDefault()
    if (searchBar.value != '') {

        const citySearchInfo = await axios.get(`http://api.weatherapi.com/v1/current.json?key=b62b4291b57b4ce69e2141104242501&q=${searchBar.value}&aqi=no`).catch(e => e)
        
        document.querySelector('#city').innerHTML = citySearchInfo.data.location.name
        document.querySelector('#region').innerHTML = citySearchInfo.data.location.region
        document.querySelector('#country').innerHTML = citySearchInfo.data.location.country
        document.querySelector('#currentStatusIcon').setAttribute('src', citySearchInfo.data.current.condition.icon)
        document.querySelector('#currentTemperature').innerHTML = isInMetric ? citySearchInfo.data.current.temp_c : citySearchInfo.data.current.temp_f
        document.querySelector('#currentFeelsLike').innerHTML = isInMetric ? citySearchInfo.data.current.feelslike_c : citySearchInfo.data.current.feelslike_f
        document.querySelector('#currentStatus').innerHTML = `Current Status: ${citySearchInfo.data.current.condition.text}`
        document.querySelector('#localTime').innerHTML = `Local Time: ${citySearchInfo.data.location.localtime}`
        citySearchInfo.data.current.is_day === 0 ? document.querySelector('body').classList.toggle('isNight', true) : document.querySelector('body').classList.toggle('isNight', false)

        console.log(citySearchInfo)
    }
}

// EVENT LISTENERS
measureSystemToggle.addEventListener('click', toggleMeasuringSystem)
searchBar.addEventListener('change', displayResult)
