var degToRad = Math.PI / 180.0;

var BOARD_WIDTH = 6.0;
var BOARD_HEIGHT = 4.0;

var BOARD_A_DIVISIONS = 30;
var BOARD_B_DIVISIONS = 100;

class LightingScene extends CGFscene {
	constructor() {
		super();
	};

	init(application) {
		super.init(application);

		this.initCameras();

		this.initLights();

		this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
		this.gl.clearDepth(100.0);
		this.gl.enable(this.gl.DEPTH_TEST);
		this.gl.enable(this.gl.CULL_FACE);
		this.gl.depthFunc(this.gl.LEQUAL);

		this.axis = new CGFaxis(this);

		// PL4 - 1.2
		this.enableTextures(true);

		// Scene elements
		this.table = new MyTable(this);
		// PL4 - 2.3
		this.windowedWall = new MyQuad(this, -1, 2, -1, 2);
		this.planeWall = new Plane(this);
		this.floor = new MyQuad(this, 0, 10, 0, 12);

		// PL4 - 3.3
		var slidesUrl = "../resources/images/slides.png";
		var boardUrl = "../resources/images/board.png"
		var slidesImg = new Image();
		var boardImg = new Image();

		this.boardA = new Plane(this, BOARD_A_DIVISIONS, 512, 512); //slides
		this.boardB = new Plane(this, BOARD_B_DIVISIONS, 372, 512); //board

		// PL3 - 1.3
		this.prism = new MyPrism(this, 8, 20);

		// PL3 - 2.3
		this.cylinder = new MyCylinder(this, 8, 20);

		// PL3 - extra
		this.lamp = new MyLamp(this, 8, 20);

		// Materials
		this.materialDefault = new CGFappearance(this);

		this.slidesAppearance = new CGFappearance(this);
		this.slidesAppearance.setAmbient(0.3,0.3,0.3,1);
		this.slidesAppearance.setDiffuse(0.9,0.9,0.9,1);
		this.slidesAppearance.setSpecular(0.1,0.1,0.1,1);
		this.slidesAppearance.setShininess(1);
		// PL4 - 3.2
		this.slidesAppearance.loadTexture(slidesUrl);


		this.boardAppearance = new CGFappearance(this);
		this.boardAppearance.setAmbient(0.3,0.3,0.3,1);
		this.boardAppearance.setDiffuse(0.5,0.5,0.5,1);
		this.boardAppearance.setSpecular(0.7,0.7,0.7,1);
		this.boardAppearance.setShininess(120);
		// PL4 - 3.2
		this.boardAppearance.loadTexture(boardUrl);

		this.floorAppearance = new CGFappearance(this);
		// PL4 - 2.2
		this.floorAppearance.loadTexture("../resources/images/floor.png");
		this.floorAppearance.setTextureWrap('REPEAT', 'REPEAT');

		this.materialPlaneWall = new CGFappearance(this);
		this.materialPlaneWall.setSpecular(0.1,0.1,0.1,1);
		this.materialPlaneWall.setAmbient(0.313, 0.466, 0.525,1);
		this.materialPlaneWall.setDiffuse(0.313, 0.466, 0.525,1);

		// PL4 - 2.3
		this.windowAppearance = new CGFappearance(this);
		this.windowAppearance.loadTexture("../resources/images/window.png");
		this.windowAppearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');


	};

