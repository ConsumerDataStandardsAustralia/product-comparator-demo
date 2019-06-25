import React from 'react'
import DataSourcePanel from "./data-source/DataSourcePanel"
import Header from './header'
import { Container } from "@material-ui/core"

function Page() {
  return (
    <Container maxWidth="lg">
      <Header title="Banking Products Viewer"/>
      <DataSourcePanel/>
    </Container>
  );
}

export default Page;
