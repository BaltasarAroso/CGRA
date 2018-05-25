/**
 * MyCrane
 * @constructor
 */
class MyCrane extends CGFobject {
	constructor(scene, height = 1, range = 1, angleArm = 1) {
		super(scene);
		this.height = height;
		this.range = range;
		this.rotationDR = 0; // in degrees (180)
		this.rotationArm = 0; // in radians
		this.angleArm = angleArm;

		this.flagCar = false;

		this.cylinder = new MyCylinder(this.scene, 100, 2);
		this.circle = new MyCircle(this.scene, 100);
	};

	update () {
		if (this.scene.craneMoveDR && this.rotationDR <= 180) {
			this.rotationDR += 20 * UPDATE_MS / 1000.0;
			this.rotationArm += (this.angleArm * 20 * UPDATE_MS / 1000.0) / Math.PI;
		}
		if (this.rotationDR > 180 &&
		(this.scene.vehicle.pos.x - TERRAIN_UNITS / 3) < 4 && (this.scene.vehicle.pos.x - TERRAIN_UNITS / 3) > 0 &&
		this.scene.carSpeed == 0) {
			this.flagCar = true;
			this.scene.craneMoveDR = false;
		}
		if (this.flagCar) {
			this.rotationDR -= 1;
			this.rotationArm -= this.angleArm / Math.PI;
		}
		if (this.rotationDR < 0) {
			this.flagCar = false;
		}
	}

	display() {
		this.scene.rotate(-this.rotationDR * degToRad, 0, 1, 0);

		// bottom
		this.scene.pushMatrix();
			this.scene.rotate(-90 * degToRad, 1, 0, 0);
			this.cylinder.display();
		this.scene.popMatrix();

			// top base
			this.scene.pushMatrix();
				this.scene.translate(0, 1, 0);
				this.scene.rotate(-90 * degToRad, 1, 0, 0);
				this.circle.display();
			this.scene.popMatrix();

			// bottom base
			this.scene.pushMatrix();
				this.scene.rotate(-90 * degToRad, 1, 0, 0);
        this.scene.rotate(180 * degToRad, 1, 0, 0);
				this.circle.display();
			this.scene.popMatrix();

		// first
		this.scene.pushMatrix();
			this.scene.translate(0, 0.5, 0.5 * Math.sin(30 * degToRad));
			this.scene.rotate(-120 * degToRad, 1, 0, 0);
			this.scene.scale(0.5, 0.5, this.height);
			this.cylinder.display();
		this.scene.popMatrix();

		this.scene.translate(
			-0.5,
			this.height * Math.cos(30 * degToRad) + 0.5,
			-(this.height * Math.sin(30 * degToRad) + 0.25)
		);

		// top wheel
		this.scene.pushMatrix();
			this.scene.rotate(90 * degToRad, 0, 1, 0);
			this.cylinder.display();
		this.scene.popMatrix();

			// back base
			this.scene.pushMatrix();
				this.scene.rotate(90 * degToRad, 0, 1, 0);
				this.scene.rotate(180 * degToRad, 1, 0, 0);
				this.circle.display();
			this.scene.popMatrix();

			this.scene.translate(1, 0, 0);

			// front base
			this.scene.pushMatrix();
				this.scene.rotate(90 * degToRad, 0, 1, 0);
				this.circle.display();
			this.scene.popMatrix();

		// translation for the Arm rotation
		this.scene.translate(
			0,
			- this.range * Math.sin(this.rotationArm * degToRad),
			this.range - this.range * 0.9 * Math.cos(this.rotationArm * degToRad)
		);

		// 0.5 -> top wheel radius & this.range + 0.75 -> landing arm size + to be together the top wheel
		this.scene.translate(-0.5, 0, - (this.range + 0.75));

		// landing arm
		this.scene.pushMatrix();
			this.scene.rotate(-this.rotationArm * degToRad, 1, 0, 0);
			this.scene.scale(0.5, 0.5, this.range);
			this.cylinder.display();
		this.scene.popMatrix();

			// base
			this.scene.pushMatrix();
				this.scene.rotate(180 * degToRad, 1, 0, 0);
				this.scene.rotate(-this.rotationArm * degToRad, 1, 0, 0);
				this.scene.scale(0.5, 0.5, 0.5);
				this.circle.display();
			this.scene.popMatrix();

		// 0.25 -> to insert the landing arm in the top wheel
		this.scene.translate(0, 0.25, 0);

		// pending cable
		this.scene.pushMatrix();
			this.scene.rotate(90 * degToRad, 1, 0, 0);
			this.scene.scale(0.1, 0.1, 2);
			this.cylinder.display();
		this.scene.popMatrix();

		// 2 -> pending cable len
		this.scene.translate(0, -2, 0);

		// iman
		this.scene.pushMatrix();
			this.scene.rotate(90 * degToRad, 1, 0, 0);
			this.scene.scale(0.7, 0.7, 0.2);
			this.cylinder.display();
		this.scene.popMatrix();

			// top base
			this.scene.pushMatrix();
				this.scene.rotate(-90 * degToRad, 1, 0, 0);
				this.scene.scale(0.7, 0.7, 0.7);
				this.circle.display();
			this.scene.popMatrix();

			// 0.3 -> iman thickness
			this.scene.translate(0, -0.3, 0);

			// bottom base
			this.scene.pushMatrix();
				this.scene.rotate(-90 * degToRad, 1, 0, 0);
				this.scene.rotate(180 * degToRad, 1, 0, 0);
				this.scene.scale(0.7, 0.7, 0.7);
				this.circle.display();
			this.scene.popMatrix();

		if (this.flagCar) {
			this.scene.pushMatrix();
					// 0.1 -> floorR & 0.3 -> iman
					this.scene.translate(-this.scene.vehicle.pos.x, - CAR_HEIGHT - 0.1 - 0.3, -this.scene.vehicle.pos.z);
					this.scene.vehicle.display();
			this.scene.popMatrix();
		}

  };
}