	initCameras() {
		this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(30, 30, 30), vec3.fromValues(0, 0, 0));
	};

	initLights() {
		//this.setGlobalAmbientLight(0.5,0.5,0.5, 1.0);
		this.setGlobalAmbientLight(0,0,0, 1.0);

		// Positions for five lights
		this.lights[0].setPosition(4, 6, 1, 1);
		this.lights[0].setVisible(true); // show marker on light position (different from enabled)

		this.lights[1].setPosition(10.5, 6.0, 1.0, 1.0);
		this.lights[1].setVisible(true); // show marker on light position (different from enabled)

		this.lights[2].setPosition(10.5, 6.0, 5.0, 1.0);
		this.lights[2].setVisible(true); // show marker on light position (different from enabled)
		this.lights[3].setPosition(4, 6.0, 5.0, 1.0);
		this.lights[3].setVisible(true); // show marker on light position (different from enabled)

		this.lights[0].setAmbient(0, 0, 0, 1);
		this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.lights[0].setSpecular(1,1,0,1);
		this.lights[0].enable();

		this.lights[1].setAmbient(0, 0, 0, 1);
		this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.lights[1].enable();

		this.lights[2].setSpecular(1,1,1,1);
		this.lights[2].setConstantAttenuation(0);
		this.lights[2].setLinearAttenuation(1);
		this.lights[2].enable();

		this.lights[3].setConstantAttenuation(0);
		this.lights[3].setQuadraticAttenuation(1);
		this.lights[3].enable();

		//PL4 - 2.3
		this.lights[4].setPosition(0, 4, 7.5, 1);
		this.lights[4].setVisible(true); // show marker on light position (different from enabled)

		this.lights[4].setAmbient(0, 0, 0, 1);
		this.lights[4].setDiffuse(1, 1, 1, 1);
		this.lights[4].setSpecular(1, 1, 1, 1);
		this.lights[4].enable();
	};

	updateLights() {
		for (var i = 0; i < this.lights.length; i++)
			this.lights[i].update();
	}


	display() {
		// ---- BEGIN Background, camera and axis setup

		// Clear image and depth buffer everytime we update the scene
		this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
		this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

		// Initialize Model-View matrix as identity (no transformation)
		this.updateProjectionMatrix();
		this.loadIdentity();

		// Apply transformations corresponding to the camera position relative to the origin
		this.applyViewMatrix();

		// Update all lights used
		this.updateLights();

		// Draw axis
		this.axis.display();

		this.materialDefault.apply();

		// ---- END Background, camera and axis setup

		// ---- BEGIN Scene drawing section

		// Floor
		this.pushMatrix();
			this.translate(7.5, 0, 7.5);
			this.rotate(-90 * degToRad, 1, 0, 0);
			this.scale(15, 15, 0.2);

			this.floorAppearance.apply();
			this.floor.display();
		this.popMatrix();

		// Left Wall
		this.pushMatrix();
			this.translate(0, 4, 7.5);
			this.rotate(90 * degToRad, 0, 1, 0);
			this.scale(15, 8, 0.2);

			// PL4 - 2.3
			this.windowAppearance.apply();
			this.windowedWall.display();
		this.popMatrix();

		// Plane Wall
		this.pushMatrix();
			this.translate(7.5, 4, 0);
			this.scale(15, 8, 0.2);

			this.materialPlaneWall.apply();
			this.planeWall.display();
		this.popMatrix();

		// First Table
		this.pushMatrix();
			this.translate(5, 0, 8);
			this.table.display();
		this.popMatrix();

		// Second Table
		this.pushMatrix();
			this.translate(12, 0, 8);
			this.table.display();
		this.popMatrix();

		// Board A
		this.pushMatrix();
			this.translate(4, 4.5, 0.2);
			this.scale(BOARD_WIDTH, BOARD_HEIGHT, 1);

			this.slidesAppearance.apply();
			this.boardA.display();
		this.popMatrix();

		// Board B
		this.pushMatrix();
			this.translate(10.5, 4.5, 0.2);
			this.scale(BOARD_WIDTH, BOARD_HEIGHT, 1);

			this.boardAppearance.apply();
			this.boardB.display();
		this.popMatrix();

		// PL3 - 1.3
		// MyPrism
		this.pushMatrix();
			this.translate(1, 0, 4);
			this.rotate(-90 * degToRad, 1, 0, 0);
			this.scale(1, 1, 5);
			this.prism.display();
		this.popMatrix();

		// PL3 - 2.3
		// MyCylinder
		this.pushMatrix();
			this.translate(1, 0, 12);
			this.rotate(-90 * degToRad, 1, 0, 0);
			this.scale(1, 1, 5);
			this.cylinder.display();
		this.popMatrix();

		// PL3 - extra
		// MyLamp
		this.pushMatrix();
			this.translate(7.5, 8, 7.5);
			this.rotate(-180 * degToRad, 1, 0, 0);
			this.scale(1, 1, 1);
			this.lamp.display();
		this.popMatrix();

		// ---- END Scene drawing section
	};
};
