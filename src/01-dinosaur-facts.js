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
  //Checking that the dinosaur array should return empty if it contains no objects.
  if (dinosaurs.length === 0) {
    return {};
  }
//Setting up a for loop to iterate through the array of objects.
  for (let i = 0; i < dinosaurs.length; i++) {
  // Creating a value and initializing it to contain the key of dinosaur name and dinosaur length in meters.
  let longestDinosaur = {
    [dinosaurs[i].name]: dinosaurs[i].lengthInMeters * 3.281,
  };
  //Creating a value to contain the longest length(is this the same as height??)of dinosaur in meters.
  let longestLength = dinosaurs[0].lengthInMeters * 3.281;
 
  //Creating and initializing a variable with a dinosaur within the array at any particular index.
    const currentDinosaur = dinosaurs[i];
  //creating a variable to contain the newly created currentDinosaur-pointing to the lengthInMeters within the array and already converting the unit from meters to feet.
    const currentLength = currentDinosaur.lengthInMeters * 3.281;
  // If the current dinosaur has the same length as the longest, add it to the result.
    if (currentLength >= longestLength) {
      if (currentLength === longestLength) {
  // If the current dinosaur is taller, reset the result to just that dinosaur.
        longestDinosaur[currentDinosaur.name] = currentLength;
      } else {
        // If the current dinosaur is taller, reset the result to just that dinosaur
        longestDinosaur = {
          [currentDinosaur.name]: currentLength,
        };
        //longestLength = currentLength;
      }
    }
    const result = dinosaurs.filter((dino, index, arr) => dino.lengthInMeters === arr[0].lengthInMeters)[0];
  }

  return currentDinosaur;
}
// const result = dinosaurs.filter((dino, index, arr) => dino.lengthInMeters === arr[0].lengthInMeters)[0];

//   return result
// }

// function getLongestDinosaur(dinosaurs) {
//   if (dinosaurs.length === 0) {
//     return {};
//   }

//   const longestLength = dinosaurs[0].lengthInMeters;

//   const result = dinosaurs
//     .filter((dino) => dino.lengthInMeters === longestLength)
//     .map((dino) => ({
//       [dino.name]: dino.lengthInMeters * 3.281,
//     }))[0];

//   return result || {};
// }
// }

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
// function getDinosaurDescription(dinosaurs, id) {
// const dinosaur = dinosaurs.find((dinosaur) => dinosaur.dinosaurId === id);

// if (!dinosaur) {
//   return `A dinosaur with an ID of '${id}' cannot be found.`;
// }

// let mya;
// if (dinosaur.mya.length === 1) {
//   mya = dinosaur.mya[0];
  
// } else {
//   mya = dinosaur.mya[1];

// }

// return `${dinosaur.name} (${dinosaur.pronunciation}) \n${dinosaur.info} It lived in the ${dinosaur.period} period, over ${mya} million years ago.`;

// }

function getDinosaurDescription(dinosaurs, id) {
  for (let i = 0; i < dinosaurs.length; i++) {
    if (dinosaurs[i].dinosaurId === id) {
      if (dinosaurs[i].mya.length === 1){
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
// 
function getDinosaursAliveMya(dinosaurs, mya, key) {  
  const dinoArr = [];
  
  for (const dino of dinosaurs) {
    const myaValues = dino.mya;
    if (myaValues.length === 1) {
      if (mya === myaValues[0] || mya === myaValues[0] - 1) {
        if (dino[key]) {
          dinoArr.push(dino[key]);
        } else {
          dinoArr.push(dino.dinosaurId)
        }
      }
    } else if (mya <= myaValues[0] && mya >= myaValues[1]) {
      if (dino[key]) {
        dinoArr.push(dino[key]);
      } else {
        dinoArr.push(dino.dinosaurId)
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
