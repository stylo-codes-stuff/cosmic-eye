function lcg(seed) {
    this.seed = seed % 2147483647; // Ensure seed is within range
    if (this.seed <= 0) this.seed += 2147483646; // Ensure seed is positive
  
    return () => {
      this.seed = (this.seed * 16807) % 2147483647;
      return (this.seed - 1) / 2147483646;
    };
  }

  
  // Generate a random integer within a specific range
  function getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(gen() * (max - min + 1)) + min;
  }
