const degToRad = Math.PI / 180.0;

const TERRAIN_UNITS = 50;
const LIGHT_HEIGHT = 20;

const FORWARD_MAXSPEED = 10.0;
const BACKWARD_MAXSPEED = 5.0;
const SPEED_INCREMENT_SEC = 5.0;
const TURN_INCREMENT_SEC = 5.0;

const UPDATE_MS = 30.0;
const CAR_LEN = 4;
const CAR_WIDTH = 2.25;
const CAR_HEIGHT = 1.5;
const CAR_AXISX = 2.25;
const CAR_AXISZ = 2.25;
const CAR_WHEELRADIUS = 0.5;
const CAR_WHEELTHICKNESS = 0.25;

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
        this.vehicle = new MyVehicle(this, CAR_LEN, CAR_WIDTH, CAR_HEIGHT, CAR_AXISX, CAR_AXISZ, CAR_WHEELRADIUS, CAR_WHEELTHICKNESS);
        // this.vehicle = new MyVehicle(this, 8, 4.5, 3, 4.5, 4.5, 1, 0.5);

        // PL6 - 7.3
        this.crane = new MyCrane(this, 7, 4);
        this.floorD = new MyTerrain(this, 10);
        this.floorR = new MyTerrain(this, CAR_LEN + 2);


        // Materials
        this.materialDefault = new CGFappearance(this);

        // terrain
        this.terrainAppearance = new CGFappearance(this);
        this.terrainAppearance.loadTexture("../resources/images/grass.png");
        this.terrainAppearance.setTextureWrap('REPEAT', 'REPEAT');

        // floorD
        this.floorDAppearance = new CGFappearance(this);
        this.floorDAppearance.loadTexture("../resources/images/floorD.jpg");

        // floorR
        this.floorRAppearance = new CGFappearance(this);
        this.floorRAppearance.loadTexture("../resources/images/floorR.jpg");

        // PL6 - 4.2
        this.setUpdatePeriod(UPDATE_MS);

        // PL6 - 3.3
        this.lightCenter = true;
        this.lightCorner1 = true;
        this.lightCorner2 = true;
        this.lightCorner3 = true;
        this.lightCorner4 = true;

        this.lightMarkersState = false;

        // PL6 - 3.4
        this.axisState = false;

        // PL6 - 4.2
        this.carSpeed = 0.0;
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

    //TODO: stabilize direction
    //TODO: handle rearDir so as to make car actually turn
    // PL6 - 4.2 + 4.3
    checkKeys() {
        if(this.gui.isKeyPressed("KeyL"))
            this.lightMarkersDisplay();


        if(this.gui.isKeyPressed("KeyW"))
            this.carSpeed + SPEED_INCREMENT_SEC * UPDATE_MS / 1000 < FORWARD_MAXSPEED ?
                (this.carSpeed += SPEED_INCREMENT_SEC * UPDATE_MS / 1000) : (this.carSpeed = FORWARD_MAXSPEED);

        if(this.gui.isKeyPressed("KeyS"))
            this.carSpeed - SPEED_INCREMENT_SEC * UPDATE_MS / 1000 > -BACKWARD_MAXSPEED ?
                (this.carSpeed -= SPEED_INCREMENT_SEC * UPDATE_MS / 1000) : (this.carSpeed = -BACKWARD_MAXSPEED);

        if(this.gui.isKeyPressed("Space")) {
            this.carSpeed = 0;
        }

        if(this.gui.isKeyPressed("KeyD")) {
            this.vehicle.steerChange = true;

            this.vehicle.frontDir.x - (TURN_INCREMENT_SEC * UPDATE_MS / 1000) > 0.5 ?
                this.vehicle.frontDir.x -= TURN_INCREMENT_SEC * UPDATE_MS / 1000 : 0.5;

            this.vehicle.frontDir.z + (TURN_INCREMENT_SEC * UPDATE_MS / 1000) < 0.5 ?
                this.vehicle.frontDir.z += TURN_INCREMENT_SEC * UPDATE_MS / 1000 : 0.5;
        }

        if(this.gui.isKeyPressed("KeyA")) {
            this.vehicle.steerChange = true;

            this.vehicle.frontDir.x - (TURN_INCREMENT_SEC * UPDATE_MS / 1000) > 0.5 ?
                this.vehicle.frontDir.x -= TURN_INCREMENT_SEC * UPDATE_MS / 1000 : 0.5;

            this.vehicle.frontDir.z - (TURN_INCREMENT_SEC * UPDATE_MS / 1000) > -0.5 ?
                this.vehicle.frontDir.z -= TURN_INCREMENT_SEC * UPDATE_MS / 1000 : -0.5;
        }
    }

    handleCar() {
        this.vehicle.carSpeed = this.carSpeed;
        this.vehicle.update();
    }

    update(currTime) {
        // PL6 - 4.2
        this.checkKeys();
        this.handleCar();
    }

    initCameras() {
        this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(50, 50, 65), vec3.fromValues(0, 0, 0));
    };

    initLights() {
        this.setGlobalAmbientLight(0.2, 0.2, 0.2, 1.0);

        // Positions for five floodlights
        this.lights[0].setPosition(0, LIGHT_HEIGHT, 0, 1);
        this.lights[1].setPosition(TERRAIN_UNITS/2, LIGHT_HEIGHT, TERRAIN_UNITS/2, 1);
        this.lights[2].setPosition(TERRAIN_UNITS/2, LIGHT_HEIGHT, -TERRAIN_UNITS/2, 1);
        this.lights[3].setPosition(-TERRAIN_UNITS/2, LIGHT_HEIGHT, -TERRAIN_UNITS/2, 1);
        this.lights[4].setPosition(-TERRAIN_UNITS/2, LIGHT_HEIGHT, TERRAIN_UNITS/2, 1);

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
            this.translate(10, 0, 10);
            this.vehicle.display();
        this.popMatrix();

        // PL6 - 7.3
        this.pushMatrix();
            this.translate(0, 0, 0);
            this.crane.display();
        this.popMatrix();

        this.pushMatrix();
          this.translate(0, 0, -9);
          this.scale(10, 1, 10);
          this.rotate(-90 * degToRad, 1, 0, 0);
          this.floorDAppearance.apply();
          this.floorD.display();
        this.popMatrix();

        this.pushMatrix();
          this.translate(0, 0, CAR_LEN + 2);
          this.scale(CAR_LEN + 2, 1, CAR_LEN + 2);
          this.rotate(-90 * degToRad, 1, 0, 0);
          this.floorRAppearance.apply();
          this.floorR.display();
        this.popMatrix();

		// ---- END Scene drawing section
	};
}
