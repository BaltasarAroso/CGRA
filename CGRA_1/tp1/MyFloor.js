/**
 * MyFloor
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyFloor extends CGFobject {
	constructor(scene) {
		super(scene);
    this.floor = new MyUnitCubeQuad(this.scene);
	};

  display() {
		this.scene.translate(4, 0, 3);
		this.scene.scale(8, 0.1, 6);
		this.floor.display();
  }

};
