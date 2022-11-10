import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["carsList"]

  connect() {
    this.refreshCars();
  }

  createCar(event) {
    event.preventDefault()
    const formData = new FormData(event.target);
    const newCarObject = Object.fromEntries(formData);
    fetch("https://wagon-garage-api.herokuapp.com/batch1013/cars", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newCarObject),
    })
    .then(() => this.refreshCars())
  }

  refreshCars() {
    const garageUrl = "https://wagon-garage-api.herokuapp.com/batch1013/cars"
    // fetch the cars from api
    fetch(garageUrl)
    .then((response) => response.json())
    .then((data) => {
      this.carsListTarget.innerHTML = ""
      data.forEach( car => this.insertCarCard(car))
    })
  }

  insertCarCard(car) {
    const carCard = `<div class="car">
    <div class="car-image">
      <img src="http://loremflickr.com/280/280/${car.brand} ${car.model}" />
    </div>
    <div class="car-info">
      <h4>${car.brand}  -   ${car.model}</h4>
      <p><strong>Owner:</strong> ${car.owner}</p>
      <p><strong>Plate:</strong> ${car.plate}</p>
    </div>`

    this.carsListTarget.insertAdjacentHTML("beforeend", carCard)
  }
}
