/**
 * MyBodyWork
 * @constructor
 */
class MyBodyWork extends CGFobject
{
	constructor(scene)
	{
		super(scene);

		this.trapeze = new MyTrapeze(this.scene);
		this.quad = new MyQuad(this.scene);
	};

	display()
	{
		// right windows face
		this.scene.pushMatrix();
			this.scene.rotate(0 * degToRad, 1, 0, 0);
			this.scene.translate(0, 0, 0.25);
			this.trapeze.display();
		this.scene.popMatrix();

		// left windows face
		this.scene.pushMatrix();
			this.scene.rotate(180 * degToRad, 0, 1, 0);
			this.scene.translate(0, 0, 0.25);
			this.trapeze.display();
		this.scene.popMatrix();

		// roof
		this.scene.pushMatrix();
			this.scene.rotate(-90 * degToRad, 1, 0, 0);
			this.scene.translate(0, 0, 0.25);
			this.scene.scale(0.5, 0.5, 0.5);
			this.quad.display();
		this.scene.popMatrix();

		// back window
		this.scene.pushMatrix();
			this.scene.rotate(-90 * degToRad, 0, 1, 0);
			this.scene.rotate(-Math.atan(1/4), 1, 0, 0);
			this.scene.translate(0, -0.21, 0.3);
			this.scene.scale(0.5, 0.8, 1);
			this.quad.display();
		this.scene.popMatrix();

		// front window
		this.scene.pushMatrix();
			this.scene.rotate(90 * degToRad, 0, 1, 0);
			this.scene.rotate(-Math.atan(1/4), 1, 0, 0);
			this.scene.translate(0, -0.21, 0.3);
			this.scene.scale(0.5, 0.8, 1);
			this.quad.display();
		this.scene.popMatrix();
  };
}
