import { useState } from 'react'
import House3D from './House3D.jsx'
import AIHouseAssistant from '../AIHouseAssistant.jsx'
import './Planner.css'

const roomTypes = [
  { name: 'Bedroom', icon: '🛏️', color: '#dce8f7', width: 4, height: 3 },
  { name: 'Living Room', icon: '🛋️', color: '#f6e3c5', width: 5, height: 4 },
  { name: 'Kitchen', icon: '🍳', color: '#dcefdc', width: 3, height: 3 },
  { name: 'Bathroom', icon: '🛁', color: '#d9eff2', width: 2, height: 2 },
]
const furnitureTypes = [
  { name: 'Sofa', icon: '🛋️' },
  { name: 'Bed', icon: '🛏️' },
  { name: 'Dining Table', icon: '🍽️' },
  { name: 'Wardrobe', icon: '🚪' },
  { name: 'TV Unit', icon: '📺' },
  { name: 'Plant', icon: '🪴' },
  { name: 'Fridge', icon: '🧊' },
  { name: 'Kitchen Cabinet', icon: '🗄️' },
]
const GRID_SIZE = 12
const CELL_SIZE = 40

function Planner() {
  const [rooms, setRooms] = useState([])
  const [selectedRoom, setSelectedRoom] = useState('Bedroom')
  const [selectedFurniture, setSelectedFurniture] = useState('Sofa')
  const [activeView, setActiveView] = useState('2D')
  const [message, setMessage] = useState('Choose a room, then click on the grid.')

  function addRoomAt(x, y) {
    const roomType = roomTypes.find((room) => room.name === selectedRoom)

    if (!roomType) return

    const roomWidth = Math.min(roomType.width, GRID_SIZE - x)
    const roomHeight = Math.min(roomType.height, GRID_SIZE - y)

    const overlaps = rooms.some((room) => {
      return (
        x < room.x + room.width &&
        x + roomWidth > room.x &&
        y < room.y + room.height &&
        y + roomHeight > room.y
      )
    })

    if (overlaps) {
      setMessage('This space is occupied. Choose an empty area.')
      return
    }

    const newRoom = {
      id: Date.now(),
      name: roomType.name,
      icon: roomType.icon,
      color: roomType.color,
      x,
      y,
      width: roomWidth,
      height: roomHeight,
    }

    setRooms((previous) => [...previous, newRoom])
    setMessage(`${roomType.name} added successfully!`)
  }

  function handleGridClick(event) {
    const bounds = event.currentTarget.getBoundingClientRect()

    const x = Math.floor(
      ((event.clientX - bounds.left) / bounds.width) * GRID_SIZE
    )

    const y = Math.floor(
      ((event.clientY - bounds.top) / bounds.height) * GRID_SIZE
    )

    addRoomAt(
      Math.max(0, Math.min(GRID_SIZE - 1, x)),
      Math.max(0, Math.min(GRID_SIZE - 1, y))
    )
  }

  function saveDesign() {
    localStorage.setItem('dreamspace_floor_plan', JSON.stringify(rooms))
    setMessage('Your floor plan has been saved!')
  }

  function loadDesign() {
    try {
      const saved = JSON.parse(
        localStorage.getItem('dreamspace_floor_plan') || '[]'
      )

      setRooms(Array.isArray(saved) ? saved : [])
      setMessage('Saved floor plan loaded.')
    } catch {
      setRooms([])
      setMessage('Could not load the saved floor plan.')
    }
  }

  function clearDesign() {
    if (window.confirm('Do you want to clear the entire floor plan?')) {
      setRooms([])
      setMessage('Floor plan cleared.')
    }
  }

  return (
    <div className="planner-page">
      <header className="planner-header">
        <div>
          <h1>⌂ DreamSpace Planner</h1>
          <p>Design your dream home in 2D and 3D</p>
        </div>
      </header>

      <div className="planner-toolbar">
        <button
          className={activeView === '2D' ? 'planner-active' : ''}
          onClick={() => setActiveView('2D')}
        >
          ▦ 2D Floor Plan
        </button>

        <button
          className={activeView === '3D' ? 'planner-active' : ''}
          onClick={() => {
            setActiveView('3D')
            setMessage('Your 3D house preview is ready.')
          }}
        >
          ◈ 3D View
        </button>

        <button onClick={saveDesign}>💾 Save Design</button>
        <button onClick={loadDesign}>📂 Load Design</button>
        <button onClick={clearDesign}>🗑️ Clear Plan</button>
      </div>

      <div className="planner-layout">
        <aside className="room-panel">
          <h2>Room Library</h2>
          <p>Select a room to place on the grid.</p>

          {roomTypes.map((room) => (
            <button
              key={room.name}
              className={`room-option ${
                selectedRoom === room.name ? 'room-option-selected' : ''
              }`}
              onClick={() => {
                setSelectedRoom(room.name)
                setActiveView('2D')
                setMessage(`${room.name} selected. Click on the grid.`)
              }}
            >
              <span className="room-option-icon">{room.icon}</span>

              <span>
                <strong>{room.name}</strong>
                <small>
                  {room.width} × {room.height} grid units
                </small>
              </span>
            </button>
          ))}

          <div className="room-instructions">
            <strong>How to use</strong>
            <p>1. Select a room.</p>
            <p>2. Click an empty grid area.</p>
            <p>3. Select a placed room to delete it.</p>
          </div>
          <div className="furniture-library">
  <h2>Furniture Library</h2>
  <p>Select furniture for your 3D house.</p>

  {furnitureTypes.map((furniture) => (
    <button
      key={furniture.name}
      className={`room-option ${
        selectedFurniture === furniture.name
          ? 'room-option-selected'
          : ''
      }`}
      onClick={() => {
        setSelectedFurniture(furniture.name)
        setActiveView('3D')
        setMessage(`${furniture.name} selected.`)
      }}
    >
      <span className="room-option-icon">
        {furniture.icon}
      </span>
      <span>
        <strong>{furniture.name}</strong>
        <small>Click to select</small>
      </span>
    </button>
  ))}
</div>
        </aside>

        <main className="planner-editor">
          <div className="editor-heading">
            <div>
              <h2>{activeView === '2D' ? '2D Floor Plan' : '3D Preview'}</h2>
              <p>
                {activeView === '2D'
                  ? '12 × 12 design grid'
                  : 'Explore your house in 3D.'}
              </p>
            </div>

            <span className="room-count">{rooms.length} Rooms</span>
          </div>

          {activeView === '2D' ? (
            <div
              className="floor-grid"
              onClick={handleGridClick}
              style={{
                '--grid-size': GRID_SIZE,
                '--cell-size': `${CELL_SIZE}px`,
              }}
              role="application"
              aria-label="Interactive floor plan grid"
            >
              {rooms.map((room) => (
                <button
                  key={room.id}
                  className="placed-room"
                  style={{
                    left: `${(room.x / GRID_SIZE) * 100}%`,
                    top: `${(room.y / GRID_SIZE) * 100}%`,
                    width: `${(room.width / GRID_SIZE) * 100}%`,
                    height: `${(room.height / GRID_SIZE) * 100}%`,
                    backgroundColor: room.color,
                  }}
                  title={`Click to remove ${room.name}`}
                  onClick={(event) => {
                    event.stopPropagation()
                    setRooms((previous) =>
                      previous.filter((item) => item.id !== room.id)
                    )
                    setMessage(`${room.name} removed.`)
                  }}
                >
                  <span>{room.icon}</span>
                  <strong>{room.name}</strong>
                  <small>
                    {room.width} × {room.height}
                  </small>
                </button>
              ))}
            </div>
         ) : (
            <div className="planner-3d-container">
              <House3D rooms={rooms} />

              <button
                className="return-2d-btn"
                onClick={() => setActiveView('2D')}
              >
                ← Return to 2D Plan
              </button>
            </div>
          )}
 

          <p className="planner-message" aria-live="polite">
            {message}
          </p>
        </main>
      </div>
      <AIHouseAssistant/>
    </div>
  )
}

export default Planner