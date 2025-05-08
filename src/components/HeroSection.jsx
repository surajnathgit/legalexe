'use client';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Button, 
  useMediaQuery
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';

// Re-use animation components from AboutSection
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

// Line Animation Component
// const LinesBackground = () => {
//   const lines = Array.from({ length: 7 }, (_, i) => i);
//   const theme = useTheme();
  
//   return (
//     <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, overflow: 'hidden', zIndex: 0 }}>
//       {lines.map((line, index) => (
//         <Box
//           key={index}
//           component={motion.div}
//           initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
//           animate={{ 
//             opacity: [0.1, 0.2, 0.1], 
//             x: index % 2 === 0 ? [100, -100, 100] : [-100, 100, -100]
//           }}
//           transition={{ 
//             duration: 20 + index * 5, 
//             repeat: Infinity,
//             ease: "linear" 
//           }}
//           sx={{
//             position: 'absolute',
//             height: '1px',
//             width: '100%',
//             background: `linear-gradient(90deg, transparent, ${index % 2 === 0 ? '#4F46E5' : '#6366F1'}, transparent)`,
//             top: `${30 + index * 15}%`,
//           }}  
//         />
//       ))}
//     </Box>
//   );
// };

// LegalExe Logo with Gradient
const LegalExeLogo = ({ size = 60, isNavbar = false }) => {
  return (
    <motion.div
      initial={isNavbar ? { opacity: 1 } : { opacity: 0, scale: 0.8 }}
      animate={isNavbar ? { opacity: 1 } : { opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
    >
      <Box
        component="div"
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        {/* Logo Circle Background */}
        {!isNavbar && (
          <Box
            component={motion.div}
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            sx={{
              width: size * 1.5,
              height: size * 1.5,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #4F46E5 0%, #6366F1 100%)',
              opacity: 0.15,
              position: 'absolute',
              zIndex: 0,
            }}
          />
        )}
        
        {/* Logo Text */}
        <Typography
          variant={isNavbar ? "h6" : "h3"}
          component={motion.div}
          sx={{
            fontWeight: 'bold',
            position: 'relative',
            zIndex: 1,
            background: 'linear-gradient(90deg, #4F46E5 0%, #6366F1 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textFillColor: 'transparent',
          }}
        >
          LegalExe
        </Typography>
      </Box>
    </motion.div>
  );
};



// Hero Section Main Component
const HeroSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Hero animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 }
    }
  };

  return (
    <Box 
      component="section"
      id="hero" 
      sx={{ 
        pt: { xs: 5, md: 6 }, // Reduced top padding
        pb: { xs: 2, md: 2 },
        background: '#fff',
        position: 'relative',
        overflow: 'hidden',
        minHeight: '30vh',
        display: 'flex',
        alignItems: 'flex-start', // Align items to top
        justifyContent: 'center',
      }}
    >
        {/* Animated background lines */}
        {/* <LinesBackground />  */}
        
        {/* Morphing shapes - using the same colors as AboutSection */}
        <Box sx={{ position: 'absolute', right: '-5%', bottom: '10%', zIndex: 0, opacity: 0.15 }}>
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
        
        {/* Main content */}
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Grid 
            container 
            spacing={4} 
            alignItems="center" 
            justifyContent="center"
            component={motion.div}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <Grid item xs={12} textAlign="center">
              {/* Logo with animation */}
              <motion.div variants={itemVariants} style={{ marginBottom: '2rem' }}>
                <LegalExeLogo size={isMobile ? 40 : 60} />
              </motion.div>
              
              {/* Main heading */}
              <Box component={motion.div} variants={itemVariants}>
                <TextSplitReveal
                  text="India's First AI Platform for Legal Agencies"
                  variant="h2"
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
              </Box>
              
              {/* Subheading with floating animation */}
              <Box 
                component={motion.div} 
                variants={itemVariants}
                sx={{ maxWidth: 850, mx: 'auto', mb: 5 }}
              >
                <FloatingElement yOffset={8} duration={4}>
                  <Typography 
                    variant="body1" 
                    color="#6B7280"
                    sx={{ lineHeight: 1.6 }}
                  >
                    LegalExe is your full-time, always-on AI-powered legal assistant, built specifically for legal agencies working with NBFCs and banks. From title verifications to legal opinion drafting and invoicing, it replaces manual workflows with intelligent automation.
                  </Typography>
                </FloatingElement>
              </Box>
              
              {/* CTA Buttons */}
              <Box 
                component={motion.div} 
                variants={itemVariants}
                sx={{ 
                  display: 'flex', 
                  justifyContent: 'center', 
                  gap: 2,
                  flexWrap: { xs: 'wrap', sm: 'nowrap' } 
                }}
              >
                <Button 
                  component={motion.button}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  variant="contained" 
                  size="large"
                  sx={{ 
                    px: 4, 
                    py: 1.5,
                    borderRadius: 3,
                    background: 'linear-gradient(90deg, #4F46E5 0%, #6366F1 100%)',
                    boxShadow: '0 10px 20px rgba(79, 70, 229, 0.3)',
                  }}
                >
                  Get Started Today
                </Button>
                
                <Button 
                  component={motion.button}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  variant="outlined" 
                  size="large"
                  sx={{ 
                    px: 4, 
                    py: 1.5,
                    borderRadius: 3,
                    borderColor: '#4F46E5',
                    color: '#4F46E5',
                    '&:hover': {
                      borderColor: '#4F46E5',
                      background: 'rgba(79, 70, 229, 0.05)',
                    }
                  }}
                >
                  Watch Demo
                </Button>
              </Box>
              
              {/* Feature stats - styled to match AboutSection */}
              <Grid container spacing={3} sx={{ mt: 8, mb: 5, justifyContent: 'center' }}>
                <Grid item xs={12} md={10}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={4}>
                      <SectionTransition.Item delay={0.1}>
                        <Box sx={{ background: 'rgba(79, 70, 229, 0.05)', p: 2, borderRadius: 3 }}>
                          <AnimatedCounter
                            end={80}
                            suffix="%"
                            variant="h4"
                            color="#4F46E5"
                            fontWeight="bold"
                            duration={2.5}
                          />
                          <Typography variant="body2" color="#6B7280">
                            Cost reduction with AI automation
                          </Typography>
                        </Box>
                      </SectionTransition.Item>
                    </Grid>
                    
                    <Grid item xs={12} sm={4}>
                      <SectionTransition.Item delay={0.2}>
                        <Box sx={{ background: 'rgba(79, 70, 229, 0.05)', p: 2, borderRadius: 3 }}>
                          <AnimatedCounter
                            end={100}
                            suffix="%"
                            variant="h4"
                            color="#4F46E5"
                            fontWeight="bold"
                            duration={2.5}
                          />
                          <Typography variant="body2" color="#6B7280">
                            Accuracy in workflows
                          </Typography>
                        </Box>
                      </SectionTransition.Item>
                    </Grid>
                    
                    <Grid item xs={12} sm={4}>
                      <SectionTransition.Item delay={0.3}>
                        <Box sx={{ background: 'rgba(79, 70, 229, 0.05)', p: 2, borderRadius: 3 }}>
                          <Typography variant="h4" color="#4F46E5" fontWeight="bold">
                            24/7
                          </Typography>
                          <Typography variant="body2" color="#6B7280">
                            Operational availability
                          </Typography>
                        </Box>
                      </SectionTransition.Item>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            
            {/* Decorative elements */}
            <Box 
              component={motion.div}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.15, scale: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              sx={{
                position: 'absolute',
                right: '-10%',
                top: '15%',
                width: 300,
                height: 300,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #4F46E5 0%, #6366F1 100%)',
                filter: 'blur(70px)',
                zIndex: 0,
              }}
            />
            
            <Box 
              component={motion.div}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.1, scale: 1 }}
              transition={{ duration: 1, delay: 1 }}
              sx={{
                position: 'absolute',
                left: '-5%',
                bottom: '10%',
                width: 250,
                height: 250,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)',
                filter: 'blur(60px)',
                zIndex: 0,
              }}
            />
          </Grid>
        </Container>
      </Box>
  );
};

export default HeroSection;