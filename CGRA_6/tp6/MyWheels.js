/**
 * MyWheels
 * @constructor
 */
class MyWheels extends CGFobject {
	constructor(scene, axisX = 1, axisZ = 1, wheelRadius = 1, wheelThickness = 1) {
		super(scene);

        this.axisX = axisX / wheelRadius * 0.5;
        this.axisZ = axisZ / wheelThickness * 0.5;
        this.wheelRadius = wheelRadius;

        this.frontWheelsAngle = 0.0;

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
        this.scene.translate(0, 0, -0.5); // to center wheels in (0, 0, 0)

        /** Front right wheel **/
        this.scene.tireAppearance.apply();

        this.scene.pushMatrix();
            this.scene.translate(this.axisX, 0, this.axisZ);
            this.scene.rotate(this.frontWheelsAngle * degToRad, 0, 1, 0);
            this.cylinder.display();
        this.scene.popMatrix();

        this.scene.wheelsAppearance.apply();

        // inner base
        this.scene.pushMatrix();
            this.scene.translate(this.axisX, 0, this.axisZ);
            this.scene.rotate(this.frontWheelsAngle * degToRad, 0, 1, 0);
            this.scene.rotate(180 * degToRad, 1, 0, 0);
            this.circle.display();
        this.scene.popMatrix();

        // outter base
        this.scene.pushMatrix();
            this.scene.translate(this.axisX, 0, this.axisZ + 1);
            this.scene.translate(0, 0, -2*this.wheelRadius);
            this.scene.rotate(this.frontWheelsAngle * degToRad, 0, 1, 0);
            this.scene.translate(0, 0, 2*this.wheelRadius);
            this.circle.display();
        this.scene.popMatrix();


        /** Front right wheel **/
        this.scene.tireAppearance.apply();

        this.scene.pushMatrix();
            this.scene.translate(this.axisX, 0, -this.axisZ);
            this.scene.rotate(this.frontWheelsAngle * degToRad, 0, 1, 0);
            this.cylinder.display();
        this.scene.popMatrix();

        this.scene.wheelsAppearance.apply();

        // inner base
        this.scene.pushMatrix();
            this.scene.translate(this.axisX, 0, -this.axisZ + 1);
            this.scene.translate(0, 0, -2*this.wheelRadius);
            this.scene.rotate(this.frontWheelsAngle * degToRad, 0, 1, 0);
            this.scene.translate(0, 0, 2*this.wheelRadius);
            this.circle.display();
        this.scene.popMatrix();

        // outter base
        this.scene.pushMatrix();
            this.scene.translate(this.axisX, 0, -this.axisZ);
            this.scene.rotate(this.frontWheelsAngle * degToRad, 0, 1, 0);
            this.scene.rotate(180 * degToRad, 1, 0, 0);
            this.circle.display();
        this.scene.popMatrix();


        /** Rear left wheel **/
        this.scene.tireAppearance.apply();

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


        /** Rear right wheel **/
        this.scene.tireAppearance.apply();

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
