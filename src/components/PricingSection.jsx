'use client';

import { Box, Container, Typography, Grid, Card, Button, Divider } from '@mui/material';
import { motion } from 'framer-motion';

const SectionTransition = ({ children, delay = 0 }) => {
  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay }}
      viewport={{ once: true }}
    >
      {children}
    </Box>
  );
};

export default function PricingSection() {
  const plans = [
    {
      title: 'Starter Plan',
      price: '₹25,000',
      period: '/month',
      description: "Perfect for small legal practices just getting started with automation.",
      features: [
        'Up to 200 files/month',
        '3 user accounts',
        'AI drafting + task management',
        'Basic invoicing',
        'Email support',
      ],
      primary: false,
      cta: 'Get Started',
    },
    {
      title: 'Professional Plan',
      price: '₹60,000',
      period: '/month',
      description: "Our most popular option for growing legal agencies.",
      features: [
        'Up to 1,000 files/month',
        'Unlimited users',
        'Multi-client configuration',
        'Advanced analytics dashboard',
        'Premium invoice tracking',
        'Priority support',
      ],
      primary: true,
      cta: 'Get Started',
      recommended: true,
    },
    {
      title: 'Enterprise Plan',
      price: 'Custom',
      period: '',
      description: "Tailored solutions for large-scale legal operations.",
      features: [
        'Unlimited files',
        'SLA-based support',
        'On-premise deployment available',
        'API integration with NBFC CRMs',
        'Dedicated account manager',
        'Custom workflow development',
      ],
      primary: false,
      cta: 'Contact Sales',
    },
  ];

  return (
    <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: '#F9FAFB' }}>
      <Container maxWidth="xl">
        <SectionTransition>
          <Typography
            variant="h6"
            color="#4F46E5"
            sx={{ 
              mb: 2, 
              fontWeight: 600, 
              textAlign: 'center',
              letterSpacing: '1px',
              textTransform: 'uppercase'
            }}
          >
            PRICING PLANS
          </Typography>
          <Typography
            variant="h3"
            sx={{ 
              mb: 3, 
              fontWeight: 700, 
              textAlign: 'center',
              fontSize: { xs: '2rem', md: '2.5rem' }
            }}
          >
            Choose the Plan That Fits Your Agency
          </Typography>
          <Typography
            variant="body1"
            color="#6B7280"
            sx={{ 
              mb: 8, 
              maxWidth: 700, 
              mx: 'auto', 
              textAlign: 'center',
              fontSize: '1.125rem',
              lineHeight: 1.6
            }}
          >
            Flexible pricing designed to scale with your legal agency's needs, from small teams to enterprise operations.
          </Typography>
        </SectionTransition>

        <Grid container spacing={4} sx={{ display: "flex", justifyContent: "center" }}>
          {plans.map((plan, index) => (
            <Grid item xs={12} md={4} key={index}>
              <SectionTransition delay={index * 0.1}>
                <Card
                  sx={{
                    height: '100%',
                    minHeight: 580,
                    width: '100%',
                    maxWidth: 400,
                    mx: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    bgcolor: plan.primary ? '#4F46E5' : 'white',
                    color: plan.primary ? 'white' : '#1F2937',
                    borderRadius: 3,
                    boxShadow: plan.primary 
                      ? '0 10px 25px rgba(79,70,229,0.35)' 
                      : '0 4px 12px rgba(0,0,0,0.08)',
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    '&:hover': { 
                      transform: 'translateY(-8px)',
                      boxShadow: plan.primary 
                        ? '0 15px 30px rgba(79,70,229,0.45)' 
                        : '0 10px 25px rgba(0,0,0,0.12)',
                    },
                  }}
                >
                  {plan.recommended && (
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 20,
                        right: -35,
                        transform: 'rotate(45deg)',
                        bgcolor: '#FCD34D',
                        color: '#1F2937',
                        py: 0.5,
                        px: 4,
                        fontWeight: 600,
                        fontSize: '0.75rem',
                        letterSpacing: '0.5px',
                        textTransform: 'uppercase',
                        width: 150,
                        textAlign: 'center',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                      }}
                    >
                      Recommended
                    </Box>
                  )}

                  <Box sx={{ p: 4 }}>
                    <Typography 
                      variant="h5" 
                      fontWeight="700" 
                      sx={{ mb: 2 }}
                    >
                      {plan.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        mb: 3,
                        opacity: 0.9,
                        minHeight: 48,
                      }}
                    >
                      {plan.description}
                    </Typography>
                    <Typography 
                      variant="h3" 
                      fontWeight="800" 
                      sx={{ mb: 1 }}
                    >
                      {plan.price}
                      <Typography 
                        component="span" 
                        variant="h6" 
                        sx={{ 
                          fontWeight: 'normal',
                          opacity: 0.8,
                          ml: 0.5
                        }}
                      >
                        {plan.period}
                      </Typography>
                    </Typography>
                  </Box>

                  <Divider sx={{ 
                    borderColor: plan.primary ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.08)',
                    width: '100%'
                  }} />

                  <Box sx={{ p: 4, flexGrow: 1 }}>
                    <Typography 
                      variant="subtitle2" 
                      sx={{ 
                        mb: 2.5,
                        opacity: 0.9,
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                      }}
                    >
                      What's included:
                    </Typography>
                    <Box sx={{ mb: 4 }}>
                      {plan.features.map((feature, i) => (
                        <Box 
                          key={i} 
                          sx={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            mb: 2 
                          }}
                        >
                          <Box
                            sx={{
                              width: 24,
                              height: 24,
                              borderRadius: '50%',
                              bgcolor: plan.primary ? 'rgba(255,255,255,0.9)' : '#EEF2FF',
                              color: plan.primary ? '#4F46E5' : '#4F46E5',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              mr: 2,
                              fontSize: '0.9rem',
                              fontWeight: 'bold',
                              flexShrink: 0,
                            }}
                          >
                            ✓
                          </Box>
                          <Typography variant="body2" sx={{ lineHeight: 1.4 }}>
                            {feature}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  </Box>

                  <Box sx={{ p: 4, pt: 0 }}>
                    <Button
                      variant={plan.primary ? 'contained' : 'outlined'}
                      size="large"
                      sx={{
                        width: '100%',
                        py: 1.5,
                        borderRadius: 2,
                        fontWeight: 600,
                        textTransform: 'none',
                        fontSize: '1rem',
                        borderColor: plan.primary ? 'white' : '#4F46E5',
                        color: plan.primary ? '#4F46E5' : '#4F46E5',
                        bgcolor: plan.primary ? 'white' : 'transparent',
                        '&:hover': {
                          bgcolor: plan.primary ? 'rgba(255,255,255,0.9)' : 'rgba(79,70,229,0.08)',
                          borderColor: plan.primary ? 'white' : '#4F46E5',
                        },
                      }}
                    >
                      {plan.cta}
                    </Button>
                  </Box>
                </Card>
              </SectionTransition>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}