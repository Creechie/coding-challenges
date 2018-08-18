import toxi.geom.*;
import toxi.physics3d.*;
import toxi.physics3d.behaviors.*;
import toxi.physics3d.constraints.*;

float scale = 7;
float scaleDiagonal = sqrt((scale*scale)+(scale*scale)); //Springs joining diagonally need to be longer
//Number of particles, rows and columns
int rows = 60;
int cols = 60;

Particle[][] particles = new Particle[rows][cols];
ArrayList<Spring> springs;

VerletPhysics3D physics;

void setup() {
  size(800, 800, P3D);
  springs = new ArrayList<Spring>();

  physics = new VerletPhysics3D();
  Vec3D gravity = new Vec3D(0, 0.25, 0);
  GravityBehavior3D gb = new GravityBehavior3D(gravity);
  physics.addBehavior(gb);

  //Create particles
  float z = -200;
  for (int r = 0; r < rows; r++) {
    float x = -200;
    for (int c = 0; c < cols; c++) {
      Particle p = new Particle(x, -200, z); 
      particles[r][c] = p;
      physics.addParticle(p);
      x = x + scale;
    }
    z = z + scale;
  }

  //Connect springs
  for (int c = 0; c < cols - 1; c++) {
    for (int r = 0; r < rows -1; r++) {
      Particle a1 = particles[r][c];
      Particle b1 = particles[r+1][c];

      Particle a2 = particles[r][c];
      Particle b2 = particles[r][c+1];

      Particle a3 = particles[r][c];
      Particle b3 = particles[r+1][c+1];

      Spring s;
      if (r < rows-2) {
        s = new Spring(a1, b1, scale);
        springs.add(s);
        physics.addSpring(s);
      }
      if (c < cols-2) {
        s = new Spring(a2, b2, scale);
        springs.add(s);
        physics.addSpring(s);
      }
      if (c < cols-2 && r < rows-2) {
        s = new Spring(a3, b3, scaleDiagonal);
        springs.add(s);
        physics.addSpring(s);
      }
    }
  }

  //Locking particles
  particles[0][0].lock();
  particles[0][cols-2].lock();
  particles[rows-2][cols-2].lock();
  //particles[rows-2][0].lock();
}

float a = 0;
void draw() {
  background(51);
  translate(width/2, height/2);
  //Rotate scene
  rotateY(a);
  a += 0.005;

  physics.update();

  //for (int i = 0; i < rows-1; i++) {
  //  for (int j = 0; j < cols-1; j++) {
  //    particles[i][j].display();
  //  }
  //}
  for (Spring   s : springs) {
    s.display();
  }
}
