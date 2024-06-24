import { useReactToPrint } from 'react-to-print'
import { PAGE_PRINT_STYLE } from '../constants'
import { useRef } from 'react'
import { User } from '../interfaces'

export function usePrintGraph({
  setUserInfoFilled,
}: {
  setUserInfoFilled: any
}) {
  const healthDataRef = useRef<HTMLDivElement | null>(null)

  const handleHealthDataPrint = useReactToPrint({
    content: () => healthDataRef.current,
    pageStyle: PAGE_PRINT_STYLE,
    documentTitle: 'datamed_card',
    onAfterPrint: () => setUserInfoFilled({} as User),
  })

  return { handleHealthDataPrint, healthDataRef }
}
