/**
 * MyClock
 * @constructor
 */
class MyClock extends CGFobject {
    constructor(scene, slices) {
        super(scene);

        this.startTime = Date.now();

        this.cylinder = new MyCylinder(this.scene, slices, 1);
        this.circle = new MyCircle(this.scene, slices);
        this.hours = new MyClockHand(this.scene, 0.40);
        // this.hours.setAngle(90); // PL5 - 1.4
        this.minutes = new MyClockHand(this.scene, 0.60);
        // this.minutes.setAngle(180); // PL5 - 1.4
        this.seconds = new MyClockHand(this.scene, 0.825);
        // this.seconds.setAngle(270); // PL5 - 1.4

        this.init();
    };

    init() {
        //set texture here
        this.scene.clockAppearance = new CGFappearance(this.scene);
        this.scene.clockAppearance.setSpecular(0.1,0.1,0.1,1);
        this.scene.clockAppearance.setAmbient(0.5, 0.5, 0.5,1);
        this.scene.clockAppearance.setDiffuse(0.9, 0.9, 0.9,1);
        this.scene.clockAppearance.loadTexture("../resources/images/clock.png"); //requires activation of textures and vertex mapping

        this.scene.clockHandAppearance = new CGFappearance(this.scene);
        this.scene.clockHandAppearance.setSpecular(0.05, 0.05, 0.05, 1);
        this.scene.clockHandAppearance.setAmbient(0.05, 0.05, 0.05, 1);
        this.scene.clockHandAppearance.setDiffuse(0.05, 0.05, 0.05, 1);
    }

    // PL5 - 1.6
    update(currTime) {
        let deltaSec = (currTime - this.startTime)/1000;

        let second = (360/60) * deltaSec;
        let minute = second/60;
        let hour = minute/12;

        this.hours.setAngle(this.hours.angle + hour);
        this.minutes.setAngle(this.minutes.angle + minute);
        this.seconds.setAngle(this.seconds.angle + second);

        this.startTime = currTime;
    }

    display() {
        this.scene.materialDefault.apply();

        this.scene.pushMatrix();
            this.scene.scale(1, 1, 0.125);
            this.cylinder.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
            this.scene.translate(0, 0, 0.125);
            this.scene.clockAppearance.apply();
            this.circle.display();
        this.scene.popMatrix();


        this.scene.clockHandAppearance.apply();

        this.scene.pushMatrix();
            this.scene.translate(0, 0, 0.125);
            this.hours.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
            this.scene.translate(0, 0, 0.125);
            this.minutes.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
            this.scene.translate(0, 0, 0.125);
            this.seconds.display();
        this.scene.popMatrix();
    };
}
