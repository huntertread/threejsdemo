import React, { Component } from "react";
import * as THREE from "three";
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
// import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";

class ThreeDemo extends Component {
  componentDidMount() {

    const fov = 75;
    const aspect = window.innerWidth/window.innerHeight;
    const near = 0.1;
    const far = 1000;
    const camera = new THREE.PerspectiveCamera( fov, aspect, near, far );
    const renderer = new THREE.WebGLRenderer();
    
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xAAAAAA);

    const color = 0xFFFFFF;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    scene.add(light);    

    camera.position.z = 10;
    renderer.setSize( window.innerWidth, window.innerHeight );
    window.onresize = function() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 0, 0);
    controls.update();

    // document.body.appendChild( renderer.domElement );
    // use ref as a mount point of the Three.js scene instead of the document.body
    this.mount.appendChild( renderer.domElement );

    const boxGeometry = new THREE.BoxGeometry( 1, 1, 1 );
    const boxMaterial = new THREE.MeshPhongMaterial( { color: 0x00ff00 } );
    const cube = new THREE.Mesh( boxGeometry, boxMaterial );

    const pyramidGeometry = new THREE.ConeGeometry( 1, 1, 4 );
    const pyramidMaterial = new THREE.MeshPhongMaterial( { color: 0xff073a } );
    const pyramid = new THREE.Mesh( pyramidGeometry, pyramidMaterial );
    pyramid.position.set(-3, 0, 0);

    const cylinderGeometry = new THREE.CylinderGeometry(.8, .8, .8, 6);
    const cylinderMaterial = new THREE.MeshPhongMaterial( { color: 0xfaed27 } )
    const cylinder = new THREE.Mesh( cylinderGeometry, cylinderMaterial );
    cylinder.position.set(3, 0, 0);

    const coneGeometry = new THREE.ConeGeometry();
    const coneMaterial = new THREE.MeshPhongMaterial({ color: 0x14f3f3 });
    const cone = new THREE.Mesh( coneGeometry, coneMaterial );
    cone.position.set(0, 3, 0);

    const dodecahedronGeometry = new THREE.DodecahedronGeometry();
    const dodecahedronMaterial = new THREE.MeshPhongMaterial({ color: 0xe514f3 });
    const dodecahedron = new THREE.Mesh( dodecahedronGeometry, dodecahedronMaterial );
    dodecahedron.position.set(0, -3, 0);

    // let loader = new THREE.FontLoader();
    // let font = loader.parse(require('three/examples/fonts/helvetiker_regular.typeface.json'));
    // let geometry = new THREE.TextGeometry("under construction",{font: font, size: 1, height:1 });

    // let material = new THREE.MeshPhongMaterial({color:0x00ff00});
    // let text = new THREE.Mesh(geometry, material);
    // text.position.x = 1;
    // scene.add(text);

    const basicShapesGroup = new THREE.Object3D();
    basicShapesGroup.add(cube, pyramid, cylinder, cone, dodecahedron);
    scene.add(basicShapesGroup);

    const animate = function () {
      requestAnimationFrame( animate );
      basicShapesGroup.rotation.y += 0.01;
      // objectGroup.rotation.x += 0.01;
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      pyramid.rotation.x += 0.01;
      pyramid.rotation.y += 0.01;
      cylinder.rotation.x += 0.01;
      cylinder.rotation.y += 0.01;
      cone.rotation.x += 0.01;
      cone.rotation.y += 0.01;
      dodecahedron.rotation.x += 0.01;
      dodecahedron.rotation.y += 0.01;
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