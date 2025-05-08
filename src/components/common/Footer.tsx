'use client';
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { Facebook, Twitter, LinkedIn, Instagram } from '@mui/icons-material';
import FadeIn from '../animations/FadeIn';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: '#0F0F1E',
        color: 'white',
        py: 8,
        position: 'relative',
        overflow: 'hidden',
      }}
      id="contact"
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <FadeIn>
              <Box mb={3}>
                <Image
                  src="/images/logo-white.png"
                  alt="Fincoopers Tech Logo"
                  width={40}
                  height={50}
                />
              </Box>
              <Typography variant="body2" color="grey.400" sx={{ mb: 3 }}>
                FTI is a technology company specializing in AI-powered automation solutions. We help businesses by replacing human-dependent processes with AI-driven workflows.
              </Typography>
              <Box display="flex" gap={1}>
                <IconButton size="small" sx={{ color: 'white', '&:hover': { color: 'primary.main' } }}>
                  <Facebook />
                </IconButton>
                <IconButton size="small" sx={{ color: 'white', '&:hover': { color: 'primary.main' } }}>
                  <Twitter />
                </IconButton>
                <IconButton
  size="small"
  sx={{ 
    color: 'white', 
    '&:hover': { 
      color: 'primary.main' 
    } 
  }}
  onClick={() => window.open("https://www.linkedin.com/company/fin-coopers-tech-india-private-limited/about/", "_blank")}
>
  <LinkedIn />
</IconButton>

                <IconButton size="small" sx={{ color: 'white', '&:hover': { color: 'primary.main' } }}>
                  <Instagram />
                </IconButton>
              </Box>
            </FadeIn>
          </Grid>
          
          <Grid item xs={6} sm={4} md={4}>
            <FadeIn delay={0.1}>
              <Typography variant="h6" fontWeight="bold" mb={3}>
                Company
              </Typography>
              <Box display="flex" flexDirection="column" gap={2}>
                <Link href="/#about" passHref style={{ textDecoration: 'none' }}>
                  <Typography variant="body2" color="grey.400" sx={{ '&:hover': { color: 'primary.main' } }}>
                    About Us
                  </Typography>
                </Link>
                <Link href="/#services" passHref style={{ textDecoration: 'none' }}>
                  <Typography variant="body2" color="grey.400" sx={{ '&:hover': { color: 'primary.main' } }}>
                    Services
                  </Typography>
                </Link>
                <Link href="/#process" passHref style={{ textDecoration: 'none' }}>
                  <Typography variant="body2" color="grey.400" sx={{ '&:hover': { color: 'primary.main' } }}>
                    How It Works
                  </Typography>
                </Link>
                <Link href="/team" passHref style={{ textDecoration: 'none' }}>
                  <Typography variant="body2" color="grey.400" sx={{ '&:hover': { color: 'primary.main' } }}>
                    Team
                  </Typography>
                </Link>
                {/* <Link href="#" passHref style={{ textDecoration: 'none' }}>
                  <Typography variant="body2" color="grey.400" sx={{ '&:hover': { color: 'primary.main' } }}>
                    Careers
                  </Typography>
                </Link> */}
              </Box>
            </FadeIn>
          </Grid>
          
          {/* <Grid item xs={6} sm={4} md={2}>
            <FadeIn delay={0.2}>
              <Typography variant="h6" fontWeight="bold" mb={3}>
                Resources
              </Typography>
              <Box display="flex" flexDirection="column" gap={2}>
                <Link href="/blog" passHref style={{ textDecoration: 'none' }}>
                  <Typography variant="body2" color="grey.400" sx={{ '&:hover': { color: 'primary.main' } }}>
                    Blog
                  </Typography>
                </Link>
                <Link href="#" passHref style={{ textDecoration: 'none' }}>
                  <Typography variant="body2" color="grey.400" sx={{ '&:hover': { color: 'primary.main' } }}>
                    Case Studies
                  </Typography>
                </Link>
                <Link href="#" passHref style={{ textDecoration: 'none' }}>
                  <Typography variant="body2" color="grey.400" sx={{ '&:hover': { color: 'primary.main' } }}>
                    Documentation
                  </Typography>
                </Link>
                <Link href="#" passHref style={{ textDecoration: 'none' }}>
                  <Typography variant="body2" color="grey.400" sx={{ '&:hover': { color: 'primary.main' } }}>
                    FAQs
                  </Typography>
                </Link>
              </Box>
            </FadeIn>
          </Grid> */}
          
          <Grid item xs={12} sm={4} md={4}>
            <FadeIn delay={0.3}>
              <Typography variant="h6" fontWeight="bold" mb={3}>
                Stay Updated
              </Typography>
              <Typography variant="body2" color="grey.400" mb={2}>
                Subscribe to our newsletter to get the latest updates and news.
              </Typography>
              <Box display="flex" gap={1}>
                <TextField
                  variant="outlined"
                  placeholder="Your email address"
                  size="small"
                  fullWidth
                  sx={{
                    bgcolor: 'rgba(255,255,255,0.05)',
                    borderRadius: 1,
                    '& .MuiOutlinedInput-root': {
                      color: 'white',
                      '& fieldset': {
                        borderColor: 'rgba(255,255,255,0.2)',
                      },
                      '&:hover fieldset': {
                        borderColor: 'rgba(255,255,255,0.3)',
                      },
                    },
                  }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ whiteSpace: 'nowrap' }}
                >
                  Subscribe
                </Button>
              </Box>
              <Box mt={4}>
                <Typography variant="h6" fontWeight="bold" mb={1}>
                  Contact Us
                </Typography>
                  <Link href="mailto:fintech@fincoopers.in" style={{ textDecoration: 'none', }}>
                <Typography variant="body2" color="grey.400">
                  Email: fintech@fincoopers.in
                </Typography>
                  </Link>
                 <Link href="tel:+919302075637" style={{ textDecoration: 'none', }}>
                 <Typography variant="body2" color="grey.400">
                  Phone: +91 9302075637
                </Typography>
                  </Link>
              </Box>
            </FadeIn>
          </Grid>
        </Grid>
        
        <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)', my: 4 }} />
        
        <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap">
          <Typography variant="body2" color="grey.500">
            © {new Date().getFullYear()} Fincoopers Tech India Private Limited. All rights reserved.
          </Typography>
          <Box display="flex" gap={3}>
            <Link href="#" passHref style={{ textDecoration: 'none' }}>
              <Typography variant="body2" color="grey.500" sx={{ '&:hover': { color: 'primary.main' } }}>
                Privacy Policy
              </Typography>
            </Link>
            <Link href="#" passHref style={{ textDecoration: 'none' }}>
              <Typography variant="body2" color="grey.500" sx={{ '&:hover': { color: 'primary.main' } }}>
                Terms of Service
              </Typography>
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
