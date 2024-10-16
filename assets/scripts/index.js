const featuredCarsContainer = document.getElementById("featured-cars");
const featuredBikesContainer = document.getElementById("featured-bikes");

const featuredCarsDiv = document.getElementById("featured-cars-div");
const featuredBikesDiv = document.getElementById("featured-bikes-div");
const vehiclesJSON = 'https://raw.githubusercontent.com/clissic/boutiqueAutomovilesJSON/refs/heads/master/vehicles.json'

async function fetchCars(URL) {
  try {
    const response = await fetch(URL)

    if(!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    const cars = data;

    let hasFeaturedCars = false;
    let hasFeaturedBikes = false;

    cars.forEach(car => {
      if (car.featured === true && car.category === "autos") {
        const carHTML = `
          <a id="${car.id}" onclick="localStorage.setItem('vehicleID', this.id);" href="./pages/vehicle.html" class="car-card no-format-a">
                <img src="${car.imgs[0]}" alt="Foto del auto" class="car-photo">
                <div class="car-info">
                    <div class="d-flex f-row align-items-center justify-content-center gap-3">
                        <h2 class="car-brand">${car.brand}</h2>
                        <h3 class="car-model">${car.model}</h3>
                    </div>
                    <div class="d-flex justify-content-between align-items-center">
                        <p class="car-model">${car.year}</p>
                        <p class="car-km">${car.km} KM</p>
                        <p class="car-status condition-${car.condition}">${car.condition}</p>
                    </div>
                    <hr>
                    <div class="d-flex justify-content-center align-items-center">
                        <p class="car-price">${car.currency} ${car.price}</p>
                    </div>
                </div>
            </a>
        `;
        featuredCarsContainer.innerHTML += carHTML; 
        hasFeaturedCars = true;
      }

      if (!hasFeaturedCars) {
        featuredCarsDiv.innerHTML = ``
      }

      if (car.featured === true && car.category === "motos") {
        const bikeHTML = `
          <a id="${car.id}" onclick="localStorage.setItem('vehicleID', this.id);" href="./pages/vehicle.html" class="car-card no-format-a">
                <img src="${car.imgs[0]}" alt="Foto del auto" class="car-photo">
                <div class="car-info">
                    <div class="d-flex f-row align-items-center justify-content-center gap-3">
                        <h2 class="car-brand">${car.brand}</h2>
                        <h3 class="car-model">${car.model}</h3>
                    </div>
                    <div class="d-flex justify-content-between align-items-center">
                        <p class="car-model">${car.year}</p>
                        <p class="car-km">${car.km} KM</p>
                        <p class="car-status condition-${car.condition}">${car.condition}</p>
                    </div>
                    <hr>
                    <div class="d-flex justify-content-center align-items-center">
                        <p class="car-price">${car.currency} ${car.price}</p>
                    </div>
                </div>
            </a>
        `;
        featuredBikesContainer.innerHTML += bikeHTML;
        hasFeaturedBikes = true;
      }

      if (!hasFeaturedBikes) {
        featuredBikesDiv.innerHTML = ``
      }
    }
  )
  } catch (error) {
    console.error("Ocurrio un error en el FETCH de los datos:", error);
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  await fetchCars(vehiclesJSON)
})