import { Html } from '@react-three/drei'
import React from 'react'

function ConsoleLabelHTML({ opacity = 1 }: { opacity?: number }) {
  return (
    <Html
      position={[0, -0.15, 1.15]}
      center
      distanceFactor={2}
      style={{
        pointerEvents: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        fontSize: '.5rem',
        color: '#f1f1f1',
        position: 'relative',
        width: '700px',
        height: '300px',
        opacity, // set opacity from prop
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '90px',
          left: 0,
          width: '100%',
          height: '100%',
        }}
      >
        <span style={{ padding: '4px 14px', borderRadius: 2, fontWeight: 600, width: 180 }}>
          Left Stick
        </span>
        <svg width="100" height="2" style={{ marginTop: -8, marginLeft: 70 }}>
          <rect x="0" y="0" width="100" height="2" fill="#57e9ff" rx="2" />
        </svg>
      </div>
      <div
        style={{
          position: 'absolute',
          top: '120px',
          left: 0,
          width: '100%',
          height: '100%',
        }}
      >
        <span style={{ padding: '4px 14px', borderRadius: 2, fontWeight: 600, width: 180 }}>
          Directional Buttons
        </span>
        <svg width="100" height="2" style={{ marginTop: -6, marginLeft: 100 }}>
          <rect x="0" y="0" width="100" height="2" fill="#57e9ff" rx="2" />
        </svg>
      </div>
      <div
        style={{
          position: 'absolute',
          top: '180px',
          left: 0,
          width: '100%',
          height: '100%',
        }}
      >
        <span style={{ padding: '4px 14px', borderRadius: 2, fontWeight: 600, width: 180 }}>
          Audio Speaker
        </span>
        <svg width="120" height="2" style={{ marginTop: -8, marginLeft: 80 }}>
          <rect x="0" y="0" width="120" height="2" fill="#57e9ff" rx="2" />
        </svg>
      </div>

      <ConsoleLabelRightHTML
        label="A/B/X/Y Buttons"
        top={90}
        right={10}
        lineWidth={100}
        width={150}
      />
      <ConsoleLabelRightHTML label="Right Stick" top={125} right={40} lineWidth={180} width={150} />
      <ConsoleLabelRightHTML
        label="Audio Speaker"
        top={180}
        right={0}
        lineWidth={130}
        width={200}
      />
      <ConsoleLabelRightHTML
        label="Touch Display"
        top={200}
        right={10}
        lineWidth={220}
        width={220}
      />
      <ConsoleLabelTopHTML
        label="View / Command Center"
        top={35}
        left={115}
        lineWidth={220}
        width={60}
      />

      <ConsoleLabelTopHTML
        label="Armory Crate / Menu"
        top={35}
        left={386}
        lineWidth={220}
        width={60}
      />
    </Html>
  )
}

function ConsoleLabelRightHTML({
  label,
  lineWidth = 180,
  top,
  right,
  width,
}: {
  label?: string
  lineWidth?: number
  top?: number
  right?: number
  width?: number
}) {
  return (
    <div
      style={{
        position: 'absolute',
        top: `${top}px`,
        right: `${right}px`,
        width: `${width}px`,
        height: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <svg width={lineWidth} height="2" style={{ marginTop: 0, marginRight: 0 }}>
        <rect x="0" y="0" width={lineWidth} height="2" fill="#57e9ff" rx="2" />
      </svg>
      <span style={{ padding: '4px 14px', borderRadius: 2, fontWeight: 600, width: 180 }}>
        {label}
      </span>
    </div>
  )
}

function ConsoleLabelTopHTML({
  label,
  lineWidth = 180,
  top,
  left,
  width,
}: {
  label?: string
  lineWidth?: number
  top?: number
  left?: number
  width?: number
}) {
  return (
    <div
      style={{
        position: 'absolute',
        top: `${top}px`,
        left: `${left}px`,
        width: '200px',
        height: `${width}px`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <span style={{ padding: '4px 14px', borderRadius: 2, fontWeight: 600, width: 180 }}>
        {label}
      </span>
      <svg width="2" height={lineWidth} style={{ marginTop: 0, marginRight: 0 }}>
        <rect x="0" y="0" width="2" height={lineWidth} fill="#57e9ff" rx="2" />
      </svg>
    </div>
  )
}

export default ConsoleLabelHTML
