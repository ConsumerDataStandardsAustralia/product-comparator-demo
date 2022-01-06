import React, { useEffect } from 'react'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import SubjectIcon from '@material-ui/icons/Subject'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import Autocomplete from '@material-ui/lab/Autocomplete'
import ListSubheader from '@material-ui/core/ListSubheader'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import { makeStyles } from '@material-ui/core/styles'
import { fade } from '@material-ui/core/styles/colorManipulator'
import { connect } from 'react-redux'
import { normalise } from '../../utils/url'
import { clearResult, callEndpoint } from '../../store/requester/actions'
import TreeView from '../data/TreeView'

const useStyles = makeStyles(theme => ({
  container: {
    marginLeft: theme.typography.pxToRem(20),
    marginRight: theme.typography.pxToRem(20)
  },
  panel: {
    backgroundColor: fade('#fff', 0.9)
  },
  heading: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontSize: theme.typography.pxToRem(20),
  },
  details: {
    maxWidth:'95%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 20
  }
}))

export interface VersionInfoProps {
  dataSources: string[],
  savedDataSourcesCount: number,
  versionInfo: VersionInfoProps
}

export interface RequesterPanelProps {
  dataSources: string[],
  savedDataSourcesCount: number,
  versionInfo: VersionInfoProps
}

