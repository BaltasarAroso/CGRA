/**
 * MyWheels
 * @constructor
 */
class MyWheels extends CGFobject
{
	constructor(scene, axisX = 1, axisZ = 1, wheelRadius = 1, wheelThickness = 1)
	{
		super(scene);
        this.axisX = axisX / wheelRadius * 0.5;
        this.axisZ = axisZ / wheelThickness * 0.5;
				this.wheelThickness = wheelThickness;

		this.cylinder = new MyCylinder(this.scene, 100, 2);
		this.circle = new MyCircle(this.scene, 100);
    };

	display()
	{
		this.scene.translate(0, 0, -0.5);

		// front left wheel
		this.scene.pushMatrix();
			this.scene.translate(this.axisX, 0, this.axisZ);
			this.cylinder.display();
		this.scene.popMatrix();

			// inner base
			this.scene.pushMatrix();
				this.scene.translate(this.axisX, 0, this.axisZ + 0);
        this.scene.rotate(180 * degToRad, 1, 0, 0);
				this.circle.display();
			this.scene.popMatrix();

			// outter base
			this.scene.pushMatrix();
				this.scene.translate(this.axisX, 0, this.axisZ + 1);
				this.circle.display();
			this.scene.popMatrix();

		// back left wheel
		this.scene.pushMatrix();
			this.scene.translate(-this.axisX, 0, this.axisZ);
			this.cylinder.display();
		this.scene.popMatrix();

			// inner base
			this.scene.pushMatrix();
				this.scene.translate(-this.axisX, 0, this.axisZ + 0);
				this.scene.rotate(180 * degToRad, 1, 0, 0);
				this.circle.display();
			this.scene.popMatrix();

			// outter base
			this.scene.pushMatrix();
				this.scene.translate(-this.axisX, 0, this.axisZ + 1);
				this.circle.display();
			this.scene.popMatrix();

		// front right wheel
		this.scene.pushMatrix();
			this.scene.translate(this.axisX, 0, -this.axisZ);
			this.cylinder.display();
		this.scene.popMatrix();

			// inner base
			this.scene.pushMatrix();
				this.scene.translate(this.axisX, 0, -this.axisZ + 1);
				this.circle.display();
			this.scene.popMatrix();

			// outter base
			this.scene.pushMatrix();
				this.scene.translate(this.axisX, 0, -this.axisZ + 0);
                this.scene.rotate(180 * degToRad, 1, 0, 0);
				this.circle.display();
			this.scene.popMatrix();

		// back right wheel
		this.scene.pushMatrix();
			this.scene.translate(-this.axisX, 0, -this.axisZ);
			this.cylinder.display();
		this.scene.popMatrix();

			// inner base
			this.scene.pushMatrix();
				this.scene.translate(-this.axisX, 0, -this.axisZ + 1);
				this.circle.display();
			this.scene.popMatrix();

			// outter base
			this.scene.pushMatrix();
				this.scene.translate(-this.axisX, 0, -this.axisZ + 0);
				this.scene.rotate(180 * degToRad, 1, 0, 0);
				this.circle.display();
			this.scene.popMatrix();


  };
}
