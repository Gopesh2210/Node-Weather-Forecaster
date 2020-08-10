console.log('LOADED JS FILE!')

const weatherform = document.querySelector('form')
const searchLocation = document.getElementById('inputLocation')
const locationName = document.querySelector('#outputLocation')
const weather = document.querySelector('#outputWeather')


weatherform.addEventListener('submit',(event) => {

    event.preventDefault()
    locationName.textContent = 'Loading...'
    weather.textContent = ''

    // console.log('testing',searchLocation.value)

    fetch('http://localhost:3000/weather?address='+searchLocation.value).then(res=>{
    res.json().then(data=>{
        if(data.error){
            locationName.textContent = data.error
            // console.log(data.error)
        }else{
            locationName.textContent = data.location
            weather.textContent = data.weather
            // console.log(data)
        }
    })
})
})

