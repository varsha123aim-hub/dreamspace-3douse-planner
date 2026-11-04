import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
// Store furniture groups
const furnitureGroups = []
// Create a group for furniture
function createFurnitureGroup(scene, name, x, z) {
  const group = new THREE.Group()

  group.name = name
  group.position.set(x, 0, z)
  group.userData.isFurnitureGroup = true

  scene.add(group)
  furnitureGroups.push(group)
  return group
}
// Reusable 3D furniture helper
function addFurnitureBox(
  scene,
  width,
  height,
  depth,
  x,
  y,
  z,
  color,
  group = null
) {
  const geometry = new THREE.BoxGeometry(width, height, depth)

  const material = new THREE.MeshStandardMaterial({
    color,
    roughness: 0.8,
  })

  const furniture = new THREE.Mesh(geometry, material)

  furniture.userData.isFurniture = true
  furniture.castShadow = true
  furniture.receiveShadow = true

  if (group) {
    // Group ke andar local position
    furniture.position.set(
      x - group.position.x,
      y - group.position.y,
      z - group.position.z
    )

    group.add(furniture)
  } else {
    // Standalone furniture part
    furniture.position.set(x, y, z)
    scene.add(furniture)
  }

  return furniture
}

// Bedroom furniture
function addBed(scene, x, z) {
  const bedGroup = createFurnitureGroup(scene, 'Bed', x, z)

  // Bed frame
  addFurnitureBox(
    scene, 1.7, 0.25, 2.2,
    x, 0.32, z, '#80543c', bedGroup
  )

  // Mattress
  addFurnitureBox(
    scene, 1.6, 0.18, 2.05,
    x, 0.52, z, '#f5f0e8', bedGroup
  )

  // Pillows
  addFurnitureBox(
    scene, 0.55, 0.12, 0.35,
    x - 0.42, 0.68, z - 0.72, '#ffffff', bedGroup
  )

  addFurnitureBox(
    scene, 0.55, 0.12, 0.35,
    x + 0.42, 0.68, z - 0.72, '#ffffff', bedGroup
  )

  // Blanket
  addFurnitureBox(
    scene, 1.5, 0.08, 1.05,
    x, 0.66, z + 0.35, '#8ca9c4', bedGroup
  )

  // Bedside tables — included with the bed group
  addFurnitureBox(
    scene, 0.4, 0.5, 0.4,
    x - 1.05, 0.38, z - 0.65, '#a87954', bedGroup
  )

  addFurnitureBox(
    scene, 0.4, 0.5, 0.4,
    x + 1.05, 0.38, z - 0.65, '#a87954', bedGroup
  )

  return bedGroup
}
// Living room furniture
// Realistic Living Room Sofa
function addSofa(scene, x, z) {
  const sofaGroup = createFurnitureGroup(
    scene,
    'Sofa',
    x,
    z
  )

  // Wooden legs
  addFurnitureBox(scene, 0.12, 0.25, 0.12,
    x - 0.88, 0.16, z - 0.28, '#70472e', sofaGroup)

  addFurnitureBox(scene, 0.12, 0.25, 0.12,
    x + 0.88, 0.16, z - 0.28, '#70472e', sofaGroup)

  addFurnitureBox(scene, 0.12, 0.25, 0.12,
    x - 0.88, 0.16, z + 0.28, '#70472e', sofaGroup)

  addFurnitureBox(scene, 0.12, 0.25, 0.12,
    x + 0.88, 0.16, z + 0.28, '#70472e', sofaGroup)

  // Main base
  addFurnitureBox(scene, 2.2, 0.35, 0.9,
    x, 0.38, z, '#668b78', sofaGroup)

  // Seat cushions
  addFurnitureBox(scene, 0.95, 0.16, 0.66,
    x - 0.52, 0.61, z + 0.04, '#a7c4b2', sofaGroup)

  addFurnitureBox(scene, 0.95, 0.16, 0.66,
    x + 0.52, 0.61, z + 0.04, '#a7c4b2', sofaGroup)

  // Backrest
  addFurnitureBox(scene, 2.05, 0.8, 0.22,
    x, 0.83, z - 0.34, '#52745f', sofaGroup)

  // Backrest cushions
  addFurnitureBox(scene, 0.88, 0.48, 0.12,
    x - 0.52, 0.88, z - 0.20, '#7fa18c', sofaGroup)

  addFurnitureBox(scene, 0.88, 0.48, 0.12,
    x + 0.52, 0.88, z - 0.20, '#7fa18c', sofaGroup)

  // Left armrest
  addFurnitureBox(scene, 0.25, 0.55, 0.9,
    x - 1.0, 0.58, z, '#52745f', sofaGroup)

  // Right armrest
  addFurnitureBox(scene, 0.25, 0.55, 0.9,
    x + 1.0, 0.58, z, '#52745f', sofaGroup)

  // Decorative cushions
  addFurnitureBox(scene, 0.35, 0.30, 0.16,
    x - 0.65, 0.88, z + 0.02, '#e7d7bd', sofaGroup)

  addFurnitureBox(scene, 0.35, 0.30, 0.16,
    x + 0.65, 0.88, z + 0.02, '#d6b5a0', sofaGroup)

  //// Coffee table - all parts in one group
  const coffeeTableGroup = createFurnitureGroup(
    scene,
    'Coffee Table',
    x,
    z + 1.5
  )

  // Coffee table legs
  addFurnitureBox(scene, 0.08, 0.28, 0.08,
    x - 0.42, 0.17, z + 1.25, '#70472e', coffeeTableGroup)

  addFurnitureBox(scene, 0.08, 0.28, 0.08,
    x + 0.42, 0.17, z + 1.25, '#70472e', coffeeTableGroup)

  addFurnitureBox(scene, 0.08, 0.28, 0.08,
    x - 0.42, 0.17, z + 1.75, '#70472e', coffeeTableGroup)

  addFurnitureBox(scene, 0.08, 0.28, 0.08,
    x + 0.42, 0.17, z + 1.75, '#70472e', coffeeTableGroup)

  // Coffee table top
  addFurnitureBox(scene, 1.1, 0.12, 0.65,
    x, 0.34, z + 1.5, '#a87954', coffeeTableGroup)
  }
