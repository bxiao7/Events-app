let allData = [];

fetchData();

function fetchData() {
  fetch(
    "https://script.google.com/macros/s/AKfycbw_qC2Wvw1j4vpIJ6Te0q8ljptt6kHNIW8WKF3ScPs-p5vx5VG-Zxs-H1etxaQsAy0A/exec?path=requests"
  )
    .then((response) => response.json())
    .then((data) => {
      allData = data.filter((item) => item.Display === true); // Filter for Display: true
      displayData(allData); // Display only filtered data
    })
    .catch((error) => {
      document.getElementById("api-data").innerText = "Error: " + error;
    });
}

function displayData(data) {
  document.getElementById("api-data").innerText = JSON.stringify(data, null, 2);
}
