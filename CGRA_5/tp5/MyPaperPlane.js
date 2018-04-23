/**
 * MyPaperPlane
 * @constructor
 */
class MyPaperPlane extends CGFobject {
	constructor(scene, length = 1, wingRatio = 0.5, height = 0.4) {
		super(scene);

		this.length = length;
		this.wingRatio = wingRatio;
		this.height = height;

		this.pos = [0, 0, 0];
		this.angle = [0, 0, 0];
		this.fly = false;
		this.freefall = false;

		this.initBuffers();
	};

	initBuffers() {
		this.vertices = [
			-1*this.wingRatio, 0, 0,
			1*this.wingRatio, 0, 0,
			0, 0, this.length,
            0, 0, 0,
			0, -1*this.height, 0
		];

		this.indices = [
			0, 1, 2,
			2, 1, 0,

			2, 3, 4,
			4, 3, 2
		];

		this.normals = [
			-(1/Math.sqrt(2)), 0, -(1/Math.sqrt(2)),
            1/Math.sqrt(2), 0, -(1/Math.sqrt(2)),
			0, 0, 1,
			0, 1, 0,
			0, -(1/Math.sqrt(2)), -(1/Math.sqrt(2))
		];

		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	};

	update(axis, bound) {
		switch(axis) {
			case ('x' || 'X'):
				if(this.pos[0] - 0.1 <= bound) {
					this.fly = false;
					this.freefall = true;
					this.angle = [180, -90, 0];
				} else {
					this.pos[0] -= 0.1;
					this.pos[1] += 0.0125;
				}
				break;
			case ('y' || 'Y'):
				if(this.pos[1] - 0.1 <= bound) {
					this.freefall = false;
				} else {
					this.pos[1] -= 0.1;
				}
				break;
			default:
				break;
		}
	}
}
