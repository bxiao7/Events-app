let allData = [];
let currentPage = 'events';
let dataCache = {
  events: null,
  announcements: null
};

fetchData();

function fetchData() {
  if (dataCache.events) {
    displayData(dataCache.events);
    return;
  }

  document.getElementById("api-data").innerHTML = '<div class="lds-hourglass"></div>';

  fetch(
    "https://script.google.com/macros/s/AKfycbw_qC2Wvw1j4vpIJ6Te0q8ljptt6kHNIW8WKF3ScPs-p5vx5VG-Zxs-H1etxaQsAy0A/exec?path=requests"
  )
    .then((response) => response.json())
    .then((data) => {
      dataCache.events = data.filter((item) => item.Display === true);
      displayData(dataCache.events);
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

    const formattedDate = reformatDate(item.date);
    const formattedTime = reformatTime(item.start);

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

  const formattedDate = reformatDate(item.date);
  const formattedStart = reformatTime(item.start);
  const formattedEnd = reformatTime(item.end);

  modalBody.innerHTML = `
    <h2>${item.title}</h2>
    <p>Date: ${formattedDate}</p>
    <p>Time: ${formattedStart} to ${formattedEnd} </p>
    <p>Location: ${item.location}</p>
    <p>Description: ${item.description}</p>
  `;

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
    fetchAnnouncements();
  }
  updatePageTitle('Announcements');
});

function fetchAnnouncements() {
  if (dataCache.announcements) {
    displayAnnouncements(dataCache.announcements);
    return;
  }

  document.getElementById("api-data").innerHTML = '<div class="lds-hourglass"></div>';

  // Simulating fetching announcements
  setTimeout(() => {
    dataCache.announcements = [
      { id: 1, title: "New Course Offerings", date: "2023-07-01", content: "We are excited to announce new courses for the upcoming semester." },
      { id: 2, title: "Campus Renovation Update", date: "2023-07-15", content: "The library renovation is progressing well." },
      { id: 3, title: "Guest Lecture Series", date: "2023-08-01", content: "We are honored to host Dr. Jane Smith for a series of guest lectures." },
    ];
    displayAnnouncements(dataCache.announcements);
  }, 300); // Simulating a short delay
}

function displayAnnouncements(announcements) {
  const container = document.getElementById("api-data");
  container.innerHTML = "";

  if (announcements.length === 0) {
    container.innerHTML = "<p>No announcements to display.</p>";
    return;
  }

  announcements.forEach((item) => {
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("event");

    const formattedDate = reformatDate(item.date);

    itemDiv.innerHTML = `
      <p class="cardTitle">${item.title}</p>
      <p>Date: ${formattedDate}</p>
      <button class="moreButton" onclick="showAnnouncementModal(${JSON.stringify(item).split('"').join("&quot;")})">Read More</button>
    `;

    container.appendChild(itemDiv);
  });
}

function showAnnouncementModal(announcement) {
  const modalBody = document.getElementById("modal-body");

  const formattedDate = reformatDate(announcement.date);

  modalBody.innerHTML = `
    <h2>${announcement.title}</h2>
    <p>Date: ${formattedDate}</p>
    <p>${announcement.content}</p>
  `;

  showModal("event-modal");
}

function updatePageTitle(title) {
  document.getElementById('page-title').textContent = title;
}

