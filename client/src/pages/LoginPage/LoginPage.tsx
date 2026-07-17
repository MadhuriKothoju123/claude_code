import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { Alert, Box, Button, Link, Paper, Stack, TextField, Typography } from '@mui/material'
import { useAuth } from '../../hooks/useAuth'

function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setSubmitting(true)

    try {
      await login(email, password)
      navigate('/dashboard')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Box
      component="main"
      sx={{ display: 'flex', justifyContent: 'center', pt: { xs: 4, sm: 8 }, px: 2 }}
    >
      <Paper variant="outlined" sx={{ p: 4, width: '100%', maxWidth: 360 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Log in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Stack spacing={2}>
            <TextField
              id="email"
              name="email"
              label="Email"
              type="email"
              autoComplete="email"
              required
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              id="password"
              name="password"
              label="Password"
              type="password"
              autoComplete="current-password"
              required
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && <Alert severity="error">{error}</Alert>}

            <Button type="submit" variant="contained" disabled={submitting} fullWidth>
              {submitting ? 'Logging in…' : 'Log in'}
            </Button>

            <Typography variant="body2" align="center">
              Don't have an account? <Link component={RouterLink} to="/register">Register</Link>
            </Typography>
          </Stack>
        </Box>
      </Paper>
    </Box>
  )
}

export default LoginPage
