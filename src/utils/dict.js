const productCategoryDict = {
  RESIDENTIAL_MORTGAGES: "Residential Mortgages",
  CRED_AND_CHRG_CARDS: "Credit and Charge Cards",
  PERS_LOANS: "Personal Loans",
  MARGIN_LOANS: "Margin Loans",
  LEASES: "Leases",
  TRADE_FINANCE: "Trade Finance",
  OVERDRAFTS: "Overdrafts",
  BUSINESS_LOANS: "Business Loans",
  TRANS_AND_SAVINGS_ACCOUNTS: "Transaction and Savings Accounts",
  TERM_DEPOSITS: "Term Deposits",
  TRAVEL_CARDS: "Travel Cards",
  REGULATED_TRUST_ACCOUNTS: "Regulated Trust Accounts"
}

const constraintTypeDict = {
  MIN_BALANCE: 'Minimum Balance',
  MAX_BALANCE: 'Maximum Balance',
  OPENING_BALANCE: 'Opening Balance',
  MAX_LIMIT: 'Maximum Credit Limit',
  MIN_LIMIT: 'Minimum Credit Limit'
}

const depositRateTypeDict = {
  FIXED: 'Fixed',
  BONUS: 'Bonus',
  BUNDLE_BONUS: 'Bundle Bonus',
  VARIABLE: 'Variable',
  INTRODUCTORY: 'Introductory',
  FLOATING: 'Floating',
  MARKET_LINKED: 'Market Linked'
}

const lendingRateTypeDict = {
  FIXED: 'Fixed',
  VARIABLE: 'Variable',
  INTRODUCTORY: 'Introductory',
  FLOATING: 'Floating',
  MARKET_LINKED: 'Market Linked',
  DISCOUNT: 'Discount',
  PENALTY: 'Penalty',
  CASH_ADVANCE: 'Cash Advance',
  PURCHASE: 'Purchase',
  BUNDLE_DISCOUNT_FIXED: 'Bundle Discount Fixed',
  BUNDLE_DISCOUNT_VARIABLE: 'Bundle Discount Variable'
}

const interestPaymentDueDict = {
  ARREARS: 'in Arrears',
  ADVANCE: 'in Advance'
}

const eligibilityTypeDict = {
  BUSINESS: 'Business',
  PENSION_RECIPIENT: 'Pension Recipient',
  MIN_AGE: 'Minimum Age',
  MAX_AGE: 'Maximum Age',
  MIN_INCOME: 'Minimum Income',
  MIN_TURNOVER: 'Minimum Turnover',
  STAFF: 'Staff',
  STUDENT: 'Student',
  EMPLOYMENT_STATUS: 'Employment Status',
  RESIDENCY_STATUS: 'Residency Status',
  NATURAL_PERSON: 'Natural Person',
  OTHER: 'Other'
}

export const translateProductCategory = (category) => productCategoryDict[category]

export const translateConstraintType = (constraintType) => constraintTypeDict[constraintType]

export const translateDepositRateType = (depositRateType) => depositRateTypeDict[depositRateType]

export const translateLendingRateType = (lendingRateType) => lendingRateTypeDict[lendingRateType]

export const translateInterestPaymentDue = (interestPaymentDue) => interestPaymentDueDict[interestPaymentDue]

export const translateEligibilityType = (eligibilityType) => eligibilityTypeDict[eligibilityType]
