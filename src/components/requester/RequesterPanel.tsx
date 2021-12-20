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
  versionInfo: VersionInfoProps,
  // requester: RequesterState
}

const RequesterPanel = (props: any) => {

  const versions = ['1', '2', '3']
  const classes = useStyles()
  const [expanded, setExpanded] = React.useState(true)

  const toggleExpansion = (event: any, newExpanded: boolean | ((prevState: boolean) => boolean)) => {
    setExpanded(newExpanded)
  }

  let [openStatus, setOpenStatus] = React.useState('ALL')
  let [page, setPage] = React.useState(''), [pageSize, setPageSize] = React.useState('')
  let [prodCategory, setProdCategory] = React.useState('ALL')
  let [xV, setXV] = React.useState('3'), [xMinV, setXMinV] = React.useState('1')
  let [xFapiInteractionId, setXFapiInteractionId] = React.useState('')
  let [xFapiAuthDate, setAuthDate] = React.useState(new Date().toUTCString())
  let [apiCallName, setApiCallName] = React.useState('Get Accounts')
  let [baseUrl, setBaseUrl] = React.useState('')
  let [accessToken, setAccessToken] = React.useState('')
  let [ipAddr, setIpAddr] = React.useState('0.0.0.0')
  let [accountIds, setAccountIds] = React.useState('')
  let [accountId, setAccountId] = React.useState('')
  let [transactionId, setTransactionId] = React.useState('')

  function callEndpoint() {
    const headers : any = {
      'x-v': xV,
      'x-min-v': xMinV,
      'x-cds-client-headers': 'Q29uc3VtZXIgRGF0YSBSaWdodA==',
      'x-fapi-auth-date': new Date().toUTCString(),
      'x-fapi-customer-ip-address': ipAddr,
      Authorization: 'Bearer ' + accessToken
    }
    if (xFapiInteractionId) {
      headers['x-fapi-interaction-id'] = xFapiInteractionId
    }
    const callParams: any = {
      'open-status': openStatus,
    }
    if (page) {
      callParams.page = page
    }
    if (pageSize) {
      callParams['page-size'] = pageSize
    }
    if (prodCategory !== 'ALL') {
      callParams['product-category'] = prodCategory
    }
    let body: string | null = null
    let pathParams: any = {}
    switch (apiCallName) {
      case 'Get Balances For Specific Accounts':
      case 'Get Direct Debits For Specific Accounts':
      case 'Get Scheduled Payments For Specific Accounts':
        let accountIdsArr = accountIds.split(',')
        body = `{"data":{"accountIds":${JSON.stringify(accountIdsArr)}}}`
        break
      case 'Get Account Balance':
      case 'Get Account Detail':
      case 'Get Transactions For Account':
      case 'Get Direct Debits For Account':
      case 'Get Scheduled Payments for Account':
        pathParams.accountId = accountId
        break
      case 'Get Transaction Detail':
        pathParams.accountId = accountId
        pathParams.transactionId = transactionId
        break
    }
    if (body) {
      headers['Content-Type'] = 'application/json'
    }
    props.callEndpoint(normalise(baseUrl) + resolvePath(apiCallName, pathParams), headers, callParams, body)
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
                <MenuItem value="Get Get Product Detail">Get Get Product Detail</MenuItem>
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
              {normalise(baseUrl)}{resolvePath(apiCallName, {accountId, transactionId})}
            </div>
          </Grid>
          <Grid item xs={12}>
            <TextField style={{width: '100%'}} value={accessToken} label="Access Token" onChange={ev => setAccessToken(ev.target.value)} />
          </Grid>
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
          <Grid item xs={12}>
            <TextField value={xFapiAuthDate} label="x-fapi-auth-date" onChange={ev => setAuthDate(ev.target.value)} style={{width: 350}} />
          </Grid>
          <Grid item xs={12}>
            <TextField value={ipAddr} label="x-fapi-customer-ip-address" onChange={ev => setIpAddr(ev.target.value)} />
          </Grid>

          <Grid item xs={12}>
            <Divider/>
          </Grid>

          <Grid item xs={12}>
          <FormControl>
              <InputLabel id="prodCategoryLabel">Product category</InputLabel>
              <Select
                labelId="prodCategoryLabel"
                id="prodCategory"
                value={prodCategory}
                onChange={ev => setProdCategory(ev.target.value as string)}
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
                <MenuItem value="ALL">All</MenuItem>
              </Select>
            </FormControl>
          </Grid>
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
          </Grid>
          <Grid item xs={12}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Is owned</FormLabel>
              <RadioGroup row
                aria-label="is owned"
                defaultValue="all"
                name="radio-buttons-group"
              >
                <FormControlLabel value="true" control={<Radio />} label="Owned" />
                <FormControlLabel value="false" control={<Radio />} label="Unowned" />
                <FormControlLabel value="all" control={<Radio />} label="All" />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <TextField value={page} label="Page" onChange={ev => setPage(ev.target.value)} />
          </Grid>
          <Grid item xs={6}>
            <TextField value={pageSize} label="Page size" onChange={ev => setPageSize(ev.target.value)} />
          </Grid>
          {(apiCallName === 'Get Balances For Specific Accounts' || apiCallName === 'Get Direct Debits For Specific Accounts' ||
            apiCallName === 'Get Scheduled Payments For Specific Accounts') &&
          <Grid item xs={12}>
            <TextField value={accountIds} label="Account IDs" onChange={ev => setAccountIds(ev.target.value)} helperText="Comma-separated account IDs" style={{width: '100%'}} />
          </Grid>}
          {(apiCallName === 'Get Account Balance' || apiCallName === 'Get Account Detail' ||
            apiCallName === 'Get Transactions For Account' || apiCallName === 'Get Transaction Detail' ||
            apiCallName === 'Get Direct Debits For Account' || apiCallName === 'Get Scheduled Payments for Account') &&
          <Grid item xs={12}>
            <TextField value={accountId} label="Account ID" onChange={ev => setAccountId(ev.target.value)} style={{width: '100%'}} />
          </Grid>}
          {apiCallName === 'Get Transaction Detail' &&
          <Grid item xs={12}>
            <TextField value={transactionId} label="Transaction ID" onChange={ev => setTransactionId(ev.target.value)} style={{width: '100%'}} />
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

function resolvePath(apiCallName: string, pathParams: any): string {
  switch (apiCallName) {
    case 'Get Accounts':
      return '/banking/accounts'
    case 'Get Bulk Balances':
    case 'Get Balances For Specific Accounts':
      return '/banking/accounts/balances'
    case 'Get Account Balance':
      return '/banking/accounts/' + pathParams.accountId + '/balance'
    case 'Get Account Detail':
      return '/banking/accounts/' + pathParams.accountId
    case 'Get Transactions For Account':
      return '/banking/accounts/' + pathParams.accountId + '/transactions'
    case 'Get Transaction Detail':
      return '/banking/accounts/' + pathParams.accountId + '/transactions/' + pathParams.transactionId
    case 'Get Direct Debits For Account':
      return '/banking/accounts/' + pathParams.accountId + '/direct-debits'
    case 'Get Bulk Direct Debits':
    case 'Get Direct Debits For Specific Accounts':
      return '/banking/accounts/direct-debits'
    case 'Get Scheduled Payments for Account':
      return '/banking/accounts/' + pathParams.accountId + '/payments/scheduled'
    case 'Get Scheduled Payments Bulk':
    case 'Get Scheduled Payments For Specific Accounts':
      return '/banking/payments/scheduled'
    default: return 'Not implemented'
  }
}
