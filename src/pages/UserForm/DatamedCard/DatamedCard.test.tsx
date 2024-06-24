import React from 'react'
import { render, screen } from '@testing-library/react'
import DatamedCard from '../DatamedCard'
import AppProviders from '../../../components/AppProviders'
import { User } from '../interfaces'

jest.mock('hgraph-react', () => {
  const originalModule = jest.requireActual('hgraph-react')
  return {
    __esModule: true,
    ...originalModule,
    calculateHealthScore: jest.fn(() => 85),
    default: (props: any) => <div data-testid="hgraph-mock" {...props} />,
  }
})

jest.mock('../hooks/useHGraphData', () =>
  jest.fn(() => [
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
  ]),
)

const renderWithProviders = (ui: React.ReactElement) => {
  return render(<AppProviders>{ui}</AppProviders>)
}

const user: User = {
  name: 'John Doe',
  age: 30,
  weight: '70',
  height: '1.75',
  bmi: '22.9',
  bloodType: 'O+',
  abdominalCircumference: '85',
  hemoglobin: '14',
  ast: '20',
  alt: '30',
  urea: '40',
  redBloodCell: '5.0',
  creatinine: '1.0',
  hematocrit: '45',
  glycatedHemoglobin: '5.5',
  allergies: 'Pollen',
  diseases: 'Diabetes',
  medications: 'Metformin',
  familyHistory: 'Heart Disease',
  importantNotes: 'None',
  imageReports: 'None',
}

describe('DatamedCard', () => {
  it('should render the PersonalInfoSection with user details', () => {
    const ref = React.createRef<HTMLDivElement>()
    renderWithProviders(<DatamedCard user={user} componentRef={ref} />)
    expect(screen.getByTestId('personal-info-section')).toBeInTheDocument()
    expect(screen.getByTestId('user-name')).toHaveTextContent('John Doe')
    expect(screen.getByTestId('user-age')).toHaveTextContent('30 anos')
  })

  it('should render the HGraphWrapper with calculated health score', () => {
    const ref = React.createRef<HTMLDivElement>()
    renderWithProviders(<DatamedCard user={user} componentRef={ref} />)
    expect(screen.getByTestId('hgraph-mock')).toBeInTheDocument()
    expect(screen.getByTestId('hgraph-mock')).toHaveAttribute('score', '85')
  })

  it('should render the DetailSection for family history', () => {
    const ref = React.createRef<HTMLDivElement>()
    renderWithProviders(<DatamedCard user={user} componentRef={ref} />)
    expect(screen.getByTestId('detail-histórico familiar')).toBeInTheDocument()
    expect(
      screen.getByTestId('detail-content-histórico familiar'),
    ).toHaveTextContent('Heart Disease')
  })
})
