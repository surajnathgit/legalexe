'use client';

import { Box, Container, Typography, Grid, Card, CardContent } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';

// Simplified Animation Component
const SectionTransition = ({ children, delay = 0 }) => {
  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </Box>
  );
};

// Simplified Text Animation
const TextSplitReveal = ({ text, variant, ...props }) => {
  return (
    <Typography variant={variant} {...props}>
      {text}
    </Typography>
  );
};

// Pulse animation for icons
const PulseIcon = ({ children }) => {
  return (
    <Box
      component={motion.div}
      animate={{ 
        scale: [1, 1.1, 1],
        opacity: [0.9, 1, 0.9],
      }}
      transition={{
        repeat: Infinity,
        duration: 3,
        ease: "easeInOut"
      }}
      sx={{ 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '1.5rem',
        width: 36,
        height: 36,
        borderRadius: '50%',
        background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.1) 0%, rgba(99, 102, 241, 0.2) 100%)',
      }}
    >
      {children}
    </Box>
  );
};

// Unified Card Component for all features
const UnifiedCard = ({ icon, title, description, delay, variant = 'feature' }) => {
  const isFeatureCard = variant === 'feature';
  
  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      viewport={{ once: true }}
      whileHover={{ 
        y: -4, 
        boxShadow: '0 8px 20px rgba(79, 70, 229, 0.15)',
        transition: { duration: 0.2 } 
      }}
      sx={{ height: '100%' }}
    >
      <Card
        elevation={0}
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          bgcolor: isFeatureCard ? 'white' : 'rgba(79, 70, 229, 0.03)',
          borderRadius: 2,
          border: `1px solid ${isFeatureCard ? 'rgba(0,0,0,0.05)' : 'rgba(79, 70, 229, 0.1)'}`,
          boxShadow: isFeatureCard 
            ? '0 4px 12px rgba(0,0,0,0.05)'
            : '0 4px 12px rgba(79, 70, 229, 0.05)',
          transition: 'all 0.3s ease-in-out',
          overflow: 'hidden',
        }}
      >        
        <CardContent sx={{ 
          p: 2, 
          '&:last-child': { pb: 2 },
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'space-between',
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <PulseIcon>
              {icon}
            </PulseIcon>
            {isFeatureCard && (
              <Typography 
                variant="subtitle1" 
                fontWeight="bold" 
                sx={{ 
                  ml: 1.5,
                  background: 'linear-gradient(90deg, #4F46E5 0%, #6366F1 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontSize: '0.9rem',
                }}
              >
                {title}
              </Typography>
            )}
          </Box>
          <Typography 
            variant="body2" 
            color="#6B7280" 
            sx={{ 
              fontSize: '0.8rem',
              ml: isFeatureCard ? 0 : 1.5,
              mt: isFeatureCard ? 0 : 0.5,
              flexGrow: 1,
            }}
          >
            {description}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default function FeaturesSection() {
  const theme = useTheme();

  const features = [
    {
      icon: '🧠',
      title: 'Smart OCR & Parsing',
      description: 'Extract structured data from property documents.',
    },
    {
      icon: '📄',
      title: 'AI Legal Opinion',
      description: 'Generate legal reports in multiple formats.',
    },
    {
      icon: '📍',
      title: 'Task Allocation',
      description: 'Auto-assign cases to best-suited advocates.',
    },
    {
      icon: '🔔',
      title: 'Predictive Alerts',
      description: 'Get notified of SLAs before they become issues.',
    },
    {
      icon: '✅',
      title: 'Checklist Validation',
      description: 'Auto-check uploads against NBFC requirements.',
    },
    {
      icon: '💼',
      title: 'Smart Invoicing',
      description: 'Auto-invoice with customizable formats.',
    },
  ];

  const invoicingFeatures = [
    {
      icon: '🧾',
      description: 'Custom Invoice Formats – Match NBFC templates',
    },
    {
      icon: '📥',
      description: 'Excel Export – Generate invoices instantly',
    },
    {
      icon: '📊',
      description: 'Invoice Tracking – Monitor billing and payments',
    },
  ];

  // Card dimensions
  const cardHeight = 100; // Fixed height for all cards

  return (
    <Box 
      sx={{ 
        py: { xs: 3, md: 5 }, 
        bgcolor: '#F9FAFB',
        position: 'relative',
        overflow: 'hidden',
        backgroundImage: 'radial-gradient(circle at 10% 20%, rgba(79, 70, 229, 0.03) 0%, transparent 30%)',
      }}
    >
      {/* Light decorative elements */}
      <Box
        sx={{
          position: 'absolute',
          top: '5%',
          right: '5%',
          width: 150,
          height: 150,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.05) 0%, transparent 70%)',
          zIndex: 0,
        }}
      />
      
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <SectionTransition>
          <Typography
            variant="subtitle1"
            color="#4F46E5"
            sx={{ mb: 0.5, fontWeight: 'bold', textAlign: 'center', fontSize: '0.85rem', letterSpacing: '0.05em' }}
          >
            KEY CAPABILITIES
          </Typography>
          
          <TextSplitReveal
            text="Let AI Do the Heavy Lifting"
            variant="h4"
            fontWeight="bold"
            sx={{ 
              mb: 1, 
              textAlign: 'center',
              background: 'linear-gradient(90deg, #4F46E5 0%, #6366F1 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent', 
              fontSize: { xs: '1.5rem', md: '1.8rem' }
            }}
          />
          
          <Typography
            variant="body2"
            color="#6B7280"
            sx={{ 
              mb: 2.5, 
              maxWidth: 600, 
              mx: 'auto', 
              textAlign: 'center',
              lineHeight: 1.5,
              fontSize: '0.9rem',
            }}
          >
            LegalExe uses advanced AI to optimize operations, letting you focus on accuracy while AI handles the rest.
          </Typography>
        </SectionTransition>
        
        {/* Feature cards - 3 cards per row on larger screens */}
        <Grid container spacing={2} justifyContent="center" sx={{ mb: 3 }}>
          {features.map((feature, index) => (
            <Grid item xs={6} sm={4} md={4} key={index}>
              <Box sx={{ height: cardHeight }}>
                <UnifiedCard 
                  icon={feature.icon} 
                  title={feature.title} 
                  description={feature.description} 
                  delay={index * 0.08}
                  variant="feature"
                />
              </Box>
            </Grid>
          ))}
        </Grid>
        
        <Box 
          component={motion.div}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          sx={{ 
            my: 2.5,
            mx: 'auto',
            width: '100%',
            maxWidth: 150,
            height: 1,
            background: 'linear-gradient(90deg, rgba(79, 70, 229, 0), rgba(79, 70, 229, 0.5), rgba(79, 70, 229, 0))'
          }}
        />
        
        <Box sx={{ textAlign: 'center' }}>
          <SectionTransition>
            <TextSplitReveal
              text="Smart Invoicing Made Easy"
              variant="h5"
              fontWeight="bold"
              sx={{ 
                mb: 1,
                background: 'linear-gradient(90deg, #4F46E5 0%, #6366F1 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontSize: { xs: '1.2rem', md: '1.4rem' }
              }}
            />
            
            <Typography
              variant="body2"
              color="#6B7280"
              sx={{ 
                mb: 2.5, 
                maxWidth: 500, 
                mx: 'auto',
                lineHeight: 1.5,
                fontSize: '0.9rem',
              }}
            >
              Auto-invoicing eliminates Excel-based chaos, ensuring accurate and timely billing.
            </Typography>
            
            <Grid container spacing={2} justifyContent="center">
              {invoicingFeatures.map((feature, index) => (
                <Grid item xs={12} sm={4} key={index}>
                  <Box sx={{ height: cardHeight }}>
                    <UnifiedCard 
                      icon={feature.icon} 
                      description={feature.description} 
                      delay={index * 0.1}
                      variant="invoice"
                    />
                  </Box>
                </Grid>
              ))}
            </Grid>
            
            <Box
              component={motion.div}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              sx={{ mt: 2.5 }}
            >
              <Typography 
                variant="body2" 
                sx={{ 
                  fontWeight: 'bold', 
                  color: '#4F46E5', 
                  display: 'inline-flex',
                  alignItems: 'center',
                  px: 2,
                  py: 1,
                  borderRadius: 3,
                  background: 'rgba(79, 70, 229, 0.08)',
                  cursor: 'pointer',
                  fontSize: '0.8rem',
                  boxShadow: '0 2px 8px rgba(79, 70, 229, 0.1)',
                  '&:hover': {
                    background: 'rgba(79, 70, 229, 0.12)',
                    boxShadow: '0 4px 12px rgba(79, 70, 229, 0.15)',
                    transform: 'translateY(-2px)',
                    transition: 'all 0.3s ease',
                  }
                }}
              >
                Learn more about invoicing
                <Box component="span" sx={{ display: 'inline-block', ml: 0.5 }}>→</Box>
              </Typography>
            </Box>
          </SectionTransition>
        </Box>
      </Container>
    </Box>
  );
}