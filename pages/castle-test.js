// pages/castle-test.js
// Simple test to verify CastleScene works

import CastleScene from '../components/three/CastleScene'

export default function CastleTest() {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: '#0a1128'
    }}>
      <CastleScene />
      
      <div style={{
        position: 'absolute',
        top: '2rem',
        left: '2rem',
        color: 'white',
        background: 'rgba(0,0,0,0.5)',
        padding: '1rem',
        borderRadius: '8px',
        zIndex: 10
      }}>
        <h1>Castle Test</h1>
        <p>If you see a 3D castle, it works!</p>
        <p>If you see only this text, check console (F12)</p>
      </div>
    </div>
  )
}