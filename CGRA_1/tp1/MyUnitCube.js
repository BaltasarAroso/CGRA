class MyUnitCube extends CGFobject {
  constructor(scene){
    super(scene);
    this.initBuffers();
  };

  initBuffers() {
    this.vertices = [
      //z negative vertices
        //bottom (left, right)
      -0.5, -0.5, -0.5,
      0.5, -0.5, -0.5,
        //top (left, right)
      -0.5, 0.5, -0.5,
      0.5, 0.5, -0.5,
      //z positive vertices
        //bottom (left, right)
      -0.5, -0.5, 0.5,
      0.5, -0.5, 0.5,
        //top (left, right)
      -0.5, 0.5, 0.5,
      0.5, 0.5, 0.5,
    ];

    //2 triangles per face
    this.indices = [
      //front face
      4, 5, 6,
      6, 5, 7,
      //back face
      1, 0, 3,
      3, 0, 2,
      //left face
      0, 4, 2,
      2, 4, 6,
      //right face
      5, 1, 7,
      7, 1, 3,
      //bottom
      0, 1, 4,
      4, 1, 5,
      //top
      6, 7, 2,
      2, 7, 3
    ];

    this.primitiveType=this.scene.gl.TRIANGLES;
    this.initGLBuffers();
  };

};
