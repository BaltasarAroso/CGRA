/**
 * MyHeadlights
 * @constructor
 */
class MyHeadlights extends CGFobject
{
	constructor(scene, axisZ = 1)
	{
		super(scene);
		this.axisZ = axisZ;

		this.myHeadlight = new MyLamp(this.scene, 8, 20);
		this.myCircle = new MyCircle(this.scene, 100);
	};

	display()
	{
		// left headlight
		this.scene.pushMatrix();
			this.scene.rotate(-90 * degToRad, 0, 0, 1);
			this.scene.translate(0, 0, 1.5 * this.axisZ);
			this.myHeadlight.display();
		this.scene.popMatrix();

			this.scene.pushMatrix();
				this.scene.rotate(-90 * degToRad, 1, 0, 0);
				this.scene.rotate(90 * degToRad, 0, 1, 0);
				this.scene.translate(0, 1.5 * this.axisZ, 0); 
				this.myCircle.display();
			this.scene.popMatrix();

		// right headlight
		this.scene.pushMatrix();
			this.scene.rotate(-90 * degToRad, 0, 0, 1);
			this.scene.translate(0, 0, -1.5 * this.axisZ);
			this.myHeadlight.display();
		this.scene.popMatrix();

			this.scene.pushMatrix();
				this.scene.rotate(-90 * degToRad, 1, 0, 0);
				this.scene.rotate(90 * degToRad, 0, 1, 0);
				this.scene.translate(0, -1.5 * this.axisZ, 0);
				this.myCircle.display();
			this.scene.popMatrix();



  };
}
