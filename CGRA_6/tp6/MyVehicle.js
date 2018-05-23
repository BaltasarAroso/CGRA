/**
 * MyVehicle
 * @constructor
 */
class MyVehicle extends CGFobject {
    constructor(scene, len = 1, width = 1, height = 1, axisX = 1, axisZ = 1, wheelRadius = 1, wheelThickness = 1) {
        super(scene);

        this.len = len;
        this.width = width;
        this.height = height;
        this.axisX = axisX;
        this.axisZ = axisZ;
        this.wheelRadius = wheelRadius;
        this.wheelThickness = wheelThickness;

        // car headlight
        this.myHeadlights = new MyHeadlights(this.scene, this.axisZ);

        // wheels
        this.myWheels = new MyWheels(this.scene, this.axisX, this.axisZ, this.wheelRadius, this.wheelThickness);

        // bodywork
        this.myUnitCubeQuad = new MyUnitCubeQuad(this.scene, this.len, this.width, this.height);
        this.myBodyWork = new MyBodyWork(this.scene, this.len, this.width, this.height);

        this.init();
    };

    init() {
        // wheels
        this.scene.wheelsAppearance = new CGFappearance(this.scene);
        this.scene.wheelsAppearance.loadTexture("../resources/images/wheel.jpg");

        // bodyWork
        this.scene.bodyWorkAppearance = new CGFappearance(this.scene);
        this.scene.bodyWorkAppearance.loadTexture("../resources/images/bodyWork.jpg");
        this.scene.bodyWorkAppearance.setSpecular(0.4,0.4,0.4,1);
        this.scene.bodyWorkAppearance.setAmbient(0.5, 0.5, 0.5,1);
        this.scene.bodyWorkAppearance.setDiffuse(0.5, 0.5, 0.5,1);

        // black
        this.scene.blackAppearance = new CGFappearance(this.scene);
        this.scene.blackAppearance.loadTexture("../resources/images/black.jpg");
        this.scene.blackAppearance.setSpecular(0.4,0.4,0.4,1);
        this.scene.blackAppearance.setAmbient(0.5, 0.5, 0.5,1);
        this.scene.blackAppearance.setDiffuse(0.5, 0.5, 0.5,1);

        // yellow
        this.scene.yellowAppearance = new CGFappearance(this.scene);
        this.scene.yellowAppearance.loadTexture("../resources/images/yellow.jpg");
        this.scene.yellowAppearance.setSpecular(0.4,0.4,0.4,1);
        this.scene.yellowAppearance.setAmbient(0.5, 0.5, 0.5,1);
        this.scene.yellowAppearance.setDiffuse(0.5, 0.5, 0.5,1);

        // green
        this.scene.greenAppearance = new CGFappearance(this.scene);
        this.scene.greenAppearance.loadTexture("../resources/images/green.jpg");
        this.scene.greenAppearance.setSpecular(0.4,0.4,0.4,1);
        this.scene.greenAppearance.setAmbient(0.5, 0.5, 0.5,1);
        this.scene.greenAppearance.setDiffuse(0.5, 0.5, 0.5,1);

        // blue
        this.scene.blueAppearance = new CGFappearance(this.scene);
        this.scene.blueAppearance.loadTexture("../resources/images/blue.jpg");
        this.scene.blueAppearance.setSpecular(0.4,0.4,0.4,1);
        this.scene.blueAppearance.setAmbient(0.5, 0.5, 0.5,1);
        this.scene.blueAppearance.setDiffuse(0.5, 0.5, 0.5,1);

        // this.scene.vehicleTextureAppearance = {};
        // for (let i = 0; i < this.scene.vehicleAppearances.length; i++) {
        //   this.scene.vehicleTextureAppearance[i] = new CGFappearance(this.scene);
        //   this.scene.vehicleTextureAppearance[i].loadTexture("../resources/images/" + this.scene.vehicleAppearances[i] + ".jpg");
        //   this.scene.vehicleTextureAppearance[i].setSpecular(0.4,0.4,0.4,1);
        //   this.scene.vehicleTextureAppearance[i].setAmbient(0.5, 0.5, 0.5,1);
        //   this.scene.vehicleTextureAppearance[i].setDiffuse(0.5, 0.5, 0.5,1);
        // }

        // headlights
        this.scene.headlightsAppearance = new CGFappearance(this.scene);
        this.scene.headlightsAppearance.loadTexture("../resources/images/headlight.jpg");
        this.scene.headlightsAppearance.setSpecular(1, 1, 0.4, 1);
        this.scene.headlightsAppearance.setAmbient(1, 1, 0.4, 1);
        this.scene.headlightsAppearance.setDiffuse(1, 1, 0.4, 1);
    }

    update(currTime) {
      if (this.scene.texFlag) {
        this.scene.currVehicleAppearance = this.scene.vehicleAppearanceList[this.scene.vehicleTexture];
        this.scene.oldTexture = this.scene.vehicleTexture;
        this.scene.texFlag = !this.scene.texFlag;
      }
    }

    display() {

        this.scene.wheelsAppearance.apply();

        this.scene.pushMatrix();
            this.scene.translate(0, this.wheelRadius, 0);
            this.scene.scale(this.wheelRadius, this.wheelRadius, this.wheelThickness);
            this.myWheels.display();
        this.scene.popMatrix();

        switch (this.scene.currVehicleAppearance) {
          case this.scene.vehicleAppearances[0]:
            this.scene.blackAppearance.apply();
            break;

          case this.scene.vehicleAppearances[1]:
            this.scene.yellowAppearance.apply();
            break;

          case this.scene.vehicleAppearances[2]:
            this.scene.greenAppearance.apply();
            break;

          case this.scene.vehicleAppearances[3]:
            this.scene.blueAppearance.apply();
            break;

          default:
            this.scene.bodyWorkAppearance.apply();
        }

        // this.scene.vehicleTextureAppearance[1];

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
    };
}
