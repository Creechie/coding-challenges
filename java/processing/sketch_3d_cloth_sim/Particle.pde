class Particle extends VerletParticle3D {
  Particle(float x, float y, float z) {
    super(x, y, z);
  }

  void display() {
    noStroke();
    fill(255);
    ellipse(x, y, 3, 3);
  }
}
