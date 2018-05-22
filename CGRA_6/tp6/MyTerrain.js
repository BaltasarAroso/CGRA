/**
 * MyTerrain
 * @constructor
 */
class MyTerrain extends Plane {
	constructor(scene, units) {
        super(scene, units, units, units, units, units);

        this.len = units;
    };
}
