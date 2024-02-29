import { Card, CardMedia, CardContent, Typography } from '@mui/material';

// Inside your main content grid
<Card sx={{ maxWidth: 345 }}>
  <CardMedia
    component="img"
    height="140"
    image="path/to/your/image.jpg"
    alt="Clothing item"
  />
  <CardContent>
    <Typography gutterBottom variant="h5" component="div">
      New in Clothing
    </Typography>
    {/* Add other content */}
  </CardContent>
</Card>
