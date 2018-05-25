const FORWARD_MAXSPEED = 20.0;
const BACKWARD_MAXSPEED = 10.0;
const SPEED_INCREMENT_SEC = 15.0;
const TURN_WHEEL_DEGREE_SEC = 500.0;
const TURN_SPEED_PERCENT = 0.10;
const TURN_MAX_DEGREES = 60.0;
const BRAKES_PERCENT_SEC = 10.00;


/**
 * MyVehicle
 * @constructor
 */
class MyVehicle extends CGFobject {
    constructor(scene, len = 1, width = 1, height = 1, axisX = 1, axisZ = 1, wheelRadius = 1, wheelThickness = 1) {
        super(scene);

        /** Static Parameters **/
        this.len = len;
        this.width = width;
        this.height = height;
        this.axisX = axisX;
        this.axisZ = axisZ;
        this.wheelRadius = wheelRadius;
        this.wheelThickness = wheelThickness;


        /** Elements **/

        // Two headlights
        this.myHeadlights = new MyHeadlights(this.scene, this.axisZ);

        // Four spaced wheels
        this.myWheels = new MyWheels(this.scene, this.axisX, this.axisZ, this.wheelRadius, this.wheelThickness);

        // Bodywork
        this.myUnitCubeQuad = new MyUnitCubeQuad(this.scene, this.len, this.width, this.height);
        this.myBodyWork = new MyBodyWork(this.scene, this.len, this.width, this.height);


        /** Dynamic Parameters **/
        
        this.carSpeed = 0;
        this.pos = {x: 0.0, y: 0.0, z: 0.0};

        this.frontWheelsAngle = 0.0;  // direction of front wheels
        this.steerAngle = 0.0;  // direction of the car

        this.init();
    };

    update() {
        if(this.carSpeed) {

            /** Direction **/
            if(this.frontWheelsAngle !== this.steerAngle) {
                let diffAngleFrac;
                let speedFactor = (FORWARD_MAXSPEED*0.10 + 2*Math.abs(this.carSpeed)) / (1.1*FORWARD_MAXSPEED);

                if(this.frontWheelsAngle > this.steerAngle) {  // Turning Left
                    diffAngleFrac = (this.frontWheelsAngle - this.steerAngle) * TURN_SPEED_PERCENT * speedFactor;

                    if(this.steerAngle + diffAngleFrac > this.frontWheelsAngle)
                        this.steerAngle = this.frontWheelsAngle;
                    else
                        this.steerAngle += diffAngleFrac;

                } else if(this.frontWheelsAngle < this.steerAngle) {  // Turning right
                    diffAngleFrac = (this.steerAngle - this.frontWheelsAngle) * TURN_SPEED_PERCENT * speedFactor;

                    if(this.steerAngle - diffAngleFrac < this.frontWheelsAngle)
                        this.steerAngle = this.frontWheelsAngle;
                    else
                        this.steerAngle -= diffAngleFrac;
                }
            }

            /** Movement **/
            let angle = this.steerAngle * degToRad;
            this.pos.x = this.pos.x + Math.cos(angle) * (this.carSpeed * UPDATE_MS / 1000);
            this.pos.z = this.pos.z - Math.sin(angle) * (this.carSpeed * UPDATE_MS / 1000);
        }

        if(this.frontWheelsAngle !== this.steerAngle) {
            let sign = 1;
            if(this.carSpeed < 0) sign = -1;

            this.myWheels.frontWheelsAngle = (this.frontWheelsAngle - this.steerAngle) * sign;
        }
    }

    init() {
        // bodyWork
        this.scene.bodyWorkAppearance = new CGFappearance(this.scene);
        this.scene.bodyWorkAppearance.loadTexture("../resources/images/bodywork.jpg");
        this.scene.bodyWorkAppearance.setSpecular(0.4, 0.4, 0.4, 1);
        this.scene.bodyWorkAppearance.setAmbient(0.5, 0.5, 0.5, 1);
        this.scene.bodyWorkAppearance.setDiffuse(0.5, 0.5, 0.5, 1);

        // controls different textures
        this.scene.vehicleTextureAppearance = {};
        for (let i = 0; i < this.scene.vehicleAppearances.length; i++) {
          this.scene.vehicleTextureAppearance[i] = new CGFappearance(this.scene);
          this.scene.vehicleTextureAppearance[i].loadTexture("../resources/images/" + this.scene.vehicleAppearances[i] + ".jpg");
          this.scene.vehicleTextureAppearance[i].setSpecular(0.4, 0.4, 0.4, 1);
          this.scene.vehicleTextureAppearance[i].setAmbient(0.5, 0.5, 0.5, 1);
          this.scene.vehicleTextureAppearance[i].setDiffuse(0.5, 0.5, 0.5, 1);
          console.log(this.scene.vehicleTextureAppearance[i]);
        }

        // headlights
        this.scene.headlightsAppearance = new CGFappearance(this.scene);
        this.scene.headlightsAppearance.loadTexture("../resources/images/headlight.jpg");
        this.scene.headlightsAppearance.setSpecular(1, 1, 0.4, 1);
        this.scene.headlightsAppearance.setAmbient(1, 1, 0.4, 1);
        this.scene.headlightsAppearance.setDiffuse(1, 1, 0.4, 1);
    }

    display() {

        this.scene.pushMatrix()

        this.scene.translate(this.pos.x, this.pos.y, this.pos.z);

        this.scene.translate(-this.len / 4, 0, 0);
        this.scene.rotate(this.steerAngle * degToRad, 0, 1, 0);
        this.scene.translate(this.len / 4, 0, 0);

        this.scene.pushMatrix();
            this.scene.translate(0, this.wheelRadius, 0);
            this.scene.scale(this.wheelRadius, this.wheelRadius, this.wheelThickness);
            this.myWheels.display();
        this.scene.popMatrix();

        this.scene.vehicleTextureAppearance[this.scene.vehicleAppearanceList[this.scene.currVehicleAppearance]].apply();

        this.scene.pushMatrix();
            this.scene.translate(0, this.wheelRadius + this.height * 0.65 / 2, 0);
            this.scene.scale(this.len, this.height * 0.65, this.width);
            this.myUnitCubeQuad.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
            this.scene.translate(0, this.wheelRadius + this.height * 0.65 + this.height * 0.35 / 2, 0);
            this.scene.scale(this.len * 0.7, this.height * 0.35, this.width);
            this.myBodyWork.display();
        this.scene.popMatrix();

        this.scene.headlightsAppearance.apply();

        this.scene.pushMatrix();
            this.scene.translate(this.len / 2, this.wheelRadius + this.height * 0.65 - 0.25, 0);
            this.scene.scale(this.len * 0.25 * 0.25, this.height * 0.65 * 0.25, this.width * 0.45 * 0.25);
            this.myHeadlights.display();
        this.scene.popMatrix();

        this.scene.popMatrix();
    };
}
