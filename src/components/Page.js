import React from 'react'
import DataSourcePanel from './data-source/DataSourcePanel'
import DataPanel from './data/DataPanel'
import Header from './header'
import { Container } from '@material-ui/core'

function Page() {
  return (
    <Container maxWidth='lg'>
      <Header title='Banking Products Viewer'/>
      <DataSourcePanel/>
      <DataPanel/>
    </Container>
  );
}

export default Page;
