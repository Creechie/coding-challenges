class Spring extends VerletSpring3D {
  Spring(Particle a, Particle b, float scale) {
    super(a, b, scale, 0.5);
  }

  void display() {
    stroke(255);
    strokeWeight(1);
    line(a.x, a.y, a.z, b.x, b.y, b.z);
  }
}
