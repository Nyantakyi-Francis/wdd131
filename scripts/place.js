document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = "Last Modified: " + document.lastModified;

// Static inputs for temperature and wind speed
const temperature = parseFloat(document.getElementById("temperature").textContent);
const windSpeed = parseFloat(document.getElementById("windSpeed").textContent);

function calculateWindChill(tempC, speedKmh) {
  // Convert to °F and mph for wind chill formula
  const tempF = (tempC * 9) / 5 + 32;
  const speedMph = speedKmh / 1.609;

  return (
    35.74 +
    0.6215 * tempF -
    35.75 * Math.pow(speedMph, 0.16) +
    0.4275 * tempF * Math.pow(speedMph, 0.16)
  ).toFixed(1);
}

// Apply wind chill conditions
let windChillDisplay = "N/A";

if (temperature <= 10 && windSpeed > 4.8) {
  windChillDisplay = calculateWindChill(temperature, windSpeed) + " °F";
}

document.getElementById("windChill").textContent = windChillDisplay;
