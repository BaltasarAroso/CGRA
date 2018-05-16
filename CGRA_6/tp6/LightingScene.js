const degToRad = Math.PI / 180.0;

const TERRAIN_UNITS = 50;

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
        // this.vehicle = new MyVehicle(this, len, axisLen, wheelDiameter, width, height);

        // Materials
        this.materialDefault = new CGFappearance(this);

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
        this.setGlobalAmbientLight(0.5, 0.5, 0.5, 1.0);
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
		// this.updateLights();

		// Draw axis
		this.axis.display();

		this.materialDefault.apply();

		// ---- END Background, camera and axis setup

        // ---- BEGIN Scene drawing section
        
        // PL6 - 1.2
        this.pushMatrix();
            this.terrain.display();
        this.popMatrix();

        // PL6 - 2.4
        // this.pushMatrix();
        //     this.translate(7.5, 0, 4);
        //     this.scale(4, 4, 4);
        //     this.vehicle.display();
        // this.popMatrix();

		// ---- END Scene drawing section
	};
}
