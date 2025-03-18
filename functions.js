
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
function randomNum(max){
  return Math.floor(Math.random() * max)+1;
}
function random_choice(list){
  let i = Math.floor(Math.random() * list.length);
  let r = list[i];
  return r;
}
//takes to equal sized lists and makes a random choice affected by weights
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
for (var i = 0;i<10;i++){
console.log(weighted_choice(["stone","iron","gold"],[50,40,10]))}