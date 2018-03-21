/**
 * MyCylinder
 * @constructor
 */
class MyCylinder extends CGFobject {
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

				if(z > 0) {
					if(i == this.slices - 1) {
						this.indices.push(
							i + (z-1)*this.slices,
							i + 1 +(z-2)*this.slices,
							i + z*this.slices
						);

						this.indices.push(
							i + 1 + (z-1)*this.slices,
							i + z*this.slices,
							i + 1 + (z-2)*this.slices
						);
					} else {
						this.indices.push(
							i + (z-1)*this.slices,
							i + 1 + (z-1)*this.slices,
							i + z*this.slices
						);

						this.indices.push(
							i + 1 + z*this.slices,
							i + z*this.slices,
							i + 1 + (z-1)*this.slices
						);
					}
				}

				this.normals.push(
					Math.cos(i*this.angle),
					Math.sin(i*this.angle),
					0
				);

			}
		}

		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	};
};
