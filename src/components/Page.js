import React from 'react'
import DataSourcePanel from './data-source/DataSourcePanel'
import DataPanel from './data/DataPanel'
import ConsolePanel from './data/ConsolePanel'
import Header from './header'
import { Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import ComparisonPanel from './comparison/ComparisonPanel'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import DiscoveryInfo from './data/DiscoveryInfo'
import RequesterPanel from './requester/RequesterPanel'

const useStyles = makeStyles(theme => ({
  hidden: {
    display: 'none'
  }
}))
  
function Page() {
  const [value, setValue] = React.useState(0)
  const classes = useStyles()

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
  return (
    <Container maxWidth={false}>
      <Header title='Banking Products Comparator (demo)'/>
      <DataSourcePanel/>
      <ConsolePanel/>
      <AppBar position="static" style={{marginTop: 8, marginBottom: 8}}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Products" />
          <Tab label="Status and Outages" />
          <Tab label="Requester" />
        </Tabs>
      </AppBar>
      <div className={value === 0 ? '' : classes.hidden}>
        <DataPanel/>
        <ComparisonPanel/>
      </div>
      <div className={value === 1 ? '' : classes.hidden}>
        <DiscoveryInfo/>
      </div>
      <div className={value === 2 ? '' : classes.hidden}>
        <RequesterPanel />
      </div>
    </Container>
  );
}

export default Page;
