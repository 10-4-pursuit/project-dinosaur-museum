/*
  Do not change the line below. If you'd like to run code from this file, you may use the `exampleTicketData` variable below to gain access to tickets data. This data is pulled from the `data/tickets.js` file.

  You may use this data to test your functions. You may assume the shape of the data remains the same but that the values may change.

  Keep in mind that your functions must still have and use a parameter for accepting all tickets.
*/
const exampleTicketData = require("../data/tickets");
// Do not change the line above.

/**
 * calculateTicketPrice()
 * ---------------------
 * Returns the ticket price based on the ticket information supplied to the function. The `ticketInfo` will be in the following shape. See below for more details on each key.
 * const ticketInfo = {
    ticketType: "general",
    entrantType: "child",
    extras: ["movie"],
  };
 *
 * If either the `ticketInfo.ticketType` value or `ticketInfo.entrantType` value is incorrect, or any of the values inside of the `ticketInfo.extras` key is incorrect, an error message should be returned.
 *
 * @param {Object} ticketData - An object containing data about prices to enter the museum. See the `data/tickets.js` file for an example of the input.
 * @param {Object} ticketInfo - An object representing data for a single ticket.
 * @param {string} ticketInfo.ticketType - Represents the type of ticket. Could be any string except the value "extras".
 * @param {string} ticketInfo.entrantType - Represents the type of entrant. Prices change depending on the entrant.
 * @param {string[]} ticketInfo.extras - An array of strings where each string represent a different "extra" that can be added to the ticket. All strings should be keys under the `extras` key in `ticketData`.
 * @returns {number} The cost of the ticket in cents.
 *
 * EXAMPLE:
 *  const ticketInfo = {
      ticketType: "general",
      entrantType: "adult",
      extras: [],
    };
    calculateTicketPrice(tickets, ticketInfo);
    //> 3000
 *  
 * EXAMPLE:
 *  const ticketInfo = {
      ticketType: "membership",
      entrantType: "child",
      extras: ["movie"],
    };
    calculateTicketPrice(tickets, ticketInfo);
    //> 2500

 * EXAMPLE:
 *  const ticketInfo = {
      ticketType: "general",
      entrantType: "kid", // Incorrect
      extras: ["movie"],
    };
    calculateTicketPrice(tickets, ticketInfo);
    //> "Entrant type 'kid' cannot be found."
 */
function calculateTicketPrice(ticketData, ticketInfo) {
  let priceForTickets = 0;  //Set the price at zero to begin calculations.
  if (!ticketData[ticketInfo.ticketType]) { //Edge case for when there is no ticketData.
    return `Ticket type '${ticketInfo.ticketType}' cannot be found.`;
  }
  if (!ticketData[ticketInfo.ticketType].priceInCents[ticketInfo.entrantType]) {
    return `Entrant type '${ticketInfo.entrantType}' cannot be found.`;
  }
  priceForTickets = ticketData[ticketInfo.ticketType].priceInCents[ticketInfo.entrantType];  //Use bracket notation to set the data for priceForTickets.
  for (let extra of ticketInfo.extras) {
    if (!ticketData.extras[extra]) {  //Edge case when there are no extras.
      return `Extra type '${extra}' cannot be found.` ;
    }
    priceForTickets += ticketData.extras[extra].priceInCents[ticketInfo.entrantType]; //Add extras to the priceForTickets.
  }
  return priceForTickets
  }
