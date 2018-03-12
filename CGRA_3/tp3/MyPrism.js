/**
 * MyPrism
 * @constructor
 */
class MyPrism extends CGFobject {
	constructor(scene, slices, stacks) {
		super(scene);

		this.slices = slices;
		this.stacks = stacks;

		this.vertices = [];
		this.indices = [];
		this.normals = [];

		this.angle = 2*Math.PI/this.slices;

		this.initBuffers();
	};

	initBuffers() {

		for(var z = 0; z <= this.stacks; z++) {
			for(var i = 0; i < this.slices; i++) {

				this.vertices.push(
					Math.cos(i*this.angle),
					Math.sin(i*this.angle),
					z/this.stacks
				);
				this.vertices.push(
					Math.cos((i+1)*this.angle),
					Math.sin((i+1)*this.angle),
					z/this.stacks
				);

				if(z > 0) {
					this.indices.push(
						2*i + (z-1)*2*this.slices,
						2*i + 1 + (z-1)*2*this.slices,
						2*i + 2*this.slices + (z-1)*2*this.slices
					);
					this.indices.push(
						2*i + 1 + 2*this.slices + (z-1)*2*this.slices,
						2*i + 2*this.slices + (z-1)*2*this.slices,
						2*i + 1 + (z-1)*2*this.slices
					);
				}

				this.normals.push(
					Math.cos((i+i+1)*0.5*this.angle),
					Math.sin((i+i+1)*0.5*this.angle),
					0
				);
				this.normals.push(
					Math.cos((i+i+1)*0.5*this.angle),
					Math.sin((i+i+1)*0.5*this.angle),
					0
				);

			}
		}

		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	};
};
