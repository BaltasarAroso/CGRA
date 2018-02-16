class MyUnitCubeQuad extends CGFobject {
  constructor(scene) {
    super(scene);
    this.front = new MyQuad(this.scene);
    this.front.initBuffers();
    this.back = new MyQuad(this.scene);
    this.back.initBuffers();
    this.top = new MyQuad(this.scene);
    this.top.initBuffers();
    this.bottom = new MyQuad(this.scene);
    this.bottom.initBuffers();
    this.left = new MyQuad(this.scene);
    this.left.initBuffers();
    this.right = new MyQuad(this.scene);
    this.right.initBuffers();
  };

  display() {
    this.scene.pushMatrix();
    this.scene.translate(0, 0, 0.5);
    this.front.display();

    this.scene.rotate(180*this.scene.deg2rad, 0, 1, 0);
    this.scene.translate(0, 0, 1);
    this.back.display();

    this.scene.rotate(-90*this.scene.deg2rad, 1, 0, 0);
    this.scene.translate(0, 0.5, 0.5);
    this.top.display();

    this.scene.rotate(180*this.scene.deg2rad, 1, 0, 0);
    this.scene.translate(0, 0, 1);
    this.bottom.display();

    this.scene.rotate(90*this.scene.deg2rad, 0, 1, 0);
    this.scene.translate(0.5, 0, 0.5);
    this.left.display();

    this.scene.rotate(180*this.scene.deg2rad, 0, 1, 0);
    this.scene.translate(0, 0, 1);
    this.right.display();
  }

};
