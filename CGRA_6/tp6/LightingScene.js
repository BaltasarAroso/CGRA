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
const CRANE_VERTICAL_ANGLE = 30;
const CRANE_ARM_RADIUS = 0.5;

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


        /** Scene parameters **/

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
        this.setUpdatePeriod(UPDATE_MS);
        this.carSpeed = 0.0;

        // PL6 - 5.2
        this.vehicleAppearances = ["black", "orange", "green", "blue"];
        this.currVehicleAppearance = this.vehicleAppearances[0];
        this.vehicleAppearanceList = {};
        for (let i = 0; i < this.vehicleAppearances.length; i++) {
          this.vehicleAppearanceList[this.vehicleAppearances[i]] = i;
        }

        // PL6 - 7.3
        this.craneMove = false;


        /** Scene elements **/

        // PL6 - 2.4
        this.vehicle = new MyVehicle(this, CAR_LEN, CAR_WIDTH, CAR_HEIGHT, CAR_AXISX, CAR_AXISZ, CAR_WHEELRADIUS, CAR_WHEELTHICKNESS);

        // PL6 - 6.1
        // //example for nrDivs = 8 -> grid of 9x9 vertices
        // this.altimetry = [
        //     [ 2.0, 3.0, 2.0, 4.0, 2.5, 2.4, 2.3, 1.3, 0.3 ],
        //     [ 2.0, 3.0, 2.0, 4.0, 7.5, 6.4, 4.3, 1.3, 0.3 ],
        //     [ 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0 ],
        //     [ 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0 ],
        //     [ 0.0, 0.0, 2.0, 4.0, 2.5, 2.4, 0.0, 0.0, 0.0 ],
        //     [ 0.0, 0.0, 2.0, 4.0, 3.5, 2.4, 0.0, 0.0, 0.0 ],
        //     [ 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0 ],
        //     [ 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0 ],
        //     [ 2.0, 3.0, 2.0, 1.0, 2.5, 2.4, 2.3, 1.3, 0.3 ]
        // ];

        //Generate pseudo-random altimetry at the borders of the map
        this.altimetry = [];

        for(let k = 0; k <= TERRAIN_UNITS; k++) {
            this.altimetry[k] = [];
            for(let l = 0; l <= TERRAIN_UNITS; l++) {
                if(k < TERRAIN_UNITS*0.90 && k > TERRAIN_UNITS*0.10
                        && l < TERRAIN_UNITS*0.90 && l > TERRAIN_UNITS*0.10) {
                    this.altimetry[k][l] = 0.0;
                } else {
                    if(Math.random() < 0.65) {  // 65% chance
                        this.altimetry[k][l] = Math.random()*(TERRAIN_UNITS/16);
                    } else if(Math.random() < 0.90) {  // 25% chance
                        this.altimetry[k][l] = Math.random() * (TERRAIN_UNITS / 8);
                    } else if(Math.random() < 0.95) {  // 5% chance
                        this.altimetry[k][l] = Math.random() * (TERRAIN_UNITS / 4);
                    } else {  // 5% chance
                        this.altimetry[k][l] = 0.0;
                    }
                }
            }
        }


        // Terrain - PL6 - 1.2
        this.terrain = new MyTerrain(this, TERRAIN_UNITS, this.altimetry);

        // PL6 - 7.3
        this.crane = new MyCrane(this);
        this.floorD = new MyQuad(this);
        this.floorR = new MyQuad(this);

        this.vehicle.pos.x = -TERRAIN_UNITS / 3;
        this.vehicle.pos.y = 0;
        this.vehicle.pos.z = TERRAIN_UNITS / 3;


        /** Materials **/
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
            let speedFactor;
            if(this.carSpeed < 0)
                speedFactor = (-1 -0.75*this.carSpeed/BACKWARD_MAXSPEED);
            else
                speedFactor = (1 - 0.5*this.carSpeed/FORWARD_MAXSPEED);

            let nextAngle = this.vehicle.frontWheelsAngle - (TURN_WHEEL_DEGREE_SEC * UPDATE_MS / 1000.0) * speedFactor;

            if(nextAngle < this.vehicle.steerAngle - TURN_MAX_DEGREES || nextAngle > this.vehicle.steerAngle + TURN_MAX_DEGREES)
                this.carSpeed < 0 ?
                    this.vehicle.frontWheelsAngle = this.vehicle.steerAngle + TURN_MAX_DEGREES :
                    this.vehicle.frontWheelsAngle = this.vehicle.steerAngle - TURN_MAX_DEGREES;
            else
                this.vehicle.frontWheelsAngle = nextAngle;
        }

        if(this.gui.isKeyPressed("KeyA")) {
            let speedFactor;
            if(this.carSpeed < 0)
                speedFactor = (-1 -0.75*this.carSpeed/BACKWARD_MAXSPEED);
            else
                speedFactor = (1 - 0.5*this.carSpeed/FORWARD_MAXSPEED);

            let nextAngle = this.vehicle.frontWheelsAngle + (TURN_WHEEL_DEGREE_SEC * UPDATE_MS / 1000.0) * speedFactor;

            if(nextAngle > this.vehicle.steerAngle + TURN_MAX_DEGREES || nextAngle < this.vehicle.steerAngle - TURN_MAX_DEGREES)
                this.carSpeed < 0 ?
                    this.vehicle.frontWheelsAngle = this.vehicle.steerAngle - TURN_MAX_DEGREES :
                    this.vehicle.frontWheelsAngle = this.vehicle.steerAngle + TURN_MAX_DEGREES;
            else
                this.vehicle.frontWheelsAngle = nextAngle;
        }

        // Crane movement
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
        if (!this.crane.flagCar) {
          // PL6 - 4.2
          this.checkKeys();
          this.handleCar();
        }

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

    	/** Background, camera and axis setup **/

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


        /** Scene drawing section **/

        // PL6 - 1.2
        this.pushMatrix();
            this.terrainAppearance.apply();
            this.scale(TERRAIN_UNITS, this.terrain.maxHeight, TERRAIN_UNITS);
            this.rotate(-90 * degToRad, 1, 0, 0);
            this.rotate(90 * degToRad, 0, 0, 1);
            this.terrain.display();
        this.popMatrix();

        // PL6 - 7.3
        if (!this.crane.flagCar) {
            this.vehicle.display(); // PL6 - 2.4
        }

        // PL6 - 7.3
        this.pushMatrix();
            this.craneAppearance.apply();
            this.crane.display();
        this.popMatrix();

        this.pushMatrix();
            this.translate(0, 0.1, -(this.crane.verticalArmRange + this.crane.landingArmLen));
            this.scale(FLOORD_SIZE, 1, FLOORD_SIZE);
            this.rotate(-90 * degToRad, 1, 0, 0);
            this.floorDAppearance.apply();
            this.floorD.display();
        this.popMatrix();

        this.pushMatrix();
            this.translate(
                0,
                0.1,
                this.crane.verticalArmRange +
                this.crane.landingArmLen * Math.cos(this.crane.landingArmAngle) +
                this.crane.pulleyRadius
            );
            this.scale(CAR_LEN + 2, 1, CAR_LEN + 2);
            this.rotate(-90 * degToRad, 1, 0, 0);
            this.floorRAppearance.apply();
            this.floorR.display();
        this.popMatrix();
    };
}
