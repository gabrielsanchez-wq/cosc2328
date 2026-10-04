// HW5 – COSC 2328 – Professor McCurry
// Implemented by: Gabriel Enrique Sanchez Zambrana

console.log("=== BOOKSTORE INVENTORY CALCULATOR ===");
const book1 = {
    title: "El Lazaro",
    author: "Anonymous",
    price: 14.678
}
const book2 = {
    title: "Principia Mathematica",
    author: "Isaac Newton",
    price: 30
}
const book3 = {
    title: "The Art of War",
    author: "Sun Tzu",
    price: 11
}
const TAX_RATE = 0.0825;
let isMember = true;

console.log("--- Book Inventory ---");
console.log("$"+book1.price+" "+book1.title+" by "+book1.author);
console.log("$"+book2.price+" "+book2.title+" by "+book2.author);
console.log("$"+book3.price+" "+book3.title+" by "+book3.author);

function calculateSubtotal(price, quantity) { return price*quantity }
function formatCurrency(amount) { return "$"+amount.toFixed(2) }

console.log("--- Function Declarations Test ---");
console.log(calculateSubtotal(book2.price,2));
console.log(formatCurrency(book1.price));

const calculateTax = subtotal => subtotal*TAX_RATE;
const applyMemberDiscount = (subtotal, isMember) => { return isMember ? subtotal*.9 : subtotal }

console.log("--- Arrow Functions Test ---");
console.log(calculateTax(book2.price));
console.log(applyMemberDiscount(book2.price,isMember));

const calculateTotal = function (price, quantity=1,isMember=false) {
    const discountedSubtotal = applyMemberDiscount(calculateSubtotal(price, quantity), isMember)
    return discountedSubtotal + calculateTax(discountedSubtotal)
}

console.log("--- Function Expression with Defaults ---")
console.log(calculateTotal(book2.price, 2, true))
console.log(calculateTotal(book2.price, 2))
console.log(calculateTotal(book2.price))

function calculateBulkOrder(...prices) { 
    let sum = 0;
    for (const p of prices) { sum+=p; }
    return sum;
}

console.log("--- Rest Operator Test ---")
console.log(""+calculateBulkOrder(10,2,3));
console.log(""+calculateBulkOrder(10,9,8,7,6));

function processOrder(book, quantity, callback) {
    return "Title: "+book.title+" Subtotal: $"+callback(book.price, quantity);
}

const standardPricing = (price, quantity) => calculateSubtotal(price, quantity);
const memberPricing = (price, quantity) => applyMemberDiscount(calculateSubtotal(price, quantity), true);

console.log("--- Callback Functions ---");
console.log(processOrder(book2,2,standardPricing))
console.log(processOrder(book2,2,memberPricing))

const orderSummary = {
    customerName: "Robert",
    items: [],
    addItem(book, quantity) {
        this.items.push([book, quantity])
    },
    getTotal() {
        let tot = 0;
        for (const i of this.items) {
            tot+=i[0].price*i[1]
        }
        return tot;
    },
    displaySummary() {
        let temp = "";
        for (const i of this.items) {
            temp+="Book Title: "+i[0].title+" Amount: "+i[1]+"\n"
        }
        return ""+this.customerName+"'s inventory: \n"+temp
        +" The total value of the books is $"+this.getTotal()+".";
    }
}

console.log("--- Object Methods ---")
orderSummary.addItem(book2, 3)
orderSummary.addItem(book3,2)
console.log(orderSummary.getTotal())
console.log(orderSummary.displaySummary())

function validateDiscount(code) {
    if (code) {
        if (code.toUpperCase()=="MEMBER10") {
            return 0.1;
        } if (code.toUpperCase()=="SAVE20") {
            return 0.2;
        }
    }
    return 0;
}

console.log("--- Truthy/Falsy Validation ---")
console.log(validateDiscount("MEMBER10"))
console.log(validateDiscount("SAVE20"))
console.log(validateDiscount(""))
console.log(validateDiscount("INVALID"))

function createOrderProcessor(storeName) {
    storetaxRate = .1

    function processStoreOrder(book, quantity) {
        return "The book title for the store "+storeName+" is "+book.title
        +" and its total is "+(formatCurrency(applyMemberDiscount(calculateSubtotal(book.price, quantity), isMember)*(1+storetaxRate)))
        +".";
    }
    return processStoreOrder;
}

console.log("--- Nested Functions & Closures ---")
const processor = createOrderProcessor("Barnes & Nobles");
console.log(processor(book2, 3));
console.log(processor(book3, 2));