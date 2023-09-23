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
function getRoomByDinosaurName(dinosaurs, rooms, dinosaurName) {
  const dinosaur = dinosaurs.find(dino => dino.name === dinosaurName)
  if (!dinosaur) {
    return `Dinosaur with name '${dinosaurName}' cannot be found.`
  }
  const room = rooms.find(r => r.dinosaurs.includes(dinosaur.dinosaurId))
  if (room) {
    return room.name
  }
  else {
    return `Dinosaur with name '${dinosaurName}' cannot be found in any rooms.`
  }
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
function getConnectedRoomNamesById(rooms, id) { 
  // created a room variable whcih returns the room object within the rooms array of object that meets the condition of containing the roomId that matches the Id that they are giving us
  const room = rooms.find(r => id === r.roomId)
  // created an If statement to check to see if the room object containing the specific room Id value give to us exists. If it doesnt return an error message
  if(!room){
    return `Room with ID of '${id}' could not be found.`
  } 
  console.log(room.connectsTo)
  // created a new variable that first uses the find method to find the room names that corrrespond to the room Ids in the array assigned to the connectsTo key within the room object that contains the matching room Id given to us and then uses the map method to map over the array of rooms assigned to the key connectsTo within the room object that has the matching Id we are looking for with a new aray of values where each value is the room name mapped over the roomId in the connectsToId array
 const newArr = room.connectsTo.map(connectsToId => {
  const r = rooms.find(r => connectsToId === r.roomId)
  // created an if statement that checks to see if the room associated with each room Id in the array of rooms assigned to the connectsTo key within the room object that contains the room Id that matches with the Id given to us is actually a real room
  if(!r){
    return 
  }
  return r.name
  })
  // created an if statement to check to see if the newAr variable we created to contain the room names that correspond to the room Ids in the array assigned to the connectsTo key within the room object that contains the room Id that matches the Id given to us contains a room Id that does not match up with an existing room name within the Rooms array of objects
  if(newArr.includes(undefined)){
    return "Room with ID of 'incorrect-id' could not be found."
  }
  return newArr
}

module.exports = {
  getRoomByDinosaurName,
  getConnectedRoomNamesById,
};
