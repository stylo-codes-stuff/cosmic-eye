//generates a random base64 seed of a specified length
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
//generates a random number from 0 to max
function randomNum(max){
  return Math.floor(Math.random() * max)+1;
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
