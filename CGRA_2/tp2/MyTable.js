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
		this.scene.materialWood = new CGFappearance(this.scene);
		this.scene.materialWood.setSpecular(0.1,0.1,0.1,1);
		//this.scene.materialWood.loadTexture("http://192.168.56.1:8080/CGRA_2/textures/wood.jpg"); //requires activation of textures and vertice mapping
		this.scene.materialWood.setAmbient(0.509, 0.321, 0.003,1);
		this.scene.materialWood.setDiffuse(0.509, 0.321, 0.003,1);
  }

	display()
	{
		// legs
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

    //this.materialDefault.apply();

		// table top
		this.scene.pushMatrix();
		this.scene.translate(0, 3.5, 0);
		this.scene.scale(5, 0.3, 3);
    this.scene.materialWood.apply();
		this.myUnitCubeQuad.display();
		this.scene.popMatrix();
	};
 };
