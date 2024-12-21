import axios from 'axios' 


const Key =  "c9ff70271cd0ffd96740b1d948387bee"
const location = {
    lat: 37.7749,
    lng: -122.4194
}
export const getWeather = async () =>{
    response = await axios.get('http://api.weatherapi.com/v1/current.json?key=e20ad1ccb2c44c78a91225542240312&q=London')
    console.log(response.data.current.condition.text)
    return response
    
}