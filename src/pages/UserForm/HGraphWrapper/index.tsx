import { useEffect, useState } from 'react'
import HGraph from 'hgraph-react'
import { HGraphProps } from '../interfaces'

export const HGraphWrapper: React.FC<HGraphProps> = (props) => {
  const [areaOpacity, setAreaOpacity] = useState(0.3)
  const [defaultProps, setDefaultProps] = useState<HGraphProps>({
    score: 20,
    width: 160,
    height: 160,
    zoomOnPointClick: false,
    areaOpacity: 0.3,
    pointRadius: 5,
    pointLabelOffset: 1,
    axisLabelOffset: 0,
    ...props,
  })

  useEffect(() => {
    setDefaultProps((prevProps) => ({
      ...prevProps,
      ...props,
    }))
  }, [props])

  useEffect(() => {
    const timer = setTimeout(() => {
      setAreaOpacity(0.4)
    }, 1)

    return () => clearTimeout(timer)
  }, [])

  return <HGraph {...defaultProps} areaOpacity={areaOpacity} />
}
