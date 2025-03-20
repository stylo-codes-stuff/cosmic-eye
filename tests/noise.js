//js class for generating perlin noise gradient maps
var frequency = .212
class Vector2 {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}

	dot(other) {
		return this.x*other.x + this.y*other.y;
	}
}

function Shuffle(arrayToShuffle) {
	for(let e = arrayToShuffle.length-1; e > 0; e--) {
		const index = Math.round(Math.random()*(e-1));
		const temp = arrayToShuffle[e];
		
		arrayToShuffle[e] = arrayToShuffle[index];
		arrayToShuffle[index] = temp;
	}
}

function MakePermutation() {
	const permutation = [];
	for(let i = 0; i < 256; i++) {
		permutation.push(i);
	}

	Shuffle(permutation);
	
	for(let i = 0; i < 256; i++) {
		permutation.push(permutation[i]);
	}
	
	return permutation;
}
const Permutation = MakePermutation();

function GetConstantVector(v) {
	// v is the value from the permutation table
	const h = v & 3;
	if(h == 0)
		return new Vector2(1.0, 1.0);
	else if(h == 1)
		return new Vector2(-1.0, 1.0);
	else if(h == 2)
		return new Vector2(-1.0, -1.0);
	else
		return new Vector2(1.0, -1.0);
}

function Fade(t) {
	return ((6*t - 15)*t + 10)*t*t*t;
}

function Lerp(t, a1, a2) {
	return a1 + t*(a2-a1);
}

function Noise2D(x, y) {
	const X = Math.floor(x) & 255;
	const Y = Math.floor(y) & 255;

	const xf = x-Math.floor(x);
	const yf = y-Math.floor(y);

	const topRight = new Vector2(xf-1.0, yf-1.0);
	const topLeft = new Vector2(xf, yf-1.0);
	const bottomRight = new Vector2(xf-1.0, yf);
	const bottomLeft = new Vector2(xf, yf);
	
	// Select a value from the permutation array for each of the 4 corners
	const valueTopRight = Permutation[Permutation[X+1]+Y+1];
	const valueTopLeft = Permutation[Permutation[X]+Y+1];
	const valueBottomRight = Permutation[Permutation[X+1]+Y];
	const valueBottomLeft = Permutation[Permutation[X]+Y];
	
	const dotTopRight = topRight.dot(GetConstantVector(valueTopRight));
	const dotTopLeft = topLeft.dot(GetConstantVector(valueTopLeft));
	const dotBottomRight = bottomRight.dot(GetConstantVector(valueBottomRight));
	const dotBottomLeft = bottomLeft.dot(GetConstantVector(valueBottomLeft));
	
	const u = Fade(xf);
	const v = Fade(yf);
	
	return Lerp(u,
		Lerp(v, dotBottomLeft, dotTopLeft),
		Lerp(v, dotBottomRight, dotTopRight)
	);
}
var canvas = document.getElementById("noise_canvas")
const ctx = canvas.getContext("2d");
for(var x = 0;x<100;x++){
  for(var y=0;y<100;y++){
  var noise_val = Noise2D(x+frequency,y+frequency)
    var rounded_val = Math.round(noise_val * 100) / 100;
    if(rounded_val <0){
      rounded_val *= -1;
    }
y    //similar to pen down in scratch
      ctx.beginPath();
      //creates a circle with the specified radius at said coordinates
      ctx.arc(x*5,y*5, 10, 0, Math.PI * 2);

      //sets and fills it with the specified color
      ctx.fillStyle = `rgb(0 0 0 / ${rounded_val})`;
      ctx.fill();
      //similar to pen down
      ctx.closePath();
  }
}