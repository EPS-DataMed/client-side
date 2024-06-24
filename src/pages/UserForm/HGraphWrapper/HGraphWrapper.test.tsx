import { render, screen, waitFor } from '@testing-library/react'
import { HGraphWrapper } from '../HGraphWrapper'
import { HGraphProps } from '../interfaces'

jest.mock('hgraph-react', () => ({
  __esModule: true,
  default: (props: any) => <div data-testid="hgraph-mock" {...props} />,
}))

const defaultProps: HGraphProps = {
  data: [
    {
      id: 'weight',
      label: 'Weight',
      value: 70,
      healthyMin: 50,
      healthyMax: 90,
      absoluteMin: 40,
      absoluteMax: 100,
      unitLabel: 'kg',
    },
  ],
}

describe('HGraphWrapper', () => {
  it('should render HGraph with default props', () => {
    render(<HGraphWrapper {...defaultProps} />)
    const hGraph = screen.getByTestId('hgraph-mock')
    expect(hGraph).toBeInTheDocument()
    expect(hGraph).toHaveAttribute('width', '160')
    expect(hGraph).toHaveAttribute('height', '160')
    expect(hGraph).toHaveAttribute('areaOpacity', '0.3')
  })

  it('should update default props when receiving new props', () => {
    const updatedProps: HGraphProps = {
      ...defaultProps,
      width: 200,
      height: 200,
    }
    render(<HGraphWrapper {...updatedProps} />)
    const hGraph = screen.getByTestId('hgraph-mock')
    expect(hGraph).toHaveAttribute('width', '200')
    expect(hGraph).toHaveAttribute('height', '200')
  })

  it('should update area opacity after timeout', async () => {
    render(<HGraphWrapper {...defaultProps} />)
    await waitFor(() => {
      const hGraph = screen.getByTestId('hgraph-mock')
      expect(hGraph).toHaveAttribute('areaOpacity', '0.4')
    })
  })
})
