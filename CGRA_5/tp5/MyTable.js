/**
 * MyTable
 * @constructor
 */
 class MyTable extends CGFobject
 {
	constructor(scene)
	{
		super(scene);

		this.myUnitCubeQuad = new MyUnitCubeQuad(this.scene);

    this.init();
	};

  init() {
		this.scene.tableAppearance = new CGFappearance(this.scene);
		this.scene.tableAppearance.setSpecular(0.1,0.1,0.1,1);
		this.scene.tableAppearance.setAmbient(0.541, 0.211, 0.058,1);
		this.scene.tableAppearance.setDiffuse(0.541, 0.211, 0.058,1);
    // PL4 - 1.3
		this.scene.tableAppearance.loadTexture("../resources/images/table.png"); //requires activation of textures and vertex mapping

    this.scene.materialSteel = new CGFappearance(this.scene);
		this.scene.materialSteel.setSpecular(0.9,0.9,0.9,1);
		this.scene.materialSteel.setAmbient(0.270, 0.227, 0.235,1);
		this.scene.materialSteel.setDiffuse(0.270, 0.227, 0.235,1);
  }

	display()
	{
		// legs
    this.scene.materialSteel.apply();

		this.scene.pushMatrix();
		this.scene.translate(2, 3.5 / 2, 1);
		this.scene.scale(0.3, 3.5, 0.3);
		this.myUnitCubeQuad.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(2, 3.5 / 2, -1);
		this.scene.scale(0.3, 3.5, 0.3);
		this.myUnitCubeQuad.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(-2, 3.5 / 2, 1);
		this.scene.scale(0.3, 3.5, 0.3);
		this.myUnitCubeQuad.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(-2, 3.5 / 2, -1);
		this.scene.scale(0.3, 3.5, 0.3);
		this.myUnitCubeQuad.display();
		this.scene.popMatrix();

		// table top
    this.scene.tableAppearance.apply();

		this.scene.pushMatrix();
		this.scene.translate(0, 3.5, 0);
		this.scene.scale(5, 0.3, 3);
		this.myUnitCubeQuad.display();
		this.scene.popMatrix();
	};
 };
