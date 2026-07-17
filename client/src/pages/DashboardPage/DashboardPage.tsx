import { useNavigate } from 'react-router-dom'
import { Box, Button, Paper, Stack, Typography } from '@mui/material'
import { useAuth } from '../../hooks/useAuth'

function DashboardPage() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  return (
    <Box component="main" sx={{ maxWidth: 640, mx: 'auto', pt: { xs: 4, sm: 8 }, px: 2 }}>
      <Paper variant="outlined" sx={{ p: 4 }}>
        <Stack
          direction="row"
          sx={{ justifyContent: 'space-between', alignItems: 'center', mb: 3 }}
        >
          <Typography variant="h4" component="h1">
            Dashboard
          </Typography>
          <Button variant="outlined" onClick={handleLogout}>
            Log out
          </Button>
        </Stack>

        <Typography variant="body1">
          Welcome, <strong>{user?.email}</strong>.
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Account created {user ? new Date(user.createdAt).toLocaleString() : ''}
        </Typography>
      </Paper>
    </Box>
  )
}

export default DashboardPage