// Kitchen furniture
function addKitchen(scene, x, z) {
  // One group for the complete kitchen cabinet
  const kitchenGroup = createFurnitureGroup(
    scene,
    'Kitchen Cabinet',
    x,
    z
  )

  // Base cabinet
  addFurnitureBox(
    scene, 1.8, 0.8, 0.55,
    x, 0.53, z, '#b9a18a', kitchenGroup
  )

  // Countertop
  addFurnitureBox(
    scene, 1.9, 0.12, 0.65,
    x, 0.99, z, '#eee7dc', kitchenGroup
  )

  // Left cabinet door
  addFurnitureBox(
    scene, 0.65, 0.55, 0.035,
    x - 0.45, 0.52, z + 0.29,
    '#e5d5c2', kitchenGroup
  )

  // Right cabinet door
  addFurnitureBox(
    scene, 0.65, 0.55, 0.035,
    x + 0.45, 0.52, z + 0.29,
    '#e5d5c2', kitchenGroup
  )

  // Sink
  addFurnitureBox(
    scene, 0.55, 0.06, 0.35,
    x, 1.08, z, '#8ba8ad', kitchenGroup
  )
}
// Bathroom furniture
function addBathroom(scene, x, z) {
  // Bathtub
  addFurnitureBox(scene, 1.3, 0.45, 0.65, x + 0.3, 0.38, z, '#ffffff')

  // Water surface
  addFurnitureBox(scene, 1.05, 0.035, 0.43, x + 0.3, 0.59, z, '#9ed8e8')

  // Washbasin stand
  addFurnitureBox(scene, 0.65, 0.65, 0.45, x - 0.55, 0.45, z + 0.8, '#e9e4dc')

  // Basin
  addFurnitureBox(scene, 0.7, 0.08, 0.5, x - 0.55, 0.82, z + 0.8, '#ffffff')
}
// Dining table with four chairs
function addDiningTable(scene, x, z) {
  // Create one group for the complete dining set
  const diningGroup = createFurnitureGroup(
    scene,
    'Dining Table Set',
    x,
    z
  )

  // Tabletop
  addFurnitureBox(
    scene, 1.5, 0.12, 1.1,
    x, 0.85, z, '#9b704c', diningGroup
  )

  // Table legs
  for (const dx of [-0.6, 0.6]) {
    for (const dz of [-0.4, 0.4]) {
      addFurnitureBox(
        scene, 0.09, 0.75, 0.09,
        x + dx, 0.43, z + dz,
        '#70472e', diningGroup
      )
    }
  }

  // Four chairs: seat and backrest are in the same group
  for (const dx of [-1.1, 1.1]) {
    for (const dz of [-0.35, 0.35]) {
      addFurnitureBox(
        scene, 0.4, 0.12, 0.4,
        x + dx, 0.48, z + dz,
        '#d8b995', diningGroup
      )

      addFurnitureBox(
        scene, 0.4, 0.55, 0.1,
        x + dx, 0.76,
        z + dz + (dz > 0 ? 0.15 : -0.15),
        '#9b704c', diningGroup
      )
    }
  }
}

