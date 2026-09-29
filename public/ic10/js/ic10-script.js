const city = "Austin";
const country = "US";
let population = 4000000;
console.log("Location: "+city+","+country)
console.log("Population: "+population)

if (population>1000000) {
    console.log(city+" is a metropolis.");
} else {
    console.log(city+" is a city.");
}

let isLoggedIn = true;
if (isLoggedIn) {
    console.log("Welcome back!");
} else {
    console.log("Please log in.");
}

let username = "false";

if (username) {
    console.log("Username accepted: "+username);
} else {
    console.log("Username is required");
}

const hasAccount = true;
const isEmailVerified = false;
const agreedToTerms = true;

if ((hasAccount && agreedToTerms) || isEmailVerified) {
    console.log("Registration allowed");
} else {
    console.log("Registration blocked");
}

let itemCount = 0;

if (itemCount) {
    console.log("Cart has N items");
} else {
    console.log("Cart is empty");
}

console.log(null==undefined);
console.log(null===undefined);

/* The == seems to check whether 
the values are the same, but not the reference in 
memory, while the === seems to check if the values are 
being referenced from the same location. 
*/