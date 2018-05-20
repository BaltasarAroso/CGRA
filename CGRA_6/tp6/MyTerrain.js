/**
 * MyTerrain
 * @constructor
 */
class MyTerrain extends Plane {
	constructor(scene, units) {
        super(scene, units, units, units, units, units);
        
        this.len = units;
		this.quad = new MyQuad(this.scene, 0, this.len, 0, this.len);
    };
    
    display() {
        this.scene.pushMatrix();
            this.scene.scale(this.len, 1, this.len);
            this.scene.rotate(-90 * degToRad, 1, 0, 0);
            this.quad.display();
        this.scene.popMatrix();
    }
}
