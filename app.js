/*
    Food Delivery System
    Demonstrates:
    - Encapsulation
    - Inheritance
    - Abstraction
    - Polymorphism
*/

// =========================
// Parent Class (Abstraction)
// =========================

class FoodItem {
    #price; // Private property for encapsulation

    constructor(name, price) {
        this.name = name;

        if (price <= 0) {
            throw new Error("Price must be greater than 0");
        }

        this.#price = price;
    }

    getPrice() {
        return this.#price;
    }

    setPrice(newPrice) {
        if (newPrice <= 0) {
            throw new Error("Invalid price");
        }

        this.#price = newPrice;
    }

    getType() {
        return "Food Item";
    }

    calculateDeliveryFee() {
        throw new Error("Delivery fee method must be overridden");
    }

    getDescription() {
        return `${this.name} - R${this.#price}`;
    }
}

// =========================
// Pizza Class
// =========================

class Pizza extends FoodItem {
    constructor(name, price, size) {
        super(name, price);
        this.size = size;
    }

    getType() {
        return "Pizza";
    }

    calculateDeliveryFee() {
        return 30;
    }

    getDescription() {
        return `${this.name} (${this.size})`;
    }
}

// =========================
// Burger Class
// =========================

class Burger extends FoodItem {
    constructor(name, price, patties) {
        super(name, price);
        this.patties = patties;
    }

    getType() {
        return "Burger";
    }

    calculateDeliveryFee() {
        return 20;
    }

    getDescription() {
        return `${this.name} (${this.patties} patties)`;
    }
}

// =========================
// Drink Class
// =========================

class Drink extends FoodItem {
    constructor(name, price, volume) {
        super(name, price);
        this.volume = volume;
    }

    getType() {
        return "Drink";
    }

    calculateDeliveryFee() {
        return 10;
    }

    getDescription() {
        return `${this.name} (${this.volume}ml)`;
    }
}

// =========================
// Additional Food Type
// Dessert
// =========================

class Dessert extends FoodItem {
    constructor(name, price, flavor) {
        super(name, price);
        this.flavor = flavor;
    }

    getType() {
        return "Dessert";
    }

    calculateDeliveryFee() {
        return 15;
    }

    getDescription() {
        return `${this.name} (${this.flavor})`;
    }
}

// =========================
// Order Class
// =========================

class Order {
    constructor() {
        this.items = [];
    }

    addItem(foodItem) {
        this.items.push(foodItem);
    }

    removeItem(name) {
        this.items = this.items.filter(
            item => item.name !== name
        );
    }

    calculateFoodTotal() {
        let total = 0;

        for (const item of this.items) {
            total += item.getPrice();
        }

        return total;
    }

    calculateDeliveryTotal() {
        let total = 0;

        for (const item of this.items) {
            total += item.calculateDeliveryFee();
        }

        return total;
    }

    calculateFinalTotal() {
        return (
            this.calculateFoodTotal() +
            this.calculateDeliveryTotal()
        );
    }

    displayOrderSummary() {
        console.log("\n======================================");
        console.log("       FOOD DELIVERY ORDER");
        console.log("======================================");

        console.log(
            "Item".padEnd(25) +
            "Price".padEnd(15) +
            "Delivery Fee"
        );

        console.log("--------------------------------------");

        for (const item of this.items) {
            console.log(
                item.getDescription().padEnd(25) +
                (`R${item.getPrice()}`).padEnd(15) +
                `R${item.calculateDeliveryFee()}`
            );
        }

        console.log("--------------------------------------");
        console.log(
            `Food Total: R${this.calculateFoodTotal()}`
        );
        console.log(
            `Delivery Total: R${this.calculateDeliveryTotal()}`
        );
        console.log(
            `Final Total: R${this.calculateFinalTotal()}`
        );
        console.log("======================================");
    }
}

// =========================
// Testing Section
// =========================

console.log("Food Delivery System Testing\n");

// Test invalid price
try {
    const badBurger = new Burger(
        "Invalid Burger",
        -10,
        1
    );
}
catch (error) {
    console.log("Invalid Price Test Passed:");
    console.log(error.message);
    console.log();
}

// Create food items

const pizza = new Pizza(
    "Pepperoni Pizza",
    120,
    "Large"
);

const burger = new Burger(
    "Cheese Burger",
    85,
    2
);

const drink = new Drink(
    "Coke",
    25,
    500
);

const dessert = new Dessert(
    "Chocolate Cake",
    55,
    "Chocolate"
);

// Test polymorphism

const foodItems = [
    pizza,
    burger,
    drink,
    dessert
];

console.log("Polymorphism Test:");

for (const item of foodItems) {
    console.log(
        `${item.getType()} Delivery Fee: R${item.calculateDeliveryFee()}`
    );
}

console.log();

// Create order

const order = new Order();

// Add items

order.addItem(pizza);
order.addItem(burger);
order.addItem(drink);
order.addItem(dessert);

// Display final summary

order.displayOrderSummary();