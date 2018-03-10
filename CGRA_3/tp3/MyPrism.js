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

		this.vertices = [];
		this.indices = [];
		this.normals = [];

		let c1 = 0;
		let c2 = 0;

		this.stacks = 2;

		for(var i = 0; i < (2*3) * this.slices * this.stacks; i = i + (2*3)) {
			for(var z = 0; z < (1-1/this.stacks); z = z + 2 * 1/this.stacks) {
				this.vertices[i] = Math.cos(c1 * (2*Math.PI/this.slices));
				this.vertices[i + 1] = Math.sin(c1 * (2*Math.PI/this.slices));
				this.vertices[i + 2] = z;

				this.vertices[i + 3] = Math.cos((c1 + 1) * (2*Math.PI/this.slices));
				this.vertices[i + 4] = Math.sin((c1 + 1) * (2*Math.PI/this.slices));
				this.vertices[i + 5] = z;


				this.vertices[i + 2*3*this.slices] = Math.cos(c1 * (2*Math.PI/this.slices));
				this.vertices[i + 1 + 2*3*this.slices] = Math.sin(c1 * (2*Math.PI/this.slices));
				this.vertices[i + 2 + 2*3*this.slices] = z + 1/this.stacks;

				this.vertices[i + 3 + 2*3*this.slices] = Math.cos((c1 + 1) * (2*Math.PI/this.slices));
				this.vertices[i + 4 + 2*3*this.slices] = Math.sin((c1 + 1) * (2*Math.PI/this.slices));
				this.vertices[i + 5 + 2*3*this.slices] = z + 1/this.stacks;
			}


			this.indices[i] = c2;
			this.indices[i + 1] = c2 + 1;
			this.indices[i + 2] = c2 + 2 * this.slices;

			this.indices[i + 3] = c2 + 1 + 2 * this.slices;
			this.indices[i + 4] = c2 + 2 * this.slices;
			this.indices[i + 5] = c2 + 1;



			this.normals[i] = 1;
			this.normals[i + 1] = 1;
			this.normals[i + 2] = 0;

			this.normals[i + 3] = 1;
			this.normals[i + 4] = 1;
			this.normals[i + 5] = 0;


			this.normals[i + 2 * 3 * this.slices] = 1;
			this.normals[i + 1 + 2 * 3 * this.slices] = 1;
			this.normals[i + 2 + 2 * 3 * this.slices] = 0;

			this.normals[i + 3 + 2 * 3 * this.slices] = 1;
			this.normals[i + 4 + 2 * 3 * this.slices] = 1;
			this.normals[i + 5 + 2 * 3 * this.slices] = 0;

			c1++;
			c2=c2+2;
		}

		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	};
};
