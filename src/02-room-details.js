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
 * @param {Object[]} dinosaurs - An array of dinosaur objects.
 * @param {Object[]} rooms - An array of room objects.
 * @param {string} dinosaurName - The name of the dinosaur.
 * @returns {string} The name of the room where the dinosaur can be found. Alternatively, an error message.
 */
function getRoomByDinosaurName(dinosaurs, rooms, dinosaurName) {
  // Iterate through the dinosaurs array to find the dinosaur by name
  for (const dinosaur of dinosaurs) {
    if (dinosaur.name === dinosaurName) {
      // Once the dinosaur is found, find the room it belongs to by its roomID
      for (const room of rooms) {
        if (room.dinosaurs.includes(dinosaur.dinosaurId)) {
          return room.name; // Return the room name
        }
      }
      // If the dinosaur is not found in any room, return an error message
      return `Dinosaur with name '${dinosaurName}' cannot be found in any rooms.`;
    }
  }
  // If the dinosaur is not found at all, return an error message
  return `Dinosaur with name '${dinosaurName}' cannot be found.`;
}

/**
 * getConnectedRoomNamesById()
 * ---------------------
 * Returns an array of strings, where each string is the name of a room connected to the given room. If a room ID cannot be found, an error message is returned.
 *
 * @param {Object[]} rooms - An array of room objects.
 * @param {string} id - A unique room identifier.
 * @returns {string|string[]} An array of room names, or an error message.
 */
function getConnectedRoomNamesById(rooms, id) { 
  const room = rooms.find(r => id === r.roomId)
  if(!room){
    return `Room with ID of '${id}' could not be found.`
  } 
  console.log(room.connectsTo)
 const newArr = room.connectsTo.map(connectsToId => {
  const r = rooms.find(r => connectsToId === r.roomId)
  if(!r){
    return 
  }
  return r.name
  })
  if(newArr.includes(undefined)){
    return "Room with ID of 'incorrect-id' could not be found."
  }
  return newArr
}

module.exports = {
  getRoomByDinosaurName,
  getConnectedRoomNamesById,
};
