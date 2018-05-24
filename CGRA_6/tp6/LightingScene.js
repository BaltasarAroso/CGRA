const degToRad = Math.PI / 180.0;

const TERRAIN_UNITS = 50;
const LIGHT_HEIGHT = 20;

const UPDATE_MS = 30.0;

const CAR_LEN = 4;
const CAR_WIDTH = 2.25;
const CAR_HEIGHT = 1.5;
const CAR_AXISX = 2.25;
const CAR_AXISZ = 2.25;
const CAR_WHEELRADIUS = 0.5;
const CAR_WHEELTHICKNESS = 0.25;

const CRANE_HEIGHT = 10;
const CRANE_RANGE = 7;
const FLOORD_SIZE = 10;

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
        this.vehicleAppearances = ["black", "orange", "green", "blue"];
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

          // formula to get the this.rotationArm final value
      		// this.height * Math.cos(30 * degToRad) - this.range * Math.sin(this.rotationArm * degToRad) - 2.05 = this.carHeight;
          this.angleArm = Math.asin(-(CAR_HEIGHT + 2.05 - CRANE_HEIGHT * Math.cos(30 * degToRad)) / CRANE_RANGE);

        this.crane = new MyCrane(this, CRANE_HEIGHT, CRANE_RANGE, this.angleArm);
        this.floorD = new MyQuad(this);
        this.floorR = new MyQuad(this);


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

        // crane
        this.craneAppearance = new CGFappearance(this);
        this.craneAppearance.loadTexture("../resources/images/crane.jpg");

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

        // PL6 - 7.3
        this.craneMove = false;
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

    // PL6 - 4.2 + 4.3
    checkKeys() {
        if(this.gui.isKeyPressed("KeyL"))
            this.lightMarkersDisplay();


        if(this.gui.isKeyPressed("KeyW"))
            this.carSpeed + SPEED_INCREMENT_SEC * UPDATE_MS / 1000.0 < FORWARD_MAXSPEED ?
                (this.carSpeed += SPEED_INCREMENT_SEC * UPDATE_MS / 1000.0) : (this.carSpeed = FORWARD_MAXSPEED);

        if(this.gui.isKeyPressed("KeyS"))
            this.carSpeed - SPEED_INCREMENT_SEC * UPDATE_MS / 1000.0 > -BACKWARD_MAXSPEED ?
                (this.carSpeed -= SPEED_INCREMENT_SEC * UPDATE_MS / 1000.0) : (this.carSpeed = -BACKWARD_MAXSPEED);

        if(this.gui.isKeyPressed("Space")) {
            let nextSpeed = 0;

            if(this.carSpeed > 0) {
                nextSpeed = this.carSpeed * (1 - (BRAKES_PERCENT_SEC * UPDATE_MS / 1000.0));

                if(nextSpeed < 0 || this.carSpeed < FORWARD_MAXSPEED*0.2)
                    this.carSpeed = 0;
                else
                    this.carSpeed = nextSpeed;

            } else if(this.carSpeed < 0) {
                nextSpeed = this.carSpeed * (1 - (BRAKES_PERCENT_SEC * UPDATE_MS / 1000.0));

                if(nextSpeed > 0 || this.carSpeed > -FORWARD_MAXSPEED*0.2)
                    this.carSpeed = 0;
                else
                    this.carSpeed = nextSpeed;
            }

        }

        if(this.gui.isKeyPressed("KeyD")) {
            let sign = 1;  // Check if moving forwards or backwards
            if(this.carSpeed < 0) sign = -1;

            let nextAngle = this.vehicle.frontWheelsAngle - (TURN_WHEEL_DEGREE_SEC * UPDATE_MS / 1000.0) * sign;

            if(nextAngle < this.vehicle.steerAngle - TURN_MAX_DEGREES || nextAngle > this.vehicle.steerAngle + TURN_MAX_DEGREES)
                this.vehicle.frontWheelsAngle = this.vehicle.steerAngle - sign*TURN_MAX_DEGREES;
            else
                this.vehicle.frontWheelsAngle = nextAngle;
        }

        if(this.gui.isKeyPressed("KeyA")) {
            let sign = 1;  // Check if moving forwards or backwards
            if(this.carSpeed < 0) sign = -1;

            let nextAngle = this.vehicle.frontWheelsAngle + (TURN_WHEEL_DEGREE_SEC * UPDATE_MS / 1000.0) * sign;

            if(nextAngle > this.vehicle.steerAngle + TURN_MAX_DEGREES || nextAngle < this.vehicle.steerAngle - TURN_MAX_DEGREES)
                this.vehicle.frontWheelsAngle = this.vehicle.steerAngle + sign*TURN_MAX_DEGREES;
            else
                this.vehicle.frontWheelsAngle = nextAngle;
        }

        // Crane moves
        if(this.gui.isKeyPressed("KeyR")) {
          this.craneMoveDR = true;
        }
    }

    handleCar() {
        this.vehicle.carSpeed = this.carSpeed;
        this.vehicle.update();
    }

    handleCrane() {
        this.crane.update();
    }

    update() {
        // PL6 - 4.2
        this.checkKeys();
        this.handleCar();

        // PL6 - 7.3
        this.handleCrane();
    }

    initCameras() {
        this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(50, 50, 50), vec3.fromValues(0, 0, 0));
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

          // PL6 - 7.3
          if (!this.crane.flagCar) {
            // PL6 - 2.4
            this.pushMatrix();
              this.translate(-TERRAIN_UNITS / 3, 0, TERRAIN_UNITS / 3);
              this.rotate(30 * degToRad, 0, 1, 0);
              this.vehicle.display();
            this.popMatrix();
          }

          // PL6 - 7.3
          this.pushMatrix();
              // this.translate(0, 0, 0);
              this.craneAppearance.apply();
              this.crane.display();
          this.popMatrix();

          this.pushMatrix();
            this.translate(0, 0.1, -CRANE_HEIGHT * Math.sin(30 * degToRad) - CRANE_RANGE * 1.25);
            this.scale(FLOORD_SIZE, 1, FLOORD_SIZE);
            this.rotate(-90 * degToRad, 1, 0, 0);
            this.floorDAppearance.apply();
            this.floorD.display();
          this.popMatrix();

          this.pushMatrix();
            this.translate(0, 0.1, CRANE_HEIGHT * Math.sin(30 * degToRad) + CRANE_RANGE * Math.cos(this.angleArm) + 0.75);
            this.scale(CAR_LEN + 2, 1, CAR_LEN + 2);
            this.rotate(-90 * degToRad, 1, 0, 0);
            this.floorRAppearance.apply();
            this.floorR.display();
          this.popMatrix();

    	// ---- END Scene drawing section
    };
}
