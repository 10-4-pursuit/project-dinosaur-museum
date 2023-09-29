/*
  Do not change the line below. If you'd like to run code from this file, you may use the `exampleDinosaurData` variable below to gain access to tickets data. This data is pulled from the `data/dinosaurs.js` file.

  You may use this data to test your functions. You may assume the shape of the data remains the same but that the values may change.

  Keep in mind that your functions must still have and use a parameter for accepting all dinosaurs.
*/
const exampleDinosaurData = require("../data/dinosaurs");
// Do not change the line above.

console.log (exampleDinosaurData)
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
  //If there is no array, return an empty object
  if (dinosaurs.length === 0) {
    return {};
  } 
  
//initialize three variables, an object which will store the name and height of the tallest dinosaur, a string which will store the longest dinosaur's name, and a number which will store the the longest dinosaur's height
  let longestDinosaur = {};
  let longestDinosaurName = null;
  let longestDinosaurLength = 0;

  //This loops through the array of dinosaurs 
  for (let dinosaur of dinosaurs) {
    //Converts the length from meters to foot
          let dinosaurInFt = dinosaur.lengthInMeters * 3.281;
    //While looping, this update the name and height variable to represent the the longest dinosaur in the array
          if (dinosaurInFt > longestDinosaurLength){
            longestDinosaurName = dinosaur.name;
            longestDinosaurLength = dinosaurInFt
          }  
        }
    
      //this updates the longestDinosaur object to include the name as the key and the length as the value.
      longestDinosaur = {[longestDinosaurName]:longestDinosaurLength}
    
     
       return longestDinosaur;
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
  // STRETCH GOAL#1 Adding a Guard clause to check if the dinosaurs array is empty or null.
  if (!dinosaurs || !dinosaurs.length) {
    return `A dinosaur with an ID of '${id}' cannot be found.`;
  }
  
  //this makes a copy using the map() method and ...spread operator of the dinosaurs array so we don't mutate the original
  const dinosaursCopy = dinosaurs.map(dinosaur => ({ ...dinosaur }));

  //This makes a variable which looks through the dinosaursCopy array for the first element which matches the "id" arguement
  const dinosaur = dinosaursCopy.find(dinosaur => dinosaur.dinosaurId === id);

  // This lets us know that there is no dinosaur in the array that matches the ID
  if (!dinosaur) {
    return `A dinosaur with an ID of '${id}' cannot be found.`;
  }

 // This lets us that there is a match with the the ID perimeter and returns extra info. 
  return `${dinosaur.name} (${dinosaur.pronunciation})\n${dinosaur.info} It lived in the ${dinosaur.period} period, over ${Math.min(...dinosaur.mya)} million years ago.`;
  
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
  //If there is no array, return an empty object
  if (!dinosaurs.length || !dinosaurs) {
    return {};
  } 
    // Filter the dinosaurs to only include those that were alive at the given mya value.
    const dinosaursAlive = dinosaurs.filter(dinosaur => {
      const dinosaurAliveMya = dinosaur.mya;
      return (mya === dinosaurAliveMya[0] || mya === dinosaurAliveMya[0] - 1 || (mya <= dinosaurAliveMya[0] && mya >= dinosaurAliveMya[1]));
    });
  
    // Map the dinosaurs to the requested key value.
    const dinosaurKeys = dinosaursAlive.map(dinosaur => dinosaur[key] || dinosaur.dinosaurId);
  
    // Return the dinosaur keys.
    return dinosaurKeys;

}

module.exports = {
  getLongestDinosaur,
  getDinosaurDescription,
  getDinosaursAliveMya,
};
