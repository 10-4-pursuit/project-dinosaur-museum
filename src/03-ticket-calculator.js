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
// this function starts out with asking it to check if ticketData at ticketinfo/ticketType exists and if does not exist to return the string in 60.  The same function in 62.  Then it checks sets up a var to store the result of the objects/arrays listed then goes into a for of loop iterates through each of teh icketinfoextras to see if each extra exists in the ticketData.extras object.  If it can't be found teh function returns an error message.  if it does find it then it adds the exra info and assigns it to sum and returns it.  ultimately the last return is the total value of sum with all extras. 
function calculateTicketPrice(ticketData, ticketInfo) {
  if (!ticketData[ticketInfo.ticketType]) {
    return `Ticket type '${ticketInfo.ticketType}' cannot be found.`;
  }
  if (!ticketData[ticketInfo.ticketType].priceInCents[ticketInfo.entrantType]) {
    return `Entrant type '${ticketInfo.entrantType}' cannot be found.`;
  }
  let sum = ticketData[ticketInfo.ticketType].priceInCents[ticketInfo.entrantType];
  for (const extra of ticketInfo.extras){
    if (!ticketData.extras[extra]) {
      return `Extra type '${extra}' cannot be found.`
    }
    sum += ticketData.extras[extra].priceInCents[ticketInfo.entrantType];
  }
  return sum;
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
// sum var is going to keep track of my total cost of ticket purchaes and lines will hold my strings that will be placed at the beginning of my receipt. the for of iterates over each purchase in the purchases array of objects. Then the calculateTicketPrice (using ticketdata and purchase as arguments to calculate) result will be stored in ticketPrice var. The if statement checks if ticketPrice is strictly equal to a string. if it si that means there was an error in calculating teh ticket price and the function wreturns the error message.  my sum line adds ticketPrice to the sum and accumulating the total cost of all ticket purchases and that amount is assigned to sum. Then the var entType stores information from purchase.entranttype at 0 index and also capitalizes the first letter and slices (returning element in the array selecting from start but not changing the original array). Also creating a new var purchaesEntry that will store entType, ticket data adn list price divided by 100 since it is in cents in data and adds decimal.  The last if statement runs the length of purchase extras and checks teh current purchase and adds to purchaseEntry and assigns teh result. my first line pushes purchase entry string to lines array and the because we close out on 144 we then push in the last pieces of the receipt requested.  The new line, total and its sum divided by 100 because data is in cents and then put add the decimal for dollars and finally ask it to return the lines array and joining it with the required new paragraph
function purchaseTickets(ticketData, purchases) {
  let sum = 0
  let lines = [`Thank you for visiting the Dinosaur Museum!`,`-------------------------------------------`,
];
  for (const purchase of purchases) {
    let ticketPrice = calculateTicketPrice(ticketData, purchase)
    if (typeof ticketPrice === "string") {
      return ticketPrice;
    }
    sum += ticketPrice;
    let entType = purchase.entrantType[0].toUpperCase() + purchase.entrantType.slice(1);
    let purchaseEntry = `${entType} ${ticketData[purchase.ticketType].description}: $${(ticketPrice/100).toFixed(2)}`
    if (purchase.extras.length) {
      purchaseEntry += ` (${purchase.extras.map(purchaseEx => ticketData.extras[purchaseEx].description).join(", ")})`;
    }
    lines.push(purchaseEntry)
  }
  lines.push(`-------------------------------------------`);
  lines.push(`TOTAL: $${(sum/100).toFixed(2)}`);

  return lines.join(`\n`);
}

// Do not change anything below this line.
module.exports = {
  calculateTicketPrice,
  purchaseTickets,
};
