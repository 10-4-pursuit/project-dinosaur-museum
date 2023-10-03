/*
  Do not change the lines below. If you'd like to run code from this file, you may use the `exampleDinosaurData` and `exampleRoomData` variables below to gain access to each data set. This data is pulled from the relevant files in the `data/` directory.

  You may use this data to test your functions. You may assume the shape of the data remains the same but that the values may change.
*/
const exampleDinosaurData = require("../data/dinosaurs");
const exampleRoomData = require("../data/rooms");
// Do not change the lines above.

console.log(exampleRoomData)

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
  //Returns an error message if there is no match in our list of dinosaurs with the dinosaurName argument
  const findDinosaur = dinosaurs.find(dinosaur => dinosaur.name === dinosaurName)
  
  if (!findDinosaur){
    return `Dinosaur with name '${dinosaurName}' cannot be found.`;
}
   //Either returns the room name with matching dinosaurName or an error message if there is no room. 
  const findDinosaurRoom =  rooms.find(room => room.dinosaurs.includes(findDinosaur.dinosaurId))
   
  if (findDinosaurRoom){
    return findDinosaurRoom.name
}
     
  return `Dinosaur with name '${dinosaurName}' cannot be found in any rooms.`;

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
  // Check if the room ID is valid.
  const room = rooms.find(room => room.roomId === id);
    if (!room) {
      return `Room with ID of '${id}' could not be found.`;
    }
    
  // Get the names of all connected rooms.
  const connectedRoomNames = room.connectsTo.map(connected => {
    const connectedRoom = rooms.find(room => room.roomId === connected);
      if (!connectedRoom) {
        return `Room with ID of '${connected}' could not be found.`;
      }
        return connectedRoom.name;
      });
    
  // Return an error message if any of the connected room names are invalid.
  if (connectedRoomNames.some(roomName => roomName.includes('incorrect-id'))) {
    return `Room with ID of 'incorrect-id' could not be found.`;
  }
    
  // Return the names of all connected rooms.
  return connectedRoomNames;
  
    }

module.exports = {
  getRoomByDinosaurName,
  getConnectedRoomNamesById,
};
