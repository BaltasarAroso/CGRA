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
		this.scene.translate(0, 0, -0.5);

		// front left wheel
		this.scene.pushMatrix();
			this.scene.translate(0.5, 0, 0.5);
			this.cylinder.display();
		this.scene.popMatrix();

			// inner base
			this.scene.pushMatrix();
				this.scene.translate(0.5, 0, 0.5 + 0);
                this.scene.rotate(180 * degToRad, 1, 0, 0);
				this.circle.display();
			this.scene.popMatrix();


			// outter base
			this.scene.pushMatrix();
				this.scene.translate(0.5, 0, 0.5 + 1);
				this.circle.display();
			this.scene.popMatrix();

		// back left wheel
		this.scene.pushMatrix();
			this.scene.translate(-0.5, 0, 0.5);
			this.cylinder.display();
		this.scene.popMatrix();

			// inner base
			this.scene.pushMatrix();
				this.scene.translate(-0.5, 0, 0.5 + 0);
				this.scene.rotate(180 * degToRad, 1, 0, 0);
				this.circle.display();
			this.scene.popMatrix();

			// outter base
			this.scene.pushMatrix();
				this.scene.translate(-0.5, 0, 0.5 + 1);
				this.circle.display();
			this.scene.popMatrix();

		// front right wheel
		this.scene.pushMatrix();
			this.scene.translate(0.5, 0, -0.5);
			this.cylinder.display();
		this.scene.popMatrix();

			// inner base
			this.scene.pushMatrix();
				this.scene.translate(0.5, 0, -0.5 + 1);
				this.circle.display();
			this.scene.popMatrix();

			// outter base
			this.scene.pushMatrix();
				this.scene.translate(0.5, 0, -0.5 + 0);
                this.scene.rotate(180 * degToRad, 1, 0, 0);
				this.circle.display();
			this.scene.popMatrix();

		// back right wheel
		this.scene.pushMatrix();
			this.scene.translate(-0.5, 0, -0.5);
			this.cylinder.display();
		this.scene.popMatrix();

			// inner base
			this.scene.pushMatrix();
				this.scene.translate(-0.5, 0, -0.5 + 1);
				this.circle.display();
			this.scene.popMatrix();

			// outter base
			this.scene.pushMatrix();
				this.scene.translate(-0.5, 0, -0.5 + 0);
				this.scene.rotate(180 * degToRad, 1, 0, 0);
				this.circle.display();
			this.scene.popMatrix();


  };
}
