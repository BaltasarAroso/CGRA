/**
 * MyClockHand
 * @constructor
 */
class MyClockHand extends CGFobject {
	constructor(scene) {
		super(scene);

		this.vertices = [];
		this.indices = [];
		this.normals = [];
		this.texCoords = [];

		this.initBuffers();

		this.setAngle(0);
	};

	setAngle(angle = 0) {
		this.angle = angle;
	}

	initBuffers() {

		this.vertices.push(
			0.25, 0, 0,
			0, 1, 0,
			-0.25, 0, 0
		);

		this.indices.push(0, 1, 2);

		this.normals.push(
			0, 0, 1,
			0, 0, 1,
			0, 0, 1
		);

		this.texCoords.push(
			1, 1,
			0.5, 0,
			0, 1
		);

		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	};

};
