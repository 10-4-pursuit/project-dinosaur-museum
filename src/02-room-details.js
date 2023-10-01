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
  const dinosaur = dinosaurs.find((dino) => dino.name === dinosaurName)
  //.find looks for the first instance in the array that satisfies the function (searching for the name)
  if (!dinosaur) {
    return `Dinosaur with name '${dinosaurName}' cannot be found.`
    //if the dinosaur doesn't exist or can't be found in a room, return the error
  }
  const room = rooms.find(room => room.dinosaurs.includes(dinosaur.dinosaurId))
  //.find looks for the first element in the array that satisfies the function (if the rooms array includes a dinosaur that matches the dinosaurId)
  return room ? room.name : `Dinosaur with name '${dinosaurName}' cannot be found in any rooms.`
  //if there is a room return the room name else return the error
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
  const room = rooms.find(connected => id === connected.roomId)
  //rooms.find looks for the first instance in the array that satisfies the function (searching for the room ID) 
  if (!room) {
    return `Room with ID of '${id}' could not be found.`
    //if the room ID can't be found return an error
  }
  const conArray = room.connectsTo.map(connectsTo => {
    //.map creates the new array of connected rooms
    const connected = rooms.find(connected => connectsTo === connected.roomId)
    //.find looks for the matching ID of the connected room
    if (!connected) {
      return
    }
    return connected.name
    //returns the name of the connected room
  })
  if (conArray.includes(undefined)) {
    //.includes checks the new array for undefined
    return "Room with ID of 'incorrect-id' could not be found."
  }
  return conArray
}
module.exports = {
  getRoomByDinosaurName,
  getConnectedRoomNamesById,
};
