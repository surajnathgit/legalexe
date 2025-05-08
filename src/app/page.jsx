'use client';

import HeroSection from '@/components/HeroSection.jsx';
import AboutSection from '@/components/AboutSection.jsx';
import FeaturesSection from '@/components/FeaturesSection.jsx';
import PricingSection from '@/components/PricingSection.jsx';
import { Box, Container, Typography } from '@mui/material';

export default function LegalExePage() {
  return (
    <Box sx={{ backgroundColor: '#FFFFFF' }}>
      <HeroSection />
      <AboutSection />
      <FeaturesSection />
      <PricingSection />
      <Box sx={{ py: 2, bgcolor: '#1F2937', color: 'white', textAlign: 'center' }}>
        <Container maxWidth="lg">
          <Typography variant="body2">
            © {new Date().getFullYear()} LegalExe. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}