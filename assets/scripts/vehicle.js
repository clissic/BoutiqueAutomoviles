const vehicleID = localStorage.getItem("vehicleID")

const vehicleBodyContainer = document.getElementById("vehicle-body")
const carsJSON = '../json/cars.json'

async function fetchCars(URL) {
  try {
    const response = await fetch(URL)

    if(!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    const cars = data;
    const vehicle = cars[vehicleID]

    function condition(x) {
      if (x === true) {
        return "Nuevo"
      } else {
        return "Usado"
      }
    }
        const vehicleHTML = `
        <div class="body-parallax" style="background-image: url('.${vehicle.imgs[0]}');"><h4>${vehicle.brand}</h4><h2>${vehicle.model}</h2></div>
        <div class="container mt-4 mb-5 d-flex flex-column flex-md-row gap-5 justify-content-center">
            <div class="col-lg-8 col-md-7 mt-lg-5 mt-1">
                <h2 class="index-sub-title mb-3">CARACTERÍSTICAS</h2>
                <div class="row justify-content-center">
                    <div class="characteristics-card mt-4 col-lg-4 col-md-6 col-12">
                        <div class="services-card-div d-flex align-items-center">
                            <i class="fa-solid fa-calendar-days"></i>
                            <h6>AÑO:</h6>
                        </div>
                        <p class="text-end text-md-center text-lg-center h4">${vehicle.year}</p>
                    </div>
                    <div class="characteristics-card mt-4 col-lg-4 col-md-6 col-12">
                        <div class="services-card-div d-flex align-items-center">
                            <i class="fa-solid fa-hashtag"></i>
                            <h6>VERSIÓN:</h6>
                        </div>
                        <p class="text-end text-md-center text-lg-center h4">${vehicle.version}</p>
                    </div>
                    <div class="characteristics-card mt-4 col-lg-4 col-md-6 col-12">
                        <div class="services-card-div d-flex align-items-center">
                            <i class="fa-solid fa-hand-holding-medical"></i>
                            <h6>CONDICIÓN:</h6>
                        </div>
                        <p class="text-end text-md-center text-lg-center h4">${condition(vehicle.new)}</p>
                    </div>
                    <div class="characteristics-card mt-4 col-lg-4 col-md-6 col-12">
                        <div class="services-card-div d-flex align-items-center">
                            <i class="fa-solid fa-flag"></i>
                            <h6>KILÓMETROS:</h6>
                        </div>
                        <p class="text-end text-md-center text-lg-center h4">${vehicle.km}</p>
                    </div>
                    <div class="characteristics-card mt-4 col-lg-4 col-md-6 col-12">
                        <div class="services-card-div d-flex align-items-center">
                            <i class="fa-solid fa-horse"></i>
                            <h6>MOTOR:</h6>
                        </div>
                        <p class="text-end text-md-center text-lg-center h4">${vehicle.engine}cc</p>
                    </div>
                    <div class="characteristics-card mt-4 col-lg-4 col-md-6 col-12">
                        <div class="services-card-div d-flex align-items-center">
                            <i class="fa-solid fa-palette"></i>
                            <h6>COLOR:</h6>
                        </div>
                        <p class="text-end text-md-center text-lg-center h4">${vehicle.color}</p>
                    </div>
                    
                    <div class="characteristics-card mt-4 col-lg-4 col-md-6 col-12">
                        <div class="services-card-div d-flex align-items-center">
                            <i class="fa-solid fa-arrow-down-up-across-line"></i>
                            <h6>TRANSMISIÓN:</h6>
                        </div>
                        <p class="text-end text-md-center text-lg-center h4">${vehicle.transmition}</p>
                    </div>
                    <div class="characteristics-card mt-4 col-lg-4 col-md-6 col-12">
                        <div class="services-card-div d-flex align-items-center">
                            <i class="fa-solid fa-gas-pump"></i>
                            <h6>COMBUSTIBLE:</h6>
                        </div>
                        <p class="text-end text-md-center text-lg-center h4">${vehicle.fuel}</p>
                    </div>
                    <div class="characteristics-card mt-4 col-lg-4 col-md-6 col-12">
                        <div class="services-card-div d-flex align-items-center">
                            <i class="fa-solid fa-money-check-dollar"></i>
                            <h6>FINANCIACIÓN:</h6>
                        </div>
                        <p class="text-end text-md-center text-lg-center h4">${vehicle.financing}</p>
                    </div>
                    <div class="characteristics-card mt-4 col-lg-4 col-md-6 col-12">
                        <div class="services-card-div d-flex align-items-center">
                            <i class="fa-solid fa-sack-dollar"></i>
                            <h6>PRECIO:</h6>
                        </div>
                        <p class="text-end text-md-center text-lg-center h2 text-success">${vehicle.price}</p>
                    </div>
                </div>
                <div class="mt-4">
                    <div class="services-card-div d-flex align-items-center">
                        <i class="fa-solid fa-file-lines"></i>
                        <h6>DESCRIPCIÓN:</h6>
                    </div>
                    <p class="mt-3 mb-sm-0 text-justify">${vehicle.description}</p>
                </div>
            </div>
            <div class="d-flex flex-column col-lg-3 col-md-4">
                <div class="d-flex align-items-center gap-2 mb-3 mt-md-0 mt-lg-5">
                    <i class="fa-solid fa-images h3 m-0"></i>
                    <h6 class="m-0">GALERÍA:</h6>
                </div>
                <div id="vehicle-gallery" class="d-flex f-row flex-wrap gap-4 justify-content-center">
                    <!-- SE RELLENA CON JS -->
                </div>
            </div>
        </div>
        <div class="d-flex align-items-center flex-column mb-5">
            <p class="text-secondary mb-2 mt-4">¿Te interesó este vehículo?</p>
            <a class="no-format-a btn btn-success mb-5" href="https://api.whatsapp.com/send/?phone=%2B59899039739&text=%C2%A1Hola+Boutique%21+Quisiera+saber+mas+sobre+el+${vehicle.brand}+${vehicle.model}+${vehicle.version}..."&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer">CONTACTO</a>
        </div>
        `;
        vehicleBodyContainer.innerHTML += vehicleHTML;

        const vehicleGallery = document.getElementById("vehicle-gallery")
        
        vehicle.imgs.forEach (img => {
            const vehicleGalleryHTML = `
            <div class="gallery col-lg-5 col-md-12 col-12">
                <div class="img-container rounded m-0" style="background: url(.${img}); background-position: center;">
                    <a href=".${img}" data-lightbox="mygallery">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-zoom-in" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11M13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0"/><path d="M10.344 11.742q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1 6.5 6.5 0 0 1-1.398 1.4z"/><path fill-rule="evenodd" d="M6.5 3a.5.5 0 0 1 .5.5V6h2.5a.5.5 0 0 1 0 1H7v2.5a.5.5 0 0 1-1 0V7H3.5a.5.5 0 0 1 0-1H6V3.5a.5.5 0 0 1 .5-.5"/></svg>
                    </a>
                </div>
            </div>
            `;
            vehicleGallery.innerHTML += vehicleGalleryHTML;
        })

        const firstImgGallery = document.getElementById("vehicle-gallery").firstElementChild
        firstImgGallery.classList.remove("col-lg-5");
        firstImgGallery.classList.add("col-lg-11");
        
  } catch (error) {
    console.error("Ocurrio un error en el FETCH de los datos:", error);
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  await fetchCars(carsJSON)
})