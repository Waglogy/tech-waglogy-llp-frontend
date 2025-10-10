/**
 * Currency Conversion Utilities
 * Converts Indian Rupees (INR) to US Dollars (USD)
 */

// Current exchange rate (approximate)
// You can update this or fetch from an API for real-time rates
const INR_TO_USD_RATE = 83; // 1 USD = 83 INR (approximate)

/**
 * Convert INR amount to USD
 * @param {number} inrAmount - Amount in INR
 * @returns {number} Amount in USD (rounded to 2 decimal places)
 */
export const convertINRtoUSD = (inrAmount) => {
  return Math.round((inrAmount / INR_TO_USD_RATE) * 100) / 100;
};

/**
 * Convert budget range key to USD formatted string
 * Maps the budget range selection to USD equivalent
 * Backend only accepts these exact values:
 * - "Less than $5,000"
 * - "$5,000 - $10,000"
 * - "$10,000 - $25,000"
 * - "$25,000 - $50,000"
 * - "$50,000 - $100,000"
 * - "More than $100,000"
 * 
 * @param {string} budgetKey - Budget range key (e.g., "50k-1l", "under-50k")
 * @returns {string} Budget range in USD format matching backend accepted values
 */
export const convertBudgetRangeToUSD = (budgetKey) => {
  if (!budgetKey) {
    return '';
  }

  // Backend accepts ONLY these exact values
  // Mapping based on exchange rate: 1 USD = ₹83
  const budgetMapping = {
    'under-50k': {
      inrRange: 'Under ₹50,000',
      approximateUSD: 'Under $600',
      backendValue: 'Less than $5,000'
    },
    '50k-1l': {
      inrRange: '₹50,000 - ₹1,00,000',
      approximateUSD: '$600 - $1,200',
      backendValue: 'Less than $5,000'
    },
    '1l-3l': {
      inrRange: '₹1,00,000 - ₹3,00,000',
      approximateUSD: '$1,200 - $3,600',
      backendValue: 'Less than $5,000'
    },
    '3l-5l': {
      inrRange: '₹3,00,000 - ₹5,00,000',
      approximateUSD: '$3,600 - $6,000',
      backendValue: '$5,000 - $10,000'
    },
    '5l-10l': {
      inrRange: '₹5,00,000 - ₹10,00,000',
      approximateUSD: '$6,000 - $12,000',
      backendValue: '$10,000 - $25,000'
    },
    'over-10l': {
      inrRange: 'Over ₹10,00,000',
      approximateUSD: 'Over $12,000',
      backendValue: '$10,000 - $25,000'
    }
  };

  const budget = budgetMapping[budgetKey];
  
  if (!budget) {
    console.warn(`Unknown budget key: ${budgetKey}`);
    return '';
  }

  return budget.backendValue;
};

/**
 * Get budget info including both INR and USD
 * @param {string} budgetKey - Budget range key
 * @returns {object} Object with INR and USD information
 */
export const getBudgetInfo = (budgetKey) => {
  if (!budgetKey) {
    return null;
  }

  const budgetMapping = {
    'under-50k': {
      key: budgetKey,
      inrDisplay: 'Under ₹50,000',
      usdDisplay: 'Less than $5,000',
      backendValue: 'Less than $5,000'
    },
    '50k-1l': {
      key: budgetKey,
      inrDisplay: '₹50,000 - ₹1,00,000',
      usdDisplay: 'Less than $5,000',
      backendValue: 'Less than $5,000'
    },
    '1l-3l': {
      key: budgetKey,
      inrDisplay: '₹1,00,000 - ₹3,00,000',
      usdDisplay: 'Less than $5,000',
      backendValue: 'Less than $5,000'
    },
    '3l-5l': {
      key: budgetKey,
      inrDisplay: '₹3,00,000 - ₹5,00,000',
      usdDisplay: '$5,000 - $10,000',
      backendValue: '$5,000 - $10,000'
    },
    '5l-10l': {
      key: budgetKey,
      inrDisplay: '₹5,00,000 - ₹10,00,000',
      usdDisplay: '$10,000 - $25,000',
      backendValue: '$10,000 - $25,000'
    },
    'over-10l': {
      key: budgetKey,
      inrDisplay: 'Over ₹10,00,000',
      usdDisplay: '$10,000 - $25,000',
      backendValue: '$10,000 - $25,000'
    }
  };

  return budgetMapping[budgetKey] || null;
};

export default {
  convertINRtoUSD,
  convertBudgetRangeToUSD,
  getBudgetInfo,
  INR_TO_USD_RATE
};

