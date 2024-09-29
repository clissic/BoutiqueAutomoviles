// ACTIVE OPTION NAVBAR
const vehiclesCategory = localStorage.getItem("vehicleCategory")
const navbarAutos = document.getElementById("navbar-autos");
const navbarMotos = document.getElementById("navbar-motos");
if (vehiclesCategory === "autos") {
  navbarAutos.classList.add("active");
} else if (vehiclesCategory === "motos") {
  navbarMotos.classList.add("active")
}

// FILTER CONTAINERS
const allFiltersContainer = document.getElementById("filters-div");
const filterBrandContainer = document.getElementById("filter-brand");
const filterConditionContainer = document.getElementById("filter-condition");
const filterColorContainer = document.getElementById("filter-color");
const filterEngineContainer = document.getElementById("filter-engine");
const filterTransmitionContainer = document.getElementById("filter-transmition");
const filterFuelContainer = document.getElementById("filter-fuel");
const filterYearContainer = document.getElementById("filter-year");

// FILTER INPUTS
const filterBrandInput = document.getElementById("input-Volkswagen")

// HIDDE FILTER CHECKBOX
const hiddeFiltersCheckbox = document.getElementById("hidde-filters");

// GLOBAL VEHICLES ARRAY
let vehiclesArray = []

const allVehiclesContainer = document.getElementById("vehicles-grid");
const vehiclesJSON = 'https://raw.githubusercontent.com/clissic/boutiqueAutomovilesJSON/refs/heads/master/vehicles.json'

async function fetchVehicles(URL) {
  try {
    const response = await fetch(URL)
    if(!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }
    const data = await response.json();
    vehiclesArray = data;
    return vehiclesArray
} catch (error) {
    console.error("Ocurrio un error en el FETCH de los datos:", error);
  }
}

async function categoryFilter(vehiclesArrayParam) {
  vehiclesArray = vehiclesArrayParam.filter(vehicle => {
    return vehiclesCategory === vehicle.category || vehiclesCategory === "";
  });
}

async function renderVehicles(vehiclesArrayParam) {
  vehiclesArrayParam.forEach(vehicle => {
    if (vehiclesCategory === vehicle.category || vehiclesCategory === "") {
      const vehicleHTML = `
          <a id="${vehicle.id}" onclick="localStorage.setItem('vehicleID', this.id);" href="./vehicle.html" class="vehicle-card no-format-a">
              <img src=".${vehicle.imgs[0]}" alt="Foto del auto" class="car-photo">
              <div class="car-info">
                  <div class="d-flex f-row align-items-center justify-content-center gap-3">
                      <h3 class="car-brand">${vehicle.brand}</h3>
                      <h4 class="car-model">${vehicle.model}</h4>
                  </div>
                  <div class="d-flex justify-content-between align-items-center">
                      <p class="car-model">${vehicle.year}</p>
                      <p class="car-km">${vehicle.km} KM</p>
                      <p class="car-status condition-${vehicle.condition}">${vehicle.condition}</p>
                  </div>
                  <hr>
                  <div class="d-flex justify-content-center align-items-center">
                      <p class="car-price">${vehicle.price}</p>
                  </div>
              </div>
          </a>
      `;
      allVehiclesContainer.innerHTML += vehicleHTML;
    }
  })
}