// Wardrobe
function addWardrobe(scene, x, z) {
  // Main cupboard
  addFurnitureBox(
    scene, 1.3, 1.9, 0.55,
    x, 1.08, z, '#b58b68'
  )

  // Two doors
  addFurnitureBox(
    scene, 0.6, 1.65, 0.045,
    x - 0.32, 1.1, z + 0.29, '#d6b896'
  )

  addFurnitureBox(
    scene, 0.6, 1.65, 0.045,
    x + 0.32, 1.1, z + 0.29, '#d6b896'
  )

  // Door handles
  addFurnitureBox(
    scene, 0.035, 0.18, 0.05,
    x - 0.06, 1.1, z + 0.33, '#725744'
  )

  addFurnitureBox(
    scene, 0.035, 0.18, 0.05,
    x + 0.06, 1.1, z + 0.33, '#725744'
  )
}

// TV unit
function addTVUnit(scene, x, z) {
  // Create one group for the complete TV unit
  const tvGroup = createFurnitureGroup(
    scene,
    'TV Unit',
    x,
    z
  )

  // Cabinet
  addFurnitureBox(
    scene, 1.8, 0.45, 0.4,
    x, 0.38, z, '#9b704c', tvGroup
  )

  // TV screen
  addFurnitureBox(
    scene, 1.35, 0.85, 0.08,
    x, 1.05, z, '#252b31', tvGroup
  )

  // Screen panel
  addFurnitureBox(
    scene, 1.22, 0.7, 0.025,
    x, 1.05, z + 0.055, '#536c7b', tvGroup
  )
}

// Refrigerator
function addFridge(scene, x, z) {
  // Create one group for the complete fridge
  const fridgeGroup = createFurnitureGroup(
    scene,
    'Fridge',
    x,
    z
  )

  // Main body
  addFurnitureBox(
    scene, 0.8, 1.8, 0.7,
    x, 1.0, z, '#e6e9e9', fridgeGroup
  )

  // Freezer door
  addFurnitureBox(
    scene, 0.74, 0.48, 0.035,
    x, 1.62, z + 0.37, '#cbd2d5', fridgeGroup
  )

  // Lower door
  addFurnitureBox(
    scene, 0.74, 1.15, 0.035,
    x, 0.86, z + 0.37, '#d9dfe0', fridgeGroup
  )

  // Handle
  addFurnitureBox(
    scene, 0.035, 0.38, 0.045,
    x + 0.27, 0.9, z + 0.41, '#78858a', fridgeGroup
  )
}

