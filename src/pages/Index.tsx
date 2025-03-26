
import React from 'react';
import { motion } from 'framer-motion';
import LandAreaConverter from '../components/LandAreaConverter';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-notion-background">
      <motion.div 
        className="w-full max-w-4xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <LandAreaConverter />
        
        <motion.div 
          className="mt-8 text-center text-notion-textSecondary text-xs"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <p>Precisely convert between land area units with this elegant calculator</p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Index;
