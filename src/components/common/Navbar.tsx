'use client';
import React, { useState, useEffect, useRef } from 'react';
import { KeyboardEvent, MouseEvent } from 'react';
import {
  AppBar,
  Box,
  Button,
  Container,
  Paper,
  Toolbar,
  useScrollTrigger,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

// API Suite dropdown items
const apiSuiteItems = [
  {
    category: 'IDENTITY VERIFICATION',
    items: [
      { name: 'Aadhaar Via Digilocker', href: '#' },
      { name: 'Driving License Verification', href: '#' },
      { name: 'PAN Card Verification', href: '#' },
      { name: 'Passport Verification', href: '#' },
      { name: 'Voter ID Verification', href: '#' },
      { name: 'PAN Name DoB', href: '#' },
    ]
  },
  {
    category: 'UTILITIES',
    items: [
      { name: 'Electricity Bill API', href: '#' },
      { name: 'RC Verification', href: '#' },
      { name: 'Stolen Vehicle Verification', href: '#' },
      { name: 'Email Verification', href: '#' },
      { name: 'Tenant Registraton', href: '#' },
    ]
  },
  {
    category: 'ENTITY/BUSINESS LEVEL',
    items: [
      { name: 'DIN', href: '#' },
      { name: 'Udyog Aadhaar', href: '#' },
      { name: 'TIN Search', href: '#' },
      { name: 'GSTIN', href: '#' },
      { name: 'Udyog Aadhaar via Phone', href: '#' },
    ]
  },
  {
    category: 'EMPLOYMENT',
    items: [
      { name: 'UAN Verification', href: '#' },
      { name: 'EPFO Verification', href: '#' },
      { name: 'CV Validation', href: '#' },
      { name: 'Dual Employment Check', href: '#' },
      { name: 'Employment Default Check', href: '#' },
    ]
  },
  {
    category: 'BANKING & PAYMENTS',
    items: [
      { name: 'Bank Statment Analysis', href: '#' },
      { name: 'UPI Handle Verifcation', href: '#' },
      { name: 'Experian Credit Report', href: '#' },
      { name: 'Address Verification', href: '#' },
    ]
  },
  {
    category: 'FRAUD DETECTION',
    items: [
      { name: 'Face API Verification', href: '#' },
      { name: 'Liveness Check', href: '#' },
      { name: 'Court Check', href: '#' },
      { name: 'Defaulting Director Check', href: '#' },
      { name: 'Global Sanctions Check', href: '#' },
    ]
  },
  {
    category: 'PROFESSIONAL',
    items: [
      { name: 'Insurance Agent Verification', href: '#' },
      { name: 'Nurses Verification', href: '#' },
      { name: 'Medical Document Validation', href: '#' },
      { name: 'Medical Opinion Validation', href: '#' },
      { name: 'ICSI Verification', href: '#' },
    ]
  },
];

function Navbar() {
  const [apiMenuOpen, setApiMenuOpen] = useState(false);
  const apiButtonRef = useRef(null);
  const menuRef = useRef(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef(null);
  
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 50,
  });

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Enhanced API Suite dropdown behavior
  const handleMouseEnterApiButton = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setApiMenuOpen(true);
  };

  const handleMouseEnterDropdown = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const handleMouseLeaveApiButton = (event: MouseEvent<HTMLElement>): void => {
    timeoutRef.current = setTimeout(() => {
      setApiMenuOpen(false);
    }, 300);
  };

  const handleMouseLeaveDropdown = (event: MouseEvent<HTMLElement>): void => {
    timeoutRef.current = setTimeout(() => {
      setApiMenuOpen(false);
    }, 300);
  };

  // Clear timeout when component unmounts
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleToggleApiMenu = () => {
    setApiMenuOpen((prevOpen) => !prevOpen);
  };

  function handleListKeyDown(event: KeyboardEvent<HTMLUListElement>): void {
    if (event.key === 'Tab') {
      event.preventDefault();
      setApiMenuOpen(false);
    } else if (event.key === 'Escape') {
      setApiMenuOpen(false);
    }
  }

  // Animation variants for dropdown menu
  const dropdownVariants = {
    hidden: { 
      opacity: 0,
      y: -20,
      height: 0,
      transition: { duration: 0.3, ease: "easeInOut" }
    },
    visible: { 
      opacity: 1,
      y: 0,
      height: "auto",
      transition: { 
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  // Animation variants for category items
  const categoryItemVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.3, staggerChildren: 0.05 }
    }
  };

  // Animation variants for individual menu items
  const menuItemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.2 }
    }
  };

  return (
    <>
      <AppBar 
        position="fixed" 
        elevation={0}
        sx={{
          background: scrolled 
            ? 'rgba(255, 255, 255, 0.95)' 
            : 'transparent',
          backdropFilter: scrolled ? 'blur(10px)' : 'none',
          boxShadow: scrolled 
            ? '0 4px 20px rgba(0, 0, 0, 0.05)' 
            : 'none',
          transition: 'all 0.3s ease',
          color: scrolled ? 'text.primary' : 'white',
          zIndex: 1200
        }}
      >
        <Container maxWidth="xl">
          <Toolbar 
            disableGutters 
            sx={{ 
              py: 1,
              justifyContent: 'center', // Center the API Suite button
              minHeight: '70px'
            }}
          >
            {/* API Suite dropdown button - centered */}
            <Box 
              ref={containerRef} 
              sx={{ position: 'relative' }}
            >
              <motion.div
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2 }}
              >
                <Button
                  ref={apiButtonRef}
                  variant="text"
                  onClick={handleToggleApiMenu}
                  onMouseEnter={handleMouseEnterApiButton}
                  onMouseLeave={handleMouseLeaveApiButton}
                  endIcon={apiMenuOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                  sx={{
                    fontWeight: 'bold',
                    fontSize: '16px',
                    color: scrolled ? 'text.primary' : 'white',
                    '&:hover': {
                      background: 'transparent',
                      color: scrolled ? 'primary.main' : 'rgba(255,255,255,0.8)',
                    },
                    px: 3, // Add more horizontal padding
                    py: 1.5, // Add more vertical padding
                  }}
                >
                  API Suite
                </Button>
              </motion.div>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      
      {/* API Dropdown Menu */}
      <AnimatePresence>
        {apiMenuOpen && (
          <motion.div
            key="api-dropdown"
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            ref={menuRef}
            onMouseEnter={handleMouseEnterDropdown}
            onMouseLeave={handleMouseLeaveDropdown}
            style={{
              position: 'fixed',
              top: '70px', // Adjusted to match navbar height
              left: 0,
              right: 0,
              zIndex: 1100,
              overflow: 'hidden'
            }}
          >
            <Container maxWidth="xl">
              <Paper
                elevation={3}
                sx={{ 
                  width: '100%',
                  mt: 0,
                  p: 3,
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 4,
                  borderRadius: '0 0 12px 12px',
                  borderTop: 'none',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
                }}
              >
                <Box sx={{ width: '100%', display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                  {apiSuiteItems.map((category, index) => (
                    <motion.div
                      key={index}
                      custom={index}
                      variants={categoryItemVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <Box sx={{ minWidth: '200px', flex: '1 1 auto' }}>
                        <Box sx={{ 
                          color: 'primary.main', 
                          mb: 2, 
                          fontWeight: 'bold', 
                          fontSize: '0.85rem',
                          borderBottom: '2px solid rgba(78, 54, 255, 0.2)',
                          pb: 0.5
                        }}>
                          {category.category}
                        </Box>
                        {category.items.map((item, idx) => (
                          <motion.div
                            key={idx}
                            custom={idx}
                            variants={menuItemVariants}
                            whileHover={{ 
                              x: 5,
                              color: 'primary.main',
                              transition: { duration: 0.2 }
                            }}
                          >
                            <Link href={item.href} passHref style={{ textDecoration: 'none' }}>
                              <Box
                                component="div"
                                sx={{
                                  mb: 1.5,
                                  color: 'text.primary',
                                  '&:hover': { color: 'primary.main' },
                                  cursor: 'pointer',
                                  fontSize: '0.95rem',
                                  transition: 'all 0.2s ease'
                                }}
                              >
                                {item.name}
                              </Box>
                            </Link>
                          </motion.div>
                        ))}
                      </Box>
                    </motion.div>
                  ))}
                </Box>
              </Paper>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;