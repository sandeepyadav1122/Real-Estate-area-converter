
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import UnitSelector, { AreaUnit } from './UnitSelector';
import RegionSelector, { Region, REGION_LABELS } from './RegionSelector';
import { ArrowRight, RotateCw, Info } from 'lucide-react';

// Standard conversion factors to square meters
const STANDARD_CONVERSION_FACTORS: Record<AreaUnit, number> = {
  sqft: 0.09290304,      // 1 sq ft = 0.09290304 sq m
  dismil: 40.46856422,   // 1 dismil = 40.46856422 sq m
  katha: 66.89,          // 1 katha = 66.89 sq m
  bigha: 1337.8,         // 1 bigha = 1337.8 sq m
  acre: 4046.86,         // 1 acre = 4046.86 sq m
  hectare: 10000,        // 1 hectare = 10000 sq m
  sqmeter: 1             // 1 sq m = 1 sq m
};

// Banka, Bihar specific conversion factors to square meters
// Based on: 1 Katha = 1,361.25 sq ft = 126.46 sq m
const BANKA_BIHAR_CONVERSION_FACTORS: Record<AreaUnit, number> = {
  sqft: 0.09290304,                 // 1 sq ft = 0.09290304 sq m
  dismil: 40.46856422,              // 1 dismil = 40.46856422 sq m (standard)
  katha: 126.46,                    // 1 katha = 1,361.25 sq ft = 126.46 sq m
  bigha: 2529.2,                    // 1 bigha = 20 kathas = 2529.2 sq m
  acre: 4046.86,                    // 1 acre = 43,560 sq ft = 4046.86 sq m
  hectare: 10000,                   // 1 hectare = 10000 sq m
  sqmeter: 1                        // 1 sq m = 1 sq m
};

const LandAreaConverter: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('1');
  const [inputUnit, setInputUnit] = useState<AreaUnit>('acre');
  const [outputUnit, setOutputUnit] = useState<AreaUnit>('sqft');
  const [outputValue, setOutputValue] = useState<string>('');
  const [selectedRegion, setSelectedRegion] = useState<Region>('standard');

  const getConversionFactors = useCallback(() => {
    return selectedRegion === 'banka_bihar' 
      ? BANKA_BIHAR_CONVERSION_FACTORS 
      : STANDARD_CONVERSION_FACTORS;
  }, [selectedRegion]);

  const convertValue = useCallback(() => {
    if (inputValue === '') return '';
    
    const numericValue = parseFloat(inputValue);
    if (isNaN(numericValue)) return 'Invalid Input';
    
    const conversionFactors = getConversionFactors();
    
    // Convert input to sq meters, then to output unit
    const valueInSqMeters = numericValue * conversionFactors[inputUnit];
    const result = valueInSqMeters / conversionFactors[outputUnit];
    
    // Format with appropriate precision
    return result.toLocaleString('en-US', {
      maximumFractionDigits: 6,
      minimumFractionDigits: result >= 1 ? 2 : 6
    });
  }, [inputValue, inputUnit, outputUnit, selectedRegion, getConversionFactors]);

  useEffect(() => {
    setOutputValue(convertValue());
  }, [inputValue, inputUnit, outputUnit, selectedRegion, convertValue]);

  const handleReset = () => {
    setInputValue('1');
    setInputUnit('acre');
    setOutputUnit('sqft');
    setSelectedRegion('standard');
  };

  const handleSwapUnits = () => {
    setInputUnit(outputUnit);
    setOutputUnit(inputUnit);
  };

  return (
    <div className="glass-panel p-6 max-w-4xl mx-auto">
      <motion.div 
        className="flex flex-col space-y-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="text-center mb-2">
          <motion.h2 
            className="text-2xl font-medium mb-1 text-notion-text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Land Area Converter
          </motion.h2>
          <motion.p 
            className="text-notion-textSecondary text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Convert between different land area units
          </motion.p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="w-full">
            <div className="flex flex-col gap-2">
              <label className="text-sm text-notion-textSecondary">Region</label>
              <RegionSelector
                value={selectedRegion}
                onChange={setSelectedRegion}
                className="w-full"
              />
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="w-full md:w-2/5">
            <div className="flex flex-col gap-2">
              <label className="text-sm text-notion-textSecondary">Input Value</label>
              <input
                type="text"
                className="converter-input"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter value"
              />
            </div>
          </div>
          
          <div className="w-full md:w-1/5">
            <div className="flex flex-col gap-2">
              <label className="text-sm text-notion-textSecondary">From</label>
              <UnitSelector
                value={inputUnit}
                onChange={setInputUnit}
                className="w-full"
              />
            </div>
          </div>
          
          <div className="flex items-center justify-center">
            <motion.button
              className="p-2 rounded-full bg-notion-secondary hover:bg-notion-divider transition-colors duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleSwapUnits}
            >
              <ArrowRight size={20} className="text-notion-text" />
            </motion.button>
          </div>
          
          <div className="w-full md:w-1/5">
            <div className="flex flex-col gap-2">
              <label className="text-sm text-notion-textSecondary">To</label>
              <UnitSelector
                value={outputUnit}
                onChange={setOutputUnit}
                className="w-full"
              />
            </div>
          </div>
          
          <div className="w-full md:w-2/5">
            <div className="flex flex-col gap-2">
              <label className="text-sm text-notion-textSecondary">Result</label>
              <input
                type="text"
                className="converter-input bg-notion-secondary/50"
                value={outputValue}
                readOnly
                placeholder="Result"
              />
            </div>
          </div>
        </div>
        
        {selectedRegion === 'banka_bihar' && (
          <motion.div 
            className="bg-primary/10 border border-primary/20 rounded-md p-3 flex gap-2 items-start"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <Info size={18} className="text-primary mt-0.5 flex-shrink-0" />
            <div className="text-sm text-notion-text">
              <p className="font-medium">Banka, Bihar Measurements</p>
              <p className="mt-1 text-notion-textSecondary">
                Measurements are based on the standard used in Banka, Bihar where:
                <br/>1 Katha = 3.125 Decimal = 1,361.25 sq ft
                <br/>1 Bigha = 20 Kathas = 62.5 Decimal = 27,225 sq ft
                <br/>1 Acre = 32 Kathas = 1.6 Bighas = 100 Decimal = 43,560 sq ft
                <br/>1 Hectare = 79.07 Kathas = 3.95 Bighas = 247.1 Decimal = 107,639 sq ft
              </p>
            </div>
          </motion.div>
        )}
        
        <div className="flex flex-col gap-4">
          <div className="flex justify-start items-center">
            <button
              className="flex items-center gap-1 text-sm text-notion-textSecondary hover:text-notion-text transition-colors duration-200"
              onClick={handleReset}
            >
              <RotateCw size={14} />
              <span>Reset</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LandAreaConverter;
