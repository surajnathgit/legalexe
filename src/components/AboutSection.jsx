'use client';

import { Box, Container, Typography, Grid, Card, CardContent } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';

// Animation Components
const SectionTransition = ({ children, direction = "up", delay = 0 }) => {
  const variants = {
    hidden: { 
      opacity: 0, 
      x: direction === "left" ? -50 : direction === "right" ? 50 : 0,
      y: direction === "up" ? 50 : direction === "down" ? -50 : 0
    },
    visible: { 
      opacity: 1, 
      x: 0, 
      y: 0,
      transition: { duration: 0.7, delay, ease: "easeOut" }
    }
  };

  return (
    <Box
      component={motion.div}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={variants}
    >
      {children}
    </Box>
  );
};

SectionTransition.Item = ({ children, delay = 0 }) => {
  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
    >
      {children}
    </Box>
  );
};

const TextSplitReveal = ({ text, variant, effect = "slide", splitBy = "words", ...props }) => {
  const words = text.split(' ');
  
  return (
    <Typography variant={variant} {...props}>
      {splitBy === "words" ? words.map((word, i) => (
        <Box
          key={i}
          component={motion.span}
          sx={{ display: 'inline-block', mx: '0.15em', overflow: 'hidden' }}
        >
          <Box
            component={motion.span}
            initial={{ opacity: 0, y: effect === "slide" ? 20 : 0, scale: effect === "scale" ? 0.9 : 1 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            viewport={{ once: true }}
            sx={{ display: 'inline-block' }}
          >
            {word}
          </Box>
        </Box>
      )) : 
      text.split('').map((char, i) => (
        <Box
          key={i}
          component={motion.span}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: i * 0.05 }}
          viewport={{ once: true }}
          sx={{ display: 'inline-block' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </Box>
      ))}
    </Typography>
  );
};

const FloatingElement = ({ children, yOffset = 10, duration = 4, delay = 0 }) => {
  return (
    <Box
      component={motion.div}
      initial={{ y: 0 }}
      animate={{ y: [0, -yOffset, 0] }}
      transition={{
        repeat: Infinity,
        duration,
        delay,
        ease: "easeInOut"
      }}
    >
      {children}
    </Box>
  );
};

const MorphingShape = ({ color, secondaryColor, size = 200, speed = 10 }) => {
  return (
    <Box
      component={motion.div}
      initial={{ 
        borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
        background: color,
      }}
      animate={{ 
        borderRadius: [
          '30% 70% 70% 30% / 30% 30% 70% 70%',
          '60% 40% 30% 70% / 60% 30% 70% 40%',
          '40% 60% 70% 30% / 40% 40% 60% 60%',
          '30% 70% 70% 30% / 30% 30% 70% 70%'
        ],
        background: [color, secondaryColor, color, secondaryColor]
      }}
      transition={{ 
        duration: speed,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      sx={{
        width: size,
        height: size,
      }}
    />
  );
};

const AnimatedCounter = ({ end, suffix = "", prefix = "", duration = 2, ...props }) => {
  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Typography {...props}>
        {prefix}
        <Box
          component={motion.span}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {end}
        </Box>
        {suffix}
      </Typography>
    </Box>
  );
};

export default function AboutSection() {
  const theme = useTheme();

  return (
    <Box 
      id="about" 
      sx={{ 
        py: { xs: 10, md: 14 },
        position: 'relative',
        overflow: 'hidden',
        bgcolor: '#FFFFFF',
      }}
    >
      {/* Decorative elements */}
      <Box sx={{ position: 'absolute', right: '-5%', bottom: '-5%', zIndex: 0, opacity: 0.15 }}>
        <MorphingShape
          color="#4F46E5"
          secondaryColor="#6366F1"
          size={300}
          speed={15}
        />
      </Box>
      
      <Box sx={{ position: 'absolute', left: '-8%', top: '20%', zIndex: 0, opacity: 0.1 }}>
        <MorphingShape
          color="#6366F1"
          secondaryColor="#4F46E5"
          size={350}
          speed={18}
        />
      </Box>
      
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <SectionTransition direction="left">
              <Typography 
                variant="h6" 
                color="#4F46E5"
                sx={{ mb: 2, fontWeight: 'bold' }}
              >
                BUILT FOR LEGAL AGENCIES
              </Typography>
              
              <TextSplitReveal
                text="Not Just Software – Your AI-Powered Legal Employee"
                variant="h3"
                fontWeight="bold" 
                splitBy="words"
                effect="slide"
                sx={{ 
                  mb: 3,
                  background: 'linear-gradient(90deg, #4F46E5 0%, #6366F1 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              />
              
              <Typography variant="body1" color="#6B7280" sx={{ mb: 4 }}>
                LegalExe is designed specifically for legal agencies working with NBFCs and banks, handling title scrutiny, property document verification, compliance tracking, legal report formatting, and litigation checks.
              </Typography>
              
              <Grid container spacing={3} sx={{ mb: 5 }}>
                <Grid item xs={12} sm={6}>
                  <SectionTransition.Item delay={0.1}>
                    <Card elevation={0} sx={{ background: 'rgba(79, 70, 229, 0.05)', p: 2, borderRadius: 3 }}>
                      <AnimatedCounter
                        end={50}
                        suffix="%"
                        variant="h4"
                        color="#4F46E5"
                        fontWeight="bold"
                        duration={2.5}
                      />
                      <Typography variant="body2" color="#6B7280">
                        Reduce operational cost
                      </Typography>
                    </Card>
                  </SectionTransition.Item>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <SectionTransition.Item delay={0.2}>
                    <Card elevation={0} sx={{ background: 'rgba(79, 70, 229, 0.05)', p: 2, borderRadius: 3 }}>
                      <AnimatedCounter
                        end={40}
                        suffix="%"
                        variant="h4"
                        color="#4F46E5"
                        fontWeight="bold"
                        duration={2.5}
                      />
                      <Typography variant="body2" color="#6B7280">
                        Faster legal opinions
                      </Typography>
                    </Card>
                  </SectionTransition.Item>
                </Grid>
              </Grid>
              
              <SectionTransition.Item delay={0.3}>
                <Box sx={{ mb: 4 }}>
                  <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
                    Key Benefits
                  </Typography>
                  <Grid container spacing={2}>
                    {[
                      'Reduce operational cost by up to 50%',
                      'Boost case capacity without increasing headcount',
                      'Deliver legal opinions 40% faster',
                      'Automate compliance tracking, escalation, and reminders',
                    ].map((item, index) => (
                      <Grid item xs={12} sm={6} key={index}>
                        <Box 
                          component={motion.div}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          viewport={{ once: true }}
                          sx={{ display: 'flex', alignItems: 'center', mb: 1 }}
                        >
                          <Box
                            sx={{
                              width: 24,
                              height: 24,
                              borderRadius: '50%',
                              bgcolor: '#4F46E5',
                              color: 'white',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              mr: 2,
                              flexShrink: 0,
                            }}
                          >
                            ✓
                          </Box>
                          <Typography variant="body2">{item}</Typography>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </SectionTransition.Item>
            </SectionTransition>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <SectionTransition direction="right" delay={0.2}>
                  <FloatingElement yOffset={10} duration={6}>
                    <Card 
                      elevation={6}
                      sx={{ 
                        borderRadius: 4,
                        overflow: 'visible',
                        background: 'linear-gradient(135deg, #4F46E5 0%, #6366F1 100%)',
                        color: 'white',
                        position: 'relative',
                        p: 1,
                        boxShadow: '0 20px 40px rgba(79, 70, 229, 0.3)',
                      }}
                    >
                      <CardContent sx={{ p: 4 }}>
                        <TextSplitReveal
                          text="AI-Powered Solution"
                          variant="h5"
                          fontWeight="bold"
                          sx={{ mb: 2 }}
                          effect="slide"
                          splitBy="chars"
                        />
                        <Typography variant="body1">
                          Our AI integration automates complex legal tasks with precision and reliability, allowing your team to focus on high-value work while maintaining complete compliance.
                        </Typography>
                      </CardContent>
                      <Box
                        component={motion.div}
                        whileHover={{ rotate: 15, scale: 1.1 }}
                        sx={{
                          position: 'absolute',
                          top: -30,
                          right: -20,
                          width: 80,
                          height: 80,
                          bgcolor: 'rgba(255,255,255,0.15)',
                          borderRadius: '50%',
                          backdropFilter: 'blur(8px)',
                          zIndex: -1,
                        }}
                      />
                    </Card>
                  </FloatingElement>
                </SectionTransition>
              </Grid>
              
              <Grid item xs={12}>
                <SectionTransition direction="right" delay={0.4}>
                  <FloatingElement yOffset={10} duration={6} delay={1}>
                    <Card 
                      elevation={3}
                      sx={{ 
                        borderRadius: 4,
                        border: '1px solid rgba(0,0,0,0.08)',
                        position: 'relative',
                        p: 1,
                        transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                        '&:hover': {
                          transform: 'translateY(-5px)',
                          boxShadow: '0 15px 30px rgba(0,0,0,0.1)'
                        }
                      }}
                    >
                      <CardContent sx={{ p: 4 }}>
                        <TextSplitReveal
                          text="24/7 Operation"
                          variant="h5"
                          fontWeight="bold"
                          sx={{ mb: 2 }}
                          effect="slide"
                          splitBy="chars"
                        />
                        <Typography variant="body1" color="#6B7280">
                          Unlike human employees, our AI solutions work around the clock, ensuring your legal processes run smoothly at all times without delays or interruptions.
                        </Typography>
                      </CardContent>
                      <Box
                        component={motion.div}
                        whileHover={{ rotate: -15, scale: 1.1 }}
                        sx={{
                          position: 'absolute',
                          bottom: -20,
                          left: -20,
                          width: 60,
                          height: 60,
                          background: 'linear-gradient(135deg, #4F46E5 0%, #6366F1 100%)',
                          borderRadius: '50%',
                          opacity: 0.2,
                          zIndex: -1,
                        }}
                      />
                    </Card>
                  </FloatingElement>
                </SectionTransition>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}