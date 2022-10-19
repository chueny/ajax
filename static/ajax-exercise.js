'use strict';

// PART 1: SHOW A FORTUNE

function showFortune(evt) {
  // TODO: get the fortune and show it in the #fortune-text div
  fetch('/fortune')
  .then((hey) => hey.text())
  .then((responseData) => {
    document.querySelector('#fortune-text').innerHTML= responseData;
    // console.log("log", document.querySelector('#fortune-text'));
  });
  
}

document.querySelector('#get-fortune-button').addEventListener('click', showFortune);

// PART 2: SHOW WEATHER

function showWeather(evt) {
  evt.preventDefault();

  const zipcode = document.querySelector('#zipcode-field').value;
  const url = `/weather.json?${zipcode}`
  

  fetch(url)
  .then((response) => response.json())
  .then((jsonData) => {
    document.querySelector('#weather-info').innerHTML = jsonData.forecast;
    
  });


}

document.querySelector('#weather-form').addEventListener('submit', showWeather);

// PART 3: ORDER MELONS

function orderMelons(evt) {
  evt.preventDefault();

  //make fetch request to the route
  const formInputs = {
    qty: document.querySelector("#qty-field").value,
    melon_type: document.querySelector('#melon-type-field').value,
  };
  //use data from the form
  //teak returne result and extar the code and message

  const params = {
    method: 'POST',
    body: JSON.stringify(formInputs),
    headers: {
      'Content-Type': 'application/json',
    }
  }

  fetch('/order-melons.json', params)
  .then((response) => response.json())
  .then((responseJson) => { 
    if(responseJson.code === "OK"){
      document.querySelector('#order-status').classList.remove('order-error');
      document.querySelector('#order-status').innerHTML = responseJson.msg;
    } else{
      document.querySelector('#order-status').classList.add('order-error');
      document.querySelector('#order-status').innerHTML = responseJson.msg;
    }
  })
  
}


document.querySelector('#order-form').addEventListener('submit', orderMelons);


document.querySelector('#get-dog-image').addEventListener('click', () =>{
  const url = `https://dog.ceo/api/breeds/image/random`;

  fetch(url)
  .then((response) => response.json())
  .then((jsonData) => {
    //console.log("dog", jsonData);
    const imageURL = jsonData.message;
    document
    .querySelector('#dog-image')
    .insertAdjacentHTML('beforeend', `<div><img src=${imageURL}></div>`);
  });
});