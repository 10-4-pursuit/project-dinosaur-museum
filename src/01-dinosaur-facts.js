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

  if (dinosaurs.length === 0) return {};

  const dinos = [...dinosaurs];

  dinos.sort((a, b) => b.lengthInMeters - a.lengthInMeters);

  const tallest = dinos[0];

  return {[tallest.name]: tallest.lengthInMeters * 3.281};
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

  let dino = dinosaurs.find(saurs => saurs.dinosaurId === id);

  if (!dino) return `A dinosaur with an ID of '${id}' cannot be found.`; 

  let mya = dino.mya.length === 1 ? dino.mya[0] : dino.mya[1];

  return `${dino.name} (${dino.pronunciation})\n${dino.info} It lived in the ${dino.period} period, over ${mya} million years ago.`;
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

  let dinosaur = dinosaurs.filter(dinos => (mya === dinos.mya[0] ||  dinos.mya - mya === 1 || (mya >= dinos.mya[1]) && (mya <= dinos.mya[0])));

  return dinosaur.map(dino => (dino[key] !== undefined ? dino[key] : dino.dinosaurId));
}

//STRETCH GOAL//
/** getDinosaursByPeriodAndDiet
 * Returns an array of dinosaur names ordered by their period and diet.
 * 
 * Should separate dinosaurs into `Carnivorous`, `Herbivorous` and `Omnivorous` arrays along with period they lived in.
 * 
 * @param {Object[]} dinosaurs - An array of dinosaur objects. See the `data/dinosaurs.js` file for an example of the input.
 * @returns {string[]} An array of dinosaur names ordered by their period and diet. 
 * 
 * EXAMPLE:
 * 
 * ***************"Dinosaur List"***************
 * 
 * ==============="Late Jurassic"===============
 * 
 * ----------------"Carnivorous"----------------
 * //> ["Tyrannosaurus"]
 * ----------------"Herbivorous"----------------
 * //> ["Dracorex"]
 * ----------------"Omnivorous"-----------------
 * //> ["Khaan"]
 */
function getDinosaursByPeriodAndDiet(dinosaurs) {
 let lines = [
  `***************"Dinosaur List"***************`,
 ];
 // from within dinosaur, I need period and mya
  // In order to sort chronologically I need a way for period to tie to mya
  // Periods = "Early Jurassic", "Late Jurassic", "Early Cretaceous", "Late Cretaceous"
  // MYA = 205 mya - 66 mya 

  //Which dinosaurs to grab
  //loop through the dinosaurs
  //create an {} using period as a key
  //in this object have a max and min with myas
  //by the end you should have a way to put out the eras chronologically how each period happens
  //should make it easier to sort through the periods 3
 dinosaurs.filter(dinosaur => dinosaur.period)
}
console.log(getDinosaursByPeriodAndDiet(exampleDinosaurData));

module.exports = {
  getLongestDinosaur,
  getDinosaurDescription,
  getDinosaursAliveMya,
  getDinosaursByPeriodAndDiet,
};
