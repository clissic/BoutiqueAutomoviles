const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const modalBody = document.getElementById("modal-body");

async function getVehiclesJSON() {
    if (typeof vehiclesJSON !== 'undefined') {
        return;
    }
    vehiclesJSON = 'https://raw.githubusercontent.com/clissic/boutiqueAutomovilesJSON/refs/heads/master/vehicles.json';
}

async function fetchVehicles(URL) {
    try {
        const response = await fetch(URL)
        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        };
        const vehicles = await response.json();
        return vehicles;
    } catch (error) {
        console.error(`Ocurrio un error en el FETCH de los datos:`, error);
    };
}

async function filteredVehicles(array, filter) {
    const lowerCaseFilter = filter.toLowerCase();

    const filteredArray = array.filter(vehicle => {
        return Object.values(vehicle).some(value => {
            return String(value).toLowerCase().includes(lowerCaseFilter);
        });
    });

    return filteredArray.length > 0 ? filteredArray : [];
}

searchBtn.addEventListener("click", async () => {
    await getVehiclesJSON();
    modalBody.innerHTML = ``;
    const fetchedVehicles = await fetchVehicles(vehiclesJSON);
    const searchInputValue = document.getElementById("search-input").value;
    const filteredV = await filteredVehicles(fetchedVehicles, searchInputValue);
    if (filteredV.length === 0) {
        modalBody.innerHTML = `
            <div class="my-5">
                <p class="text-center display-1"><i class="fa-solid fa-car-on"></i></p>
                <h4 class="text-center">No hay vehículos que coincidan con su parámetro de búsqueda.</h4>
            </div>
            <hr>
        `
    } else {
        filteredV.forEach(vehicle => {
            modalBody.innerHTML += `
                <div class=" container d-flex f-row justify-content-between align-items-center gap-2">
                    <img class="rounded img-fluid w-25 h-25" src=".${vehicle.imgs[0]}" alt="vehicle-img">
                    <div>
                        <h6>${vehicle.brand} ${vehicle.model}</h6>
                        <div class="d-flex f-row gap-4">
                            <p class="m-0">${vehicle.version}</p>
                            <p class="m-0 car-status condition-${vehicle.condition}">${vehicle.condition}</p>
                        </div>
                    </div>
                    <a id="${vehicle.id}" onclick="localStorage.setItem('vehicleID', this.id);" class="btn btn-primary" href="../pages/vehicle.html"><i class="fa-solid fa-plus text-white"></i></a>
                </div>
                <hr>
            `
        });
    }
})