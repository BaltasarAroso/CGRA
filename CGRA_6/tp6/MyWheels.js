/**
 * MyWheels
 * @constructor
 */
class MyWheels extends CGFobject
{
	constructor(scene)
	{
		super(scene);

		this.cylinder = new MyCylinder(this.scene, 10, 2);
		this.circle = new MyCircle(this.scene, 10);
	};

	display()
	{
		// front left wheel
		this.scene.pushMatrix();
			this.scene.translate(0.25, 0.25, 0.25);
			this.scene.rotate(0 * degToRad, 1, 0, 0);
			this.scene.scale(0.1, 0.25, 0.25);
			this.cylinder.display();
		this.scene.popMatrix();

			// closed circles
			this.scene.pushMatrix();
				this.scene.translate(0.25, 0.25, 0.5);
				this.scene.rotate(0 * degToRad, 1, 0, 0);
				this.scene.scale(0.1, 0.25, 0.25);
				this.circle.display();
			this.scene.popMatrix();

			this.scene.pushMatrix();
				this.scene.translate(0.25, 0.25, 0.25);
				this.scene.rotate(180 * degToRad, 1, 0, 0);
				this.scene.scale(0.1, 0.25, 0.25);
				this.circle.display();
			this.scene.popMatrix();

		// back left wheel
		this.scene.pushMatrix();
			this.scene.translate(-0.25, 0.25, 0.25);
			this.scene.rotate(0 * degToRad, 1, 0, 0);
			this.scene.scale(0.1, 0.25, 0.25);
			this.cylinder.display();
		this.scene.popMatrix();

			// closed circles
			this.scene.pushMatrix();
				this.scene.translate(-0.25, 0.25, 0.5);
				this.scene.rotate(0 * degToRad, 1, 0, 0);
				this.scene.scale(0.1, 0.25, 0.25);
				this.circle.display();
			this.scene.popMatrix();

			this.scene.pushMatrix();
				this.scene.translate(-0.25, 0.25, 0.25);
				this.scene.rotate(180 * degToRad, 1, 0, 0);
				this.scene.scale(0.1, 0.25, 0.25);
				this.circle.display();
			this.scene.popMatrix();

		// front right wheel
		this.scene.pushMatrix();
			this.scene.translate(0.25, 0.25, -0.5);
			this.scene.rotate(0 * degToRad, 1, 0, 0);
			this.scene.scale(0.1, 0.25, 0.25);
			this.cylinder.display();
		this.scene.popMatrix();

			// closed circles
			this.scene.pushMatrix();
				this.scene.translate(0.25, 0.25, -0.25);
				this.scene.rotate(0 * degToRad, 1, 0, 0);
				this.scene.scale(0.1, 0.25, 0.25);
				this.circle.display();
			this.scene.popMatrix();

			this.scene.pushMatrix();
				this.scene.translate(0.25, 0.25, -0.5);
				this.scene.rotate(180 * degToRad, 1, 0, 0);
				this.scene.scale(0.1, 0.25, 0.25);
				this.circle.display();
			this.scene.popMatrix();

		// back right wheel
		this.scene.pushMatrix();
			this.scene.translate(-0.25, 0.25, -0.5);
			this.scene.rotate(0 * degToRad, 1, 0, 0);
			this.scene.scale(0.1, 0.25, 0.25);
			this.cylinder.display();
		this.scene.popMatrix();

			// closed circles
			this.scene.pushMatrix();
				this.scene.translate(-0.25, 0.25, -0.25);
				this.scene.rotate(0 * degToRad, 1, 0, 0);
				this.scene.scale(0.1, 0.25, 0.25);
				this.circle.display();
			this.scene.popMatrix();

			this.scene.pushMatrix();
				this.scene.translate(-0.25, 0.25, -0.5);
				this.scene.rotate(180 * degToRad, 1, 0, 0);
				this.scene.scale(0.1, 0.25, 0.25);
				this.circle.display();
			this.scene.popMatrix();


  };
}
