/**
 * MyWheels
 * @constructor
 */
class MyWheels extends CGFobject {
	constructor(scene, axisX = 1, axisZ = 1, wheelRadius = 1, wheelThickness = 1) {
		super(scene);

        this.axisX = axisX / wheelRadius * 0.5;
        this.axisZ = axisZ / wheelThickness * 0.5;
        this.wheelThickness = wheelThickness;

		this.cylinder = new MyCylinder(this.scene, 100, 2);
		this.circle = new MyCircle(this.scene, 100);

		this.init();
    };

	init() {
        // wheels
        this.scene.wheelsAppearance = new CGFappearance(this.scene);
        this.scene.wheelsAppearance.loadTexture("../resources/images/wheel.jpg");

        this.scene.tireAppearance = new CGFappearance(this.scene);
        this.scene.tireAppearance.setAmbient(0.1, 0.1, 0.1, 1);
        this.scene.tireAppearance.setDiffuse(0.05, 0.05, 0.05, 1);
        this.scene.tireAppearance.setSpecular(0, 0, 0, 1);
    }

	display() {
		this.scene.translate(0, 0, -0.5);

		this.scene.tireAppearance.apply();

		/** Front left wheel **/
		this.scene.pushMatrix();
			this.scene.translate(this.axisX, 0, this.axisZ);
			this.cylinder.display();
		this.scene.popMatrix();

        this.scene.wheelsAppearance.apply();

        // inner base
        this.scene.pushMatrix();
            this.scene.translate(this.axisX, 0, this.axisZ);
            this.scene.rotate(180 * degToRad, 1, 0, 0);
            this.circle.display();
        this.scene.popMatrix();

        // outter base
        this.scene.pushMatrix();
            this.scene.translate(this.axisX, 0, this.axisZ + 1);
            this.circle.display();
        this.scene.popMatrix();


        this.scene.tireAppearance.apply();

		/** Rear left wheel **/
		this.scene.pushMatrix();
			this.scene.translate(-this.axisX, 0, this.axisZ);
			this.cylinder.display();
		this.scene.popMatrix();

        this.scene.wheelsAppearance.apply();

        // inner base
        this.scene.pushMatrix();
            this.scene.translate(-this.axisX, 0, this.axisZ);
            this.scene.rotate(180 * degToRad, 1, 0, 0);
            this.circle.display();
        this.scene.popMatrix();

        // outter base
        this.scene.pushMatrix();
            this.scene.translate(-this.axisX, 0, this.axisZ + 1);
            this.circle.display();
        this.scene.popMatrix();


        this.scene.tireAppearance.apply();

		/** Front right wheel **/
		this.scene.pushMatrix();
			this.scene.translate(this.axisX, 0, -this.axisZ);
			this.cylinder.display();
		this.scene.popMatrix();

        this.scene.wheelsAppearance.apply();

        // inner base
        this.scene.pushMatrix();
            this.scene.translate(this.axisX, 0, -this.axisZ + 1);
            this.circle.display();
        this.scene.popMatrix();

        // outter base
        this.scene.pushMatrix();
            this.scene.translate(this.axisX, 0, -this.axisZ);
            this.scene.rotate(180 * degToRad, 1, 0, 0);
            this.circle.display();
        this.scene.popMatrix();


        this.scene.tireAppearance.apply();

		/** Rear right wheel **/
		this.scene.pushMatrix();
			this.scene.translate(-this.axisX, 0, -this.axisZ);
			this.cylinder.display();
		this.scene.popMatrix();

        this.scene.wheelsAppearance.apply();

        // inner base
        this.scene.pushMatrix();
            this.scene.translate(-this.axisX, 0, -this.axisZ + 1);
            this.circle.display();
        this.scene.popMatrix();

        // outter base
        this.scene.pushMatrix();
            this.scene.translate(-this.axisX, 0, -this.axisZ);
            this.scene.rotate(180 * degToRad, 1, 0, 0);
            this.circle.display();
        this.scene.popMatrix();


  };
}
