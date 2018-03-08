/**
 * MyPrism
 * @constructor
 */
class MyPrism extends CGFobject {
	constructor(scene, slices, stacks) {
		super(scene);

		this.slices = slices;
		this.stacks = stacks;

		this.initBuffers();
	};

	initBuffers() {
		this.vertices = [
			1, 0, 0,
			Math.cos(Math.PI/3), Math.sin(Math.PI/3), 0,
			-Math.cos(Math.PI/3), Math.sin(Math.PI/3), 0,
			-1, 0, 0,
			-Math.cos(Math.PI/3), -Math.sin(Math.PI/3), 0,
			Math.cos(Math.PI/3), -Math.sin(Math.PI/3), 0,


				1, 0, 1,
				Math.cos(Math.PI/3), Math.sin(Math.PI/3), 1,
				-Math.cos(Math.PI/3), Math.sin(Math.PI/3), 1,
				-1, 0, 1,
				-Math.cos(Math.PI/3), -Math.sin(Math.PI/3), 1,
				Math.cos(Math.PI/3), -Math.sin(Math.PI/3), 1
		];

		//TODO
		this.indices = [
			0, 1, 2,
			3, 2, 1
		];

		//TODO
		this.normals = [
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,
		];

		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	};
};
