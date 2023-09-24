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
  let id = [];   //initializing an empty array.


  for (let dinosaur of dinosaurs) {     //Checking if dinosaur has a name and a room.
    if (dinosaurName === dinosaur.name){
      for (let room of rooms) {
        if (room.dinosaurs.includes(dinosaur.dinosaurId)) {//These are the dinosaurs with a name, room and Id.
           return room.name;
    }
  }
    return `Dinosaur with name '${dinosaurName}' cannot be found in any rooms.`; //Error message when dinosaur cannot be found in any room.
    }
  }
    return `Dinosaur with name '${dinosaurName}' cannot be found.`  //Error message if dinosaur cannot be found at all.
  
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
  let room = rooms.find(room => room.roomId === id); //Initialize the variable room. The Higher Order Function is the .find()method using a callback function.
  if (!room) return `Room with ID of '${id}' could not be found.`;
  
  let connected = room.connectsTo.map((connects) => rooms.find(room => room.roomId === connects)); //The .map() creates a new array of connect rooms.

  let Undef = connected.findIndex((connect) => connect === undefined); //Rooms that are undefined returns an error message.

  if (Undef === -1) return connected.map(connectedroom => connectedroom.name);//Connected rooms not found
  if (Undef !== -1) return `Room with ID of '${room.connectsTo[Undef]}' could not be found.`;//Connections undefined.
}

module.exports = {
  getRoomByDinosaurName,
  getConnectedRoomNamesById,
};
