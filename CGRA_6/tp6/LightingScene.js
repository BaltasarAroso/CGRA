const degToRad = Math.PI / 180.0;

const TERRAIN_UNITS = 50;
const LIGHT_ELEVATION = 10;

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

        // PL6 - 5.2
        this.vehicleAppearances = ["black", "yellow", "green", "blue"];
        this.currVehicleAppearance = this.vehicleAppearances[0];

        // this.vehicleAppearanceList = {};
        // for (let i = 0; i < this.vehicleAppearances.length; i++) {
        //   this.vehicleAppearanceList[this.vehicleAppearances[i]] = i;
        // }

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

        // PL6 - 4.2
        this.setUpdatePeriod(100);

        // PL6 - 3.3
        this.lightCenter = true;
        this.lightCorner1 = true;
        this.lightCorner2 = true;
        this.lightCorner3 = true;
        this.lightCorner4 = true;

        this.lightMarkersState = false;

        // PL6 - 3.4
        this.axisState = false;

    };

    // PL6 - 3.4
    axisDisplay() {
        this.axisState = !this.axisState;
    }

    lightMarkersDisplay() {
        this.lightMarkersState = !this.lightMarkersState;

        for (let i = 0; i < this.lights.length; i++) {
            this.lights[i].setVisible(this.lightMarkersState);
        }
    }

    // PL6 - 4.2
    checkKeys() {
        let text = "Keys pressed: ";
        let keysPressed = false;

        if(this.gui.isKeyPressed("KeyL"))
            this.lightMarkersDisplay();

        if(this.gui.isKeyPressed("KeyW")) {
            text+=" W ";
            keysPressed = true;
        }
        if(this.gui.isKeyPressed("KeyS")) {
            text+=" S ";
            keysPressed = true;
        }
        if(keysPressed)
            console.log(text);
    }

    update(currTime) {
        // PL6 - 4.2
        this.checkKeys();
    }

    initCameras() {
        this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(30, 30, 30), vec3.fromValues(0, 0, 0));
    };

    initLights() {
        this.setGlobalAmbientLight(0.2, 0.2, 0.2, 1.0);

        // Positions for five floodlights
        this.lights[0].setPosition(0, LIGHT_ELEVATION, 0, 1);
        this.lights[1].setPosition(TERRAIN_UNITS/2, LIGHT_ELEVATION, TERRAIN_UNITS/2, 1);
        this.lights[2].setPosition(TERRAIN_UNITS/2, LIGHT_ELEVATION, -TERRAIN_UNITS/2, 1);
        this.lights[3].setPosition(-TERRAIN_UNITS/2, LIGHT_ELEVATION, -TERRAIN_UNITS/2, 1);
        this.lights[4].setPosition(-TERRAIN_UNITS/2, LIGHT_ELEVATION, TERRAIN_UNITS/2, 1);

        this.lights[0].setAmbient(0, 0, 0, 1);
        this.lights[0].enable();

        this.lights[1].setAmbient(0, 0, 0, 1);
        this.lights[1].enable();

        this.lights[2].setAmbient(0, 0, 0, 1);
        this.lights[2].enable();

        this.lights[3].setAmbient(0, 0, 0, 1);
        this.lights[3].enable();

        this.lights[4].setAmbient(0, 0, 0, 1);
        this.lights[4].enable();
    };

    updateLights() {
        for (let i = 0; i < this.lights.length; i++) {
            this.lights[i].update();
        }
        this.lightCenter  ? this.lights[0].enable() : this.lights[0].disable();
        this.lightCorner1 ? this.lights[1].enable() : this.lights[1].disable();
        this.lightCorner2 ? this.lights[2].enable() : this.lights[2].disable();
        this.lightCorner3 ? this.lights[3].enable() : this.lights[3].disable();
        this.lightCorner4 ? this.lights[4].enable() : this.lights[4].disable();
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

		// Draw axis   +   PL6 - 3.4
		if(this.axisState) this.axis.display();

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
            this.translate(0, 0, 0);
            this.vehicle.display();
        this.popMatrix();

		// ---- END Scene drawing section
	};
}
