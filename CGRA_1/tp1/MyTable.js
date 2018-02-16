/**
 * MyTable
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyTable extends CGFobject
{
	constructor(scene) {
		super(scene);
    this.cover = new MyUnitCubeQuad(this.scene);
    this.leg1 = new MyUnitCubeQuad(this.scene);
    this.leg2 = new MyUnitCubeQuad(this.scene);
    this.leg3 = new MyUnitCubeQuad(this.scene);
    this.leg4 = new MyUnitCubeQuad(this.scene);
	};

  display() {
    this.scene.pushMatrix();
    this.scene.pushMatrix();
    this.scene.pushMatrix();
    this.scene.pushMatrix();

    this.scene.translate(2.5, 3.5, 1.5);
    this.scene.scale(5, 0.3, 3);
    this.cover.display();

    this.scene.popMatrix();

    this.scene.translate(0.5, 1.75, 0.5);
    this.scene.scale(0.3, 3.5, 0.3);
    this.leg1.display();

    this.scene.popMatrix();

    this.scene.translate(0.5, 1.75, 3-0.5);
    this.scene.scale(0.3, 3.5, 0.3);
    this.leg2.display();

    this.scene.popMatrix();

    this.scene.translate(5-0.5, 1.75, 0.5);
    this.scene.scale(0.3, 3.5, 0.3);
    this.leg3.display();

    this.scene.popMatrix();

    this.scene.translate(5-0.5, 1.75, 3-0.5);
    this.scene.scale(0.3, 3.5, 0.3);
    this.leg4.display();

  }

};
