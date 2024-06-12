declare module 'hgraph-react' {
  import { FC } from 'react'

  interface HGraphDatum {
    id: string
    label: string
    value: number
    healthyMin: number
    healthyMax: number
    absoluteMin: number
    absoluteMax: number
    unitLabel: string
    children?: HGraphDatum[]
    weight?: number
  }

  interface Margin {
    top: number
    right: number
    bottom: number
    left: number
  }

  interface HGraphProps {
    data: HGraphDatum[]
    score?: number
    color?: string
    width?: number
    height?: number
    margin?: Margin
    thresholdMin?: number
    thresholdMax?: number
    donutHoleFactor?: number
    healthyRangeFillColor?: string
    fontSize?: number
    fontColor?: string
    showAxisLabel?: boolean
    axisLabelOffset?: number
    axisLabelWrapWidth?: number
    areaOpacity?: number
    pointRadius?: number
    pointLabelOffset?: number
    pointLabelWrapWidth?: number | null
    hitboxRadius?: number
    showScore?: boolean
    scoreFontSize?: number
    scoreFontColor?: string
    zoomFactor?: number
    zoomTransitionTime?: number
    zoomOnPointClick?: boolean
    onPointClick?: (
      d: HGraphDatum,
      e: React.MouseEvent<SVGCircleElement, MouseEvent>,
    ) => void
  }

  const HGraph: FC<HGraphProps>
  function calculateHealthScore(data: HGraphDatum[]): number

  export default HGraph
  export { calculateHealthScore }
}
