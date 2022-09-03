import React, { useEffect, useRef } from "react";
import * as THREE from "three";
const Three = () => {
  const starDiv = useRef();

  var scene, camera, renderer;

  /* We need this stuff too */
  var container,
    aspectRatio,
    HEIGHT,
    WIDTH,
    fieldOfView,
    nearPlane,
    farPlane,
    mouseX,
    mouseY,
    windowHalfX,
    windowHalfY,
    stats,
    geometry,
    starStuff,
    materialOptions,
    stars;

  useEffect(() => {
    const init = () => {
      container = starDiv;
      if (typeof window !== "undefined") {
        // document.body.appendChild(container);
        // document.body.style.overflow = "hidden";

        HEIGHT = window.innerHeight;
        WIDTH = window.innerWidth;
        aspectRatio = WIDTH / HEIGHT;
        fieldOfView = 75;
        nearPlane = 1;
        farPlane = 1000;
        mouseX = 0;
        mouseY = 0;

        windowHalfX = WIDTH / 2;
        windowHalfY = HEIGHT / 2;

        /* 	fieldOfView — Camera frustum vertical field of view.
        aspectRatio — Camera frustum aspect ratio.
        nearPlane — Camera frustum near plane.
        farPlane — Camera frustum far plane.	
  
        - https://threejs.org/docs/#Reference/Cameras/PerspectiveCamera
  
         In geometry, a frustum (plural: frusta or frustums) 
         is the portion of a solid (normally a cone or pyramid) 
         that lies between two parallel planes cutting it. - wikipedia.		*/

        camera = new THREE.PerspectiveCamera(
          fieldOfView,
          aspectRatio,
          nearPlane,
          farPlane
        );

        //Z positioning of camera

        camera.position.z = farPlane / 2;

        scene = new THREE.Scene({ antialias: true });
        scene.fog = new THREE.FogExp2(0x000000, 0.0003);

        // The wizard's about to get busy.
        starForge();

        //check for browser Support
        if (webGLSupport()) {
          //yeah?  Right on...
          renderer = new THREE.WebGLRenderer({ alpha: true });
        } else {
          //No?  Well that's okay.
          renderer = new THREE.CanvasRenderer();
        }

        renderer.setClearColor(0x000011, 1);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(WIDTH, HEIGHT);
        container.appendChild(renderer.domElement);

        stats = new Stats();
        stats.domElement.style.position = "absolute";
        stats.domElement.style.top = "0px";
        stats.domElement.style.right = "0px";
        container.appendChild(stats.domElement);

        window.addEventListener("resize", onWindowResize, false);
        document.addEventListener("mousemove", onMouseMove, false);
      }
    };
    const Stats = () => {
      var startTime = Date.now(),
        prevTime = startTime;
      var ms = 0,
        msMin = Infinity,
        msMax = 0;
      var fps = 0,
        fpsMin = Infinity,
        fpsMax = 0;
      var frames = 0,
        mode = 0;

      var container = document.createElement("div");
      container.id = "stats";
      container.addEventListener(
        "mousedown",
        function (event) {
          event.preventDefault();
          setMode(++mode % 2);
        },
        false
      );
      container.style.cssText = "width:80px;opacity:0.9;cursor:pointer";

      var fpsDiv = document.createElement("div");
      fpsDiv.id = "fps";
      fpsDiv.style.cssText =
        "padding:0 0 3px 3px;text-align:left;background-color:#002";
      container.appendChild(fpsDiv);

      var fpsText = document.createElement("div");
      fpsText.id = "fpsText";
      fpsText.style.cssText =
        "color:#0ff;font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px";
      fpsText.innerHTML = "FPS";
      fpsDiv.appendChild(fpsText);

      var fpsGraph = document.createElement("div");
      fpsGraph.id = "fpsGraph";
      fpsGraph.style.cssText =
        "position:relative;width:74px;height:30px;background-color:#0ff";
      fpsDiv.appendChild(fpsGraph);

      while (fpsGraph.children.length < 74) {
        var bar = document.createElement("span");
        bar.style.cssText =
          "width:1px;height:30px;float:left;background-color:#113";
        fpsGraph.appendChild(bar);
      }

      var msDiv = document.createElement("div");
      msDiv.id = "ms";
      msDiv.style.cssText =
        "padding:0 0 3px 3px;text-align:left;background-color:#020;display:none";
      container.appendChild(msDiv);

      var msText = document.createElement("div");
      msText.id = "msText";
      msText.style.cssText =
        "color:#0f0;font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px";
      msText.innerHTML = "MS";
      msDiv.appendChild(msText);

      var msGraph = document.createElement("div");
      msGraph.id = "msGraph";
      msGraph.style.cssText =
        "position:relative;width:74px;height:30px;background-color:#0f0";
      msDiv.appendChild(msGraph);

      while (msGraph.children.length < 74) {
        var bar = document.createElement("span");
        bar.style.cssText =
          "width:1px;height:30px;float:left;background-color:#131";
        msGraph.appendChild(bar);
      }

      var setMode = function (value) {
        mode = value;

        switch (mode) {
          case 0:
            fpsDiv.style.display = "block";
            msDiv.style.display = "none";
            break;
          case 1:
            fpsDiv.style.display = "none";
            msDiv.style.display = "block";
            break;
        }
      };

      var updateGraph = function (dom, value) {
        var child = dom.appendChild(dom.firstChild);
        child.style.height = value + "px";
      };

      return {
        REVISION: 11,

        domElement: container,

        setMode: setMode,

        begin: function () {
          startTime = Date.now();
        },

        end: function () {
          var time = Date.now();

          ms = time - startTime;
          msMin = Math.min(msMin, ms);
          msMax = Math.max(msMax, ms);

          msText.textContent = ms + " MS (" + msMin + "-" + msMax + ")";
          updateGraph(msGraph, Math.min(30, 30 - (ms / 200) * 30));

          frames++;

          if (time > prevTime + 1000) {
            fps = Math.round((frames * 1000) / (time - prevTime));
            fpsMin = Math.min(fpsMin, fps);
            fpsMax = Math.max(fpsMax, fps);

            fpsText.textContent = fps + " FPS (" + fpsMin + "-" + fpsMax + ")";
            updateGraph(fpsGraph, Math.min(30, 30 - (fps / 100) * 30));

            prevTime = time;
            frames = 0;
          }

          return time;
        },

        update: function () {
          startTime = this.end();
        },
      };
    };
    init();
    animate();
  }, []);

  const animate = () => {
    requestAnimationFrame(animate);
    render();
    stats.update();
  };
  const render = () => {
    camera.position.x += (mouseX - camera.position.x) * 0.005;
    camera.position.y += (-mouseY - camera.position.y) * 0.005;
    camera.lookAt(scene.position);
    renderer.render(scene, camera);
  };

  const webGLSupport = () => {
    /* 	The wizard of webGL only bestows his gifts of power
        to the worthy.  In this case, users with browsers who 'get it'.		*/

    try {
      var canvas = document.createElement("canvas");
      return !!(
        window.WebGLRenderingContext &&
        (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
      );
    } catch (e) {
      // console.warn('Hey bro, for some reason we\'re not able to use webGL for this.  No biggie, we\'ll use canvas.');
      return false;
    }
  };
  const onWindowResize = () => {
    // Everything should resize nicely if it needs to!
    var WIDTH = window.innerWidth,
      HEIGHT = window.innerHeight;

    camera.aspect = aspectRatio;
    camera.updateProjectionMatrix();
    renderer.setSize(WIDTH, HEIGHT);
  };

  const starForge = () => {
    /* 	Yep, it's a Star Wars: Knights of the Old Republic reference,
        are you really surprised at this point? 
                            */
    var starQty = 45000;
    geometry = new THREE.SphereGeometry(1000, 100, 50);

    materialOptions = {
      size: 1.0, //I know this is the default, it's for you.  Play with it if you want.
      transparency: true,
      opacity: 0.7,
    };

    starStuff = new THREE.PointCloudMaterial(materialOptions);

    // The wizard gaze became stern, his jaw set, he creates the cosmos with a wave of his arms

    for (var i = 0; i < starQty; i++) {
      var starVertex = new THREE.Vector3();
      starVertex.x = Math.random() * 2000 - 1000;
      starVertex.y = Math.random() * 2000 - 1000;
      starVertex.z = Math.random() * 2000 - 1000;

      geometry.vertices.push(starVertex);
    }

    stars = new THREE.PointCloud(geometry, starStuff);
    scene.add(stars);
  };

  return( <>
  <div ref={starDiv}>fd</div></>
  )
}

export default Three;
