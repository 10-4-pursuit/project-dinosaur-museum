
  


function getHerbivores(dinosaurs) {
  return dinosaurs.filter(dinosaur => dinosaur.diet === 'herbivore');
}

function getCarnivore(dinosaurs) {
  return dinosaurs.filter(dinosaur => dinosaur.diet === 'carnivore');
}



const herbivores = getHerbivores(dinosaurs);
console.log(herbivores);

const carnivore = getCarnivore(dinosaurs);
console.log(carnivore);





module.exports = {
    getHerbivores,
    getCarnivore,
}