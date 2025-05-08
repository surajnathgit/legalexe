import { Box, Typography } from '@mui/material';

export default function LegalExeLogo({ color = "#4F46E5", size = 40 }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="40" height="40" rx="8" fill={color} />
        <path d="M10 10H20V14H14V18H18V22H14V30H10V10Z" fill="white" />
        <path d="M22 10H30L24 20L30 30H22L16 20L22 10Z" fill="white" />
      </svg>
      <Typography variant="h5" component="span" sx={{ ml: 1, fontWeight: 'bold', color }}>
        LegalExe
      </Typography>
    </Box>
  );
}