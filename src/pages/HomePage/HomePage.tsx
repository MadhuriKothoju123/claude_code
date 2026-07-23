import { Box, Paper, Typography } from '@mui/material'

function HomePage() {
  return (
    <Box component="main" sx={{ maxWidth: 640, mx: 'auto', pt: { xs: 4, sm: 8 }, px: 2 }}>
      <Paper variant="outlined" sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          my-app
        </Typography>
        <Typography variant="body1" color="text.secondary">
          CICD INTEGRTION
        </Typography>
      </Paper>
    </Box>
  )
}

export default HomePage
