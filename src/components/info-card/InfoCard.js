import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function InfoCard(props) {
    const { title, value, description } = props;
    return (
      <Card sx={{ minWidth: 275, maxWidth: 400 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {title}
          </Typography>
          <Typography variant="h5" component="div">
            {value}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {description}
          </Typography>
        </CardContent>
      </Card>
    );
  }