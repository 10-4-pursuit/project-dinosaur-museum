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
  //  CONST dinosaur var holds FIND dinosaur name value 
  const dinosaur = dinosaurs.find(dino => dino.name === dinosaurName);
  //  IF not dinosaur RETURN error message
  if (!dinosaur) {
    return `Dinosaur with name '${dinosaurName}' cannot be found.`;
  }
  // CONST rm var holds FIND room that includes dinosaur by ID
  const rm = rooms.find(room => room.dinosaurs.includes(dinosaur.dinosaurId));
  // IF not room RETURN error message
  if (!rm) {
    return `Dinosaur with name '${dinosaurName}' cannot be found in any rooms.`;
  }
  // RETURN room by name of dinosaur
  return rm.name;
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
  // LET rm var holds FIND room by id
  let rm = rooms.find(room => room.roomId === id);
  // IF not room return error message
  if (!rm) {
    return `Room with ID of '${id}' could not be found.`
  }
  // LET connectedRms var hold MAP arr of room connections found by room ids
  let connectedRms = rm.connectsTo.map((connects) => rooms.find(room => room.roomId === connects));
  // LET findUndef var hold the found index that is undefined 
  let findUndef = connectedRms.findIndex((cncts) => cncts === undefined);
  // IF undefined is strictly -1 RETURN connected rooms and their names
  if (findUndef === -1) {
    return connectedRms.map((ctdRms) => ctdRms.name);
  } else {
    // ELSE RETURN error message 
    return `Room with ID of '${rm.connectsTo[findUndef]}' could not be found.`;
  }
}

module.exports = {
  getRoomByDinosaurName,
  getConnectedRoomNamesById,
};
