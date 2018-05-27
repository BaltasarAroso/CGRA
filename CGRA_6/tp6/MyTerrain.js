/**
 * MyTerrain
 * @constructor
 */
class MyTerrain extends Plane {
	constructor(scene, nrDivs, altimetry) {
        super(scene, nrDivs, nrDivs, nrDivs, nrDivs, nrDivs); // Normalized xy plane with nrDivs resolution

        this.altimetry = altimetry;

        let maxRow = this.altimetry.map(
            function(row){
                return Math.max.apply(Math, row);
            }
        );
        this.maxHeight = Math.max.apply(Math, maxRow);

        this.init();
    };

    init() {
        /** Change every 'height' (z-axis) component
             with the corresponding normalized altitude - [0,1]

            Use '< altimetry length' instead of '<= nr divs' so the program
            can still run with unexpected behaviour instead of crashing
            in case the supplied nrDivs doesn't match the heightmap **/


	    for(let i = 0; i < this.altimetry.length; i++) {
            for (let j = 0; j < this.altimetry.length; j++) {
                let index = 2 + i * ((this.altimetry.length - 1) * 3 + 3) + j * 3;
                this.vertices[index] = this.altimetry[i][j] / this.maxHeight;
            }
        }


        /** Override texCoords **/
        this.texCoords.length = 0;

        // let tCoord = 0.0;
        for(let i = 0; i < this.altimetry.length; i++) {
            let sCoord = 0.0;

            for (let j = 0; j < this.altimetry.length; j++) {
                let sHeightFactor = 0;
                // let tHeightFactor = 0;

                this.texCoords.push(sCoord, 0.0);

                if(j < this.altimetry.length - 1) {
                    sHeightFactor = (this.altimetry[i][j+1] - this.altimetry[i][j]) / this.maxHeight;
                    if(sHeightFactor < 0) sHeightFactor *= -1;
                }
                // if(i < this.altimetry.length - 1) {
                //     tHeightFactor = (this.altimetry[i+1][j] - this.altimetry[i][j]) / this.maxHeight;
                //     if(tHeightFactor < 0) tHeightFactor *= -1;
                // }

                sCoord += this.patchLength * (1 + sHeightFactor);
            }
        }

        for(let j = 0; j < this.altimetry.length; j++) {
            let tCoord = 0.0;
            let tIndex = 1 + 2*j;

            for (let i = 0; i < this.altimetry.length; i++) {
                let tHeightFactor;

                this.texCoords[tIndex] = tCoord;
                tIndex += 2*this.altimetry.length;

                if(i < this.altimetry.length - 1) {
                    tHeightFactor = (this.altimetry[i+1][j] - this.altimetry[i][j]) / this.maxHeight;
                    if(tHeightFactor < 0) tHeightFactor *= -1;
                }

                tCoord += this.patchLength * (1 + tHeightFactor);
            }
        }

        console.log("Patch length = " + this.patchLength);
        console.log("Altimetry = " + JSON.stringify(this.altimetry));
        console.log("texCoords = " + JSON.stringify(this.texCoords));

        this.initGLBuffers();
    }
}
