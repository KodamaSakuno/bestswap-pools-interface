import React from 'react'
import styled from 'styled-components'
import Button from '../../../components/Button'
import useClaim from '../../../hooks/useClaim'

const Claim: React.FC = () => {
    const { onClaim } = useClaim()

    return (
        <StyledClaimButton>
           <Button onClick={onClaim} size="sm" text="Claim" />
       </StyledClaimButton>
    )
}

const StyledClaimButton = styled.div`
    padding-top: 10px;
`

export default Claim