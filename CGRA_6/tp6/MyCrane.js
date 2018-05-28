/**
 * MyCrane
 * @constructor
 */
class MyCrane extends CGFobject {
	constructor(scene) {
		super(scene);

		/** Static Parameters **/
		this.height = CRANE_HEIGHT;
		this.landingArmLen = CRANE_RANGE;
		this.verticalArmAngle = CRANE_VERTICAL_ANGLE;
		this.armRadius = CRANE_ARM_RADIUS;

		/** Dynamic Parameters - Dimensions **/
		this.pulleyRadius = 2 * this.armRadius;
		this.pulleyThickness = 2 * this.armRadius;
		this.pendingCableLen = 4 * this.armRadius;
		this.magnetRadius = 1.5 * this.armRadius;
		this.magnetThickness = this.pulleyThickness / 4;
		this.verticalArmLen = CRANE_HEIGHT / Math.cos(this.verticalArmAngle * degToRad);
		this.verticalArmRange = this.verticalArmLen * Math.sin(this.verticalArmAngle * degToRad);

		this.landingArmAngle = Math.asin(
			(CRANE_HEIGHT + this.pulleyThickness - this.armRadius/2
			- 0.1 - CAR_HEIGHT - this.magnetThickness - this.pendingCableLen
			) / CRANE_RANGE
		);

		/** Dynamic Parameters - Movement **/
		this.rotationDR = 0; // in degrees (rotation of 180º)
		this.rotationArm = 0; // in radians
		this.flagCar = false;
		this.carFall = false;

		/** Elements **/
		this.cylinder = new MyCylinder(this.scene, 100, 2);
		this.circle = new MyCircle(this.scene, 100);
	};

	update () {
		/** D -> R Movement **/
		if (this.scene.craneMoveDR && this.rotationDR <= 180) {
			this.rotationDR += 20 * UPDATE_MS / 1000.0;
			this.rotationArm += (this.landingArmAngle * 20 * UPDATE_MS / 1000.0) / Math.PI;
		}

		/** Car in FloorR verification **/
		if (this.rotationDR > 180 &&
		this.scene.vehicle.pos.x < 2 && this.scene.vehicle.pos.x > -2 &&
		this.scene.vehicle.pos.z <  (this.verticalArmRange +
									this.landingArmLen * Math.cos(this.landingArmAngle) +
									this.pulleyRadius) + CAR_LEN / 2 &&
		this.scene.vehicle.pos.z > (this.verticalArmRange +
									this.landingArmLen * Math.cos(this.landingArmAngle) +
									this.pulleyRadius) - CAR_LEN / 2 &&
		this.scene.carSpeed === 0) {
			this.flagCar = true;
			this.scene.craneMoveDR = false;
		}

		/** R -> D Movement with the Car **/
		if (this.flagCar) {
			this.rotationDR -= 20 * UPDATE_MS / 1000.0;
			this.rotationArm -= (this.landingArmAngle * 20 * UPDATE_MS / 1000.0) / Math.PI;
		}

		/** Set the initial state (D) **/
		if (this.rotationDR <= 0 && this.flagCar) {
			this.flagCar = false;
			this.carFall = true;
			this.scene.vehicle.pos.x = 0;
			this.scene.vehicle.pos.y = CRANE_HEIGHT
										- this.magnetThickness - this.pendingCableLen * 0.9;
			this.scene.vehicle.pos.z = -(this.verticalArmRange + this.landingArmLen);

			this.scene.wreckedCar = this.scene.vehicle;
			this.scene.wreckedCar.wrecked = true;
			this.scene.wreckedCar.wreckedAppearance = this.scene.vehicleAppearanceList[this.scene.currVehicleAppearance];

            this.scene.vehicle = new MyVehicle(this.scene, CAR_LEN, CAR_WIDTH, CAR_HEIGHT, CAR_AXISX, CAR_AXISZ, CAR_WHEELRADIUS, CAR_WHEELTHICKNESS);
            this.scene.vehicle.pos.x = -TERRAIN_UNITS / 3;
            this.scene.vehicle.pos.y = 0;
            this.scene.vehicle.pos.z = TERRAIN_UNITS / 3;
		}

		/** Car Fall **/
		if (this.carFall) {
			this.scene.wreckedCar.pos.y -= 10 * UPDATE_MS / 1000.0;

            /** Crane work finished **/
            if (this.scene.wreckedCar.pos.y <= 0 && this.rotationDR <= 0
                && this.scene.wreckedCar.pos.z === -(this.verticalArmRange + this.landingArmLen)) {
                this.carFall = false;
                this.flagCar = false;
            }
		}
	}

