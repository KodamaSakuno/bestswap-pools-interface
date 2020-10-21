import React, { useCallback, useState, useMemo } from 'react'
import { CheckCircle, AlertTriangle } from 'react-feather'
import styled from 'styled-components'
import Modal, { ModalProps } from '../Modal'
import ModalActions from '../ModalActions'
import ModalContent from '../ModalContent'
import ModalTitle from '../ModalTitle'
import Button from '../Button'

export interface TransactionModalProps extends ModalProps {
  type?: 'success' | 'error' | 'info',
  txLink?: string,
  message?: string,
  onConfirm: () => void
}

const TransactionModal: React.FC<TransactionModalProps> = ({
  type = 'info',
  txLink = '',
  message = '',
  onConfirm,
  onDismiss,
}) => {
  const [modalType] = useState(type)

  const handleConfirm = useCallback(() => {
    onConfirm()
    onDismiss()
  }, [onConfirm, onDismiss])

  const displayTitleText = (type: string) => {
    if (type === 'error') return 'Error'
    if (type === 'success') return 'Success'
    return 'Info'
  }

  const modalContent = useMemo(() => {
    if (modalType === 'success') {
      return (
        <div>
          <StyledIcon>
            <CheckCircle size={90} color='#32B798' />
          </StyledIcon>
          <StyledText>
            Transaction Submitted
          </StyledText>
          {/* <StyledAbsoluteLink href={txLink} target='_blank' rel='noreferrer noopener'>
            View on BscScan
          </StyledAbsoluteLink> */}
        </div>
      )
    }

    if (modalType === 'error') {
      return (
        <div>
          <StyledIcon>
            <AlertTriangle size={90} color='#F02B27' />
          </StyledIcon>
          <StyledErrorText>{message}</StyledErrorText>
        </div>
      )
    }

    return (
      <div>
          <StyledIcon>
            <AlertTriangle size={90} color='#333333' />
          </StyledIcon>
          <StyledText>{message}</StyledText>
        </div>
    )
  }, [message, modalType])

  const modalButton = useMemo(() => {
    if (modalType === 'success') {
      return (
        <Button text='Confirm' onClick={handleConfirm} />
      )
    }
    if (modalType === 'error') {
      return (
        <Button text='Dismiss' onClick={onDismiss} />
      )
    }
    return <Button text='Dismiss' onClick={onDismiss} />
  }, [handleConfirm, modalType, onDismiss])

  return (
    <Modal>
      <ModalTitle text={displayTitleText(modalType)} />
      <ModalContent>{modalContent}</ModalContent>
      <ModalActions>{modalButton}</ModalActions>
    </Modal>
  )
}

const StyledIcon = styled.div`
  display: block;
  width: 90px;
  height: 90px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: ${props => props.theme.spacing[5]}px;
`

const StyledText = styled.p`
  color: #000000;
  font-size: 24px;
  line-height: 1;
  font-weight: 400;
  text-align: center;
  margin-bottom: ${props => props.theme.spacing[4]}px;
`

const StyledErrorText = styled.p`
  color: #F02B27;
  font-size: 24px;
  line-height: 1;
  font-weight: 400;
  text-align: center;
  margin-bottom: ${props => props.theme.spacing[4]}px;
`

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const StyledAbsoluteLink = styled.a`
  display: inline-block;
  width: 100%;
  color: ${(props) => props.theme.color.yellow};
  font-size: 16px;
  font-weight: normal;
  text-align: center;
  text-decoration: none;
  &:hover {
    color: ${(props) => props.theme.color.yellow};
  }
`

export default TransactionModal
