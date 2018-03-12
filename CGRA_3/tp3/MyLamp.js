/**
 * MyLamp
 * @constructor
 */
class MyLamp extends CGFobject {
	constructor(scene, slices, stacks) {
		super(scene);

		this.slices = slices;
		this.stacks = stacks;

		this.vertices = [];
		this.indices = [];
		this.normals = [];

		this.initBuffers();
	};

	initBuffers() {

		/* Starts deploying side to side triangles on the first stack;
			 Following stacks are pairs of complementary triangles.
			 (obs: if stacks = 1 => cone) */

		 this.vertices.push(0, 1, 0);
		 this.normals.push(0, 1, 0);
		 for(var t = 1; t <= this.stacks; t++) {
			 let theta1 = (t/this.stacks)*(Math.PI/2);
			 let theta2 = ((t+1)/this.stacks)*(Math.PI/2);

 			for(var p = 0; p < this.slices; p++) {
		    let phi1 = (p/this.slices)*2*Math.PI;
		    let phi2 = ((p+1)/this.slices)*2*Math.PI;

				this.vertices.push(
					Math.sin(theta1)*Math.cos(phi1),
					Math.cos(theta1),
					Math.sin(theta1)*Math.sin(phi1)
				);

				this.normals.push(
					Math.sin(theta1)*Math.cos(phi1),
					Math.cos(theta1),
					Math.sin(theta1)*Math.sin(phi1)
				);

				if(t == 1) {
					//1 triangle
					if(p == this.slices - 1) {
						this.indices.push(
							p + 1,
							p + 2 - this.slices,
							0
						);
					} else {
						this.indices.push(
							p + 1,
							p + 2,
							0
						);
					}
				} else {
					//2 triangles
					if(p == this.slices - 1) {
						this.indices.push(
							p + 1 + (t-1)*this.slices,
							p + 2 + (t-2)*this.slices,
							p + 1 + (t-2)*this.slices
						);
						this.indices.push(
							p + 2 + (t-3)*this.slices,
							p + 1 + (t-2)*this.slices,
							p + 2 + (t-2)*this.slices
						);
					} else {
						this.indices.push(
							p + 1 + (t-1)*this.slices,
							p + 2 + (t-1)*this.slices,
							p + 1 + (t-2)*this.slices
						);
						this.indices.push(
							p + 2 + (t-2)*this.slices,
							p + 1 + (t-2)*this.slices,
							p + 2 + (t-1)*this.slices
						);
					}
				}
 			}
 		}

		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	};
};
