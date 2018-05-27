/**
 * MyTerrain
 * @constructor
 */
class MyTerrain extends Plane {
	constructor(scene, nrDivs, altimetry) {
        super(scene, nrDivs, nrDivs, nrDivs, nrDivs, nrDivs, altimetry);

        // this.nrDivs = nrDivs;
        // this.altimetry = altimetry;

        // this.init();
    };

    // init() {
	 //    for(let i = 0; i <= this.nrDivs; i++) {
	 //        for(let j = 0; j <= this.nrDivs; j++) {
	 //            let index = 2+i*(this.nrDivs*3+3)+j*3;
    //             this.vertices[index] = this.altimetry[i][j];
    //             console.log("this.vertices[" + index + "] = " + "this.altimetry[" + i + "][" + j + "] = " + this.altimetry[i][j]);
    //             debug++;
    //         }
    //     }
    // }
}
