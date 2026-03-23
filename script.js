console.log("JavaScript is connected and running.");

// Create the map and set its initial view
const map = L.map('map').setView([53.4084, -2.9916], 13); // Liverpool coordinates

//Add a global variable to store the current route line
let currentRouteLine = null;

// Add the OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Add a marker to confirm it's working
//L.marker([53.4084, -2.9916]).addTo(map)
//  .bindPopup('Liverpool city centre')
//  .openPopup();

// JavaScript function to call Nominatim
async function geocode(query) {
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`;

  const response = await fetch(url);
  const data = await response.json();

  if (data.length === 0) {
    throw new Error("Location not found");
  }

  return {
    lat: parseFloat(data[0].lat),
    lon: parseFloat(data[0].lon)
  };
}

// Handle button click
document.getElementById('routeBtn').addEventListener('click', async () => {
  const startText = document.getElementById('start').value;
  const endText = document.getElementById('end').value;

  if (!startText || !endText) {
    alert("Please enter both start and end locations.");
    return;
  }

  try {
    const startCoords = await geocode(startText);
    const endCoords = await geocode(endText);

    console.log("Start coordinates:", startCoords);
    console.log("End coordinates:", endCoords);

    // Add markers
    L.marker([startCoords.lat, startCoords.lon]).addTo(map)
      .bindPopup(`Start: ${startText}`);

    L.marker([endCoords.lat, endCoords.lon]).addTo(map)
      .bindPopup(`End: ${endText}`);

    // Fit map to both points
    const bounds = L.latLngBounds(
      [startCoords.lat, startCoords.lon],
      [endCoords.lat, endCoords.lon]
    );
    map.fitBounds(bounds);

    // Remove old route line
    if (currentRouteLine) {
      map.removeLayer(currentRouteLine);
    }

    // Draw straight line route
    currentRouteLine = L.polyline(
      [
        [startCoords.lat, startCoords.lon],
        [endCoords.lat, endCoords.lon]
      ],
      { color: 'blue', weight: 4 }
    ).addTo(map);

  } catch (error) {
    alert("One of the locations could not be found.");
  }
});

