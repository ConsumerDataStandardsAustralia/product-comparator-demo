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

export const translateProductCategory = (category) => productCategoryDict[category]

export const translateConstraintType = (constraintType) => constraintTypeDict[constraintType]
