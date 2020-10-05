import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import Page from '../../components/Page';
import NFT from '../NFT';
import NFTCards from './components/NFTCards';

const NFTs: React.FC = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Page>
        <Route exact path={path}>
          <NFTCards />
        </Route>
        <Route path={`${path}/:nftSymbol`}>
          <NFT />
        </Route>
      </Page>
    </Switch>
  )
}

export default NFTs;
