let allData = {
  events: [],
  announcements: []
};
let currentPage = 'events';
let dataCache = {
  events: null,
  announcements: null
};

fetchData();

function fetchData() {
  if (currentPage === 'events') {
    fetchEvents();
  } else {
    fetchAnnouncements();
  }
}

function fetchEvents() {
  if (dataCache.events) {
    displayData(dataCache.events, 'events');
    return;
  }

  document.getElementById("api-data").innerHTML = '<div class="lds-hourglass"></div>';

  fetch(
    "https://script.google.com/macros/s/AKfycbw_qC2Wvw1j4vpIJ6Te0q8ljptt6kHNIW8WKF3ScPs-p5vx5VG-Zxs-H1etxaQsAy0A/exec?path=requests"
  )
    .then((response) => response.json())
    .then((data) => {
      dataCache.events = data.filter((item) => item.Display === true);
      displayData(dataCache.events, 'events');
    })
    .catch((error) => {
      document.getElementById("api-data").innerText = "Error: " + error;
    });
}

function fetchAnnouncements() {
  if (dataCache.announcements) {
    displayData(dataCache.announcements, 'announcements');
    return;
  }

  document.getElementById("api-data").innerHTML = '<div class="lds-hourglass"></div>';

  fetch(
    "https://script.google.com/macros/s/AKfycbwYour_Google_Script_ID_Here/exec?path=announcements"
  )
    .then((response) => response.json())
    .then((data) => {
      dataCache.announcements = data.filter((item) => item.Display === true);
      displayData(dataCache.announcements, 'announcements');
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

function displayData(data, type) {
  const container = document.getElementById("api-data");
  container.innerHTML = "";

  if (data.length === 0) {
    container.innerHTML = `<p>No ${type} to display.</p>`;
    return;
  }

  data.forEach((item) => {
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("event");

    const formattedDate = reformatDate(item.date);

    let itemContent = `
      <p class="cardTitle">${item.title}</p>
      <p>Date: ${formattedDate}</p>
    `;

    if (type === 'events') {
      const formattedTime = reformatTime(item.start);
      itemContent += `
        <p>Time: ${formattedTime}</p>
        <p>Location: ${item.location}</p>
      `;
    }

    itemContent += `
      <button class="moreButton" onclick="populateAndShowModal(${JSON.stringify(item).split('"').join("&quot;")}, '${type}')">
        ${type === 'events' ? 'More Info' : 'Read More'}
      </button>
    `;

    itemDiv.innerHTML = itemContent;
    container.appendChild(itemDiv);
  });
}

function populateAndShowModal(item, type) {
  const modalBody = document.getElementById("modal-body");

  const formattedDate = reformatDate(item.date);

  let modalContent = `
    <h2>${item.title}</h2>
    <p>Date: ${formattedDate}</p>
  `;

  if (type === 'events') {
    const formattedStart = reformatTime(item.start);
    const formattedEnd = reformatTime(item.end);
    modalContent += `
      <p>Time: ${formattedStart} to ${formattedEnd}</p>
      <p>Location: ${item.location}</p>
    `;
  }

  modalContent += `<p>${type === 'events' ? 'Description' : 'Content'}: ${item.description || item.content}</p>`;

  modalBody.innerHTML = modalContent;
  showModal("event-modal");
}

function showModal(modalId) {
  document.getElementById(modalId).style.display = "block";
}

function closeModal(modalId) {
  document.getElementById(modalId).style.display = "none";
}

window.onclick = function (event) {
  if (event.target.className === "modal") {
    event.target.style.display = "none";
  }
};

// Add event listeners for the dropdown menu
document.getElementById('events-link').addEventListener('click', function(e) {
  e.preventDefault();
  if (currentPage !== 'events') {
    currentPage = 'events';
    fetchData();
  }
  updatePageTitle('Upcoming Events');
});

document.getElementById('announcements-link').addEventListener('click', function(e) {
  e.preventDefault();
  if (currentPage !== 'announcements') {
    currentPage = 'announcements';
    fetchData();
  }
  updatePageTitle('Announcements');
});

function updatePageTitle(title) {
  document.getElementById('page-title').textContent = title;
}

