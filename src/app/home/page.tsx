'use client';
import { Box, Container, Grid, Typography, Card, CardContent, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';
import Navbar from '@/components/common/Navbar';
import SectionTransition from '@/components/animations/SectionTransition';
import TextSplitReveal from '@/components/animations/TextSplitReveal';
import MorphingShape from '@/components/animations/MorphingShape';
import FloatingElement from '@/components/animations/FloatingElement';
import AnimatedCounter from '@/components/animations/AnimatedCounter';

export default function Home() {
  const theme = useTheme();

  return (
    <Box sx={{ minHeight: '100vh', background: '#f8faff' }}>
      <Navbar />
      
      {/* Hero Section */}
      <Box 
        sx={{ 
          pt: { xs: 12, md: 16 }, 
          pb: { xs: 10, md: 14 },
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative elements */}
        <Box sx={{ position: 'absolute', right: '-10%', top: '5%', zIndex: 0, opacity: 0.1 }}>
          <MorphingShape
            color={theme.palette.primary.light}
            secondaryColor={theme.palette.secondary.light}
            size={400}
            speed={20}
          />
        </Box>
        
        <Box sx={{ position: 'absolute', left: '-8%', bottom: '10%', zIndex: 0, opacity: 0.1 }}>
          <MorphingShape
            color={theme.palette.secondary.main}
            secondaryColor={theme.palette.primary.main}
            size={350}
            speed={15}
          />
        </Box>
        
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <SectionTransition direction="left">
                <Typography 
                  variant="h6" 
                  fontWeight="bold"
                  color="primary.main"
                  sx={{ mb: 2 }}
                >
                  POWERED BY FINEKE AI
                </Typography>
                
                <TextSplitReveal
                  text="Extract Insights from Any Document"
                  variant="h1"
                  fontWeight="bold" 
                  splitBy="words"
                  effect="slide"
                  sx={{ 
                    mb: 3,
                    fontSize: { xs: '2.5rem', md: '3.5rem' },
                    background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                />
                
                <Typography variant="body1" color="text.secondary" sx={{ mb: 4, fontSize: '1.1rem' }}>
                  Upload any document – from PDFs and images to scanned forms –
                  and transform them into structured, actionable data with our
                  advanced AI-powered document analysis tool.
                </Typography>
                
                <Box sx={{ display: 'flex', gap: 2, mb: 6 }}>
                  <Button 
                    variant="contained" 
                    size="large"
                    sx={{
                      borderRadius: '50px',
                      px: 4,
                      py: 1.5,
                      background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                      boxShadow: `0 8px 20px rgba(${parseInt(theme.palette.primary.main.slice(1, 3), 16)}, ${parseInt(theme.palette.primary.main.slice(3, 5), 16)}, ${parseInt(theme.palette.primary.main.slice(5, 7), 16)}, 0.3)`,
                      '&:hover': {
                        background: `linear-gradient(90deg, ${theme.palette.primary.dark} 0%, ${theme.palette.secondary.dark} 100%)`,
                      }
                    }}
                  >
                    Try It Now
                  </Button>
                  <Button 
                    variant="outlined" 
                    size="large"
                    sx={{
                      borderRadius: '50px',
                      px: 4,
                      py: 1.5,
                      borderColor: theme.palette.primary.main,
                      color: theme.palette.primary.main,
                      '&:hover': {
                        borderColor: theme.palette.primary.dark,
                        background: 'rgba(78, 54, 255, 0.05)',
                      }
                    }}
                  >
                    Learn More
                  </Button>
                </Box>
                
                {/* Stats */}
                <Grid container spacing={3}>
                  <Grid item xs={3}>
                    <SectionTransition.Item delay={0.1}>
                      <Box textAlign="center">
                        <Typography variant="h4" color="primary.main" fontWeight="bold">
                          15+
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Document Types
                        </Typography>
                      </Box>
                    </SectionTransition.Item>
                  </Grid>
                  
                  <Grid item xs={3}>
                    <SectionTransition.Item delay={0.2}>
                      <Box textAlign="center">
                        <AnimatedCounter
                          end={98}
                          suffix="%"
                          variant="h4"
                          color="primary.main"
                          fontWeight="bold"
                          duration={2}
                        />
                        <Typography variant="body2" color="text.secondary">
                          Accuracy Rate
                        </Typography>
                      </Box>
                    </SectionTransition.Item>
                  </Grid>
                  
                  <Grid item xs={3}>
                    <SectionTransition.Item delay={0.3}>
                      <Box textAlign="center">
                        <Typography variant="h4" color="primary.main" fontWeight="bold">
                          &lt;5s
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Processing Time
                        </Typography>
                      </Box>
                    </SectionTransition.Item>
                  </Grid>
                  
                  <Grid item xs={3}>
                    <SectionTransition.Item delay={0.4}>
                      <Box textAlign="center">
                        <Typography variant="h4" color="primary.main" fontWeight="bold">
                          10k+
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Satisfied Users
                        </Typography>
                      </Box>
                    </SectionTransition.Item>
                  </Grid>
                </Grid>
              </SectionTransition>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <SectionTransition direction="right">
                <Box
                  sx={{
                    borderRadius: 4,
                    border: '2px dashed rgba(0,0,0,0.1)',
                    p: 6,
                    backgroundColor: '#fff',
                    textAlign: 'center',
                    boxShadow: '0 8px 30px rgba(0,0,0,0.05)',
                  }}
                >
                  <Box
                    component="img"
                    src="/upload-icon.svg"
                    alt="Upload"
                    sx={{
                      width: 80,
                      height: 80,
                      mb: 3,
                      opacity: 0.7,
                    }}
                  />
                  
                  <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
                    Drag & Drop your document here
                  </Typography>
                  
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                    or click to browse from your computer
                  </Typography>
                  
                  <Button
                    variant="outlined"
                    sx={{
                      borderRadius: '50px',
                      px: 3,
                      py: 1,
                      borderColor: theme.palette.primary.main,
                      color: theme.palette.primary.main,
                      mb: 4,
                      '&:hover': {
                        borderColor: theme.palette.primary.dark,
                        background: 'rgba(78, 54, 255, 0.05)',
                      }
                    }}
                    startIcon={<Box component="span" sx={{ fontSize: '1.2rem' }}>📁</Box>}
                  >
                    Select File
                  </Button>
                  
                  <Typography variant="caption" color="text.secondary">
                    Supports PDF, Word, Images, and Text files
                  </Typography>
                </Box>
              </SectionTransition>
              
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                  <Box
                    component="span"
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      mr: 2,
                      color: 'text.secondary',
                      fontSize: '0.9rem',
                    }}
                  >
                    <Box
                      component="img"
                      src="/pdf-icon.svg"
                      alt="PDF"
                      sx={{ width: 24, height: 24, mr: 0.5 }}
                    />
                    PDF
                  </Box>
                  
                  <Box
                    component="span"
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      mr: 2,
                      color: 'text.secondary',
                      fontSize: '0.9rem',
                    }}
                  >
                    <Box
                      component="img"
                      src="/image-icon.svg"
                      alt="Images"
                      sx={{ width: 24, height: 24, mr: 0.5 }}
                    />
                    Images
                  </Box>
                  
                  <Box
                    component="span"
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      mr: 2,
                      color: 'text.secondary',
                      fontSize: '0.9rem',
                    }}
                  >
                    <Box
                      component="img"
                      src="/doc-icon.svg"
                      alt="Documents"
                      sx={{ width: 24, height: 24, mr: 0.5 }}
                    />
                    Documents
                  </Box>
                  
                  <Box
                    component="span"
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      color: 'text.secondary',
                      fontSize: '0.9rem',
                    }}
                  >
                    <Box
                      component="img"
                      src="/text-icon.svg"
                      alt="Text Files"
                      sx={{ width: 24, height: 24, mr: 0.5 }}
                    />
                    Text Files
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
      
      {/* Features Section */}
      <Box 
        sx={{ 
          py: { xs: 10, md: 14 },
          background: '#fff',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="lg">
          <Box textAlign="center" sx={{ mb: 8 }}>
            <SectionTransition>
              <Typography 
                variant="h2" 
                fontWeight="bold"
                sx={{ 
                  mb: 3,
                  background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Powerful Features
              </Typography>
              
              <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto' }}>
                Our document analysis tool combines cutting-edge AI with a user-
                friendly interface to extract maximum value from your documents.
              </Typography>
            </SectionTransition>
          </Box>
          
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <SectionTransition direction="up" delay={0.1}>
                <Card 
                  elevation={0}
                  sx={{ 
                    p: 4, 
                    height: '100%',
                    borderRadius: 4,
                    border: '1px solid rgba(0,0,0,0.05)',
                    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: '0 15px 30px rgba(0,0,0,0.1)'
                    }
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: 70,
                      height: 70,
                      borderRadius: '20px',
                      background: 'rgba(78, 54, 255, 0.1)',
                      mb: 3,
                    }}
                  >
                    <Box
                      component="img"
                      src="/format-icon.svg"
                      alt="Multi-Format"
                      sx={{ width: 40, height: 40 }}
                    />
                  </Box>
                  
                  <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
                    Multi-Format Support
                  </Typography>
                  
                  <Typography variant="body2" color="text.secondary">
                    Process PDFs, images, Word documents, and scanned files with ease.
                  </Typography>
                </Card>
              </SectionTransition>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <SectionTransition direction="up" delay={0.2}>
                <Card 
                  elevation={0}
                  sx={{ 
                    p: 4, 
                    height: '100%',
                    borderRadius: 4,
                    border: '1px solid rgba(0,0,0,0.05)',
                    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: '0 15px 30px rgba(0,0,0,0.1)'
                    }
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: 70,
                      height: 70,
                      borderRadius: '20px',
                      background: 'rgba(78, 54, 255, 0.1)',
                      mb: 3,
                    }}
                  >
                    <Box
                      component="img"
                      src="/ai-icon.svg"
                      alt="AI Analysis"
                      sx={{ width: 40, height: 40 }}
                    />
                  </Box>
                  
                  <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
                    AI-Powered Analysis
                  </Typography>
                  
                  <Typography variant="body2" color="text.secondary">
                    Advanced Gemini Pro Vision AI extracts meaning and structure from any document.
                  </Typography>
                </Card>
              </SectionTransition>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <SectionTransition direction="up" delay={0.3}>
                <Card 
                  elevation={0}
                  sx={{ 
                    p: 4, 
                    height: '100%',
                    borderRadius: 4,
                    border: '1px solid rgba(0,0,0,0.05)',
                    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: '0 15px 30px rgba(0,0,0,0.1)'
                    }
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: 70,
                      height: 70,
                      borderRadius: '20px',
                      background: 'rgba(78, 54, 255, 0.1)',
                      mb: 3,
                    }}
                  >
                    <Box
                      component="img"
                      src="/lightning-icon.svg"
                      alt="Fast"
                      sx={{ width: 40, height: 40 }}
                    />
                  </Box>
                  
                  <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
                    Lightning Fast
                  </Typography>
                  
                  <Typography variant="body2" color="text.secondary">
                    Get results in seconds, not minutes, with our optimized processing pipeline.
                  </Typography>
                </Card>
              </SectionTransition>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <SectionTransition direction="up" delay={0.4}>
                <Card 
                  elevation={0}
                  sx={{ 
                    p: 4, 
                    height: '100%',
                    borderRadius: 4,
                    border: '1px solid rgba(0,0,0,0.05)',
                    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: '0 15px 30px rgba(0,0,0,0.1)'
                    }
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: 70,
                      height: 70,
                      borderRadius: '20px',
                      background: 'rgba(78, 54, 255, 0.1)',
                      mb: 3,
                    }}
                  >
                    <Box
                      component="img"
                      src="/search-icon.svg"
                      alt="Search"
                      sx={{ width: 40, height: 40 }}
                    />
                  </Box>
                  
                  <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
                    Smart Search
                  </Typography>
                  
                  <Typography variant="body2" color="text.secondary">
                    Quickly find specific information within extracted data using intelligent search.
                  </Typography>
                </Card>
              </SectionTransition>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <SectionTransition direction="up" delay={0.5}>
                <Card 
                  elevation={0}
                  sx={{ 
                    p: 4, 
                    height: '100%',
                    borderRadius: 4,
                    border: '1px solid rgba(0,0,0,0.05)',
                    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: '0 15px 30px rgba(0,0,0,0.1)'
                    }
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: 70,
                      height: 70,
                      borderRadius: '20px',
                      background: 'rgba(78, 54, 255, 0.1)',
                      mb: 3,
                    }}
                  >
                    <Box
                      component="img"
                      src="/security-icon.svg"
                      alt="Security"
                      sx={{ width: 40, height: 40 }}
                    />
                  </Box>
                  
                  <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
                    Data Security
                  </Typography>
                  
                  <Typography variant="body2" color="text.secondary">
                    Your documents are processed securely and never stored without your permission.
                  </Typography>
                </Card>
              </SectionTransition>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <SectionTransition direction="up" delay={0.6}>
                <Card 
                  elevation={0}
                  sx={{ 
                    p: 4, 
                    height: '100%',
                    borderRadius: 4,
                    border: '1px solid rgba(0,0,0,0.05)',
                    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: '0 15px 30px rgba(0,0,0,0.1)'
                    }
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: 70,
                      height: 70,
                      borderRadius: '20px',
                      background: 'rgba(78, 54, 255, 0.1)',
                      mb: 3,
                    }}
                  >
                    <Box
                      component="img"
                      src="/output-icon.svg"
                      alt="Output"
                      sx={{ width: 40, height: 40 }}
                    />
                  </Box>
                  
                  <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
                    Structured Output
                  </Typography>
                  
                  <Typography variant="body2" color="text.secondary">
                    Convert unstructured content into organized actionable data automatically.
                  </Typography>
                </Card>
              </SectionTransition>
            </Grid>
          </Grid>
        </Container>
      </Box>
      
      {/* CTA Section */}
      <Box 
        sx={{ 
          py: { xs: 10, md: 14 },
          background: '#f8faff',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="md">
          <SectionTransition>
            <Box textAlign="center">
              <TextSplitReveal
                text="Ready to Extract Document Insights?"
                variant="h2"
                fontWeight="bold" 
                splitBy="words"
                effect="slide"
                sx={{ 
                  mb: 3,
                  background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              />
              
              <Typography variant="body1" color="text.secondary" sx={{ mb: 6, maxWidth: 700, mx: 'auto' }}>
                Try our powerful document analysis tool today and transform the way 
                you handle documents, forms, and data extraction.
              </Typography>
              
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                <Button 
                  variant="contained" 
                  size="large"
                  sx={{
                    borderRadius: '50px',
                    px: 4,
                    py: 1.5,
                    background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                    boxShadow: `0 8px 20px rgba(${parseInt(theme.palette.primary.main.slice(1, 3), 16)}, ${parseInt(theme.palette.primary.main.slice(3, 5), 16)}, ${parseInt(theme.palette.primary.main.slice(5, 7), 16)}, 0.3)`,
                    '&:hover': {
                      background: `linear-gradient(90deg, ${theme.palette.primary.dark} 0%, ${theme.palette.secondary.dark} 100%)`,
                    }
                  }}
                >
                  Try It Now
                </Button>
                <Button 
                  variant="outlined" 
                  size="large"
                  sx={{
                    borderRadius: '50px',
                    px: 4,
                    py: 1.5,
                    borderColor: theme.palette.primary.main,
                    color: theme.palette.primary.main,
                    '&:hover': {
                      borderColor: theme.palette.primary.dark,
                      background: 'rgba(78, 54, 255, 0.05)',
                    }
                  }}
                >
                  Learn More
                </Button>
              </Box>
            </Box>
          </SectionTransition>
        </Container>
      </Box>
    </Box>
  );
}