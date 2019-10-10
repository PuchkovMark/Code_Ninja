class Car {
    constructor(model, price) {
        this.model = model;
        this.price = price;
    }
}

class CarFactory {
    constructor() {
        this.cars = []
    }
    create(model, price) {
        const candidate = this .getCar(model);
        if (candidate) {
            return candidate
        }

        const newCar = new Car(model, price);
        this.cars.push(newCar);
        return newCar
    }

    getCar(model) {
        return this.cars.find(car => car.model === model)
    }
}

const factory = new CarFactory();

const BMWx6 = factory.create('BMW', 100000);
const audi = factory.create('audi', 200000);
const BMWx3 = factory.create('BMW', 80000);
console.log(BMWx6);
console.log(audi);
console.log(BMWx3);