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
// i create the variable output to store the array. if my object, dinosaur length is strictly equal to 0 then the output is my variable. i'm declaring another variable that will store the highestdino and then creating a for function that will iterate through the dinosaur array. then another variable asking dino to be dinosaurs starting at index i. i'm asking that if the dinosaur at lenghth in  Meters key is greater than the highest dino at that key then the highest din
function getLongestDinosaur(dinosaurs) {

const output = {}
if(dinosaurs.length === 0) {
  return output
}
let highestDino = dinosaurs[0];
for(let i = 0; i < dinosaurs.length; i++){
  let dino = dinosaurs[i];
  if(dino.lengthInMeters > highestDino.lengthInMeters) {
    highestDino = dino;
  }
} 
output[highestDino.name] = highestDino.lengthInMeters * 3.281

return output 
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
 * 
 * EXAMPLE:
 *  getDinosaurDescription(dinosaurs, "U9vuZmgKwUr");
 *  //> "Xenoceratops (ZEE-no-SEH-ruh-tops)\nXenoceratops had horns and a bony frill with elaborate ornamentation of projections, knobs, and spikes. It lived in the Early Cretaceous period, over 77.5 million years ago."
 *
 *  getDinosaurDescription(dinosaurs, "incorrect-id");
 *  //> "A dinosaur with an ID of 'incorrect-id' cannot be found."
 */
// first i iterate through each of the items in teh array with the for function and my if statement is asking that if dinosaursId in each of the dinosoaur entries starting at i is strictly equal to id then i'm returning the string dinosaur name, pronunciation, info adn period, mya sentence on line 75.  however there is another function that is asking that if dinososaurs starting from i at mya 0 index exists then that same return applies or ELSE if my at the same place but index 1 exists then that index data is used instead of 0.  this will camture the 1st or 2nd mya (depending on entry).  If none of those conditions are not met then teh return in 78 is applied because that will refer back to our original if statement having to do with ID (mya will not come into play)
function getDinosaurDescription(dinosaurs, id) {
  for (i = 0; i < dinosaurs.length; i++){
    if (dinosaurs[i].dinosaurId === id) {
      if (dinosaurs[i].mya.length === 1) {
        mya = dinosaurs[i].mya[0]
      } else {
        mya = dinosaurs[i].mya[1]
      }

    return `${dinosaurs[i].name} (${dinosaurs[i].pronunciation})\n${dinosaurs[i].info} It lived in the ${dinosaurs[i].period} period, over ${mya} million years ago.` 
    }
  }
  return `A dinosaur with an ID of 'incorrect-id' cannot be found.`
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
// declaring an empty array called newArray and iterating through the dinosaurs array and calling it dino. i'm comparing current dino.myat index 0 to my and at index 1. if a key is given i'm pushing dinokey into the new array  or else pushing dino dinosaur id in to the new array and then returning the output of my new array
function getDinosaursAliveMya(dinosaurs, mya, key) {
  let newArray = [];
  for (let dino of dinosaurs) {
    if (dino.mya[0] >= mya && dino.mya[1] <= mya && dino.mya.length === 2) {
      if (key && dino[key]) {
      newArray.push(dino[key]);
      } else {
        newArray.push(dino.dinosaurId);
      }
    }
    if (dino.mya[0] === mya || dino.mya[1] - 1 === mya) {
      if (key) {
        newArray.push(dino.dinosaurId);
      }
    }
  }
  return newArray;
}

module.exports = {
  getLongestDinosaur,
  getDinosaurDescription,
  getDinosaursAliveMya,
};