// Indoor plant
function addIndoorPlant(scene, x, z) {
  // Create one group for the complete plant
  const plantGroup = createFurnitureGroup(
    scene,
    'Indoor Plant',
    x,
    z
  )

  // Pot
  const pot = new THREE.Mesh(
    new THREE.CylinderGeometry(0.2, 0.15, 0.35, 16),
    new THREE.MeshStandardMaterial({ color: '#b87555' })
  )

  // Group ke relative position
  pot.position.set(0, 0.3, 0)
  pot.castShadow = true
  pot.receiveShadow = true
  pot.userData.isFurniture = true
  plantGroup.add(pot)

  // Green foliage
  const leaves = new THREE.Mesh(
    new THREE.SphereGeometry(0.4, 16, 12),
    new THREE.MeshStandardMaterial({ color: '#438451' })
  )

  leaves.position.set(0, 0.75, 0)
  leaves.castShadow = true
  leaves.receiveShadow = true
  leaves.userData.isFurniture = true
  plantGroup.add(leaves)
}
function House3D({ rooms = [] }) {
  const mountRef = useRef(null)

  useEffect(() => {
    const container = mountRef.current
    if (!container) return

    const scene = new THREE.Scene()
    scene.background = new THREE.Color('#e9eee9')

    const width = container.clientWidth || 800
    const height = container.clientHeight || 520

    const camera = new THREE.PerspectiveCamera(
      45,
      width / height,
      0.1,
      1000
    )

    camera.position.set(15, 16, 19)

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(width, height)
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFShadowMap;

    container.appendChild(renderer.domElement)

    const controls = new OrbitControls(camera, renderer.domElement)
    // Mouse se furniture select karne ke liye
const raycaster = new THREE.Raycaster()
const mouse = new THREE.Vector2()

let selectedFurniture = null
let isDraggingFurniture = false
let dragOffset = new THREE.Vector3()

const dragPlane = new THREE.Plane(
  new THREE.Vector3(0, 1, 0),
  0
)

const dragPoint = new THREE.Vector3()
    controls.enableDamping = true
    controls.target.set(6, 0, 6)
    controls.maxPolarAngle = Math.PI / 2.05
    controls.minDistance = 8
    controls.maxDistance = 35

    // Lighting
    scene.add(new THREE.AmbientLight(0xffffff, 2))

    const sunlight = new THREE.DirectionalLight(0xffffff, 2.5)
    sunlight.position.set(10, 18, 8)
    sunlight.castShadow = true
    scene.add(sunlight)

    // Ground
    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(30, 30),
      new THREE.MeshStandardMaterial({ color: '#e6e9df' })
    )

    ground.rotation.x = -Math.PI / 2
    ground.position.set(6, -0.16, 6)
    ground.receiveShadow = true
    scene.add(ground)

    // Main floor
    const floor = new THREE.Mesh(
      new THREE.BoxGeometry(12, 0.18, 12),
      new THREE.MeshStandardMaterial({ color: '#cbb99d' })
    )

    floor.position.set(6, 0, 6)
    floor.receiveShadow = true
    scene.add(floor)

    // Floor grid
    const grid = new THREE.GridHelper(
      12,
      12,
      '#788b78',
      '#d0d3c8'
    )

    grid.position.set(6, 0.1, 6)
    scene.add(grid)

    const wallHeight = 2.5
    const wallThickness = 0.15

    const outerWallMaterial = new THREE.MeshStandardMaterial({
      color: '#fffaf0',
      roughness: 0.85,
    })

    const windowFrameMaterial = new THREE.MeshStandardMaterial({
      color: '#725744',
    })

    const glassMaterial = new THREE.MeshStandardMaterial({
      color: '#9ed8e8',
      roughness: 0.25,
      metalness: 0.1,
    })

    // Add a wall with an optional window opening.
    function addWindowWall(length, x, z, horizontal = true) {
      const windowWidth = 1.5
      const windowHeight = 1.1
      const windowBottom = 0.85

      const sideLength = (length - windowWidth) / 2

      function wallPiece(w, h, d, px, py, pz) {
        const mesh = new THREE.Mesh(
          new THREE.BoxGeometry(w, h, d),
          outerWallMaterial
        )

        mesh.position.set(px, py, pz)
        mesh.castShadow = true
        mesh.receiveShadow = true
        scene.add(mesh)
      }

      if (horizontal) {
        // Wall sections on both sides of the window
        wallPiece(
          sideLength,
          wallHeight,
          wallThickness,
          x - windowWidth / 2 - sideLength / 2,
          wallHeight / 2,
          z
        )

        wallPiece(
          sideLength,
          wallHeight,
          wallThickness,
          x + windowWidth / 2 + sideLength / 2,
          wallHeight / 2,
          z
        )

        // Wall above window
        wallPiece(
          windowWidth,
          wallHeight - windowBottom - windowHeight,
          wallThickness,
          x,
          windowBottom + windowHeight +
            (wallHeight - windowBottom - windowHeight) / 2,
          z
        )

        // Wall below window
        wallPiece(
          windowWidth,
          windowBottom,
          wallThickness,
          x,
          windowBottom / 2,
          z
        )

        // Glass pane
        const glass = new THREE.Mesh(
          new THREE.BoxGeometry(windowWidth - 0.12, windowHeight - 0.12, 0.04),
          glassMaterial
        )

        glass.position.set(x, windowBottom + windowHeight / 2, z)
        scene.add(glass)

        // Window frame
        const frame = new THREE.Mesh(
          new THREE.BoxGeometry(windowWidth, windowHeight, 0.08),
          windowFrameMaterial
        )

        frame.position.set(x, windowBottom + windowHeight / 2, z)
        scene.add(frame)

        // Glass sits slightly toward the outside of the frame
        glass.position.z = z + 0.055

        // Frame centre opening is represented by glass.
        // The frame remains visible around the pane.
        const innerGlass = new THREE.Mesh(
          new THREE.BoxGeometry(windowWidth - 0.16, windowHeight - 0.16, 0.09),
          glassMaterial
        )

        innerGlass.position.set(x, windowBottom + windowHeight / 2, z + 0.06)
        scene.add(innerGlass)
      } else {
        // Side wall sections
        wallPiece(
          wallThickness,
          wallHeight,
          sideLength,
          x,
          wallHeight / 2,
          z - windowWidth / 2 - sideLength / 2
        )

        wallPiece(
          wallThickness,
          wallHeight,
          sideLength,
          x,
          wallHeight / 2,
          z + windowWidth / 2 + sideLength / 2
        )

        // Wall above window
        wallPiece(
          wallThickness,
          wallHeight - windowBottom - windowHeight,
          windowWidth,
          x,
          windowBottom + windowHeight +
            (wallHeight - windowBottom - windowHeight) / 2,
          z
        )

        // Wall below window
        wallPiece(
          wallThickness,
          windowBottom,
          windowWidth,
          x,
          windowBottom / 2,
          z
        )

        const glass = new THREE.Mesh(
          new THREE.BoxGeometry(0.04, windowHeight - 0.12, windowWidth - 0.12),
          glassMaterial
        )

        glass.position.set(x - 0.055, windowBottom + windowHeight / 2, z)
        scene.add(glass)

        const frame = new THREE.Mesh(
          new THREE.BoxGeometry(0.08, windowHeight, windowWidth),
          windowFrameMaterial
        )

        frame.position.set(x, windowBottom + windowHeight / 2, z)
        scene.add(frame)

        const innerGlass = new THREE.Mesh(
          new THREE.BoxGeometry(0.09, windowHeight - 0.16, windowWidth - 0.16),
          glassMaterial
        )

        innerGlass.position.set(x - 0.06, windowBottom + windowHeight / 2, z)
        scene.add(innerGlass)
      }
    }

    // Front and back walls have windows.
    addWindowWall(12, 6, 0, true)
    addWindowWall(12, 6, 12, true)

    // Side walls without windows to keep the room layout clear.
    function addWall(w, h, d, x, y, z, material = outerWallMaterial) {
      const mesh = new THREE.Mesh(
        new THREE.BoxGeometry(w, h, d),
        material
      )

      mesh.position.set(x, y, z)
      mesh.castShadow = true
      mesh.receiveShadow = true
      scene.add(mesh)
    }

    addWall(wallThickness, wallHeight, 12, 0, wallHeight / 2, 6)
    addWall(wallThickness, wallHeight, 12, 12, wallHeight / 2, 6)

    // Rooms from the 2D plan
    rooms.forEach((room) => {
      const roomWidth = room.width
      const roomDepth = room.height

      const centerX = room.x + roomWidth / 2
      const centerZ = room.y + roomDepth / 2
       
       // Add furniture according to room type


// Add furniture according to room type
const roomType = (
  room.type ||
  room.name ||
  room.category ||
  ''
).toLowerCase()

if (roomType.includes('bedroom')) {
  addBed(scene, centerX, centerZ)

  // Wardrobe
  addWardrobe(
    scene,
    room.x + roomWidth * 0.72,
    room.y + roomDepth * 0.25
  )

  // Indoor plant
  addIndoorPlant(
    scene,
    room.x + roomWidth * 0.25,
    room.y + roomDepth * 0.75
  )
} else if (roomType.includes('living')) {
  addSofa(scene, centerX, centerZ)

  // TV unit
  addTVUnit(
    scene,
    centerX,
    room.y + roomDepth * 0.22
  )

  // Dining table for sufficiently large rooms
  if (roomWidth >= 4 && roomDepth >= 3) {
    addDiningTable(
      scene,
      room.x + roomWidth * 0.72,
      room.y + roomDepth * 0.72
    )
  }

  // Indoor plant
  addIndoorPlant(
    scene,
    room.x + roomWidth * 0.2,
    room.y + roomDepth * 0.75
  )
} else if (roomType.includes('kitchen')) {
  addKitchen(scene, centerX, centerZ)

  // Refrigerator
  addFridge(
    scene,
    room.x + roomWidth * 0.75,
    room.y + roomDepth * 0.72
  )
} else if (
  roomType.includes('bathroom') ||
  roomType.includes('bath')
) {
  addBathroom(scene, centerX, centerZ)
}

      // Coloured room flooring
      const roomFloor = new THREE.Mesh(
        new THREE.BoxGeometry(roomWidth, 0.06, roomDepth),
        new THREE.MeshStandardMaterial({
          color: room.color || '#dce8f7',
          roughness: 0.9,
        })
      )

      roomFloor.position.set(centerX, 0.13, centerZ)
      roomFloor.receiveShadow = true
      scene.add(roomFloor)

      // Room walls with a doorway opening on the front side.
      const roomWallMaterial = new THREE.MeshStandardMaterial({
        color: '#fffdf7',
        roughness: 0.8,
      })

      const doorWidth = 0.9
      const doorHeight = 2.05
      const wallHeightInside = 1.8
      const wallY = wallHeightInside / 2
      const frontZ = room.y + roomDepth

      function addRoomWall(w, h, d, x, y, z) {
        const mesh = new THREE.Mesh(
          new THREE.BoxGeometry(w, h, d),
          roomWallMaterial
        )

        mesh.position.set(x, y, z)
        mesh.castShadow = true
        mesh.receiveShadow = true
        scene.add(mesh)
      }

      // Back wall
      addRoomWall(
        roomWidth,
        wallHeightInside,
        wallThickness,
        centerX,
        wallY,
        room.y
      )

      // Left wall
      addRoomWall(
        wallThickness,
        wallHeightInside,
        roomDepth,
        room.x,
        wallY,
        centerZ
      )

      // Right wall
      addRoomWall(
        wallThickness,
        wallHeightInside,
        roomDepth,
        room.x + roomWidth,
        wallY,
        centerZ
      )

      // Front wall split into two sections to leave a door opening.
      const availableWidth = Math.max(0, roomWidth - doorWidth)
      const sectionWidth = availableWidth / 2

      if (sectionWidth > 0.05) {
        addRoomWall(
          sectionWidth,
          wallHeightInside,
          wallThickness,
          room.x + sectionWidth / 2,
          wallY,
          frontZ
        )

        addRoomWall(
          sectionWidth,
          wallHeightInside,
          wallThickness,
          room.x + roomWidth - sectionWidth / 2,
          wallY,
          frontZ
        )
      }

      // Door frame and door leaf
      const doorFrameMaterial = new THREE.MeshStandardMaterial({
        color: '#765238',
      })

      const doorFrame = new THREE.Mesh(
        new THREE.BoxGeometry(doorWidth, doorHeight, 0.08),
        doorFrameMaterial
      )

      doorFrame.position.set(
        centerX,
        doorHeight / 2,
        frontZ + 0.02
      )

      scene.add(doorFrame)

      const door = new THREE.Mesh(
        new THREE.BoxGeometry(doorWidth - 0.12, doorHeight - 0.12, 0.04),
        new THREE.MeshStandardMaterial({ color: '#b9875b' })
      )

      door.position.set(
        centerX,
        doorHeight / 2,
        frontZ + 0.07
      )

      scene.add(door)

      // Small label marker on room floor
      const marker = new THREE.Mesh(
        new THREE.BoxGeometry(0.22, 0.12, 0.22),
        new THREE.MeshStandardMaterial({ color: '#52735a' })
      )

      marker.position.set(centerX, 0.25, centerZ)
      scene.add(marker)
    })

    let animationId

    function animate() {
      animationId = requestAnimationFrame(animate)
      controls.update()
      renderer.render(scene, camera)
    }

    animate()

    function handleResize() {
      const newWidth = container.clientWidth
      const newHeight = container.clientHeight

      if (!newWidth || !newHeight) return

      camera.aspect = newWidth / newHeight
      camera.updateProjectionMatrix()
      renderer.setSize(newWidth, newHeight)
    }
     // Mouse down: select furniture
function handleMouseDown(event) {
  if (event.button !== 0) return

  const furniture = findFurniture(event)

  if (!furniture) return

  selectedFurniture = furniture

  raycaster.setFromCamera(mouse, camera)

  if (raycaster.ray.intersectPlane(dragPlane, dragPoint)) {
    dragOffset.copy(dragPoint).sub(furniture.position)
  }

  isDraggingFurniture = true
  controls.enabled = false
}

// Mouse move: move selected furniture
function handleMouseMove(event) {
  updateMousePosition(event)

  if (!isDraggingFurniture || !selectedFurniture) return

  raycaster.setFromCamera(mouse, camera)

  if (raycaster.ray.intersectPlane(dragPlane, dragPoint)) {
    selectedFurniture.position.x = dragPoint.x - dragOffset.x
    selectedFurniture.position.z = dragPoint.z - dragOffset.z
  }
}

// Mouse up: stop dragging
function handleMouseUp() {
  isDraggingFurniture = false
  selectedFurniture = null
  controls.enabled = true
}

// Register mouse events
renderer.domElement.addEventListener('pointerdown', handleMouseDown)
renderer.domElement.addEventListener('pointermove', handleMouseMove)
window.addEventListener('pointerup', handleMouseUp)
// ==================================
// FURNITURE MOUSE MOVEMENT
// ==================================

function handlePointerDown(event) {
  if (event.button !== 0) return

  selectedFurniture = findFurniture(event)

  if (!selectedFurniture) return

  isDraggingFurniture = true

  const rect = renderer.domElement.getBoundingClientRect()

  mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
  mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1

  raycaster.setFromCamera(mouse, camera)

  dragPlane.set(
    new THREE.Vector3(0, 1, 0),
    -selectedFurniture.position.y
  )

  if (raycaster.ray.intersectPlane(dragPlane, dragPoint)) {
    dragOffset.copy(selectedFurniture.position).sub(dragPoint)
  }

  controls.enabled = false
}

function handlePointerMove(event) {
  if (!isDraggingFurniture || !selectedFurniture) return

  const rect = renderer.domElement.getBoundingClientRect()

  mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
  mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1

  raycaster.setFromCamera(mouse, camera)

  if (raycaster.ray.intersectPlane(dragPlane, dragPoint)) {
    selectedFurniture.position.x = dragPoint.x + dragOffset.x
    selectedFurniture.position.z = dragPoint.z + dragOffset.z
  }
}

function handlePointerUp() {
  isDraggingFurniture = false
  selectedFurniture = null
  controls.enabled = true
}

// Register mouse events
renderer.domElement.addEventListener(
  'pointerdown',
  handlePointerDown
)

renderer.domElement.addEventListener(
  'pointermove',
  handlePointerMove
)

window.addEventListener(
  'pointerup',
  handlePointerUp
)
// ==================================
// FURNITURE DRAG EVENTS
// ==================================

function handlePointerDown(event) {
  if (event.button !== 0) return

  const furniture = findFurniture(event)

  if (!furniture) return

  selectedFurniture = furniture
  isDraggingFurniture = true

  raycaster.setFromCamera(mouse, camera)

  dragPlane.set(
    new THREE.Vector3(0, 1, 0),
    -selectedFurniture.position.y
  )

  if (raycaster.ray.intersectPlane(dragPlane, dragPoint)) {
    dragOffset.copy(selectedFurniture.position).sub(dragPoint)
  }

  controls.enabled = false
}

function handlePointerMove(event) {
  if (!isDraggingFurniture || !selectedFurniture) return

  updateMousePosition(event)
  raycaster.setFromCamera(mouse, camera)

  if (raycaster.ray.intersectPlane(dragPlane, dragPoint)) {
    selectedFurniture.position.x =
      dragPoint.x + dragOffset.x

    selectedFurniture.position.z =
      dragPoint.z + dragOffset.z
  }
}

function handlePointerUp() {
  isDraggingFurniture = false
  selectedFurniture = null
  controls.enabled = true
}
    const resizeObserver = new ResizeObserver(handleResize)
    // Register furniture mouse events
renderer.domElement.addEventListener(
  'pointerdown',
  handlePointerDown
)

renderer.domElement.addEventListener(
  'pointermove',
  handlePointerMove
)

window.addEventListener(
  'pointerup',
  handlePointerUp
)
    // Convert mouse position into Three.js coordinates
function updateMousePosition(event) {
  const rect = renderer.domElement.getBoundingClientRect()

  mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
  mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1
}

// Find furniture under the mouse
function findFurniture(event) {
  updateMousePosition(event)
  raycaster.setFromCamera(mouse, camera)

  const furnitureMeshes = []

  scene.traverse((object) => {
    if (object.isMesh && object.userData.isFurniture) {
      furnitureMeshes.push(object)
    }
  })

  const hits = raycaster.intersectObjects(
    furnitureMeshes,
    false
  )

  console.log(
    "Furniture meshes:", furnitureMeshes.length,
    "Hits:", hits.length
  )

  if (hits.length === 0) return null

  const selected = hits[0].object
  let parent = selected.parent

  while (parent && parent !== scene) {
    if (parent.userData?.isFurnitureGroup) {
      console.log("Selected group:", parent.name)
      return parent
    }

    parent = parent.parent
  }

  console.log("No group found:", selected.name)
  return selected
}function findFurniture(event) {
  updateMousePosition(event)

  raycaster.setFromCamera(mouse, camera)

  const furnitureMeshes = []

  scene.traverse((object) => {
    if (object.isMesh && object.userData.isFurniture) {
      furnitureMeshes.push(object)
    }
  })

  const hits = raycaster.intersectObjects(
    furnitureMeshes,
    false
  )

  console.log(
    "Furniture meshes:", furnitureMeshes.length,
    "Hits:", hits.length
  )

  if (hits.length === 0) {
    return null
  }

  let selected = hits[0].object

  // Mesh se upar jaakar furniture ka group dhoondo.
  let parent = selected.parent

  while (parent && parent !== scene) {
    if (parent.userData.isFurnitureGroup) {
      return parent
    }

    parent = parent.parent
  }

  // Agar group nahi mila, original mesh return hoga.
  return selected
}   resizeObserver.observe(container)

    return () => {
      cancelAnimationFrame(animationId)
      renderer.domElement.removeEventListener(
  'pointerdown',
  handlePointerDown
)

renderer.domElement.removeEventListener(
  'pointermove',
  handlePointerMove
)

window.removeEventListener(
  'pointerup',
  handlePointerUp
)
      resizeObserver.disconnect()
      controls.dispose()

      scene.traverse((object) => {
        if (object.geometry) object.geometry.dispose()

        if (object.material) {
          const materials = Array.isArray(object.material)
            ? object.material
            : [object.material]

          materials.forEach((material) => material.dispose())
        }
      })

      renderer.dispose()

      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [rooms])

  return (
    <div
      ref={mountRef}
      style={{
        width: '100%',
        height: '520px',
        overflow: 'hidden',
        borderRadius: '12px',
      }}
    />
  )
}

export default House3D