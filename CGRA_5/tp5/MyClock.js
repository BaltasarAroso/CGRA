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
		this.scene.clockAppearance = new CGFappearance(this.scene);
		this.scene.clockAppearance.setSpecular(0.1,0.1,0.1,1);
		this.scene.clockAppearance.setAmbient(0.5, 0.5, 0.5,1);
		this.scene.clockAppearance.setDiffuse(0.9, 0.9, 0.9,1);
		this.scene.clockAppearance.loadTexture("../resources/images/clock.png"); //requires activation of textures and vertex mapping
  }

	display()	{
		this.scene.pushMatrix();
      this.scene.scale(1, 1, 0.125);
      this.myCylinder.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
      this.scene.translate(0, 0, 0.125);
      this.scene.clockAppearance.apply();
      this.myCircle.display();
		this.scene.popMatrix();
	};
 };
