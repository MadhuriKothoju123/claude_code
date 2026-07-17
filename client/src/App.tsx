import { useEffect, useState } from 'react'
import './App.css'

type HealthResponse = {
  status: string
  timestamp: string
}

function App() {
  const [health, setHealth] = useState<HealthResponse | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/health')
      .then((res) => {
        if (!res.ok) throw new Error(`Request failed: ${res.status}`)
        return res.json() as Promise<HealthResponse>
      })
      .then(setHealth)
      .catch((err: Error) => setError(err.message))
  }, [])

  return (
    <main style={{ fontFamily: 'sans-serif', padding: '2rem' }}>
      <h1>Express + React skeleton</h1>
      <p>
        This page calls <code>/api/health</code> on the Express server
        (proxied by Vite in dev).
      </p>
      {error && <p style={{ color: 'crimson' }}>Error: {error}</p>}
      {!error && !health && <p>Loading server status…</p>}
      {health && (
        <pre>{JSON.stringify(health, null, 2)}</pre>
      )}
    </main>
  )
}

export default App
