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
  // IF no dinosaur RETURN empty obj
  if (dinosaurs.length === 0) return {};
  // Holds dinosaurs values 
  const dinos = [...dinosaurs];
  // SORT dinosaurs from longest to shortest
  dinos.sort((a, b) => b.lengthInMeters - a.lengthInMeters);
  // longest dinosaur from dinos arr
  const longest = dinos[0];
  // RETURN longest dinosaur's length in feet
  return {[longest.name]: longest.lengthInMeters * 3.281};
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
  //  dino var holds FIND dinosaur by id 
  let dino = dinosaurs.find(saurs => saurs.dinosaurId === id);
  //  IF not dino RETURN error message 
  if (!dino) return `A dinosaur with an ID of '${id}' cannot be found.`; 
  //  LET var era holds ternary IF arr conditions for mya
  let era = dino.mya.length === 1 ? dino.mya[0] : dino.mya[1];
  //  RETURN dinosaurs description 
  return `${dino.name} (${dino.pronunciation})\n${dino.info} It lived in the ${dino.period} period, over ${era} million years ago.`;
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
  //  LET dinosaur var hold a FILTER of mya conditions 
  let dinosaur = dinosaurs.filter(dinos => (mya === dinos.mya[0] ||  dinos.mya - mya === 1 || (mya >= dinos.mya[1]) && (mya <= dinos.mya[0])));
  //  RETURN MAP arr of key ternary conditions ≠
  return dinosaur.map(dino => (dino[key] !== undefined ? dino[key] : dino.dinosaurId));
}

//STRETCH GOAL//
/** getDinosaursByDiet
 * Returns an array of dinosaur names ordered by their diet and sorts them from oldest to most recent dinosaur in the list.
 * 
 * Should separate dinosaurs into `Carnivorous`, `Herbivorous` and `Omnivorous` arrays.
 * 
 * @param {Object[]} dinosaurs - An array of dinosaur objects. See the `data/dinosaurs.js` file for an example of the input.
 * @returns {string[]} An array of dinosaur names ordered by their diet and sorted from oldest to most recent dinosaur. 
 * 
 * EXAMPLE:
 * 
 * ***************"Dinosaur List"***************
 * 
 * ----------------"Carnivorous"----------------
 * //> ["Allosaurus"] 
 * ----------------"Herbivorous"----------------
 * //> ["Brachiosaurus"]
 * ----------------"Omnivorous"-----------------
 * //> ["Khaan"]
 */
function getDinosaursByDiet(dinosaurs) {
 // Variables holding filtered dinosaurs by their diet
 const carnivorous = dinosaurs.filter(dinosaur => dinosaur.diet === "carnivorous");
 const herbivorous = dinosaurs.filter(dinosaur => dinosaur.diet === "herbivorous");
 const omnivorous = dinosaurs.filter(dinosaur => dinosaur.diet === "omnivorous");
 // Var lines holds each variable above along with the mapped out and sorted by time of the dinosaur
 const lines = [
 `***************"Dinosaur List"***************`, 
 `----------------"Carnivorous"----------------`,
 `${carnivorous.sort((a, b) => b.mya[0] - a.mya[0]).map(dino => dino.name).join("\n")}`,
 `----------------"Herbivorous"----------------`,
 `${herbivorous.sort((a, b) => b.mya[0] - a.mya[0]).map(dino => dino.name).join("\n")}`,
`----------------"Omnivorous"-----------------`,
`${omnivorous.sort((a, b) => b.mya[0] - a.mya[0]).map(dino => dino.name).join("\n")}`,
 ];
 // RETURN lines all joined and seperated to make list
 return lines.join(`\n`);
}
console.log(getDinosaursByDiet(exampleDinosaurData));

module.exports = {
  getLongestDinosaur,
  getDinosaurDescription,
  getDinosaursAliveMya,
  getDinosaursByDiet,
};
