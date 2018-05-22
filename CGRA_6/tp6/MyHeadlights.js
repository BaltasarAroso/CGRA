/**
 * MyHeadlights
 * @constructor
 */
class MyHeadlights extends CGFobject {
	constructor(scene, axisZ = 1) {
		super(scene);
		this.axisZ = axisZ;

		this.myHeadlight = new MyLamp(this.scene, 20, 20);
	};

	display() {
		
		this.scene.scale(0.7, 1, 1);

		// Left headlight
		this.scene.pushMatrix();
			this.scene.rotate(-90 * degToRad, 0, 0, 1);
			this.scene.translate(0, -0.5, 1.5 * this.axisZ);
			this.myHeadlight.display();
		this.scene.popMatrix();

		// Right headlight
		this.scene.pushMatrix();
			this.scene.rotate(-90 * degToRad, 0, 0, 1);
			this.scene.translate(0, -0.5, -1.5 * this.axisZ);
			this.myHeadlight.display();
		this.scene.popMatrix();

  };
}
