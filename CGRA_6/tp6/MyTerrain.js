/**
 * MyTerrain
 * @constructor
 */
class MyTerrain extends Plane {
	constructor(scene, units) {
        super(scene, units, units, units, units, units);
        
        this.len = units;
    };
    
    display() {
        this.scene.rotate(90 * degToRad, 1, 0, 0);
        this.scene.scale();
    }
}
