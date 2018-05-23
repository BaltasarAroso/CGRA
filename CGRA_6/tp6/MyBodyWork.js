/**
 * MyBodyWork
 * @constructor
 */
class MyBodyWork extends CGFobject {
	constructor(scene) {
		super(scene);

		this.trapeze = new MyTrapezoid(this.scene);
		this.quad = new MyQuad(this.scene);

		this.init();
	};

	init() {
	    this.scene.windshieldAppearance = new CGFappearance(this.scene);
        this.scene.windshieldAppearance.loadTexture("../resources/images/driver.png");
        this.scene.windshieldAppearance.setSpecular(0.4,0.4,0.4,1);
        this.scene.windshieldAppearance.setAmbient(0.5, 0.5, 0.5,1);
        this.scene.windshieldAppearance.setDiffuse(0.5, 0.5, 0.5,1);

        this.scene.carBackAppearance = new CGFappearance(this.scene);
        this.scene.carBackAppearance.loadTexture("../resources/images/car_back.png");
        this.scene.carBackAppearance.setSpecular(0.4,0.4,0.4,1);
        this.scene.carBackAppearance.setAmbient(0.5, 0.5, 0.5,1);
        this.scene.carBackAppearance.setDiffuse(0.5, 0.5, 0.5,1);

    }

	display() {
		// right windows face
		this.scene.pushMatrix();
			this.scene.translate(0, 0, 0.5);
			this.trapeze.display();
		this.scene.popMatrix();

		// left windows face
		this.scene.pushMatrix();
			this.scene.rotate(180 * degToRad, 0, 1, 0);
			this.scene.translate(0, 0, 0.5);
			this.trapeze.display();
		this.scene.popMatrix();

		// roof
		this.scene.pushMatrix();
            this.scene.translate(0, 0.5, 0);
			this.scene.rotate(-90 * degToRad, 1, 0, 0);
			this.scene.scale(0.5, 1, 0.5);
			this.quad.display();
		this.scene.popMatrix();

        this.scene.carBackAppearance.apply();

		// back window
		this.scene.pushMatrix();
			this.scene.rotate(-90 * degToRad, 0, 1, 0);
            this.scene.translate(0, 0, 1.5 * 0.5 / 2);
            this.scene.rotate(-Math.atan(0.25), 1, 0, 0);
            this.scene.scale(1, 1 / Math.cos(0.25), 1);
			this.quad.display();
		this.scene.popMatrix();

		this.scene.windshieldAppearance.apply();

		// front window
        this.scene.pushMatrix();
            this.scene.rotate(90 * degToRad, 0, 1, 0);
            this.scene.translate(0, 0, 1.5 * 0.5 / 2);
            this.scene.rotate(-Math.atan(0.25), 1, 0, 0);
            this.scene.scale(1, 1 / Math.cos(0.25), 1);
            this.quad.display();
        this.scene.popMatrix();
    };
}
