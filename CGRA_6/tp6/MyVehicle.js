/**
 * MyVehicle
 * @constructor
 */
class MyVehicle extends CGFobject
{
    constructor(scene, len = 1, axisLen = 1, wheelDiameter = 1, width = 1, height = 1)
    {
        super(scene);

        // car headlight
        //this.myLamp = new MyLamp(this.scene);

        // wheels
        this.myWheels = new MyWheels(this.scene);

        // bodywork
        this.myUnitCubeQuad = new MyUnitCubeQuad(this.scene);
        this.myBodyWork = new MyBodyWork(this.scene);

        // windows
        //this.myTrapeze = new MyTrapeze(this.scene);

        this.init();
    };

    init() {
      this.scene.tableAppearance = new CGFappearance(this.scene);
      this.scene.tableAppearance.setSpecular(0.1,0.1,0.1,1);
      this.scene.tableAppearance.setAmbient(0.541, 0.211, 0.058,1);
      this.scene.tableAppearance.setDiffuse(0.541, 0.211, 0.058,1);
      // PL4 - 1.3
      this.scene.tableAppearance.loadTexture("../resources/images/table.png"); //requires activation of textures and vertex mapping
    }

    display()
    {
        this.scene.materialDefault.apply();

        this.scene.pushMatrix();
            this.scene.translate(0, 0, 0);
            this.scene.scale(0.8, 0.35, 0.25);
            this.myWheels.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
            this.scene.translate(0, 0.25, 0);
            this.scene.scale(0.75, 0.25, 0.25);
            this.myUnitCubeQuad.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
            this.scene.translate(0, 0.5, 0);
            this.scene.scale(0.5, 0.25, 0.5);
            this.myBodyWork.display();
        this.scene.popMatrix();
    };
}
