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
  // created a if statement to check to see if the value for the key in ticketType in th object ticketInfo can be found in the ticketsdat json
  
  if(!ticketData[ticketInfo.ticketType]){
    return `Ticket type '${ticketInfo.ticketType}' cannot be found.`
  }
  // created an if statement to check to see if the entrantType is a real entrantType that can be found in ticketsdata
  if(!ticketData[ticketInfo.ticketType].priceInCents[ticketInfo.entrantType]){
    return `Entrant type '${ticketInfo.entrantType}' cannot be found.`
  }
  // created a variable ticketPrice that holds the base ticket price calculated using the value for tickeType and entranType int he ticketInfo object
  let ticketPrice = ticketData[ticketInfo.ticketType].priceInCents[ticketInfo.entrantType] 
// created a for loop to loop through the array set as the value for the key extrass in the ticketInfo object
  for(let i = 0; i < ticketInfo.extras.length; i++){
    extrasToAdd = ticketInfo.extras[i]
    // create an if statement to check to see if the array of extras set as the value for the extras key in the ticketInfo object is indeed a real extra that can be found in ticketInfo
    if(!ticketData.extras[extrasToAdd] ){
      
      return `Extra type '${ticketInfo.extras[i]}' cannot be found.`
    }
//  ticketPrice variable is dynamically changing and is now the cumulative sum of the extras added to the base ticket price 
    ticketPrice += ticketData.extras[extrasToAdd].priceInCents[ticketInfo.entrantType]
  }
  return ticketPrice

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
// created a variable purchaseTotal and set it = 0
let purchaseTotal = 0
// created a variable called receipt and set it equal = ""
let receipt = ""
// this loops through the Purchases array of objects 
for(let i = 0; i < purchases.length; i++){
// called the function calculateTicketPrice from the previous problem and set it = ticketPrice
  ticketPrice = calculateTicketPrice(ticketData, purchases[i])
  // created an if statement to illustrate control flow of whether or not the return value for the calculateTicketPrice function yeilded a "string" datatype or "Number" data type
  if(typeof ticketPrice === "string"){
    return ticketPrice
  } else {
    purchaseTotal += ticketPrice
    // created a variable to contain the formatted version of the entrant type which is the value for the key value pair entrantType in the purchase object in the purchases array of objects
    capitalizedEntrantType = purchases[i].entrantType[0].toUpperCase() + purchases[i].entrantType.slice(1)
    // created a variable to contain the formatted version of the ticketType which is the value for the key value pair ticketType in the purchase object in the purchases array of objects. Capitalized the first letter of the ticketType and used slice method to ad the rest of the word
    capitalizedTicketType = purchases[i].ticketType[0].toUpperCase() + purchases[i].ticketType.slice(1)
    // created a variable to contain the formatted version of each extra in the Extras array in the purchase object which is the value for the key value pair for the extras key in the purchase object in the purchases array of objects. Capitalized the first letter of each extra in the extras array and used slice method to ad the rest of the word. Then used join to join the string values in the array into a string.
    formattedExtras = purchases[i].extras.map(extra => extra[0].toUpperCase() + extra.slice(1) + ' Access').join(", ")
    // created an if statement to check to see if there are any values within the extras arraay which is a value for the key extra in the purchase object within the Purchases array of objects
    if(purchases[i].extras.length === 0){
    // created a receipt variable to build out each line in the receipt string. Each line reflects the information in each purchase object within the Purchase array of objects. This version of the receipt variable takes into account if there are no extras in the extras array for the key extras in the purchase object within the Purchases array of objects
      receipt += `${capitalizedEntrantType} ${capitalizedTicketType} Admission: $${(ticketPrice/100).toFixed(2)}\n`
    } else {

      receipt += `${capitalizedEntrantType} ${capitalizedTicketType} Admission: $${(ticketPrice/100).toFixed(2)} (${formattedExtras})\n`
    }
  }
 
}
return `Thank you for visiting the Dinosaur Museum!\n-------------------------------------------\n${receipt}-------------------------------------------\nTOTAL: $${(purchaseTotal/100).toFixed(2)}`
}
 

  



// Do not change anything below this line.
module.exports = {
  calculateTicketPrice,
  purchaseTickets,
};
