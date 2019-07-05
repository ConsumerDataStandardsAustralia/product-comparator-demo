import React from 'react'
import DataSourcePanel from './data-source/DataSourcePanel'
import DataPanel from './data/DataPanel'
import Header from './header'
import { Container } from '@material-ui/core'
import ComparisonPanel from './comparison/ComparisonPanel'

function Page() {
  return (
    <Container maxWidth='lg'>
      <Header title='Banking Products Comparator (demo)'/>
      <DataSourcePanel/>
      <DataPanel/>
      <ComparisonPanel/>
    </Container>
  );
}

export default Page;
