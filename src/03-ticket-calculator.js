/*
  Do not change the line below. If you'd like to run code from this file, you may use the `exampleTicketData` variable below to gain access to tickets data. This data is pulled from the `data/tickets.js` file.

  You may use this data to test your functions. You may assume the shape of the data remains the same but that the values may change.

  Keep in mind that your functions must still have and use a parameter for accepting all tickets.
*/
const exampleTicketData = require("../data/tickets");

/**
 * calculateTicketPrice()
 * ---------------------
 * Returns the ticket price based on the ticket information supplied to the function.
 * If either the `ticketInfo.ticketType` value or `ticketInfo.entrantType` value is incorrect,
 * or any of the values inside the `ticketInfo.extras` key is incorrect, an error message should be returned.
 *
 * @param {Object} ticketData - An object containing data about prices to enter the museum.
 * @param {Object} ticketInfo - An object representing data for a single ticket.
 * @param {string} ticketInfo.ticketType - Represents the type of ticket.
 * @param {string} ticketInfo.entrantType - Represents the type of entrant.
 * @param {string[]} ticketInfo.extras - An array of strings representing extras.
 * @returns {number|string} The cost of the ticket in cents or an error message.
 */
function calculateTicketPrice(ticketData, ticketInfo) {
  // Check if ticket type exists in ticketData
  if (!ticketData[ticketInfo.ticketType]) {
    return `Ticket type '${ticketInfo.ticketType}' cannot be found.`;
  }

  // Check if entrant type exists in the ticketData[ticketInfo.ticketType]
  if (!ticketData[ticketInfo.ticketType].priceInCents[ticketInfo.entrantType]) {
    return `Entrant type '${ticketInfo.entrantType}' cannot be found.`;
  }

  const ticketPrice = ticketData[ticketInfo.ticketType].priceInCents[ticketInfo.entrantType];

  // Check if extras are valid
  const invalidExtras = ticketInfo.extras.filter((extra) => !ticketData.extras[extra]);
  if (invalidExtras.length > 0) {
    return `Extra type '${invalidExtras.join(", ")}' cannot be found.`;
  }

  // Calculate the total ticket price
  const extrasPrice = ticketInfo.extras.reduce((totalPrice, extra) => {
    const extraPrice = ticketData.extras[extra].priceInCents[ticketInfo.entrantType] || 0;
    return totalPrice + extraPrice;
  }, 0);

  return ticketPrice + extrasPrice;
}

// Example usage
const ticketInfo = {
  ticketType: 'general',
  entrantType: 'adult',
  extras: ['movie', 'terrace'],
};



/**
 * purchaseTickets()
 * ---------------------
 * Returns a receipt based on a number of purchases.
 *
 * @param {Object} ticketData - An object containing data about prices to enter the museum.
 * @param {Object[]} purchases - An array of objects representing tickets being purchased.
 * @returns {string} A full receipt with each individual ticket bought and the total.
 */
function purchaseTickets(ticketData, purchases) {
  let purchaseTotal = 0
  let receipt = ""
  for(let i = 0; i < purchases.length; i++){
    
    ticketPrice = calculateTicketPrice(ticketData, purchases[i])
    if(typeof ticketPrice === "string"){
      return ticketPrice
    } else {
      purchaseTotal += ticketPrice
      capitalizedEntrantType = purchases[i].entrantType[0].toUpperCase() + purchases[i].entrantType.slice(1)
      capitalizedTicketType = purchases[i].ticketType[0].toUpperCase() + purchases[i].ticketType.slice(1)
      formattedExtras = purchases[i].extras.map(extra => extra[0].toUpperCase() + extra.slice(1) + ' Access').join(", ")
      if(purchases[i].extras.length === 0){
        receipt += `${capitalizedEntrantType} ${capitalizedTicketType} Admission: $${(ticketPrice/100).toFixed(2)}\n`
      } else {
        receipt += `${capitalizedEntrantType} ${capitalizedTicketType} Admission: $${(ticketPrice/100).toFixed(2)} (${formattedExtras})\n`
      }
    }
   
  }
  return `Thank you for visiting the Dinosaur Museum!\n-------------------------------------------\n${receipt}-------------------------------------------\nTOTAL: $${(purchaseTotal/100).toFixed(2)}`
  }
// Example usage:
const purchases = [
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

const receipt = purchaseTickets(exampleTicketData, purchases);
console.log(receipt);


// Do not change anything below this line.
module.exports = {
  calculateTicketPrice,
  purchaseTickets,
};
