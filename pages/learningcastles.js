// pages/learningcastles.js
import dynamic from 'next/dynamic';
import Head from 'next/head';

// Import the castle component WITHOUT server-side rendering
const CastleScene = dynamic(
  () => import('../components/three/learningcastles'),
  { 
    ssr: false,
    loading: () => (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        background: '#0a0e27',
        color: '#d4af37',
        fontFamily: "'Crimson Text', serif",
        fontSize: '20px'
      }}>
        Loading Castle... 🏰
      </div>
    )
  }
);

export default function LearningCastles() {
  return (
    <>
      <Head>
        <title>Interactive Castle | Three.js Learning</title>
        <meta name="description" content="Learn Three.js with an interactive 3D castle" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Crimson+Text:ital,wght@0,400;0,600;0,700;1,400&display=swap" 
          rel="stylesheet" 
        />
      </Head>
      
      <CastleScene />
    </>
  );
}