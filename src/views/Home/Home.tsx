import React from 'react'
import styled from 'styled-components'
import Container from '../../components/Container'
import Page from '../../components/Page'
import Balances from './components/Balances'

const Home: React.FC = () => {
  return (
    <Page>
      <StyledContainer>
        <Container>
          <Balances />
        </Container>
      </StyledContainer>
    </Page>
  )
}

const StyledContainer = styled.div`
  width: 100%;
  height: 100%;
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
`

export default Home
