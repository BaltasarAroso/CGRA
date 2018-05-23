 
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

		// // add a button:
		// // the first parameter is the object that is being controlled (in this case the scene)
		// // the identifier 'doSomething' must be a function declared as part of that object (i.e. a member of the scene class)
		// // e.g. LightingScene.prototype.doSomething = function () { console.log("Doing something..."); };
        //
		// this.gui.add(this.scene, 'doSomething');
        //
		// // add a group of controls (and open/expand by defult)
        //
		// var group=this.gui.addFolder("Options");
		// group.open();
        //
		// // add two check boxes to the group. The identifiers must be members variables of the scene initialized in scene.init as boolean
		// // e.g. this.option1=true; this.option2=false;
        //
		// group.add(this.scene, 'option1');
		// group.add(this.scene, 'option2');
        //
		// // add a slider
		// // must be a numeric variable of the scene, initialized in scene.init e.g.
		// // this.speed=3;
		// // min and max values can be specified as parameters
        //
		// this.gui.add(this.scene, 'speed', -5, 5);


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

        this.initKeys();

        return true;
	};

    // /**
	 // * processKeyboard
	 // * @param event {Event}
	 // */
    // processKeyboard(event) {
		// // call CGFinterface default code (omit if you want to override)
		// super.processKeyboard(event);
    //
		// // Check key codes e.g. here: http://www.asciitable.com/
		// // or use String.fromCharCode(event.keyCode) to compare chars
    //
		// // for better cross-browser support, you may also check suggestions on using event.which in http://www.w3schools.com/jsref/event_key_keycode.asp
		// switch (event.keyCode) {
		// 	case (108): // l or L
		// 		console.log("Key 'L' pressed");
		// 		this.scene.lightMarkersDisplay();
		// 		break;
    //     }
    // };

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

