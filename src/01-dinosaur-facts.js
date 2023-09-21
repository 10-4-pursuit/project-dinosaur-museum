/*
  Do not change the line below. If you'd like to run code from this file, you may use the `exampleDinosaurData` variable below to gain access to tickets data. This data is pulled from the `data/dinosaurs.js` file.

  You may use this data to test your functions. You may assume the shape of the data remains the same but that the values may change.

  Keep in mind that your functions must still have and use a parameter for accepting all dinosaurs.
*/
const exampleDinosaurData = require("../data/dinosaurs");
// Do not change the line above.

/**
 * getLongestDinosaur()
 * ---------------------
 * Returns an object with the longest dinosaur from the list. Converts from meters to feet.
 *
 * NOTE: To convert from meters to feet, multiply the meters by `3.281`.
 *
 * @param {Object[]} dinosaurs - An array of dinosaur objects. See the `data/dinosaurs.js` file for an example of the input.
 * @returns {Object} An object where the key is the name of the dinosaur and the value is the height of the dinosaur in feet.
 *
 * EXAMPLE:
 *  getLongestDinosaur(dinosaurs);
 *  //> { Brachiosaurus: 98.43 }
 */
function getLongestDinosaur(dinosaurs) {
  // Initialize longestDino with the first dinosaur in the array.
  let longestDino = dinosaurs[0];

  // Handles edge case of an empty dinosaur array by returning an empty object.
  if (dinosaurs.length === 0) return {};

  for (let dino of dinosaurs) {
    // If the current dinosaur is longer, update longestDino.
    if (dino.lengthInMeters > longestDino.lengthInMeters) longestDino = dino;
  }

  // Convert the length from meters to feet.
  let lengthInFeet = longestDino.lengthInMeters * 3.281;
  
  // Creates an object with longest dinosaur's name as the key and its length in feet as the value.
  return { [longestDino.name]: lengthInFeet };
}

/**
 * getDinosaurDescription()
 * ---------------------
 * Returns a formatted description of a dinosaur. If the dinosaur cannot be found, returns an error message.
 *
 * NOTE: Carefully view the test output and example below to see how the returned string should be formatted.
 *
 * NOTE: The `\n` represents a new line in text.
 *
 * @param {Object[]} dinosaurs - An array of dinosaur objects. See the `data/dinosaurs.js` file for an example of the input.
 * @param {string} id - The unique identifier for the dinosaur.
 * @returns {string} A detailed description of the dinosaur.
 *
 * EXAMPLE:
 *  getDinosaurDescription(dinosaurs, "U9vuZmgKwUr");
 *  //> "Xenoceratops (ZEE-no-SEH-ruh-tops)\nXenoceratops had horns and a bony frill with elaborate ornamentation of projections, knobs, and spikes. It lived in the Early Cretaceous period, over 77.5 million years ago."
 *
 *  getDinosaurDescription(dinosaurs, "incorrect-id");
 *  //> "A dinosaur with an ID of 'incorrect-id' cannot be found."
 */
function getDinosaurDescription(dinosaurs, id) {
  // Finds if the 'id' matches any in the 'dinosaurs' array.
  let dinos = dinosaurs.find(dino => dino.dinosaurId === id)

  // Handles the case where 'id' doesn't match.
  if (!dinos) return `A dinosaur with an ID of '${id}' cannot be found.`;

  // Value for 'mya' is based on 'dino.mya' length.
  let mya = dinos.mya.length === 1 ? dinos.mya[0] : dinos.mya[1];

  // Returns the specific dinosaur description.
  return `${dinos.name} (${dinos.pronunciation})\n${dinos.info} It lived in the ${dinos.period} period, over ${mya} million years ago.`;
}

/**
 * getDinosaursAliveMya()
 * ---------------------
 * Returns an array of dinosaurs who were alive at the given `mya` (i.e. "millions of years ago") value. If a `key` is provided, returns the value of that key for each dinosaur alive at that time. Otherwise, returns the ID.
 *
 * If the dinosaur only has a single value for `mya`, allows for the `mya` value to be equal to the given value or one less. For example, if a dinosaur has a `mya` value of `[29]`, the dinosaur's information will be returned if `29` is entered or `28` is entered.
 *
 * @param {Object[]} dinosaurs - An array of dinosaur objects. See the `data/dinosaurs.js` file for an example of the input.
 * @param {number} mya - "Millions of years ago."
 * @param {string} key - An optional parameter. If included, for dinosaurs that lived during the `mya` value given, will return the value of the supplied key. Otherwise, returns the ID.
 * @returns {*[]} An array of values, which depend on the key given. The array should only include data of dinosaurs who lived during the given time period.
 *
 * EXAMPLE:
 *  getDinosaursAliveMya(dinosaurs, 150);
 *  //> ["YLtkN9R37", "GGvO1X9Zeh", "BFjjLjea-O", "V53DvdhV2A"]
 *
 *  getDinosaursAliveMya(dinosaurs, 65);
 *  //> ["WHQcpcOj0G"]
 *
 *  getDinosaursAliveMya(dinosaurs, 65, "name");
 *  //> ["Dracorex"]
 *
 *  getDinosaursAliveMya(dinosaurs, 65, "unknown-key");
 *  //> ["WHQcpcOj0G"]
 */
function getDinosaursAliveMya(dinosaurs, mya, key) {
  // Initialize an array to store dinosaurs that are alive.
  let arr = [];

  for (let dino of dinosaurs) {
    // Checks if mya is directly equal to, approximately equal to or is in between 'dino.mya' values.
    if (((mya === dino.mya[0])) || (dino.mya - mya === 1) || (mya <= dino.mya[0] && mya >= dino.mya[1])) {
      // If 'key' is given and exists in the dinosaur object, add its value to the array.
      if (dino[key] !== undefined) arr.push(dino[key]);

      // Handles the edge case where 'key' is incorrect by adding the 'dinosaurId' to the array.
      if (dino[key] === undefined) arr.push(dino.dinosaurId);
    }
  }

  // Returns the array of dinosaurs that are alive.
  return arr;
}

                                   // STRETCH GOALS //
// syllablesInDinosaurName returns how many syllables are inside a dinosaurs name
function syllablesInDinosaurName(dinosaurs, name) {
  // Checks for a dinosaur name that matches the given 'name'.
  let dino = dinosaurs.find(dino => dino.name === name);

  // Checks if 'dino' has a value.
  if (dino){
    // Initializes count variable that contains a number that represents the length of the array that the 'split' method produces. 
    let count = dino.pronunciation.split("-").length

    // Formatted return
    return `${name} has ${count} syllables in its name.`
  }

  // Handles edge case where 'name' isn't in the dinosaur list.
  return `${name} not found in the dinosaur list.`
}

console.log(syllablesInDinosaurName(exampleDinosaurData, "Dracorex"));
console.log(syllablesInDinosaurName(exampleDinosaurData, "Elasmosaurus"));
console.log(syllablesInDinosaurName(exampleDinosaurData, "Allosaurus"));
console.log(syllablesInDinosaurName(exampleDinosaurData, "T Rex"));


// dinoMeaning takes the dinosaurs name as an argument and returns the meaning of the dinosuar's names
function dinoMeaning(dinosaurs, name) {
  
}

// dinoPeriod takes the dinosaurs id and returns the dinosaurs name and period in an object
function dinoPeriod(dinosaurs, id) {

}

module.exports = {
  getLongestDinosaur,
  getDinosaurDescription,
  getDinosaursAliveMya,
  syllablesInDinosaurName,
  dinoMeaning,
  dinoPeriod,
};
