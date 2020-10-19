import BigNumber from 'bignumber.js'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import Button from '../../../components/Button'
import Modal, { ModalProps } from '../../../components/Modal'
import ModalActions from '../../../components/ModalActions'
import ModalTitle from '../../../components/ModalTitle'
import TokenInput from '../../../components/TokenInput'
import { getCookie } from '../../../utils/cookie'
import { getFullDisplayBalance } from '../../../utils/formatBalance'
import { useWallet } from 'use-wallet'

interface DepositModalProps extends ModalProps {
  max: BigNumber
  onConfirm: (amount: string, addr: string) => void
  tokenName?: string
}

const DepositModalWithRef: React.FC<DepositModalProps> = ({
  max,
  onConfirm,
  onDismiss,
  tokenName = '',
}) => {
  const [val, setVal] = useState('')
  const [addr, setAddr] = useState('')
  const { account } = useWallet()
  const [pendingTx, setPendingTx] = useState(false)

  useEffect(() => {
    const c = getCookie('invite_id')
    if (c && c !== account) {
      console.log('inviter is', c)
      setAddr(c)
    }
  })

  const fullBalance = useMemo(() => {
    return getFullDisplayBalance(max)
  }, [max])

  const handleChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      setVal(e.currentTarget.value)
    },
    [setVal],
  )

  const handleSelectMax = useCallback(() => {
    setVal(fullBalance)
  }, [fullBalance, setVal])

  return (
    <Modal>
      <ModalTitle text={`Deposit ${tokenName} Tokens`} />
      <TokenInput
        value={val}
        onSelectMax={handleSelectMax}
        onChange={handleChange}
        max={fullBalance}
        symbol={tokenName}
      />
      <ModalActions>
        <Button text="Cancel" variant="secondary" onClick={onDismiss} />
        <Button
          disabled={pendingTx}
          text={pendingTx ? 'Pending Confirmation' : 'Confirm'}
          onClick={async () => {
            setPendingTx(true)
            await onConfirm(val, addr)
            setPendingTx(false)
            onDismiss()
          }}
        />
      </ModalActions>
    </Modal>
  )
}

export default DepositModalWithRef