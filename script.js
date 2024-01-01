let allData = [];

fetchData();

function fetchData() {
  fetch(
    "https://script.google.com/macros/s/AKfycbw_qC2Wvw1j4vpIJ6Te0q8ljptt6kHNIW8WKF3ScPs-p5vx5VG-Zxs-H1etxaQsAy0A/exec?path=requests"
  )
    .then((response) => response.json())
    .then((data) => {
      allData = data.filter((item) => item.Display === true);
      displayData(allData);
    })
    .catch((error) => {
      document.getElementById("api-data").innerText = "Error: " + error;
    });
}

function displayData(data) {
  const container = document.getElementById("api-data");
  container.innerHTML = "";

  if (data.length === 0) {
    container.innerHTML = "<p>No data to display.</p>";
    return;
  }

  data.forEach((item) => {
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("event");

    itemDiv.innerHTML = `
      <p>Name: ${item.title}</p>
      <p>Date: ${item.date}</p>
      <p>Time: ${item.start}</p>
      <p>Location: ${item.location}</p>
      <button onclick="populateAndShowModal(${JSON.stringify(item)
        .split('"')
        .join("&quot;")})">More Info</button>
    `;

    container.appendChild(itemDiv);
  });
}

function populateAndShowModal(item) {
  const modalBody = document.getElementById("modal-body");

  modalBody.innerHTML = `
    <h2>${item.title}</h2>
    <p>Date: ${item.date}</p>
    <p>Time: ${item.start}</p>
    <p>Location: ${item.location}</p>
    <p>Description: ${item.description}</p>
  `;

  showModal("event-modal");
}
