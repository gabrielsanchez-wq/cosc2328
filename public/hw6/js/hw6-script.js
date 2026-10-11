// HW6 – COSC 2328 – Professor McCurry
// Implemented by: Gabriel Enrique Sanchez Zambrana

const productPrices = {
    laptop: 999.99,
    tablet: 499.99,
    phone: 699.99,
    monitor: 255.98,
}

const discountCodes = {
    SAVE10: .1,
    SAVE20: .2,
    STUDENT: .15,
}

const calculateTax = subtotal => subtotal*0.0825;

const applyDiscount = function (subtotal, code) {
    if (code.toUpperCase() == "SAVE10") {
        return subtotal*discountCodes.SAVE10;
    } else if (code.toUpperCase() == "SAVE20") {
        return subtotal*discountCodes.SAVE20;
    } else if (code.toUpperCase() == "STUDENT") {
        return subtotal*discountCodes.STUDENT;
    } else {
        return 0;
    }
}

const form = document.querySelector("#orderForm");
const productInput = document.querySelector("#product");
const quantityInput = document.querySelector("#quantity");
const codeInput = document.querySelector("#discountCode");
const results = document.querySelector("#results");

const product = document.querySelector("#textProduct");
const quantity = document.querySelector("#textQuantity");
const subtotal = document.querySelector("#textSubtotal");
const discount = document.querySelector("#textDiscount");
const tax = document.querySelector("#textTax");
const total = document.querySelector("#textTotal");

form.addEventListener("submit", function (e) {
    let vproductInput = productInput.value;
    let vquantityInput = Number(quantityInput.value);
    let vcodeInput = codeInput.value.trim();

    if ((vquantityInput.value<1)) {
        alert("Choose a quantity that is at least one.")
        return;
    }
    
    const vsubtotal = productPrices[vproductInput]*vquantityInput;
    const vdiscountAmount = applyDiscount(vsubtotal, vcodeInput);
    const vdiscountedSubtotal = vsubtotal - vdiscountAmount;
    const vtax = calculateTax(vdiscountedSubtotal);
    const vtotal = vdiscountedSubtotal + vtax;

    product.textContent = "Product: $"+productPrices[productInput.value].toFixed(2);
    quantity.textContent = "Quantity: "+vquantityInput.toFixed(2);
    subtotal.textContent = "Subtotal: $"+vsubtotal.toFixed(2);
    discount.textContent = "Discount: -$"+vdiscountAmount.toFixed(2);
    tax.textContent = "Tax: $"+vtax.toFixed(2);
    total.textContent = "Total: $"+vtotal.toFixed(2);

    //results.remove("results-hidden");
    e.preventDefault()
});