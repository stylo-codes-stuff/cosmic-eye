
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
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
function random_choice(list){
  let i = Math.floor(Math.random() * list.length);
  let r = list[i];
  return r;
}
