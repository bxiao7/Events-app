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

function reformatDate(dateStr) {
  const dateObj = new Date(dateStr);
  const options = { year: "numeric", month: "long", day: "numeric" };
  return dateObj.toLocaleDateString("en-US", options);
}

function reformatTime(timeStr) {
  const dateObj = new Date(timeStr);
  const options = { hour: "numeric", minute: "numeric", hour12: true };
  return dateObj.toLocaleTimeString("en-US", options);
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

    const formattedDate = reformatDate(item.date); // Reformat date
    const formattedTime = reformatTime(item.start); // Reformat time

    itemDiv.innerHTML = `
      <p class="cardTitle">${item.title}</p>
      <p>Date: ${formattedDate}</p>
      <p>Time: ${formattedTime}</p>
      <p>Location: ${item.location}</p>
      <button class="moreButton" onclick="populateAndShowModal(${JSON.stringify(
        item
      )
        .split('"')
        .join("&quot;")})">More Info</button>
    `;

    container.appendChild(itemDiv);
  });
}

function populateAndShowModal(item) {
  const modalBody = document.getElementById("modal-body");

  const formattedDate = reformatDate(item.date); // Reformat date for the modal
  const formattedStart = reformatTime(item.start); // Reformat time for the modal
  const formattedEnd = reformatTime(item.end); // Reformat time for the modal

  modalBody.innerHTML = `
    <h2>${item.title}</h2>
    <p>Date: ${formattedDate}</p>
    <p>Time: ${formattedStart} to ${formattedEnd} </p>
    <p>Location: ${item.location}</p>
    <p>Description: ${item.description}</p>
  `;

  showModal("event-modal");
}
