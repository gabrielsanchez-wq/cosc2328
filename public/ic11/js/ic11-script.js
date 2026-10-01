// IC11 – COSC 2328 – Professor McCurry
// Implemented by: Gabriel Enrique Sanchez Zambrana

console.log("Function declarations");
function greet(name) {
    return "Hello, "+name+"!";
}

function area(width, height) {
    return width*height;
}
console.log(greet("Maria"))
console.log(area(5,4))

console.log("Function expression + arrow functions.")
const multiply = function(a, b) { return a*b }
const divide = (a, b) => { return a/b};
const square = n => n * n;
console.log("multiply(3,6) = "+multiply(3,6))
console.log("divide(20,5) = "+divide(20,5));
console.log("square(7) = "+square(7));

console.log("Default parameters + rest operator")
function greetUser(name, greeting="Hello") {
    return greeting + ", " + name;
}
console.log(greetUser("Sam"));
console.log(greetUser("Sam","Yo"));
function sumAll(...numbers) {
    let total = 0;
    for (const n of numbers) {total += n; }
    return total;
}
console.log("sumAll(1,2,3) = "+sumAll(1,2,3));

console.log("--- Callback Functions ---");

function processNumber(value, callback) {
    console.log("Processing "+value+"...");
    return callback(value);
}

const double = n => n *2;
const triple = n => n *3;
const negate = n => n*-1;

console.log("double -> "+processNumber(5, double));
console.log("triple -> "+processNumber(5, triple));

console.log("Object methods with this");
const product = {
    brand: "Acme",
    price: 12.5,
    quantity: 4,
    total() { return this.price * this.quantity; },
    describe() {
        return this.quantity + " x "+this.brand + " @ $"+this.price+" = $"+this.total().toFixed(2);
    }
}

console.log("Total: $"+product.total().toFixed(2));
console.log(product.describe());
/*Give processNumber a third arrow callback (e.g. negate) and run it too.
Add a method to product that uses a default parameter (e.g. applyDiscount(rate = 0.1) returning the discounted total).*/