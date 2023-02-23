"use strict";

const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");

/////////////////////////////////

// Render Country
const renderCountry = function (data, className = "") {
  const html = `
  <article class="country ${className}">
  <img class="country__img" src="${data.flags.png}" />
  <div class="country__data">
    <h3 class="country__name">${data.name.common}</h3>
    <h4 class="country__region">${data.region}</h4>
    <p class="country__row"><span>👫</span>${(
      +data.population / 1000000
    ).toFixed(2)}</p>
    <p class="country__row"><span>🗣️</span>${
      Object.values(data.languages)[0]
    }</p>
    <p class="country__row"><span>💰</span>${
      Object.values(Object.values(data.currencies)[0])[0]
    }</p>
  </div>
</article>`;

  countriesContainer.insertAdjacentHTML("beforeend", html);
  // countriesContainer.style.opacity = 1;
};

// Render Error
const renderError = function (msg) {
  countriesContainer.insertAdjacentText("beforeend", msg);
  // countriesContainer.style.opacity = 1;
};

// Get JSON
const getJSON = function (url, errorMsg = "Something Went Wrong !!") {
  return fetch(url).then((response) => {
    if (!response.ok) throw new Error(`${errorMsg} ${response.status})`);

    return response.json(); // returns a callback
  });
};

///////////////////////////////////////

// const getCountryData = function (country) {
//   const request = new XMLHttpRequest();
//   request.open("GET", `https://restcountries.com/v3.1/name/${country}`);
//   request.send();

//   request.addEventListener("load", function () {
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);
//     const html = `
//   <article class="country">
//   <img class="country__img" src="${data.flags.png}" />
//   <div class="country__data">
//     <h3 class="country__name">${data.name.common}</h3>
//     <h4 class="country__region">${data.region}</h4>
//     <p class="country__row"><span>👫</span>${(
//       +data.population / 1000000
//     ).toFixed(2)}</p>
//     <p class="country__row"><span>🗣️</span>${
//       Object.values(data.languages)[0]
//     }</p>
//     <p class="country__row"><span>💰</span>${
//       Object.values(Object.values(data.currencies)[0])[0]
//     }</p>
//   </div>
// </article>`;

//     countriesContainer.insertAdjacentHTML("beforeend", html);
//     countriesContainer.style.opacity = 1;
//   });
// };

// getCountryData("india");
// getCountryData("usa");
// getCountryData("portugal");
// getCountryData("germany");

/////////////////////////////////

// const getCountryAndNeighbour = function (country) {
//   // AJAX call country 1
//   const request = new XMLHttpRequest();
//   request.open("GET", `https://restcountries.com/v3.1/name/${country}`);
//   request.send();

//   request.addEventListener("load", function () {
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);

//     // Render country 1
//     renderCountry(data);

//     // Get neighbour Country (2)
//     const [neighbour] = data.borders;

//     // AJAX call country 2
//     const request2 = new XMLHttpRequest();
//     request2.open("GET", `https://restcountries.com/v3.1/alpha/${neighbour}`);
//     request2.send();

//     request2.addEventListener("load", function () {
//       const [data2] = JSON.parse(this.responseText);
//       console.log(data2);

//       renderCountry(data2, "neighbour");
//     });

//     if (!neighbour) return;
//   });
// };

// getCountryAndNeighbour("usa");

//////////////////////////////////////

// Handing Promises
// const getCountryData = function (country) {
//   const request = fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(function (response) {
//       console.log(response);
//       return response.json(); // returns a callback
//     })
//     .then(function (data) {
//       console.log(data);
//       renderCountry(data[0]);
//     });
// };

// getCountryData("india");

//////////////////////////////////////

// Chaining Promises
// const getCountryData = function (country) {
//   // Country 1
//   const request = fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then((response) => {
//       return response.json(); // returns a callback
//     })
//     .then((data) => {
//       renderCountry(data[0]);
//       const neighbour = data[0].borders[0];
//       if (!neighbour) return;

//       // Country 2
//       return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
//     })
//     .then((response) => {
//       return response.json();
//     })
//     .then((data) => {
//       renderCountry(data[0], "neighbour");
//     });
// };

// getCountryData("india");

///////////////////////////////////////////////

// Handling Promise Rejections
// const getCountryData = function (country) {
//   // Country 1
//   const request = fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then((response) => {
//       return response.json(); // returns a callback
//     })
//     .then((data) => {
//       renderCountry(data[0]);
//       const neighbour = data[0].borders[0];
//       if (!neighbour) return;

//       // Country 2
//       return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
//     })
//     .then((response) => {
//       return response.json();
//     })
//     .then((data) => {
//       renderCountry(data[0], "neighbour");
//     })
//     .catch((e) => {
//       console.error(`${e}🎇🎇🎇`);
//       renderError(`Something went Wrong 🎇🎇🎇 ${e.message}.Try Again !!`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

// btn.addEventListener("click", function () {
//   getCountryData("india");
// });

/////////////////////////////////////////////////

// Throwing Errors Manually
// const getCountryData = function (country) {
//   // Country 1
//   getJSON(`https://restcountries.com/v3.1/name/${country}`, "Country not Found")
//     .then((data) => {
//       renderCountry(data[0]);
//       const neighbour = data[0].borders[0];

//       if (!neighbour) {
//         throw new Error("No neighbour!!");
//       }

//       // Country 2
//       return getJSON(
//         `https://restcountries.com/v3.1/alpha/${neighbour}`,
//         "Country not Found"
//       );
//     })
//     .then((data) => {
//       renderCountry(data[0], "neighbour");
//     })
//     .catch((e) => {
//       console.error(`${e}🎇🎇🎇`);
//       renderError(`Something went Wrong 🎇🎇🎇 ${e.message}.Try Again !!`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

// btn.addEventListener("click", function () {
//   getCountryData("portugal");
// });

///////////////////////////////////////////////

// Building a simple Promise
// const lotteryPromise = new Promise(function (resolve, reject) {
//   console.log("Lottery Draw is happening");
//   setTimeout(() => {
//     if (Math.random() >= 0.5) {
//       resolve("YOU WIN !!!");
//     } else {
//       reject(new Error("YOU LOSE !!"));
//     }
//   }, 2000);
// })
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((e) => {
//     console.error(e);
//   });

// // Also we can use :
// Promise.resolve("abc").then((x) => {
//   console.log(x);
// });

// Promise.reject(new Error("Problem !!")).catch((x) => {
//   console.error(x);
// });

const imgContainer = document.querySelector(".images");

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement("img");
    img.src = imgPath;

    img.addEventListener("load", function () {
      imgContainer.append(img);
      resolve(img);
    });

    img.addEventListener("error", function () {
      reject(new Error("Image not Found !!"));
    });
  });
};

let currentImg;

createImage("/img/img-1.jpg")
  .then((img) => {
    currentImg = img;
    console.log("Img 1 loaded");
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = "none";
    return createImage("/img/img-2.jpg");
  })
  .then((img) => {
    currentImg = img;
    console.log("Img 2 loaded");
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = "none";
  })
  .catch((err) => {
    console.error(err);
  });