const RequesterPanel = (props: any) => {

  const versions = ['1', '2', '3']
  const classes = useStyles()
  const [expanded, setExpanded] = React.useState(true)

  const toggleExpansion = (event: any, newExpanded: boolean | ((prevState: boolean) => boolean)) => {
    setExpanded(newExpanded)
  }

  let [openStatus, setOpenStatus] = React.useState('')
  let [owned, setOwned] = React.useState('')
  let [page, setPage] = React.useState(''), [pageSize, setPageSize] = React.useState('')
  let [prodCategory, setProdCategory] = React.useState('')
  let [xV, setXV] = React.useState('3'), [xMinV, setXMinV] = React.useState('1')
  let [xFapiInteractionId, setXFapiInteractionId] = React.useState('')
  let [xFapiAuthDate, setAuthDate] = React.useState(new Date().toUTCString())
  let [apiCallName, setApiCallName] = React.useState('Get Accounts')
  let [baseUrl, setBaseUrl] = React.useState('')
  let [accessToken, setAccessToken] = React.useState('')
  let [ipAddr, setIpAddr] = React.useState('0.0.0.0')
  let [accountIds, setAccountIds] = React.useState('')
  let [accountId, setAccountId] = React.useState('')
  let [oldestTime, setOldestTime] = React.useState('')
  let [newestTime, setNewestTime] = React.useState('')
  let [minAmount, setMinAmount] = React.useState('')
  let [maxAmount, setMaxAmount] = React.useState('')
  let [text, setText] = React.useState('')
  let [transactionId, setTransactionId] = React.useState('')
  let [payeeType, setPayeeType] = React.useState('')
  let [payeeId, setPayeeId] = React.useState('')
  let [effective, setEffective] = React.useState('')
  let [updatedSince, setUpdatedSince] = React.useState('')
  let [brand, setBrand] = React.useState('')
  let [productId, setProductId] = React.useState('')

  function isRelevant(paramName: string) {
    switch (apiCallName) {
      case 'Get Accounts':
      case 'Get Bulk Balances':
      case 'Get Bulk Direct Debits':
      case 'Get Scheduled Payments Bulk':
        switch (paramName) {
          case 'product-category':
          case 'open-status':
          case 'is-owned':
          case 'page':
          case 'page-size':
            return true
        }
        return false
      case 'Get Balances For Specific Accounts':
      case 'Get Direct Debits For Specific Accounts':
      case 'Get Scheduled Payments For Specific Accounts':
        switch (paramName) {
          case 'page':
          case 'page-size':
          case 'accountIds':
            return true
        }
        return false
      case 'Get Account Balance':
      case 'Get Account Detail':
        switch (paramName) {
          case 'accountId':
            return true
        }
        return false
      case 'Get Transactions For Account':
        switch (paramName) {
          case 'accountId':
          case 'oldest-time':
          case 'newest-time':
          case 'min-amount':
          case 'max-amount':
          case 'text':
          case 'page':
          case 'page-size':
            return true
        }
        return false
      case 'Get Transaction Detail':
        switch (paramName) {
          case 'accountId':
          case 'transactionId':
            return true
        }
        return false
      case 'Get Direct Debits For Account':
      case 'Get Scheduled Payments for Account':
        switch (paramName) {
          case 'accountId':
          case 'page':
          case 'page-size':
            return true
        }
        return false
      case 'Get Payees':
        switch (paramName) {
          case 'payeeType':
          case 'page':
          case 'page-size':
            return true
        }
        return false
      case 'Get Payee Detail':
        switch (paramName) {
          case 'payeeId':
            return true
        }
        return false
      case 'Get Products':
        switch (paramName) {
          case 'effective':
          case 'updated-since':
          case 'brand':
          case 'product-category':
          case 'page':
          case 'page-size':
            return true
        }
        return false
      case 'Get Product Detail':
        switch (paramName) {
          case 'productId':
            return true
        }
        return false
    }
    return false
  }

  function isProtected(): boolean {
    switch (apiCallName) {
      case 'Get Products':
      case 'Get Product Detail':
      case 'Get Status':
      case 'Get Outages':
        return false
    }
    return true
  }


  function resolvePath(): string {
    switch (apiCallName) {
      case 'Get Accounts':
        return '/banking/accounts'
      case 'Get Bulk Balances':
      case 'Get Balances For Specific Accounts':
        return '/banking/accounts/balances'
      case 'Get Account Balance':
        return '/banking/accounts/' + accountId + '/balance'
      case 'Get Account Detail':
        return '/banking/accounts/' + accountId
      case 'Get Transactions For Account':
        return '/banking/accounts/' + accountId + '/transactions'
      case 'Get Transaction Detail':
        return '/banking/accounts/' + accountId + '/transactions/' + transactionId
      case 'Get Direct Debits For Account':
        return '/banking/accounts/' + accountId + '/direct-debits'
      case 'Get Bulk Direct Debits':
      case 'Get Direct Debits For Specific Accounts':
        return '/banking/accounts/direct-debits'
      case 'Get Scheduled Payments for Account':
        return '/banking/accounts/' + accountId + '/payments/scheduled'
      case 'Get Scheduled Payments Bulk':
      case 'Get Scheduled Payments For Specific Accounts':
        return '/banking/payments/scheduled'
      case 'Get Payees':
        return '/banking/payees'
      case 'Get Payee Detail':
        return '/banking/payees/' + payeeId
      case 'Get Products':
        return '/banking/products'
      case 'Get Product Detail':
        return '/banking/products/' + productId
      case 'Get Customer':
        return '/common/customer'
      case 'Get Customer Detail':
        return '/common/customer/detail'
      case 'Get Status':
        return '/discovery/status'
      case 'Get Outages':
        return '/discovery/outages'
      default: return 'Not implemented'
    }
  }

  function callEndpoint() {
    const headers : any = {
      'x-v': xV,
      'x-min-v': xMinV,
      'x-cds-client-headers': 'Q29uc3VtZXIgRGF0YSBSaWdodA==',
      'x-fapi-customer-ip-address': ipAddr,
    }
    if (isProtected()) {
      headers.Authorization = 'Bearer ' + accessToken
      headers['x-fapi-auth-date'] = xFapiAuthDate
    }
    if (xFapiInteractionId) {
      headers['x-fapi-interaction-id'] = xFapiInteractionId
    }

    const callParams: any = {}
    if (isRelevant('open-status') && openStatus) {
      callParams['open-status'] = openStatus
    }
    if (isRelevant('page') && page) {
      callParams.page = page
    }
    if (isRelevant('page-size') && pageSize) {
      callParams['page-size'] = pageSize
    }
    if (isRelevant('product-category') && prodCategory) {
      callParams['product-category'] = prodCategory
    }
    if (isRelevant('is-owned') && owned) {
      callParams['is-owned'] = owned
    }
    if (isRelevant('oldest-time') && oldestTime) {
      callParams['oldest-time'] = oldestTime
    }
    if (isRelevant('newest-time') && newestTime) {
      callParams['newest-time'] = newestTime
    }
    if (isRelevant('min-amount') && minAmount) {
      callParams['min-amount'] = minAmount
    }
    if (isRelevant('max-amount') && maxAmount) {
      callParams['max-amount'] = maxAmount
    }
    if (isRelevant('text') && text) {
      callParams.text = text
    }
    if (isRelevant('payeeType') && payeeType) {
      callParams.type = payeeType
    }
    if (isRelevant('effective') && effective) {
      callParams.effective = effective
    }
    if (isRelevant('updated-since') && updatedSince) {
      callParams['updated-since'] = updatedSince
    }
    if (isRelevant('brand') && brand) {
      callParams.brand = brand
    }

    let body: string | null = null
    if (isRelevant('accountIds')) {
      let accountIdsArr = accountIds.split(',')
      body = `{"data":{"accountIds":${JSON.stringify(accountIdsArr)}}}`
    }

    let pathParams: any = {}
    if (isRelevant('accountId')) {
      pathParams.accountId = accountId
    }
    if (isRelevant('transactionId')) {
      pathParams.transactionId = transactionId
    }
    if (isRelevant('payeeId')) {
      pathParams.payeeId = payeeId
    }
    if (isRelevant('productId')) {
      pathParams.productId = productId
    }

    if (body) {
      headers['Content-Type'] = 'application/json'
    }
    props.callEndpoint(normalise(baseUrl) + resolvePath(), headers, callParams, body)
  }

  useEffect(() => {
    // Determine client IP through Cloudflare
    fetch("https://www.cloudflare.com/cdn-cgi/trace").then(res => res.text())
      .then(data => {
        const ipRegExpResult = data.match(/[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}/)
        if (ipRegExpResult) {
          setIpAddr(ipRegExpResult[0])
        }
      })
  }, [])

  return (
    <Accordion defaultExpanded className={classes.panel} expanded={expanded} onChange={toggleExpansion}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon/>}
        aria-controls='panel1c-content'
      >
        <div className={classes.heading}>
          <SubjectIcon/><Typography style={{paddingLeft: 8}}>Requester</Typography>
        </div>
      </AccordionSummary>
      <div className={classes.details}>
        <Grid container spacing={1} style={{fontSize: 'smaller'}} direction="row" alignItems="center">
          <Grid item xs={12}>
            <Autocomplete
              id="datasource"
              freeSolo
              options={(props.dataSources as any[]).map(ds => ds.url)}
              value={baseUrl}
              renderInput={params => (
                <TextField {...params} label="Base URL" />
              )}
              onInputChange={(ev, value) => {
                setBaseUrl(value)
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl>
              <InputLabel id="apiCallSelectLabel">API Call</InputLabel>
              <Select
                labelId="apiCallSelectLabel"
                id="apiCallSelect"
                value={apiCallName}
                onChange={ev => {props.clearResult(); setApiCallName(ev.target.value as string)}}
              >
                <ListSubheader>Banking APIs</ListSubheader>
                <MenuItem value="Get Accounts">Get Accounts</MenuItem>
                <MenuItem value="Get Bulk Balances">Get Bulk Balances</MenuItem>
                <MenuItem value="Get Balances For Specific Accounts">Get Balances For Specific Accounts</MenuItem>
                <MenuItem value="Get Account Balance">Get Account Balance</MenuItem>
                <MenuItem value="Get Account Detail">Get Account Detail</MenuItem>
                <MenuItem value="Get Transactions For Account">Get Transactions For Account</MenuItem>
                <MenuItem value="Get Transaction Detail">Get Transaction Detail</MenuItem>
                <MenuItem value="Get Direct Debits For Account">Get Direct Debits For Account</MenuItem>
                <MenuItem value="Get Bulk Direct Debits">Get Bulk Direct Debits</MenuItem>
                <MenuItem value="Get Direct Debits For Specific Accounts">Get Direct Debits For Specific Accounts</MenuItem>
                <MenuItem value="Get Scheduled Payments for Account">Get Scheduled Payments for Account</MenuItem>
                <MenuItem value="Get Scheduled Payments Bulk">Get Scheduled Payments Bulk</MenuItem>
                <MenuItem value="Get Scheduled Payments For Specific Accounts">Get Scheduled Payments For Specific Accounts</MenuItem>
                <MenuItem value="Get Payees">Get Payees</MenuItem>
                <MenuItem value="Get Payee Detail">Get Payee Detail</MenuItem>
                <MenuItem value="Get Products">Get Products</MenuItem>
                <MenuItem value="Get Product Detail">Get Product Detail</MenuItem>
                <ListSubheader>Common APIs</ListSubheader>
                <MenuItem value="Get Customer">Get Customer</MenuItem>
                <MenuItem value="Get Customer Detail">Get Customer Detail</MenuItem>
                <MenuItem value="Get Status">Get Status</MenuItem>
                <MenuItem value="Get Outages">Get Outages</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <div style={{fontSize: 'large'}}>
              {normalise(baseUrl)}{resolvePath()}
            </div>
          </Grid>
          {isProtected() &&
          <Grid item xs={12}>
            <TextField style={{width: '100%'}} value={accessToken} label="Access Token" onChange={ev => setAccessToken(ev.target.value)} />
          </Grid>}
          <Grid item xs={6}>
            <div style={{width: 200}}>
              <Autocomplete
                id="xV"
                freeSolo
                options={versions}
                value={xV}
                renderInput={params => (
                  <TextField {...params} label="x-v" helperText="Preferred version"/>
                )}
                onInputChange={(ev, value) => setXV(value)}
              />
            </div>
          </Grid>
          <Grid item xs={6}>
            <div style={{width: 200}}>
              <Autocomplete
                id="xMinV"
                freeSolo
                options={versions}
                value={xMinV}
                renderInput={params => (
                  <TextField {...params} label="x-min-v" helperText="Minimal acceptable version"/>
                )}
                onInputChange={(ev, value) => setXMinV(value)}
              />
            </div>
          </Grid>
          <Grid item xs={12}>
            <TextField value={xFapiInteractionId} label="x-fapi-interaction-id" onChange={ev => setXFapiInteractionId(ev.target.value)} style={{width: 350}} />
          </Grid>
          {isProtected() &&
          <>
          <Grid item xs={12}>
            <TextField value={xFapiAuthDate} label="x-fapi-auth-date" onChange={ev => setAuthDate(ev.target.value)} style={{width: 350}} />
          </Grid>
          <Grid item xs={12}>
            <TextField value={ipAddr} label="x-fapi-customer-ip-address" onChange={ev => setIpAddr(ev.target.value)} />
          </Grid>
          </>}

          <Grid item xs={12}>
            <Divider/>
          </Grid>

          {isRelevant('product-category') &&
          <Grid item xs={12}>
          <FormControl>
              <InputLabel id="prodCategoryLabel">Product category</InputLabel>
              <Select
                labelId="prodCategoryLabel"
                id="prodCategory"
                value={prodCategory}
                onChange={ev => setProdCategory(ev.target.value as string)}
                style={{minWidth: 160}}
              >
                <MenuItem value="BUSINESS_LOANS">Business Loans</MenuItem>
                <MenuItem value="CRED_AND_CHRG_CARDS">Credit and Charge Cards</MenuItem>
                <MenuItem value="LEASES">Leases</MenuItem>
                <MenuItem value="MARGIN_LOANS">Margin Loans</MenuItem>
                <MenuItem value="OVERDRAFTS">Overdrafts</MenuItem>
                <MenuItem value="PERS_LOANS">Personal Loans</MenuItem>
                <MenuItem value="REGULATED_TRUST_ACCOUNTS">Regulated Trust Accounts</MenuItem>
                <MenuItem value="RESIDENTIAL_MORTGAGES">Residential Mortgages</MenuItem>
                <MenuItem value="TERM_DEPOSITS">Term Deposits</MenuItem>
                <MenuItem value="TRADE_FINANCE">Trade Finance</MenuItem>
                <MenuItem value="TRANS_AND_SAVINGS_ACCOUNTS">Transaction and Savings Accounts</MenuItem>
                <MenuItem value="TRAVEL_CARDS">Travel Cards</MenuItem>
              </Select>
            </FormControl>
          </Grid>}
          {isRelevant('open-status') &&
          <Grid item xs={12}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Open status</FormLabel>
              <RadioGroup row
                aria-label="open stat"
                name="radio-buttons-group"
                value={openStatus}
                onChange={ev => setOpenStatus(ev.target.value as string)}
              >
                <FormControlLabel value="OPEN" control={<Radio />} label="Open" />
                <FormControlLabel value="CLOSE" control={<Radio />} label="Close" />
                <FormControlLabel value="ALL" control={<Radio />} label="All" />
              </RadioGroup>
            </FormControl>
          </Grid>}
          {isRelevant('is-owned') &&
          <Grid item xs={12}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Is owned</FormLabel>
              <RadioGroup row
                aria-label="is owned"
                defaultValue="all"
                name="radio-buttons-group"
                value={owned}
                onChange={ev => setOwned(ev.target.value as string)}
              >
                <FormControlLabel value="true" control={<Radio />} label="Owned" />
                <FormControlLabel value="false" control={<Radio />} label="Unowned" />
              </RadioGroup>
            </FormControl>
          </Grid>}
          {isRelevant('page') &&
          <Grid item xs={6}>
            <TextField value={page} label="Page" onChange={ev => setPage(ev.target.value)} />
          </Grid>}
          {isRelevant('page-size') &&
          <Grid item xs={6}>
            <TextField value={pageSize} label="Page size" onChange={ev => setPageSize(ev.target.value)} />
          </Grid>}
          {apiCallName === 'Get Products' &&
          <>
          <Grid item xs={12}>
            <FormControl>
              <InputLabel id="effectiveLabel">Effective</InputLabel>
              <Select
                labelId="effectiveLabel"
                id="effective"
                value={effective}
                onChange={ev => setEffective(ev.target.value as string)}
              >
                <MenuItem value="CURRENT">Current</MenuItem>
                <MenuItem value="FUTURE">Future</MenuItem>
                <MenuItem value="ALL">All</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField value={updatedSince} label="Updated Since" onChange={ev => setUpdatedSince(ev.target.value)} />
          </Grid>
          <Grid item xs={12}>
            <TextField value={brand} label="Brand" onChange={ev => setBrand(ev.target.value)} />
          </Grid>
          </>}
          {isRelevant('accountIds') &&
          <Grid item xs={12}>
            <TextField value={accountIds} label="Account IDs" onChange={ev => setAccountIds(ev.target.value)} helperText="Comma-separated account IDs" style={{width: '100%'}} />
          </Grid>}
          {isRelevant('accountId') &&
          <Grid item xs={12}>
            <TextField value={accountId} label="Account ID" onChange={ev => setAccountId(ev.target.value)} style={{width: '100%'}} />
          </Grid>}
          {isRelevant('oldest-time') &&
          <Grid item xs={12}>
            <TextField value={oldestTime} label="Oldest Time" onChange={ev => setOldestTime(ev.target.value)} style={{width: '50%'}} />
          </Grid>}
          {isRelevant('newest-time') &&
          <Grid item xs={12}>
            <TextField value={newestTime} label="Newest Time" onChange={ev => setNewestTime(ev.target.value)} style={{width: '50%'}} />
          </Grid>}
          {isRelevant('min-amount') &&
          <Grid item xs={12}>
            <TextField value={minAmount} label="Min Amount" onChange={ev => setMinAmount(ev.target.value)} />
          </Grid>}
          {isRelevant('max-amount') &&
          <Grid item xs={12}>
            <TextField value={maxAmount} label="Max Amount" onChange={ev => setMaxAmount(ev.target.value)} />
          </Grid>}
          {isRelevant('text') &&
          <Grid item xs={12}>
            <TextField value={text} label="Text" onChange={ev => setText(ev.target.value)} style={{width: '50%'}} />
          </Grid>}
          {isRelevant('transactionId') &&
          <Grid item xs={12}>
            <TextField value={transactionId} label="Transaction ID" onChange={ev => setTransactionId(ev.target.value)} style={{width: '100%'}} />
          </Grid>}
          {isRelevant('payeeType') &&
          <Grid item xs={12}>
            <FormControl>
              <InputLabel id="payeeTypeLabel">Payee Type</InputLabel>
              <Select
                labelId="payeeTypeLabel"
                id="payeeType"
                value={payeeType}
                onChange={ev => setPayeeType(ev.target.value as string)}
              >
                <MenuItem value="BILLER">Biller</MenuItem>
                <MenuItem value="DOMESTIC">Domestic</MenuItem>
                <MenuItem value="INTERNATIONAL">International</MenuItem>
                <MenuItem value="ALL">All</MenuItem>
              </Select>
            </FormControl>
          </Grid>}
          {isRelevant('payeeId') &&
          <Grid item xs={12}>
            <TextField value={payeeId} label="Payee ID" onChange={ev => setPayeeId(ev.target.value)} style={{width: '100%'}} />
          </Grid>}
          {isRelevant('productId') &&
          <Grid item xs={12}>
            <TextField value={productId} label="Product ID" onChange={ev => setProductId(ev.target.value)} style={{width: '100%'}} />
          </Grid>}
          <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={callEndpoint}>Call</Button>
          </Grid>
        </Grid>
      </div>

      <Divider/>

      {props.requester && (
      <>
        <p>Result:</p>
        <TreeView data={props.requester} />
      </>
      )}

    </Accordion>
  )
}

const mapStateToProps = (state: any) => ({
  dataSources: state.dataSources,
  requester: state.requester.response
})

const mapDispatchToProps = {
  clearResult,
  callEndpoint
}

export default connect(mapStateToProps, mapDispatchToProps)(RequesterPanel)