/**
 * MyClockHand
 * @constructor
 */
class MyClockHand extends CGFobject {
    constructor(scene, length = 1) {
        super(scene);

        this.cube = new MyUnitCubeQuad(scene);
        this.setAngle(0);

        this.length = length;
    };

    setAngle(angle = 0) {
        this.angle = angle;
    }

    display() {
        this.scene.rotate(-this.angle * Math.PI / 180.0, 0, 0, 1);
        this.scene.translate(0, 0.475*this.length, 0);
        this.scene.scale(0.020/this.length, this.length, 0.015);
        this.cube.display();
    }

}