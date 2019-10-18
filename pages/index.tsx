import * as React from 'react';
import { withRouter } from 'next/router';

export const HomePage = ({ router }) => {
  console.log(`Rendering page HOME for url ${router.pathname}`);
  return <h1>Home</h1>;
};

export default withRouter(HomePage);
