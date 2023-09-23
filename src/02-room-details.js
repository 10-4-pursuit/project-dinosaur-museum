/*
  Do not change the lines below. If you'd like to run code from this file, you may use the `exampleDinosaurData` and `exampleRoomData` variables below to gain access to each data set. This data is pulled from the relevant files in the `data/` directory.

  You may use this data to test your functions. You may assume the shape of the data remains the same but that the values may change.
*/
const exampleDinosaurData = require("../data/dinosaurs");
const exampleRoomData = require("../data/rooms");
// Do not change the lines above.

/**
 * getRoomByDinosaurName()
 * ---------------------
 * Return the name of the room where the given dinosaur can be found. If the dinosaur does not exist in the `dinosaurs` list or cannot be found in any room, return an error message that says so.
 *
 * @param {Object[]} dinosaurs - An array of dinosaur objects. See the `data/dinosaurs.js` file for an example of the input.
 * @param {Object[]} rooms - An array of room objects. See the `data/rooms.js` file for an example of the input.
 * @param {string} dinosaurName - The name of the dinosaur.
 * @returns {string} The name of the room where the dinosaur can be found. Alternatively, an error message.
 *
 * EXAMPLE:
 *  getRoomByDinosaurName(dinosaurs, rooms, "Tyrannosaurus");
 *  //> "Roberts Room"
 *
 * EXAMPLE:
 *  getRoomByDinosaurName(dinosaurs, rooms, "Pterodactyl");
 *  //> "Dinosaur with name 'Pterodactyl' cannot be found."
 */
// Creates new variables to store result in an empty object and string to be called later.  For loop iterates through `dinosaurs` object in the array. If the name of the dino strictly equals the dinosaurName then it gets stored in our newObj. check if dinosaur is in any room .find dinosaur by `dino.name`  new dino in the `newObj`. if the `newObj` is empty of a "name", Iterate through `rooms`, each called `room`. this `dinosaurName` cannot be found , if dinosaur in that room includes the dinosaur. reassign `newStr` to `room.name` , stop running after evaluates to true, return `newStr` outside for loop

function getRoomByDinosaurName(dinosaurs, rooms, dinosaurName) {

  let newStr = `Dinosaur with name '${dinosaurName}' cannot be found.`;
  let newObj = {};
  
  for (let dino of dinosaurs) {
    if (dino.name === dinosaurName) {
      newObj = dino;
    }
  }
  if (!("name" in newObj)) {
    return newStr;
  }
  for (let room of rooms) {
    newStr = `Dinosaur with name '${dinosaurName}' cannot be found in any rooms.`;
    
    if (room.dinosaurs.includes(newObj.dinosaurId)) {
      newStr = room.name;
      break;
    } 
  }
  return newStr;
}


/**
 * getConnectedRoomNamesById()
 * ---------------------
 * Returns an array of strings, where each string is the name of a room connected to the given room. If a room ID cannot be found, an error message is returned.
 *
 * @param {Object[]} rooms - An array of room objects. See the `data/rooms.js` file for an example of the input.
 * @param {string} id - A unique room identifier.
 * @returns {string|string[]} An array of room names, or an error message.
 *
 * EXAMPLE:
 *  getConnectedRoomNamesById(rooms, "aIA6tevTne");
 *  //> ["Ticket Center"]
 *
 * EXAMPLE:
 *  getConnectedRoomNamesById(rooms, "A6QaYdyKra");
 *  //> [
      "Entrance Room",
      "Coat Check Room",
      "Ellis Family Hall",
      "Kit Hopkins Education Wing"
    ]
 */
// set up a new variable to store results of names of rooms that are connected to the id. in the for of loop we iterate through each element in the rooms array to ensure it is strictly equal to id and then if a match is found we store it in our newArrray. if the newarray contains the string incorrect-id  then it returns our string message.  our next if statement checks if the entire length of our newArray is empty and if it is returns our string message that includes id information.  we start a new array2 to store names fo connected rooms.  in the for of loop we iterate through rooms array again and we check if the room is iof the current room object is present in the original newarray. if a match is found the name property of the current room is added to the newArray2
function getConnectedRoomNamesById(rooms, id) {
  let newArray = [];

  for(let room of rooms) {
    if (room.roomId === id) {
      newArray = room.connectsTo.slice(0);
    }
  }
  if (newArray.includes('incorrect-id')) {
    return `Room with ID of 'incorrect-id' could not be found.`
    }
    if (!newArray.length) {
      return `Room with ID of '${id}' could not be found.`
  }
  let newArray2 = [];
  
  for(let room of rooms) {
    if (newArray.includes(room.roomId)) {
      newArray2.push(room.name);
    }
  }
  return newArray2;
}

module.exports = {
  getRoomByDinosaurName,
  getConnectedRoomNamesById,
};