	display() {

		this.scene.rotate(-this.rotationDR * degToRad, 0, 1, 0);

		// bottom
		this.scene.pushMatrix();
			this.scene.scale(this.pulleyRadius, this.pulleyThickness, this.pulleyRadius);
			this.scene.rotate(-90 * degToRad, 1, 0, 0);
			this.cylinder.display();
		this.scene.popMatrix();

			// top base
			this.scene.pushMatrix();
				this.scene.translate(0, this.pulleyThickness, 0);
				this.scene.rotate(-90 * degToRad, 1, 0, 0);
				this.scene.scale(this.pulleyRadius, this.pulleyRadius, this.pulleyRadius);
				this.circle.display();
			this.scene.popMatrix();

			// bottom base
			this.scene.pushMatrix();
				this.scene.rotate(-90 * degToRad, 1, 0, 0);
        		this.scene.rotate(180 * degToRad, 1, 0, 0);
				this.scene.scale(this.pulleyRadius, this.pulleyRadius, this.pulleyRadius);
				this.circle.display();
			this.scene.popMatrix();

		// vertical arm
		this.scene.pushMatrix();
			this.scene.translate(
				0,
				this.armRadius * Math.cos(this.verticalArmAngle * degToRad),
				this.armRadius * Math.sin(this.verticalArmAngle * degToRad)
			);
			this.scene.rotate( -(90 + this.verticalArmAngle) * degToRad, 1, 0, 0);
			this.scene.scale(this.armRadius, this.armRadius, this.verticalArmLen);
			this.cylinder.display();
		this.scene.popMatrix();

		this.scene.translate(
			-this.armRadius,
			this.height + this.pulleyRadius,
			-this.verticalArmRange - this.pulleyRadius/4
		);

		// top pulley
		this.scene.pushMatrix();
			this.scene.scale(this.pulleyThickness, this.pulleyRadius, this.pulleyRadius);
			this.scene.rotate(90 * degToRad, 0, 1, 0);
			this.cylinder.display();
		this.scene.popMatrix();

			// back base
			this.scene.pushMatrix();
				this.scene.rotate(90 * degToRad, 0, 1, 0);
				this.scene.rotate(180 * degToRad, 1, 0, 0);
				this.scene.scale(this.pulleyRadius, this.pulleyRadius, this.pulleyRadius);
				this.circle.display();
			this.scene.popMatrix();

			this.scene.translate(this.pulleyThickness, 0, 0);

			// front base
			this.scene.pushMatrix();
				this.scene.rotate(90 * degToRad, 0, 1, 0);
				this.scene.scale(this.pulleyRadius, this.pulleyRadius, this.pulleyRadius);
				this.circle.display();
			this.scene.popMatrix();

		// translation for the Arm rotation
		this.scene.translate(
			0,
			- this.landingArmLen * Math.sin(this.rotationArm * degToRad),
			this.landingArmLen - this.landingArmLen * 0.9 * Math.cos(this.rotationArm * degToRad)
		);

		// to insert the landing arm in the top pulley
		this.scene.translate(- this.armRadius, 0, - this.landingArmLen - this.pulleyRadius * 0.75);

		// landing arm
		this.scene.pushMatrix();
			this.scene.rotate(-this.rotationArm * degToRad, 1, 0, 0);
			this.scene.scale(this.armRadius, this.armRadius, this.landingArmLen);
			this.cylinder.display();
		this.scene.popMatrix();

			// base
			this.scene.pushMatrix();
				this.scene.rotate(180 * degToRad, 1, 0, 0);
				this.scene.rotate(-this.rotationArm * degToRad, 1, 0, 0);
				this.scene.scale(this.armRadius, this.armRadius, this.armRadius);
				this.circle.display();
			this.scene.popMatrix();

		// to insert the pending cable arm in the landing arm
		this.scene.translate(0, this.armRadius/2, 0);

		// pending cable
		this.scene.pushMatrix();
			this.scene.rotate(90 * degToRad, 1, 0, 0);
			this.scene.scale(this.armRadius / 5, this.armRadius / 5, this.pendingCableLen);
			this.cylinder.display();
		this.scene.popMatrix();

		this.scene.translate(0, -this.pendingCableLen, 0);

		// magnet
		this.scene.pushMatrix();
			this.scene.rotate(90 * degToRad, 1, 0, 0);
			this.scene.scale(this.magnetRadius, this.magnetRadius, this.magnetThickness);
			this.cylinder.display();
		this.scene.popMatrix();

			// top base
			this.scene.pushMatrix();
				this.scene.rotate(-90 * degToRad, 1, 0, 0);
				this.scene.scale(this.magnetRadius, this.magnetRadius, this.magnetRadius);
				this.circle.display();
			this.scene.popMatrix();

			this.scene.translate(0, -this.magnetThickness, 0);

			// bottom base
			this.scene.pushMatrix();
				this.scene.rotate(-90 * degToRad, 1, 0, 0);
				this.scene.rotate(180 * degToRad, 1, 0, 0);
				this.scene.scale(this.magnetRadius, this.magnetRadius, this.magnetRadius);
				this.circle.display();
			this.scene.popMatrix();

		if(this.flagCar) {
			this.scene.pushMatrix();
				this.scene.rotate(180 * degToRad, 0, 1, 0);
				this.scene.translate(-this.scene.vehicle.pos.x, - 0.25 - CAR_HEIGHT - this.magnetThickness, -this.scene.vehicle.pos.z);
				this.scene.vehicle.display();
			this.scene.popMatrix();
		}
  };
}
