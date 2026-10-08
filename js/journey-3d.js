/**
 * The Odoo Journey - Interactive 3D Road & Vehicle Experience
 * Powered by Three.js & GSAP
 * Designed for Kacho Zuhaib Hassan — Odoo Developer Portfolio
 */

(function () {
  'use strict';

  // Section milestones with their normalized progress (0.0 to 1.0) along the road
  const MILESTONES = [
    { id: 'hero', name: 'Start Point', progress: 0.00, title: 'Introduction' },
    { id: 'what-i-build', name: 'Core Focus', progress: 0.10, title: 'What I Build' },
    { id: 'about', name: 'About', progress: 0.20, title: 'About Zuhaib' },
    { id: 'experience', name: 'Experience', progress: 0.33, title: 'Werpsol & .NET' },
    { id: 'skills', name: 'Skills', progress: 0.46, title: 'Technical Stack' },
    { id: 'projects', name: 'Projects', progress: 0.60, title: 'Featured Projects' },
    { id: 'odoo-modules', name: 'Published Apps', progress: 0.72, title: 'Odoo Modules' },
    { id: 'expertise', name: 'Expertise', progress: 0.82, title: 'Odoo Specialization' },
    { id: 'how-i-work', name: 'Process', progress: 0.90, title: 'How I Work' },
    { id: 'education', name: 'Education', progress: 0.95, title: 'Academic Background' },
    { id: 'contact', name: 'Finish Line', progress: 1.00, title: 'Destination: Let\'s Connect' }
  ];

  class OdooJourney {
    constructor() {
      this.container = document.getElementById('journey-canvas-container');
      if (!this.container) return;

      this.currentProgress = 0;
      this.targetProgress = 0;
      this.isNavigating = false;
      this.wheelRotation = 0;
      this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      
      // Check if user set reduced motion manually
      const storedMotion = localStorage.getItem('kzh-reduced-motion');
      if (storedMotion !== null) {
        this.reducedMotion = storedMotion === 'true';
      }

      this.initThree();
      this.createCurvedRoad();
      this.createExecutiveCar();
      this.createMilestoneMarkers();
      this.bindEvents();
      this.updateCarPosition(0, true);
      this.animate();
    }

    initThree() {
      // Scene
      this.scene = new THREE.Scene();
      this.scene.fog = new THREE.FogExp2(0x0a0f18, 0.007);

      // Camera
      const width = this.container.clientWidth || window.innerWidth;
      const height = this.container.clientHeight || window.innerHeight;
      this.camera = new THREE.PerspectiveCamera(45, width / height, 0.5, 500);
      this.camera.position.set(0, 16, 26);

      // Renderer
      this.renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance'
      });
      this.renderer.setSize(width, height);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      this.renderer.shadowMap.enabled = true;
      this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
      this.renderer.toneMappingExposure = 1.15;
      this.container.appendChild(this.renderer.domElement);

      // Lighting
      // Soft ambient light
      const ambientLight = new THREE.AmbientLight(0xd5e0f5, 0.7);
      this.scene.add(ambientLight);

      // Key directional light (subtle daylight / studio spotlight)
      this.dirLight = new THREE.DirectionalLight(0xffffff, 1.4);
      this.dirLight.position.set(25, 45, 20);
      this.dirLight.castShadow = true;
      this.dirLight.shadow.mapSize.width = 1024;
      this.dirLight.shadow.mapSize.height = 1024;
      this.dirLight.shadow.camera.near = 0.5;
      this.dirLight.shadow.camera.far = 150;
      this.dirLight.shadow.bias = -0.0005;
      const d = 30;
      this.dirLight.shadow.camera.left = -d;
      this.dirLight.shadow.camera.right = d;
      this.dirLight.shadow.camera.top = d;
      this.dirLight.shadow.camera.bottom = -d;
      this.scene.add(this.dirLight);

      // Odoo purple accent rim light
      this.accentLight = new THREE.DirectionalLight(0x875a7b, 1.2);
      this.accentLight.position.set(-20, 20, -15);
      this.scene.add(this.accentLight);

      // Subtle ground grid plane for enterprise tech depth
      const gridHelper = new THREE.GridHelper(240, 60, 0x1f293d, 0x111827);
      gridHelper.position.y = -0.05;
      this.scene.add(gridHelper);
    }

    createCurvedRoad() {
      // Define a gracefully winding 3D spline through the portfolio sections
      // The road swings left and right to guide the visitor through the content
      const points = [
        new THREE.Vector3(0, 0, 15),       // 0.00: Hero start
        new THREE.Vector3(4, 0.2, 5),      // 0.10: What I Build
        new THREE.Vector3(8, 0.4, -8),     // 0.20: About Me (right side)
        new THREE.Vector3(0, 0.2, -22),    // 0.27: Mid curve
        new THREE.Vector3(-8, 0.5, -36),   // 0.33: Experience (left side)
        new THREE.Vector3(-10, 0.3, -50),  // 0.40: Transition
        new THREE.Vector3(-4, 0.4, -65),   // 0.46: Skills
        new THREE.Vector3(6, 0.2, -80),    // 0.53: Curve towards Projects
        new THREE.Vector3(10, 0.6, -96),   // 0.60: Featured Projects (right side)
        new THREE.Vector3(4, 0.4, -112),   // 0.66: Swing
        new THREE.Vector3(-8, 0.5, -128),  // 0.72: Odoo Modules (left side)
        new THREE.Vector3(-4, 0.3, -145),  // 0.82: Expertise
        new THREE.Vector3(6, 0.4, -162),   // 0.90: How I Work (right curve)
        new THREE.Vector3(0, 0.2, -178),   // 0.95: Education
        new THREE.Vector3(0, 0, -195)      // 1.00: Contact & Journey Completed
      ];

      this.roadCurve = new THREE.CatmullRomCurve3(points);
      this.roadCurve.curveType = 'centripetal';
      this.roadCurve.tension = 0.4;

      // Build the 3D Road Mesh (ribbon)
      const roadSamples = 240;
      const roadWidth = 3.6;
      const roadGeom = new THREE.BufferGeometry();
      const vertices = [];
      const normals = [];
      const uvs = [];
      const indices = [];

      for (let i = 0; i <= roadSamples; i++) {
        const t = i / roadSamples;
        const pt = this.roadCurve.getPointAt(t);
        const tangent = this.roadCurve.getTangentAt(t).normalize();
        const up = new THREE.Vector3(0, 1, 0);
        const normal = new THREE.Vector3().crossVectors(tangent, up).normalize();

        // Left and Right edge vertices
        const left = new THREE.Vector3().addVectors(pt, normal.clone().multiplyScalar(-roadWidth / 2));
        const right = new THREE.Vector3().addVectors(pt, normal.clone().multiplyScalar(roadWidth / 2));

        vertices.push(left.x, left.y, left.z);
        vertices.push(right.x, right.y, right.z);

        normals.push(0, 1, 0);
        normals.push(0, 1, 0);

        uvs.push(0, t * 40);
        uvs.push(1, t * 40);

        if (i < roadSamples) {
          const row1 = i * 2;
          const row2 = (i + 1) * 2;
          indices.push(row1, row1 + 1, row2);
          indices.push(row1 + 1, row2 + 1, row2);
        }
      }

      roadGeom.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
      roadGeom.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
      roadGeom.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
      roadGeom.setIndex(indices);
      roadGeom.computeVertexNormals();

      // Road Surface Material (Asphalt with subtle metallic sheen)
      const roadMaterial = new THREE.MeshStandardMaterial({
        color: 0x141822,
        roughness: 0.85,
        metalness: 0.15,
        side: THREE.DoubleSide
      });

      this.roadMesh = new THREE.Mesh(roadGeom, roadMaterial);
      this.roadMesh.receiveShadow = true;
      this.scene.add(this.roadMesh);

      // Luminous Road Curbs / Edge Rails
      this.createGlowingCurbs(roadWidth);

      // Dashed Glowing Road Centerline
      this.createCenterLine();
    }

    createGlowingCurbs(roadWidth) {
      // Create glowing curbs along the left and right borders of the road
      const curbSamples = 160;
      const leftCurbPts = [];
      const rightCurbPts = [];

      for (let i = 0; i <= curbSamples; i++) {
        const t = i / curbSamples;
        const pt = this.roadCurve.getPointAt(t);
        const tangent = this.roadCurve.getTangentAt(t).normalize();
        const normal = new THREE.Vector3().crossVectors(tangent, new THREE.Vector3(0, 1, 0)).normalize();

        leftCurbPts.push(pt.clone().add(normal.clone().multiplyScalar(-roadWidth / 2)).add(new THREE.Vector3(0, 0.04, 0)));
        rightCurbPts.push(pt.clone().add(normal.clone().multiplyScalar(roadWidth / 2)).add(new THREE.Vector3(0, 0.04, 0)));
      }

      const curbMaterial = new THREE.MeshBasicMaterial({
        color: 0x875a7b, // Odoo Purple glow
        transparent: true,
        opacity: 0.75
      });

      const leftCurve = new THREE.CatmullRomCurve3(leftCurbPts);
      const rightCurve = new THREE.CatmullRomCurve3(rightCurbPts);

      const curbGeomLeft = new THREE.TubeGeometry(leftCurve, 160, 0.05, 6, false);
      const curbGeomRight = new THREE.TubeGeometry(rightCurve, 160, 0.05, 6, false);

      const leftCurbMesh = new THREE.Mesh(curbGeomLeft, curbMaterial);
      const rightCurbMesh = new THREE.Mesh(curbGeomRight, curbMaterial);

      this.scene.add(leftCurbMesh);
      this.scene.add(rightCurbMesh);
    }

    createCenterLine() {
      // Dashed lane line down the center of the road
      const dashSamples = 80;
      const dashGeom = new THREE.BufferGeometry();
      const positions = [];

      for (let i = 0; i < dashSamples; i++) {
        if (i % 2 === 0) {
          const t1 = i / dashSamples;
          const t2 = (i + 0.6) / dashSamples;
          const pt1 = this.roadCurve.getPointAt(t1).add(new THREE.Vector3(0, 0.03, 0));
          const pt2 = this.roadCurve.getPointAt(t2).add(new THREE.Vector3(0, 0.03, 0));
          positions.push(pt1.x, pt1.y, pt1.z);
          positions.push(pt2.x, pt2.y, pt2.z);
        }
      }

      dashGeom.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
      const dashMaterial = new THREE.LineBasicMaterial({
        color: 0x9e7392, // Soft Odoo amethyst
        linewidth: 2,
        transparent: true,
        opacity: 0.7
      });

      const lineSegments = new THREE.LineSegments(dashGeom, dashMaterial);
      this.scene.add(lineSegments);
    }

    createExecutiveCar() {
      // Modern 3D Executive Car with subtle Odoo purple identity & clean proportions
      this.carGroup = new THREE.Group();

      // Materials
      const bodyMaterial = new THREE.MeshStandardMaterial({
        color: 0x1b202c, // Sleek metallic obsidian
        metalness: 0.85,
        roughness: 0.25,
        envMapIntensity: 1.0
      });

      const purpleAccentMaterial = new THREE.MeshStandardMaterial({
        color: 0x875a7b, // Odoo signature purple
        metalness: 0.6,
        roughness: 0.3
      });

      const darkGlassMaterial = new THREE.MeshStandardMaterial({
        color: 0x090c12, // Tinted glass
        metalness: 0.95,
        roughness: 0.08,
        transparent: true,
        opacity: 0.85
      });

      const chromeMaterial = new THREE.MeshStandardMaterial({
        color: 0xe2e8f0,
        metalness: 0.95,
        roughness: 0.1
      });

      const tireMaterial = new THREE.MeshStandardMaterial({
        color: 0x111317,
        roughness: 0.9,
        metalness: 0.1
      });

      const rimMaterial = new THREE.MeshStandardMaterial({
        color: 0x94a3b8,
        metalness: 0.9,
        roughness: 0.2
      });

      // 1. Lower Chassis
      const chassisGeom = new THREE.BoxGeometry(1.5, 0.45, 3.2);
      const chassis = new THREE.Mesh(chassisGeom, bodyMaterial);
      chassis.position.y = 0.4;
      chassis.castShadow = true;
      chassis.receiveShadow = true;
      this.carGroup.add(chassis);

      // 2. Aerodynamic Cabin / Greenhouse
      const cabinGeom = new THREE.BoxGeometry(1.3, 0.45, 1.7);
      const cabin = new THREE.Mesh(cabinGeom, darkGlassMaterial);
      cabin.position.set(0, 0.8, -0.15);
      cabin.castShadow = true;
      this.carGroup.add(cabin);

      // Roof panel
      const roofGeom = new THREE.BoxGeometry(1.22, 0.05, 1.6);
      const roof = new THREE.Mesh(roofGeom, bodyMaterial);
      roof.position.set(0, 1.03, -0.15);
      roof.castShadow = true;
      this.carGroup.add(roof);

      // 3. Purple Accent Side Rails & Trim
      const trimLeftGeom = new THREE.BoxGeometry(0.04, 0.06, 2.9);
      const trimLeft = new THREE.Mesh(trimLeftGeom, purpleAccentMaterial);
      trimLeft.position.set(-0.76, 0.42, 0);
      this.carGroup.add(trimLeft);

      const trimRightGeom = new THREE.BoxGeometry(0.04, 0.06, 2.9);
      const trimRight = new THREE.Mesh(trimRightGeom, purpleAccentMaterial);
      trimRight.position.set(0.76, 0.42, 0);
      this.carGroup.add(trimRight);

      // Front Hood Scoop / Subtle Odoo Purple Line
      const hoodTrimGeom = new THREE.BoxGeometry(0.6, 0.03, 0.08);
      const hoodTrim = new THREE.Mesh(hoodTrimGeom, purpleAccentMaterial);
      hoodTrim.position.set(0, 0.63, 1.25);
      this.carGroup.add(hoodTrim);

      // 4. Subtle Odoo Emblem Badge on Front Grille
      const emblemGroup = new THREE.Group();
      const badgeRingGeom = new THREE.RingGeometry(0.06, 0.11, 24);
      const badgeMat = new THREE.MeshBasicMaterial({ color: 0x875a7b, side: THREE.DoubleSide });
      const badgeRing = new THREE.Mesh(badgeRingGeom, badgeMat);
      badgeRing.rotation.x = -Math.PI / 2;
      badgeRing.position.set(0, 0.64, 1.48);
      emblemGroup.add(badgeRing);

      // Inner dot representing the classic Odoo 'o' circle
      const dotGeom = new THREE.CircleGeometry(0.03, 16);
      const dotMat = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });
      const dot = new THREE.Mesh(dotGeom, dotMat);
      dot.rotation.x = -Math.PI / 2;
      dot.position.set(0, 0.641, 1.48);
      emblemGroup.add(dot);
      this.carGroup.add(emblemGroup);

      // 5. LED Headlights (Clean modern angular lights)
      const headlightGeom = new THREE.BoxGeometry(0.28, 0.08, 0.05);
      const headlightMat = new THREE.MeshBasicMaterial({ color: 0xf0f7ff });
      
      const hlLeft = new THREE.Mesh(headlightGeom, headlightMat);
      hlLeft.position.set(-0.52, 0.46, 1.6);
      this.carGroup.add(hlLeft);

      const hlRight = new THREE.Mesh(headlightGeom, headlightMat);
      hlRight.position.set(0.52, 0.46, 1.6);
      this.carGroup.add(hlRight);

      // Subtle warm headlight beams
      this.headlightSpot = new THREE.SpotLight(0xe8f0fe, 1.8, 14, Math.PI / 6, 0.5, 1);
      this.headlightSpot.position.set(0, 0.5, 1.6);
      this.headlightTarget = new THREE.Object3D();
      this.headlightTarget.position.set(0, 0, 8);
      this.carGroup.add(this.headlightSpot);
      this.carGroup.add(this.headlightTarget);
      this.headlightSpot.target = this.headlightTarget;

      // 6. Rear Tail Light Bar (Sleek red LED)
      const tailLightGeom = new THREE.BoxGeometry(1.36, 0.07, 0.05);
      const tailLightMat = new THREE.MeshBasicMaterial({ color: 0xef4444 });
      const tailLight = new THREE.Mesh(tailLightGeom, tailLightMat);
      tailLight.position.set(0, 0.48, -1.6);
      this.carGroup.add(tailLight);

      // 7. Four Wheels with Rims & Purple Hubs
      this.wheels = [];
      this.frontWheels = [];
      const wheelRadius = 0.32;
      const wheelWidth = 0.18;
      const wheelGeom = new THREE.CylinderGeometry(wheelRadius, wheelRadius, wheelWidth, 24);
      wheelGeom.rotateZ(Math.PI / 2);

      const rimGeom = new THREE.CylinderGeometry(wheelRadius * 0.65, wheelRadius * 0.65, wheelWidth + 0.01, 16);
      rimGeom.rotateZ(Math.PI / 2);

      const hubGeom = new THREE.CylinderGeometry(wheelRadius * 0.22, wheelRadius * 0.22, wheelWidth + 0.02, 12);
      hubGeom.rotateZ(Math.PI / 2);

      const wheelPositions = [
        { x: -0.76, y: wheelRadius, z: 0.95, isFront: true },   // Front Left
        { x: 0.76, y: wheelRadius, z: 0.95, isFront: true },    // Front Right
        { x: -0.76, y: wheelRadius, z: -0.95, isFront: false },  // Rear Left
        { x: 0.76, y: wheelRadius, z: -0.95, isFront: false }   // Rear Right
      ];

      wheelPositions.forEach((pos) => {
        const wheelHolder = new THREE.Group();
        wheelHolder.position.set(pos.x, pos.y, pos.z);

        const tire = new THREE.Mesh(wheelGeom, tireMaterial);
        tire.castShadow = true;
        wheelHolder.add(tire);

        const rim = new THREE.Mesh(rimGeom, rimMaterial);
        wheelHolder.add(rim);

        const hub = new THREE.Mesh(hubGeom, purpleAccentMaterial);
        wheelHolder.add(hub);

        this.carGroup.add(wheelHolder);
        this.wheels.push(wheelHolder);
        if (pos.isFront) {
          this.frontWheels.push(wheelHolder);
        }
      });

      // 8. Ground Contact Shadow
      const shadowGeom = new THREE.PlaneGeometry(2.0, 3.8);
      const shadowMat = new THREE.MeshBasicMaterial({
        color: 0x030712,
        transparent: true,
        opacity: 0.55,
        depthWrite: false
      });
      const groundShadow = new THREE.Mesh(shadowGeom, shadowMat);
      groundShadow.rotation.x = -Math.PI / 2;
      groundShadow.position.y = 0.02;
      this.carGroup.add(groundShadow);

      // Subtle underglow (Odoo purple atmosphere)
      this.underglow = new THREE.PointLight(0x875a7b, 1.0, 4);
      this.underglow.position.set(0, 0.15, 0);
      this.carGroup.add(this.underglow);

      this.scene.add(this.carGroup);
    }

    createMilestoneMarkers() {
      // Create subtle modern 3D milestone beacons along the route
      this.markers = [];
      const beaconGeom = new THREE.CylinderGeometry(0.08, 0.08, 0.7, 16);
      const ringGeom = new THREE.RingGeometry(0.4, 0.55, 24);
      ringGeom.rotateX(-Math.PI / 2);

      const beaconMat = new THREE.MeshStandardMaterial({
        color: 0x334155,
        metalness: 0.8,
        roughness: 0.2
      });

      const ringMat = new THREE.MeshBasicMaterial({
        color: 0x875a7b,
        transparent: true,
        opacity: 0.4,
        side: THREE.DoubleSide
      });

      MILESTONES.forEach((ms, index) => {
        const pt = this.roadCurve.getPointAt(ms.progress);
        const tangent = this.roadCurve.getTangentAt(ms.progress).normalize();
        const normal = new THREE.Vector3().crossVectors(tangent, new THREE.Vector3(0, 1, 0)).normalize();

        // Place marker post just outside road boundary
        const sideOffset = (index % 2 === 0 ? 1 : -1) * 2.3;
        const markerPos = pt.clone().add(normal.clone().multiplyScalar(sideOffset));

        const markerGroup = new THREE.Group();
        markerGroup.position.set(markerPos.x, markerPos.y, markerPos.z);

        const post = new THREE.Mesh(beaconGeom, beaconMat);
        post.position.y = 0.35;
        markerGroup.add(post);

        // Glowing crown
        const crownGeom = new THREE.SphereGeometry(0.12, 12, 12);
        const crownMat = new THREE.MeshBasicMaterial({ color: 0x875a7b });
        const crown = new THREE.Mesh(crownGeom, crownMat);
        crown.position.y = 0.75;
        markerGroup.add(crown);

        // Ground pulse ring
        const ring = new THREE.Mesh(ringGeom, ringMat.clone());
        ring.position.y = 0.03;
        markerGroup.add(ring);

        this.scene.add(markerGroup);
        this.markers.push({ group: markerGroup, crown, ring, milestone: ms });
      });
    }

    updateCarPosition(progress, immediate = false) {
      if (!this.roadCurve || !this.carGroup) return;

      const pClamped = Math.max(0, Math.min(1, progress));
      const pt = this.roadCurve.getPointAt(pClamped);
      const tangent = this.roadCurve.getTangentAt(pClamped).normalize();

      // Look slightly ahead on curve for smooth car heading
      const lookAheadDelta = 0.015;
      const nextT = Math.min(1, pClamped + lookAheadDelta);
      const nextPt = this.roadCurve.getPointAt(nextT);

      // Calculate forward direction and banking
      const direction = new THREE.Vector3().subVectors(nextPt, pt).normalize();
      
      // Calculate lateral curve curvature to steer front wheels & bank body
      const prevT = Math.max(0, pClamped - lookAheadDelta);
      const prevPt = this.roadCurve.getPointAt(prevT);
      const v1 = new THREE.Vector3().subVectors(pt, prevPt).normalize();
      const v2 = new THREE.Vector3().subVectors(nextPt, pt).normalize();
      const crossY = v1.x * v2.z - v1.z * v2.x; // Curvature indicator
      const steerAngle = Math.max(-0.4, Math.min(0.4, crossY * 12));

      // Steer front wheels
      if (this.frontWheels) {
        this.frontWheels.forEach((wheel) => {
          wheel.rotation.y = steerAngle;
        });
      }

      // Roll all wheels
      if (this.wheels) {
        this.wheels.forEach((wheel) => {
          wheel.rotation.x = this.wheelRotation;
        });
      }

      // Smooth position update
      if (immediate) {
        this.carGroup.position.copy(pt);
        this.carGroup.lookAt(nextPt);
      } else {
        this.carGroup.position.lerp(pt, 0.18);

        // Compute rotation quaternion smoothly
        const targetRot = new THREE.Matrix4().lookAt(
          this.carGroup.position,
          nextPt,
          new THREE.Vector3(0, 1, 0)
        );
        const targetQuat = new THREE.Quaternion().setFromRotationMatrix(targetRot);
        this.carGroup.quaternion.slerp(targetQuat, 0.16);

        // Subtle sports car banking into turns
        const bankZ = -steerAngle * 0.12;
        this.carGroup.rotation.z += bankZ;
      }

      // Camera Follow System (Cinematic trailing isometric angle)
      // Camera sits above and behind car, looking forward along route
      const isMobile = window.innerWidth < 768;
      const camDistance = isMobile ? 18 : 14;
      const camHeight = isMobile ? 12 : 9;
      const camSide = isMobile ? 0 : 3.5;

      const rightVec = new THREE.Vector3().crossVectors(tangent, new THREE.Vector3(0, 1, 0)).normalize();
      const camTargetPos = pt.clone()
        .sub(tangent.clone().multiplyScalar(camDistance))
        .add(new THREE.Vector3(0, camHeight, 0))
        .add(rightVec.clone().multiplyScalar(camSide));

      if (immediate) {
        this.camera.position.copy(camTargetPos);
        this.camera.lookAt(pt.clone().add(new THREE.Vector3(0, 1.5, 0)));
      } else {
        this.camera.position.lerp(camTargetPos, 0.08);
        const lookTarget = pt.clone().add(new THREE.Vector3(0, 1.2, 0));
        this.camera.lookAt(lookTarget);
      }

      // Update light position with car to keep lighting crisp
      this.dirLight.position.set(pt.x + 20, pt.y + 40, pt.z + 20);

      // Pulse active milestone marker
      this.updateActiveMilestone(pClamped);
    }

    updateActiveMilestone(progress) {
      if (!this.markers) return;

      let closestIdx = 0;
      let minDiff = 999;
      this.markers.forEach((m, idx) => {
        const diff = Math.abs(m.milestone.progress - progress);
        if (diff < minDiff) {
          minDiff = diff;
          closestIdx = idx;
        }
      });

      this.markers.forEach((m, idx) => {
        const isCurrent = idx === closestIdx && minDiff < 0.08;
        if (isCurrent) {
          m.crown.material.color.setHex(0xa855f7); // Glowing active purple
          m.ring.material.opacity = 0.9;
          m.ring.scale.set(1.4, 1.4, 1.4);
        } else {
          m.crown.material.color.setHex(0x875a7b);
          m.ring.material.opacity = 0.3;
          m.ring.scale.set(1.0, 1.0, 1.0);
        }
      });

      // Update UI HUD badge if present
      const hudBadge = document.getElementById('journey-current-milestone');
      if (hudBadge && this.markers[closestIdx]) {
        hudBadge.textContent = this.markers[closestIdx].milestone.title;
      }
    }

    /**
     * Requirement 7: DIRECT NAVIGATION BEHAVIOR
     * When user clicks a nav link (e.g., 'Projects'), smooth travel animation:
     * 1. Detect target section milestone progress
     * 2. Smoothly animate vehicle from current position along the road
     * 3. Move through intermediate route
     * 4. Arrive at destination and settle the page
     */
    navigateToMilestone(targetId, callback) {
      const milestone = MILESTONES.find(m => m.id === targetId);
      if (!milestone) return;

      const targetProgress = milestone.progress;
      const targetElement = document.getElementById(targetId);
      
      this.isNavigating = true;

      // Calculate travel distance and duration (fast, responsive, smooth: 1.0 to 1.3s)
      const distance = Math.abs(targetProgress - this.currentProgress);
      const duration = Math.max(0.9, Math.min(1.4, distance * 2.2));

      // Scroll destination top offset taking sticky navbar into account
      let targetScrollY = 0;
      if (targetElement) {
        const navHeight = 72;
        targetScrollY = targetElement.getBoundingClientRect().top + window.scrollY - navHeight;
      }

      // Animate progress using GSAP if available, otherwise native smooth scroll
      if (window.gsap && !this.reducedMotion) {
        window.gsap.killTweensOf(this);
        const startScroll = window.scrollY;
        const tweenObj = {
          progress: this.currentProgress,
          scroll: startScroll
        };

        window.gsap.to(tweenObj, {
          progress: targetProgress,
          scroll: targetScrollY,
          duration: duration,
          ease: 'power2.inOut',
          onUpdate: () => {
            const step = tweenObj.progress - this.currentProgress;
            this.wheelRotation += step * 30;
            this.currentProgress = tweenObj.progress;
            this.targetProgress = tweenObj.progress;
            this.updateCarPosition(this.currentProgress);
            window.scrollTo(0, tweenObj.scroll);
          },
          onComplete: () => {
            this.isNavigating = false;
            if (callback) callback();
          }
        });
      } else {
        // Fallback or Reduced Motion: Direct smooth scroll
        this.currentProgress = targetProgress;
        this.targetProgress = targetProgress;
        this.updateCarPosition(targetProgress, true);
        window.scrollTo({
          top: targetScrollY,
          behavior: this.reducedMotion ? 'auto' : 'smooth'
        });
        this.isNavigating = false;
        if (callback) callback();
      }
    }

    bindEvents() {
      // 1. Natural Scroll Sync
      window.addEventListener('scroll', () => {
        if (this.isNavigating) return;

        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        if (maxScroll <= 0) return;

        const scrollFraction = Math.max(0, Math.min(1, window.scrollY / maxScroll));
        this.targetProgress = scrollFraction;
      }, { passive: true });

      // 2. Window Resize
      window.addEventListener('resize', () => {
        if (!this.container) return;
        const width = this.container.clientWidth || window.innerWidth;
        const height = this.container.clientHeight || window.innerHeight;
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
      });

      // 3. Navigation Click Interceptor (Direct Journey Navigation)
      document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', (e) => {
          const targetId = anchor.getAttribute('href').replace('#', '');
          const exists = document.getElementById(targetId);
          if (exists) {
            e.preventDefault();
            this.navigateToMilestone(targetId, () => {
              // Update URL hash without instant jump
              if (history.pushState) {
                history.pushState(null, null, '#' + targetId);
              }
            });
          }
        });
      });

      // 4. Reduced Motion preference listener
      window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', (e) => {
        this.reducedMotion = e.matches;
      });
    }

    animate() {
      requestAnimationFrame(() => this.animate());

      // Smooth dampening towards target progress when user scrolls
      if (!this.isNavigating) {
        const delta = this.targetProgress - this.currentProgress;
        if (Math.abs(delta) > 0.0001) {
          const step = delta * (this.reducedMotion ? 0.3 : 0.08);
          this.currentProgress += step;
          this.wheelRotation += step * 40;
          this.updateCarPosition(this.currentProgress);
        }
      }

      // Subtle underglow and milestone glow oscillation
      const time = performance.now() * 0.002;
      if (this.underglow) {
        this.underglow.intensity = 0.9 + Math.sin(time * 3) * 0.2;
      }

      this.renderer.render(this.scene, this.camera);
    }
  }

  // Initialize once DOM is ready and Three.js is loaded
  function init() {
    if (typeof THREE !== 'undefined') {
      window.odooJourney = new OdooJourney();
    } else {
      setTimeout(init, 50);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
