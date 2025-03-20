//js class for generating perlin noise gradient maps
var frequency =.212
class PerlinNoise {
    constructor(seed) {
      //generates a random
      this.grad = new Array(256);
      this.perm = new Array(256);
      this.seed = seed || Math.random();
  
      this.init();
    }
  
    init() {
      const random = this.createSeededRandom(this.seed);
      for (let i = 0; i < 256; i++) {
        this.grad[i] = this.randomVector(random);
        this.perm[i] = i;
      }
  
      for (let i = 255; i > 0; i--) {
        const j = Math.floor(random() * (i + 1));
        [this.perm[i], this.perm[j]] = [this.perm[j], this.perm[i]];
      }
    }
  
    createSeededRandom(seed) {
      const mask = 0xffffffff;
      let m_w = (seed ^ 123456789) & mask;
      let m_z = (987654321 ^ seed) & mask;
  
      return function() {
        m_z = (36969 * (m_z & 65535) + (m_z >>> 16)) & mask;
        m_w = (18000 * (m_w & 65535) + (m_w >>> 16)) & mask;
        let result = ((m_z << 16) + (m_w & 65535)) >>> 0;
        result /= 4294967296;
        return result;
      }
    }
  
    randomVector(random) {
        const angle = random() * 2 * Math.PI;
        return { x: Math.cos(angle), y: Math.sin(angle) };
    }
  
    dot(g, x, y) {
      return g.x * x + g.y * y;
    }
  //function for smoothstep interpolation
    lerp(a, b, t) {
      return a + t * (b - a);
    }
  
    fade(t) {
      return t * t * t * (t * (t * 6 - 15) + 10);
    }
  
    noise(x, y) {
      //rounds down both the x and y values and makes sure they are oth in the appropiate range
      const X = Math.floor(x) & 255;
      const Y = Math.floor(y) & 255;
      //sets variables for both the rounded down x and y values
      const xf = x - Math.floor(x);
      const yf = y - Math.floor(y);
      //applies the fade method to both values
      const u = this.fade(xf);
      const v = this.fade(yf);
      //get values for each corner
      const g1 = this.grad[this.perm[X + this.perm[Y]]];
      const g2 = this.grad[this.perm[X + 1 + this.perm[Y]]];
      const g3 = this.grad[this.perm[X + this.perm[Y + 1]]];
      const g4 = this.grad[this.perm[X + 1 + this.perm[Y + 1]]];
      //calculate dot products for each corner
      const n1 = this.dot(g1, xf, yf);
      const n2 = this.dot(g2, xf - 1, yf);
      const n3 = this.dot(g3, xf, yf - 1);
      const n4 = this.dot(g4, xf - 1, yf - 1);
      //interpolate the dot products and calculate the final value using smoothstep
      const ix1 = this.lerp(n1, n2, u);
      const ix2 = this.lerp(n3, n4, u);
      const value = this.lerp(ix1, ix2, v);
  
      return value;
    }
  }
var canvas = document.getElementByID("noise_canvas");
var noise = new PerlinNoise(1234);
for(var x = 0;x<10;x++){
  for(var y=0;y<10;y++){
  var noise_val = noise.noise(x*frequency,y*frequency)
  console.log(Math.round(noise_val * 100) / 100);
  }
}