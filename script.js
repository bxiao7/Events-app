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
  const container = document.getElementById("api-data");
  container.innerHTML = ""; // Clear existing content

  // Check if data is not empty
  if (data.length === 0) {
    container.innerHTML = "<p>No data to display.</p>";
    return;
  }

  // Create and append elements for each item in the data
  data.forEach((item) => {
    console.log(item.Date);
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("event"); // Optional: for styling

    // Assuming 'item' has properties you want to display, for example, 'name' and 'value'
    itemDiv.innerHTML = `
          <p>Name: ${item.title}</p>
     
          <p>Date: ${item.date}</p>
          <p>Time: ${item.start}</p>
          <p>Description: ${item.description}</p>
        
      `;

    container.appendChild(itemDiv);
  });
}
