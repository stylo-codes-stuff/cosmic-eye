let t1weapons = ["dirk","mace","broadsword"]
let t1enchants = ["cold","warm","staticky"]
let t1adjectives = ["heavy","dull"]
let t3adjectives = ["extravagant","unextraordinary","brilliant"]


//generates a random base64 seed of a specified length
function generateItemName(type,tier,enchanted){
   let name= ""
   if (tier == "1" ){
    name += random_choice(t1enchants);
   }
}
function generateRandomSeed(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}
function randomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//takes the inventory object and sorts every item alphabetically
function inventory_alphabetize(object){
}

function random_choice(list){
  let i = Math.floor(Math.random() * list.length);
  let r = list[i];
  return r;
}
//takes two equal sized lists and makes a random choice affected by weights corresponding to each item
//[item1,item2,item3]
//   ^     ^      ^
//[ 40   ,50    ,10]
function weighted_choice(items, weights) {
  var i;

  for (i = 1; i < weights.length; i++)
      weights[i] += weights[i - 1];
  
  var random = Math.random() * weights[weights.length - 1];
  
  for (i = 0; i < weights.length; i++)
      if (weights[i] > random)
          break;
  
  return items[i];
}
//function that returns true or false based on a percent chance
function percentChance(chance){
  if (chance <=1){
  if(Math.random().toFixed(2)<=chance){
    return true;
  }else{
    return false;
  }
}
return "Invalid chance must be a decimal between 0 and 1";
}
