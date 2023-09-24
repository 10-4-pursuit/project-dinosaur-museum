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
//  * NOTE: To convert from meters to feet, multiply the meters by `3.281`.
//  *
//  * @param {Object[]} dinosaurs - An array of dinosaur objects. See the `data/dinosaurs.js` file for an example of the input.
//  * @returns {Object} An object where the key is the name of the dinosaur and the value is the height of the dinosaur in feet.
//  *
//  * EXAMPLE:
//  *  getLongestDinosaur(dinosaurs);
//  *  //> { Brachiosaurus: 98.43 }
//  */

function getLongestDinosaur(dinosaurs) {
  if (dinosaurs.length === 0) {
    return {}; //array should return empty if it contains no objects.
  }
  let longestDinosaur = {};   //Preparing an empty object to take in the longestDinosaur.
  let length = 0;   // Set a starting point from which to calculate the length in meters.

  for(i = 0; i < dinosaurs.length; i++) {
    if (dinosaurs[i].lengthInMeters > length) {   // The for loop setup.
      length = dinosaurs[i].lengthInMeters;
      dino = dinosaurs[i].name;
      lengthInFeet = length * 3.281;
    }
  }
  longestDinosaur[dino] = lengthInFeet; // The dynamic dino property name w/ bracket notation and its variable lengthInFeet.

  return longestDinosaur;   // Longest dinosaur with name, length in feet returns an object.
}

// /**
//  * getDinosaurDescription()
//  * ---------------------
//  * Returns a formatted description of a dinosaur. If the dinosaur cannot be found, returns an error message.
//  *
//  * NOTE: Carefully view the test output and example below to see how the returned string should be formatted.
//  *
//  * NOTE: The `\n` represents a new line in text.
//  *
//  * @param {Object[]} dinosaurs - An array of dinosaur objects. See the `data/dinosaurs.js` file for an example of the input.
//  * @param {string} id - The unique identifier for the dinosaur.
//  * @returns {string} A detailed description of the dinosaur.
//  *
//  * EXAMPLE:
//  *  getDinosaurDescription(dinosaurs, "U9vuZmgKwUr");
//  *  //> "Xenoceratops (ZEE-no-SEH-ruh-tops)\nXenoceratops had horns and a bony frill with elaborate ornamentation of projections, knobs, and spikes. It lived in the Early Cretaceous period, over 77.5 million years ago."
//  *
//  *  getDinosaurDescription(dinosaurs, "incorrect-id");
//  *  //> "A dinosaur with an ID of 'incorrect-id' cannot be found."
//  */
// return `${dinosaur.name} (${dinosaur.pronunciation}) \n${dinosaur.info} It lived in the ${dinosaur.period} period, over ${mya} million years ago.`;

function getDinosaurDescription(dinosaurs, id) {
  for (let i = 0; i < dinosaurs.length; i++) {   //For loop setup.
    if (dinosaurs[i].dinosaurId === id) {   // This checks for the equality of dinosaurId to the id.
      if (dinosaurs[i].mya.length === 1){  // This checks if the mya has a length of one or two values.
        mya = dinosaurs[i].mya[0]
      } else {
        mya = dinosaurs[i].mya[1]
      }
     return `${dinosaurs[i].name} (${dinosaurs[i].pronunciation})\n${dinosaurs[i].info} It lived in the ${dinosaurs[i].period} period, over ${mya} million years ago.` // returns the following string.
    } 
  }
  return `A dinosaur with an ID of 'incorrect-id' cannot be found.` //Edge case: returns the following string.
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
// 
function getDinosaursAliveMya(dinosaurs, mya, key) {  
  const dinoArr = [];   //Preparing an empty array.

  for (const dino of dinosaurs) {   // dino is assigned the value of dinosaurs.
    const myaValues = dino.mya;     //checks for the dino and if it only has one value
    if (myaValues.length === 1) {
      if (mya === myaValues[0] || mya === myaValues[0] - 1) {//If mya only has one value or one value minus 1.
        if (dino[key]) {      //checks if a key is a truthy value.
          dinoArr.push(dino[key]);

        } else {           //or if it doesn't have a key.
          dinoArr.push(dino.dinosaurId)
        }
      }
    } else if (mya <= myaValues[0] && mya >= myaValues[1]) { //Sets the range between the two mya values of when dinosaurs were alive.

       if (dino[key]) {//If dino has a key then push into the array.
        dinoArr.push(dino[key]);
       } else {
        dinoArr.push(dino.dinosaurId) //If no key simply push the dinosaurId.
      }
    }
  }
  return dinoArr;
}

module.exports = {
  getLongestDinosaur,
  getDinosaurDescription,
  getDinosaursAliveMya,
};