/**
 * purchaseTickets()
 * ---------------------
 * Returns a receipt based off of a number of purchase. Each "purchase" maintains the shape from `ticketInfo` in the previous function.
 *
 * Any errors that would occur as a result of incorrect ticket information should be surfaced in the same way it is in the previous function.
 * 
 * NOTE: Pay close attention to the format in the examples below and tests. You will need to have the same format to get the tests to pass.
 *
 * @param {Object} ticketData - An object containing data about prices to enter the museum. See the `data/tickets.js` file for an example of the input.
 * @param {Object[]} purchases - An array of objects. Each object represents a single ticket being purchased.
 * @param {string} purchases[].ticketType - Represents the type of ticket. Could be any string except the value "extras".
 * @param {string} purchases[].entrantType - Represents the type of entrant. Prices change depending on the entrant.
 * @param {string[]} purchases[].extras - An array of strings where each string represent a different "extra" that can be added to the ticket. All strings should be keys under the `extras` key in `ticketData`.
 * @returns {string} A full receipt, with each individual ticket bought and the total.
 *
 * EXAMPLE:
 *  const purchases = [
      {
        ticketType: "general",
        entrantType: "adult",
        extras: ["movie", "terrace"],
      },
      {
        ticketType: "general",
        entrantType: "senior",
        extras: ["terrace"],
      },
      {
        ticketType: "general",
        entrantType: "child",
        extras: ["education", "movie", "terrace"],
      },
      {
        ticketType: "general",
        entrantType: "child",
        extras: ["education", "movie", "terrace"],
      },
    ];
    purchaseTickets(tickets, purchases);
    //> "Thank you for visiting the Dinosaur Museum!\n-------------------------------------------\nAdult General Admission: $50.00 (Movie Access, Terrace Access)\nSenior General Admission: $35.00 (Terrace Access)\nChild General Admission: $45.00 (Education Access, Movie Access, Terrace Access)\nChild General Admission: $45.00 (Education Access, Movie Access, Terrace Access)\n-------------------------------------------\nTOTAL: $175.00"

 * EXAMPLE:
    const purchases = [
      {
        ticketType: "discount", // Incorrect
        entrantType: "adult",
        extras: ["movie", "terrace"],
      }
    ]
    purchaseTickets(tickets, purchases);
    //> "Ticket type 'discount' cannot be found."
 */
function purchaseTickets(ticketData, purchases) {
  let totalPrice = 0;
  let receipt = [
    `Thank you for visiting the Dinosaur Museum!`,
    `-------------------------------------------`,
  ];

  for(const purchase of purchases) {
    let ticketPrice = calculateTicketPrice(ticketData, purchase);
    
      if(typeof ticketPrice === "string"){ //Tells the program to return a string for the ticketPrice.
      return ticketPrice;
    }
      totalPrice += ticketPrice; //calculates totalPrice.
    let entrant = purchase.entrantType[0].toUpperCase  //Write entrantType in uppercase.
    () + purchase.entrantType.slice(1);  //Use the .slice() to access the element at position 1.
    
    let entry = `${entrant} ${ticketData[purchase.ticketType].description}: $${(ticketPrice / 100).toFixed(2)}`; //Entry description to include the ticket price divided by 100.
      if(purchase.extras.length){
      entry += ` (${purchase.extras.map(extra => ticketData.extras[extra].description).join(", ")})`//.join() adds all elements together into a string.
    }
      receipt.push(entry);
  }//This completes the description on the receiptshowing the total price. \n is used to create a new line.
  receipt.push(`-------------------------------------------`);
  receipt.push(`TOTAL: $${(totalPrice / 100).toFixed(2)}`) //Move the decimal place over 2 places w/ the toFixed(2) method.
  return receipt.join(`\n`) //Add elements of the array into a string.
}


/**
 * createInventoryData()
 * ----------------------------
 * Creates and manages the inventory data for the Dinosaur Museum Gift Shop.
 * 
 * @param {Object[]} initialInventory - An array of objects representing the initial inventory.
 * @param {object[]} purchases - An array of objects representing items to be purchased.
 * @returns {object[]} An updated inventory array after processing purchases.
 * 
 * const inventoryData = [
    {
     name: "Tyrannosaurus Plush Toy",
     price:  19.99,
     description: "Soft, huggable dinosaur plush toy for kids"
     availability: true,
 * },
 * {
 *   name: "Allosaurus T-Shirt",
 *   price: 14:99,
 *   description: "100% Cotton short sleeve T-Shirt"
 *   availability: false,
 * },
 * {
 *   name:  "Brachiosaurus Lunch Box",
 *   price: 24.99,
 *   description: "Durable, roomy, soft, insulated, Lunch Box",
 *   availability: true,
 *  }
 * }];
*/
function createInventoryData(initialInventory, purchases){
let inventory = initialInventory;

for (const purchase of purchases) {
  const purchasedItem = inventory.find((item) => item.name === purchase.name);

  if (!purchasedItem) {

    purchase.availability = "This item is not available";

  } else {
    purchasedItem.availability = purchase.availability;
  }
}
return inventory
}

// Do not change anything below this line.
module.exports = {
  calculateTicketPrice,
  purchaseTickets,
  createInventoryData,
};
