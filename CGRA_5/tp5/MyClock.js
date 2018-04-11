/**
 * MyClock
 * @constructor
 */
 class MyClock extends CGFobject {
	constructor(scene, slices) {
		super(scene);

		this.cylinder = new MyCylinder(this.scene, slices, 1);
    this.circle = new MyCircle(this.scene, slices);
    this.seconds = new MyClockHand(this.scene);
    this.minutes = new MyClockHand(this.scene);
    this.hours = new MyClockHand(this.scene);

    this.init();
	};

  init() {
    //set texture here
  }

	display()	{
		this.scene.pushMatrix();
      this.scene.scale(1, 1, 0.125);
      this.cylinder.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
      this.scene.translate(0, 0, 0.125);
      this.circle.display();
		this.scene.popMatrix();

    this.scene.pushMatrix();
      this.scene.scale(1.5, 0.25, 1);
      this.scene.rotate(0, 0, this.hours.angle*this.scene.degToRad, 0);
      this.hours.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
      this.scene.scale(1, 0.5, 1);
      this.scene.rotate(0, 0, this.minutes.angle*this.scene.degToRad, 0);
      this.minutes.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
      this.scene.scale(0.5, 1, 1);
      this.scene.rotate(0, 0, this.seconds.angle*this.scene.degToRad, 0);
      this.seconds.display();
    this.scene.popMatrix();
	};
 };
