/**
 * MyVehicle
 * @constructor
 */
class MyVehicle extends CGFobject
{
    constructor(scene, len = 1, width = 1, height = 1, axisX = 1, axisZ = 1, wheelRadius = 1, wheelThickness = 1)
    {
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

    init()
    {
        // wheels
        this.scene.wheelsAppearance = new CGFappearance(this.scene);
        this.scene.wheelsAppearance.loadTexture("../resources/images/wheel.jpg");

        // bodyWork
        this.scene.bodyWorkAppearance = new CGFappearance(this.scene);
        this.scene.bodyWorkAppearance.loadTexture("../resources/images/bodywork.jpg");
        this.scene.bodyWorkAppearance.setSpecular(0.4,0.4,0.4,1);
        this.scene.bodyWorkAppearance.setAmbient(0.5, 0.5, 0.5,1);
        this.scene.bodyWorkAppearance.setDiffuse(0.5, 0.5, 0.5,1);

        // headlights
        this.scene.headlightsAppearance = new CGFappearance(this.scene);
        this.scene.headlightsAppearance.loadTexture("../resources/images/headlight.jpg");
        this.scene.headlightsAppearance.setSpecular(0.1,0.1,0.1,1);
        this.scene.headlightsAppearance.setAmbient(0.3, 0.45, 0.5,1);
        this.scene.headlightsAppearance.setDiffuse(0.3, 0.45, 0.5,1);
    }

    display()
    {

        this.scene.wheelsAppearance.apply();

        this.scene.pushMatrix();
            this.scene.translate(0, this.wheelRadius, 0);
            this.scene.scale(this.wheelRadius, this.wheelRadius, this.wheelThickness);
            this.myWheels.display();
        this.scene.popMatrix();

        this.scene.bodyWorkAppearance.apply();

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
            this.scene.scale(0.25, 0.25, 0.25);
            this.myHeadlights.display();
        this.scene.popMatrix();
    };
}