async function renderFilters(vehiclesArrayParam) {
  const brandsForFilter = [...new Set(vehiclesArrayParam.map(vehicle => vehicle.brand))];
  brandsForFilter.forEach(brand => {
    const brandFilter = `
                    <div onclick="applyFilter('${brand}', 'brand');">
                        <input type="radio" name="marca" id="input-${brand}" value="${brand}">
                        <label for="${brand}">${brand}</label>
                    </div>
    `;
    filterBrandContainer.innerHTML += brandFilter
  })

  const newForFilter = [...new Set(vehiclesArrayParam.map(vehicle => vehicle.condition))];
  newForFilter.forEach(condition => {
    const conditionFilter = `
                    <div onclick="applyFilter('${condition}', 'condition');">
                        <input type="radio" name="condición" id="input-${condition}" value="${condition}">
                        <label for="${condition}">${condition}</label>
                    </div>
    `;
    filterConditionContainer.innerHTML += conditionFilter
  })

  const colorForFilter = [...new Set(vehiclesArrayParam.map(vehicle => vehicle.color))];
  colorForFilter.forEach(color => {
    const colorFilter = `
                    <div onclick="applyFilter('${color}', 'color');">
                        <input type="radio" name="color" id="input-${color}" value="${color}">
                        <label for="${color}">${color}</label>
                    </div>
    `;
    filterColorContainer.innerHTML += colorFilter
  })

  const engineForFilter = [...new Set(vehiclesArrayParam.map(vehicle => vehicle.engine))];
  engineForFilter.forEach(engine => {
    const engineFilter = `
                    <div onclick="applyFilter('${engine}', 'engine');">
                        <input type="radio" name="motor" id="input-${engine}" value="${engine}">
                        <label for="${engine}">${engine}</label>
                    </div>
    `;
    filterEngineContainer.innerHTML += engineFilter
  })

  const transmitionForFilter = [...new Set(vehiclesArrayParam.map(vehicle => vehicle.transmition))];
  transmitionForFilter.forEach(transmition => {
    const transmitionFilter = `
                    <div onclick="applyFilter('${transmition}', 'transmition');">
                        <input type="radio" name="transmision" id="input-${transmition}" value="${transmition}">
                        <label for="${transmition}">${transmition}</label>
                    </div>
    `;
    filterTransmitionContainer.innerHTML += transmitionFilter
  })

  const fuelForFilter = [...new Set(vehiclesArrayParam.map(vehicle => vehicle.fuel))];
  fuelForFilter.forEach(fuel => {
    const fuelFilter = `
                    <div onclick="applyFilter('${fuel}', 'fuel');">
                        <input type="radio" name="combustible" id="input-${fuel}" value="${fuel}">
                        <label for="${fuel}">${fuel}</label>
                    </div>
    `;
    filterFuelContainer.innerHTML += fuelFilter
  })

  const yearForFilter = [...new Set(vehiclesArrayParam.map(vehicle => vehicle.year))];
  yearForFilter.forEach(year => {
    const yearFilter = `
                    <div onclick="applyFilter('${year}', 'year');">
                        <input type="radio" name="año" id="input-${year}" value="${year}">
                        <label for="${year}">${year}</label>
                    </div>
    `;
    filterYearContainer.innerHTML += yearFilter
  })
}

async function applyFilter(filter, param) {
  vehiclesArray = vehiclesArray.filter(vehicle => {
    return vehicle[param] === filter;
  });
  allVehiclesContainer.innerHTML = ``;

  filterBrandContainer.innerHTML = ``;
  filterConditionContainer.innerHTML = ``;
  filterColorContainer.innerHTML = ``;
  filterEngineContainer.innerHTML = ``;
  filterTransmitionContainer.innerHTML = ``;
  filterFuelContainer.innerHTML = ``;
  filterYearContainer.innerHTML = ``;
  await renderVehicles(vehiclesArray);
  await renderFilters(vehiclesArray);
  await applyDisabledAtribute(filter);
  return vehiclesArray;
}

async function applyDisabledAtribute(filter) {
  document.getElementById("input-"+filter).setAttribute("checked", "true");
}

async function cleanFilters() {
  allVehiclesContainer.innerHTML = ``;
  filterBrandContainer.innerHTML = ``;
  filterConditionContainer.innerHTML = ``;
  filterColorContainer.innerHTML = ``;
  filterEngineContainer.innerHTML = ``;
  filterTransmitionContainer.innerHTML = ``;
  filterFuelContainer.innerHTML = ``;
  filterYearContainer.innerHTML = ``;
  await fetchVehicles(vehiclesJSON)
  await categoryFilter(vehiclesArray)
  await renderVehicles(vehiclesArray)
  await renderFilters(vehiclesArray)
}

document.addEventListener("DOMContentLoaded", async () => {
  await fetchVehicles(vehiclesJSON)
  await categoryFilter(vehiclesArray)
  await renderVehicles(vehiclesArray)
  await renderFilters(vehiclesArray)
})

hiddeFiltersCheckbox.addEventListener("change", (e) => {
  if (e.target.checked) {
    allFiltersContainer.classList.add("d-none");
  } else {
    allFiltersContainer.classList.remove("d-none");
  }
})