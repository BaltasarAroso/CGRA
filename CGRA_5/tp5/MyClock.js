/**
 * MyClock
 * @constructor
 */
 class MyClock extends CGFobject {
	constructor(scene, slices) {
		super(scene);

		this.myCylinder = new MyCylinder(this.scene, slices, 1);
    this.myCircle = new MyCircle(this.scene, slices);

    this.init();
	};

  init() {
    //set texture here
  }

	display()	{
		this.scene.pushMatrix();
      this.scene.scale(1, 1, 0.125)
      this.myCylinder.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
      this.scene.translate(0, 0, 0.125);
      this.myCircle.display();
		this.scene.popMatrix();
	};
 };
