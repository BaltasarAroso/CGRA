 
class MyInterface extends CGFinterface {

	/**
	 * MyInterface
	 * @constructor
	 */
 	constructor () {
 		super();
 	}
	
	/**
	 * init
	 * @param {CGFapplication} application
	 */
	init(application) {
		// call CGFinterface init
		super.init(application);

		// init GUI. For more information on the methods, check:
		//  http://workshop.chromeexperiments.com/examples/gui

		this.gui = new dat.GUI();


        // PL6 - 3.4
        this.gui.add(this.scene, 'axisDisplay');


        // PL6 - 3.3
        let group = this.gui.addFolder("Luzes");

        group.add(this.scene, 'lightCenter');
        group.add(this.scene, 'lightCorner1');
        group.add(this.scene, 'lightCorner2');
        group.add(this.scene, 'lightCorner3');
        group.add(this.scene, 'lightCorner4');
        // group.add(this.scene, 'lightMarkersDisplay');

        this.gui.add(this.scene, 'carSpeed', -BACKWARD_MAXSPEED, FORWARD_MAXSPEED).listen();

        this.initKeys();

        return true;
	};

    // PL6 - 4.2
    initKeys() {
        this.scene.gui = this;
        this.processKeyboard = function(){};
        this.activeKeys = {};
    }

    processKeyDown(event) {
        this.activeKeys[event.code] = true;
    }

    processKeyUp(event) {
        this.activeKeys[event.code] = false;
    }

    isKeyPressed(keyCode) {
        return this.activeKeys[keyCode] || false;
    }
}

