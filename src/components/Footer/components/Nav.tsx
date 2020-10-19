import React from 'react'
import styled from 'styled-components'

const Nav: React.FC = () => {
  return (
    <StyledNav>
      <StyledLink target="_blank" href="https://t.me/BestswapClub">
        Telegram
      </StyledLink>
      <StyledLink target="_blank" href="https://discord.com/invite/Tztg95k">
        Discord
      </StyledLink>
      <StyledLink target="_blank" href="https://medium.com/@Bestswap_com">
        Medium
      </StyledLink>
      <StyledLink target="_blank" href="https://twitter.com/Bestswap_com">
        Twitter
      </StyledLink>
      <StyledLink target="_blank" href="https://t.me/bestswap_com">
        Announcement
      </StyledLink>
    </StyledNav>
  )
}

const StyledNav = styled.nav`
  align-items: center;
  display: flex;
`

const StyledLink = styled.a`
  color: ${(props) => props.theme.color.yellow};
  padding-left: ${(props) => props.theme.spacing[3]}px;
  padding-right: ${(props) => props.theme.spacing[3]}px;
  text-decoration: none;
  &:hover {
    color: ${(props) => props.theme.color.yellow};
  }
`

export default Nav
