const degToRad = Math.PI / 180.0;

const TERRAIN_UNITS = 50;
const LIGHT_ELEVATION = 30;

class LightingScene extends CGFscene {
    constructor() {
        super();
    };

    init(application) {
        super.init(application);

        this.initCameras();

        this.initLights();

        // Blue Sky - PL6 - 1.3
        this.gl.clearColor(0.529, 0.807, 0.980, 1.0);
        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);

        this.axis = new CGFaxis(this);

        this.enableTextures(true);

        // Scene elements

        // Terrain - PL6 - 1.2
        this.terrain = new MyTerrain(this, TERRAIN_UNITS);

        // PL6 - 2.4
        this.vehicle = new MyVehicle(this, 4, 2.25, 1.5, 2.25, 2.25, 0.5, 0.25);
        // this.vehicle = new MyVehicle(this, 8, 4.5, 3, 4.5, 4.5, 1, 0.5);

        // Materials
        this.materialDefault = new CGFappearance(this);

        // terrain
        this.terrainAppearance = new CGFappearance(this);
        this.terrainAppearance.loadTexture("../resources/images/grass.png");
        this.terrainAppearance.setTextureWrap('REPEAT', 'REPEAT');

        this.setUpdatePeriod(100);

        // // PL6 - 3.1
        // this.option1 = true;
        // this.option2 = false;
        // this.speed = 3;

    };

    // // PL6 - 3.1
    // doSomething() {
    //     console.log("Doing something...");
    // }

    // PL5 - 1.5
    update(currTime) {
    }

    initCameras() {
        this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(30, 30, 30), vec3.fromValues(0, 0, 0));
    };

    initLights() {
        this.setGlobalAmbientLight(0.2, 0.2, 0.2, 1.0);

        // Positions for four floodlights
        this.lights[0].setPosition(TERRAIN_UNITS/2, LIGHT_ELEVATION, TERRAIN_UNITS/2, 1);
        // this.lights[0].setVisible(true); // show marker on light position (different from enabled)
        
        this.lights[1].setPosition(TERRAIN_UNITS/2, LIGHT_ELEVATION, -TERRAIN_UNITS/2, 1);
        // this.lights[1].setVisible(true); // show marker on light position (different from enabled)
        
        this.lights[2].setPosition(-TERRAIN_UNITS/2, LIGHT_ELEVATION, TERRAIN_UNITS/2, 1);
        // this.lights[2].setVisible(true); // show marker on light position (different from enabled)
        
        this.lights[3].setPosition(-TERRAIN_UNITS/2, LIGHT_ELEVATION, -TERRAIN_UNITS/2, 1);
        // this.lights[3].setVisible(true); // show marker on light position (different from enabled)

        this.lights[0].setAmbient(0, 0, 0, 1);
        this.lights[0].enable();

        this.lights[1].setAmbient(0, 0, 0, 1);
        this.lights[1].enable();

        this.lights[2].setAmbient(0, 0, 0, 1);
        this.lights[2].enable();

        this.lights[3].setAmbient(0, 0, 0, 1);
        this.lights[3].enable();
    };

    updateLights() {
        for (let i = 0; i < this.lights.length; i++)
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


        // PL6 - 1.2
        this.pushMatrix();
            this.terrainAppearance.apply();
            this.scale(TERRAIN_UNITS, 1, TERRAIN_UNITS);
            this.rotate(-90 * degToRad, 1, 0, 0);
            this.terrain.display();
        this.popMatrix();

        // PL6 - 2.4
        this.pushMatrix();
            this.translate(7.5, 0, 4);
            this.vehicle.display();
        this.popMatrix();

		// ---- END Scene drawing section
	};
}
