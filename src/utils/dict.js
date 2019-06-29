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

export const translateProductCategory = (category) => {
  return productCategoryDict[category]
}
