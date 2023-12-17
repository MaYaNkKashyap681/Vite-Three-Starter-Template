class Visualizer {
    constructor(mesh, frequencyUniformName) {
      this.mesh = mesh;
      this.frequencyUniformName = frequencyUniformName;
      this.mesh.material.uniforms[this.frequencyUniformName] = {value: 0};
  
      this.listener = new THREE.AudioListener();
      this.mesh.add(this.listener);
  
      this.sound = new THREE.Audio(this.listener);
      this.loader = new THREE.AudioLoader();
  
      this.analyzer = new THREE.AudioAnalyser(this.sound, 32);
    }
  
    load(path) {
      this.loader.load(path, (buffer) => {
        this.sound.setBuffer(buffer);
        this.sound.setLoop(true)
        this.sound.setVolume(0.5)
        this.sound.play();
      })
    }
  
    getFrequency() {
      return this.analyzer.getAverageFrequency();
    }
  
    update() {
      const freq = this.getFrequency() / 50.0;
      this.mesh.material.uniforms[this.frequencyUniformName].value = freq;
      console.log(freq);
    }
  }
  