/* Global Variables */

let baseURL = 'https://api.openweathermap.org/data/2.5/weather';
const apiKey = '3b2d73cfc21e91ace5e23ac4f09c8d35';

// Create a new date instance dynamically with JS
let dateTime = new Date();

// In JS, January is 0
let newDate = `${dateTime.getFullYear()}-${String(dateTime.getMonth()+1).padStart(2, '0')}-${dateTime.getDate()}`

const getWeather = async(baseURL, zipCode, apiKey) => {
  const res = await fetch(`${baseURL}?q=${zipCode}&appid=${apiKey}&units=imperial`);
  try {
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(`error message: ${error}`);
  }
}

document.querySelector('.generate').addEventListener('click', recordData);

function recordData(e) {
  const zipCode = document.getElementById('zip').value;
  const feelings = document.getElementById('feelings').value;
  getWeather(baseURL, zipCode, apiKey)
    .then( (data) => {
      // Add data by POST request
      postData('/add', {
        temp: data.main.temp,
        date: newDate,
        content: feelings
      })
    })
    .then( () => updateUI() )
    .catch( (error) => {
      console.log(error);
      alert('Something went wrong.');
    });
}

const postData = async(url='', data={}) => {

  const res = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });

  try {
    const newData = await res.json();
    return newData;
  } catch (error) {
    console.log(error);
  }
};

const updateUI = async() => {

  const request = await fetch('/all');
  try {
    const allData = await request.json();

    if (allData.date !== undefined && allData.temp !== undefined && allData.content !== undefined) {
      document.getElementById('date').innerHTML = `Date: ${allData.date}`;
      document.getElementById('temp').innerHTML = `Temp (°F): ${allData.temp}`;
      document.getElementById('content').innerHTML = `Content: ${allData.content}`;
    }
  } catch (error) {
    console.log(error);
  }
}