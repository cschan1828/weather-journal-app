/* Global Variables */

let baseURL = 'https://api.openweathermap.org/data/2.5/weather';
const apiKey = '3b2d73cfc21e91ace5e23ac4f09c8d35';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

const getWeather = async(baseURL, zipCode, apiKey) => {
  const res = await fetch(`${baseURL}?q=${zipCode}&appid=${apiKey}`);
  try {
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(`error message: ${error}`);
  }
}

document.getElementById('generate').addEventListener('click', recordData);

function recordData(e) {
  const zipCode = document.getElementById('zip').value;
  const feelings = document.getElementById('feelings').value;
  getWeather(baseURL, zipCode, apiKey)
    .then( (data) => {
      console.log(data);
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
  console.log(`postData ${JSON.stringify(data)}`);
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
  console.log('updating');
  const request = await fetch('/all');
  try {
    const allData = await request.json();

    // Random pickup a record
    sampleData = allData[Math.floor(Math.random() * allData.length)];
    console.log(sampleData)

    if (sampleData.date !== undefined && sampleData.temp !== undefined && sampleData.content !== undefined) {
      console.log('')
      document.getElementById('date').innerHTML = sampleData.date;
      document.getElementById('temp').innerHTML = sampleData.temp;
      document.getElementById('content').innerHTML = sampleData.content;
    }
  } catch (error) {
    console.log(error);
  }
}