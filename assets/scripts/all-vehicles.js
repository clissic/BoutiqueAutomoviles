// ACTIVE OPTION NAVBAR
const vehiclesCategory = localStorage.getItem("vehicleCategory")
const navbarAutos = document.getElementById("navbar-autos");
const navbarMotos = document.getElementById("navbar-motos");

if (vehiclesCategory === "autos") {
  navbarAutos.classList.add("active");
  navbarMotos.removeAttribute("aria-current");
  navbarAutos.setAttribute("aria-current","page");
} else if (vehiclesCategory === "motos") {
  navbarMotos.classList.add("active")
  navbarAutos.removeAttribute("aria-current");
  navbarMotos.setAttribute("aria-current","page");
}

if (vehiclesCategory === "autos") {
  navbarAutos.classList.add("active");
  navbarMotos.removeAttribute("aria-current");
  navbarAutos.setAttribute("aria-current","page");
} else if (vehiclesCategory === "motos") {
  navbarMotos.classList.add("active")
  navbarAutos.removeAttribute("aria-current");
  navbarMotos.setAttribute("aria-current","page");
}

// ALL VEHICLES DIV
const allVehiclesDiv = document.getElementById("vehicles-body");

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
                  <div class="d-flex flex-wrap gap-1 justify-content-start">
                      <h4 class="m-0">${vehicle.brand}</h4>
                      <h4 class="m-0">${vehicle.model}</h4>
                  </div>
                  <div class="justify-content-between align-items-center">
                      <div class="mt-2 d-flex flex-wrap gap-1 justify-content-start">
                          <p class="m-0">${vehicle.version}</p>
                          <p class="m-0">|</p>
                          <p class="m-0">${vehicle.transmition}</p>
                          <p class="m-0">|</p>
                          <p class="m-0">${vehicle.color}</p>
                      </div>
                      <div class="d-flex gap-1 flex-wrap justify-content-start">
                          <p class="m-0">${vehicle.year}</p>
                          <p class="m-0">|</p>
                          <p class="m-0">${vehicle.km} KM</p>
                      </div>
                  </div>
                  <hr class="my-1">
                  <div class="d-flex justify-content-around align-items-center">
                      <p class="m-0 car-status condition-${vehicle.condition}">${vehicle.condition}</p>
                      <p class="car-price">${vehicle.currency} ${vehicle.price}</p>
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
                        <label for="${engine}">${engine}cc</label>
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

async function loadEmptySign(array, div) {
  if (array.length === 0) {
    div.innerHTML = `
        <div class="d-flex m-auto flex-column gap-5 justify-content-center align-items-center emptySign my-5">
            <div>
                <i class="fa-solid fa-car-side display-3"></i>
                <i class="fa-solid fa-car-burst display-1"></i>
            </div>
            <p class="index-sub-title">AÚN NO CONTAMOS CON VEHÍCULOS EN ESTA CATEGORÍA</p>
        </div>
    `
  } else {
    await renderVehicles(array)
    await renderFilters(array)
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  await fetchVehicles(vehiclesJSON)
  await categoryFilter(vehiclesArray)
  await loadEmptySign(vehiclesArray, allVehiclesDiv)
})

hiddeFiltersCheckbox.addEventListener("change", (e) => {
  if (e.target.checked) {
    allFiltersContainer.classList.add("d-none");
  } else {
    allFiltersContainer.classList.remove("d-none");
  }
})