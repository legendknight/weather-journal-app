// Global Variables 
const link = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const key = '&appid=5beb43e13dc3fa8be428191e6e50a00c';
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

// event listener for id: generate - callback function execute click
document.getElementById('generate').addEventListener('click', click);
//click executer function
function click(e) {
  const zipC = document.getElementById('zip').value;
  const userData = document.getElementById('feelings').value;
  try {
    // call update for user entered data to update browser content
    api(link, zipC, key)
      .then(function (Data) {
        postData('/add', {
          date: newDate,
          temp: Data.main.temp,
          userData
        })
      }).then(function (recData) {
        sendtobr()
      })
  } catch (error) {
    console.log("error", error);
  }
}
// async function - fetch to GET request API.
const sendtobr = async () => {
  const req = await fetch('/value');
  try {
    //retrive api values
    const val = await req.json()
    document.getElementById('date').innerHTML = val.date;
    document.getElementById('temp').innerHTML = val.temp;
    document.getElementById('content').innerHTML = val.content;
  } catch (error) {
    console.log("error", error);
  }
}
// callback function async GET request : base url - user zip -personal API 
const api = async (link, zipC, key) => {
  const res = await fetch(link + zipC + key);
  try {
    const Data = await res.json();
    return Data;
  } catch (error) {
    console.log("error", error);
  }
}

// POST request - API Data  temperature -date -user response
const postData = async (url = '', data = {}) => {
  console.log(data);
  try {
    const req = await fetch(url, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data) // converts data  value to string,
    });

  } catch (error) {
    console.log(error);
  }
};