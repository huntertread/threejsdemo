import React, { Component } from "react";
import * as THREE from "three";

class ThreeDemo extends Component {
  componentDidMount() {
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    window.onresize = function() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    // document.body.appendChild( renderer.domElement );
    // use ref as a mount point of the Three.js scene instead of the document.body
    this.mount.appendChild( renderer.domElement );

    var boxgeometry = new THREE.BoxGeometry( 1, 1, 1 );
    var boxmaterial = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    var cube = new THREE.Mesh( boxgeometry, boxmaterial );
    scene.add( cube );

    var pyramidgeometry = new THREE.ConeGeometry( 1, 1, 4 );
    var pyramidmaterial = new THREE.MeshBasicMaterial( { color: 0xff073a } );
    var pyramid = new THREE.Mesh( pyramidgeometry, pyramidmaterial );
    pyramid.position.set(-3, 0, 0);
    scene.add( pyramid );

    var cylindergeometry = new THREE.CylinderGeometry(.8, .8, .8, 6);
    var cylindermaterial = new THREE.MeshBasicMaterial( { color: 0xfaed27 } )
    var cylinder = new THREE.Mesh( cylindergeometry, cylindermaterial );
    cylinder.position.set(3, 0, 0);
    scene.add( cylinder );

    camera.position.z = 5;
    var animate = function () {
      requestAnimationFrame( animate );
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      // cube.position.x += 0.01;
      pyramid.rotation.x += 0.01;
      pyramid.rotation.y += 0.01;
      cylinder.rotation.x += 0.01;
      cylinder.rotation.y += 0.01;
      renderer.render( scene, camera );
    };
    animate();
  }

  render() {
    return (
      <div ref={ref => (this.mount = ref)} />
    )
  }
}

export default ThreeDemo