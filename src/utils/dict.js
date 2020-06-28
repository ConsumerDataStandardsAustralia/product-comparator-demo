export const productCategoryDict = {
  RESIDENTIAL_MORTGAGES: 'Residential Mortgages',
  CRED_AND_CHRG_CARDS: 'Credit and Charge Cards',
  PERS_LOANS: 'Personal Loans',
  MARGIN_LOANS: 'Margin Loans',
  LEASES: 'Leases',
  TRADE_FINANCE: 'Trade Finance',
  OVERDRAFTS: 'Overdrafts',
  BUSINESS_LOANS: 'Business Loans',
  TRANS_AND_SAVINGS_ACCOUNTS: 'Transaction and Savings Accounts',
  TERM_DEPOSITS: 'Term Deposits',
  TRAVEL_CARDS: 'Travel Cards',
  REGULATED_TRUST_ACCOUNTS: 'Regulated Trust Accounts'
}

export const constraintTypeDict = {
  MIN_BALANCE: 'Minimum Balance',
  MAX_BALANCE: 'Maximum Balance',
  OPENING_BALANCE: 'Opening Balance',
  MAX_LIMIT: 'Maximum Credit Limit',
  MIN_LIMIT: 'Minimum Credit Limit'
}

export const depositRateTypeDict = {
  FIXED: 'Fixed',
  BONUS: 'Bonus',
  BUNDLE_BONUS: 'Bundle Bonus',
  VARIABLE: 'Variable',
  INTRODUCTORY: 'Introductory',
  FLOATING: 'Floating',
  MARKET_LINKED: 'Market Linked'
}

export const lendingRateTypeDict = {
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

export const interestPaymentDueDict = {
  IN_ARREARS: 'in Arrears',
  IN_ADVANCE: 'in Advance'
}

export const eligibilityTypeDict = {
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

export const featureTypeDict = {
  CARD_ACCESS: 'Card Access',
  ADDITIONAL_CARDS: 'Additional Cards',
  UNLIMITED_TXNS: 'Unlimited Transactions',
  FREE_TXNS: 'Free Transactions',
  FREE_TXNS_ALLOWANCE: 'Free Transaction Allowance',
  LOYALTY_PROGRAM: 'Loyalty Program',
  OFFSET: 'Offset',
  OVERDRAFT: 'Overdraft',
  REDRAW: 'Redraw',
  INSURANCE: 'Insurance',
  BALANCE_TRANSFERS: 'Balance Transfer',
  INTEREST_FREE: 'Interest Free',
  INTEREST_FREE_TRANSFERS: 'Interest Free Transfers',
  DIGITAL_WALLET: 'Digital Wallet',
  DIGITAL_BANKING: 'Digital Banking',
  NPP_PAYID: 'NPP PayID',
  NPP_ENABLED: 'NPP Enabled',
  DONATE_INTEREST: 'Donate Interest',
  BILL_PAYMENT: 'Bill Payment',
  COMPLEMENTARY_PRODUCT_DISCOUNTS: 'Complementary Product Discounts',
  BONUS_REWARDS: 'Bonus Rewards',
  NOTIFICATIONS: 'Notifications',
  OTHER: 'Other'
}

export const feeTypeDict = {
  PERIODIC: 'Periodic',
  TRANSACTION: 'Transaction',
  WITHDRAWAL: 'Withdrawal',
  DEPOSIT: 'Deposit',
  PAYMENT: 'Payment',
  PURCHASE: 'Purchase',
  EVENT: 'Event',
  UPFRONT: 'Upfront',
  EXIT: 'Exit'
}

export const discountTypeDict = {
  BALANCE: 'Balance',
  DEPOSITS: 'Deposits',
  PAYMENTS: 'Payments',
  FEE_CAP: 'Fee Cap',
  ELIGIBILITY_ONLY: 'Eligibility Only'
}

export const unitOfMeasureDict = {
  DOLLAR: 'Dollars',
  PERCENT: 'Percent',
  MONTH: 'Month(s)',
  DAY: 'Day(s)'
}

export const rateApplicationMethodDict = {
  WHOLE_BALANCE: 'Whole Balance',
  PER_TIER: 'Per Tier'
}

export const repaymentTypeDict = {
  INTEREST_ONLY: 'Interest Only',
  PRINCIPAL_AND_INTEREST: 'Principal and Interest'
}

export const productDataKeys = [
  {key: 'description', label: 'Description'},
  {key: 'brand', label: 'Brand'},
  {key: 'brandName', label: 'Brand Name'},
  {key: 'lastUpdated', label: 'Last Updated'},
  {key: 'isTailored', label: 'Tailored?'},
  {key: 'effectiveFrom', label: 'Effective From'},
  {key: 'effectiveTo', label: 'Effective To'},
  {key: 'applicationUri', label: 'Application Link'},
  {key: 'additionalInformation', label: 'Additional Information'},
  {key: 'bundles', label: 'Bundles'},
  {key: 'constraints', label: 'Constraints'},
  {key: 'depositRates', label: 'Deposit Rates'},
  {key: 'lendingRates', label: 'Lending Rates'},
  {key: 'eligibility', label: 'Eligibility'},
  {key: 'features', label: 'Features'},
  {key: 'fees', label: 'Fees'}
]

export const translateProductCategory = (category) => productCategoryDict[category]

export const translateConstraintType = (constraintType) => constraintTypeDict[constraintType]

export const translateDepositRateType = (depositRateType) => depositRateTypeDict[depositRateType]

export const translateLendingRateType = (lendingRateType) => lendingRateTypeDict[lendingRateType]

export const translateInterestPaymentDue = (interestPaymentDue) => interestPaymentDueDict[interestPaymentDue]

export const translateRepaymentType = (repaymentType) => repaymentTypeDict[repaymentType]

export const translateEligibilityType = (eligibilityType) => eligibilityTypeDict[eligibilityType]

export const translateFeatureType = (featureType) => featureTypeDict[featureType]

export const translateFeeType = (feeType) => feeTypeDict[feeType]

export const translateDiscountType = (discountType) => discountTypeDict[discountType]

export const translateUnitOfMeasure = (unitOfMeasure) => unitOfMeasureDict[unitOfMeasure]

export const translateRateApplicationMethod = (rateApplicationMethod) => rateApplicationMethodDict[rateApplicationMethod]
