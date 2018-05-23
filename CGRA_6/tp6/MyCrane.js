/**
 * MyCrane
 * @constructor
 */
class MyCrane extends CGFobject {
	constructor(scene, height = 1, range = 1) {
		super(scene);
		this.height = height;
		this.range = range;

		this.cylinder = new MyCylinder(this.scene, 100, 2);
		this.circle = new MyCircle(this.scene, 100);
	};

	display() {

		// bottom
		this.scene.pushMatrix();
			this.scene.rotate(-90 * degToRad, 1, 0, 0);
			this.cylinder.display();
		this.scene.popMatrix();

			// top base
			this.scene.pushMatrix();
				this.scene.translate(0, 1, 0);
				this.scene.rotate(-90 * degToRad, 1, 0, 0);
				this.circle.display();
			this.scene.popMatrix();

			// bottom base
			this.scene.pushMatrix();
				this.scene.rotate(-90 * degToRad, 1, 0, 0);
        this.scene.rotate(180 * degToRad, 1, 0, 0);
				this.circle.display();
			this.scene.popMatrix();

		// first
		this.scene.pushMatrix();
			this.scene.translate(0, 0.5, 0.5 * Math.sin(30 * degToRad));
			this.scene.rotate(-120 * degToRad, 1, 0, 0);
			this.scene.scale(0.5, 0.5, this.height);
			this.cylinder.display();
		this.scene.popMatrix();

		// top wheel
		this.scene.pushMatrix();
			this.scene.translate(-0.5, this.height * Math.cos(30 * degToRad) + 0.5, -(this.height * Math.sin(30 * degToRad) + 0.25));
			this.scene.rotate(90 * degToRad, 0, 1, 0);
			this.cylinder.display();
		this.scene.popMatrix();

			// front base
			this.scene.pushMatrix();
				this.scene.translate(0.5, this.height * Math.cos(30 * degToRad) + 0.5, -(this.height * Math.sin(30 * degToRad) + 0.25));
				this.scene.rotate(90 * degToRad, 0, 1, 0);
				this.circle.display();
			this.scene.popMatrix();

			// back base
			this.scene.pushMatrix();
				this.scene.translate(-0.5, this.height * Math.cos(30 * degToRad) + 0.5, -(this.height * Math.sin(30 * degToRad) + 0.25));
				this.scene.rotate(90 * degToRad, 0, 1, 0);
				this.scene.rotate(180 * degToRad, 1, 0, 0);
				this.circle.display();
			this.scene.popMatrix();

		// landing arm
		this.scene.pushMatrix();
			this.scene.translate(0, this.height * Math.cos(30 * degToRad) + 0.5, - (this.height * Math.sin(30 * degToRad) + this.range + 1));
			this.scene.scale(0.5, 0.5, this.range);
			this.cylinder.display();
		this.scene.popMatrix();

			// right base
			this.scene.pushMatrix();
				this.scene.translate(0, this.height * Math.cos(30 * degToRad) + 0.5, -(this.height * Math.sin(30 * degToRad) + this.range + 1));
				this.scene.rotate(180 * degToRad, 1, 0, 0);
				this.scene.scale(0.5, 0.5, 0.5);
				this.circle.display();
			this.scene.popMatrix();

		// pending cable
		this.scene.pushMatrix();
			this.scene.translate(0, this.height * Math.cos(30 * degToRad) + 0.5, - (this.height * Math.sin(30 * degToRad) + this.range + 1));
			this.scene.rotate(90 * degToRad, 1, 0, 0);
			this.scene.scale(0.1, 0.1, 2);
			this.cylinder.display();
		this.scene.popMatrix();

		// iman
		this.scene.pushMatrix();
			this.scene.translate(0, this.height * Math.cos(30 * degToRad) - 1.5, - (this.height * Math.sin(30 * degToRad) + this.range + 1));
			this.scene.rotate(90 * degToRad, 1, 0, 0);
			this.scene.scale(0.7, 0.7, 0.3);
			this.cylinder.display();
		this.scene.popMatrix();

			// top base
			this.scene.pushMatrix();
				this.scene.translate(0, this.height * Math.cos(30 * degToRad) - 1.5, - (this.height * Math.sin(30 * degToRad) + this.range + 1));
				this.scene.rotate(-90 * degToRad, 1, 0, 0);
				this.scene.scale(0.7, 0.7, 0.7);
				this.circle.display();
			this.scene.popMatrix();

			// bottom base
			this.scene.pushMatrix();
				this.scene.translate(0, this.height * Math.cos(30 * degToRad) - 1.5 - 0.3, - (this.height * Math.sin(30 * degToRad) + this.range + 1));
				this.scene.rotate(-90 * degToRad, 1, 0, 0);
				this.scene.rotate(180 * degToRad, 1, 0, 0);
				this.scene.scale(0.7, 0.7, 0.7);
				this.circle.display();
			this.scene.popMatrix();

  };
}
