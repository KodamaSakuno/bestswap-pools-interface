import React from 'react'
import styled from 'styled-components'
import Footer from '../Footer'

export interface PageProps {
  showBgColor?: boolean
}

interface StyledPageProps {
  showBg: boolean
}

const Page: React.FC<PageProps> = ({ children, showBgColor = true }) => (
  <StyledPage showBg={showBgColor}>
    <StyledMain>{children}</StyledMain>
    <Footer />
  </StyledPage>
)

const StyledPage = styled.div<StyledPageProps>`
  background-color: ${props => props.showBg ? 'rgba(0,0,0,0.4)' : 'transparent'};
`

const StyledMain = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - ${(props) => props.theme.topBarSize * 2}px);
`

export default Page
