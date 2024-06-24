import React from 'react'
import { render, screen } from '@testing-library/react'
import { PersonalInfoSection } from '../PersonalInfoSection'
import { User } from '../../../interfaces'
import AppProviders from '../../../../../components/AppProviders'

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

describe('PersonalInfoSection', () => {
  it('should render user name and age', () => {
    renderWithProviders(<PersonalInfoSection user={user} />)
    expect(screen.getByTestId('user-name')).toHaveTextContent('John Doe')
    expect(screen.getByTestId('user-age')).toHaveTextContent('30 anos')
  })

  it('should render all metrics', () => {
    renderWithProviders(<PersonalInfoSection user={user} />)
    expect(screen.getByTestId('metric-peso')).toBeInTheDocument()
    expect(screen.getByTestId('metric-altura')).toBeInTheDocument()
    expect(screen.getByTestId('metric-imc')).toBeInTheDocument()
    expect(screen.getByTestId('metric-tipo sanguíneo')).toBeInTheDocument()
  })

  it('should render all detail sections', () => {
    renderWithProviders(<PersonalInfoSection user={user} />)
    expect(screen.getByTestId('detail-alergias')).toBeInTheDocument()
    expect(screen.getByTestId('detail-doenças')).toBeInTheDocument()
    expect(screen.getByTestId('detail-medicações em uso')).toBeInTheDocument()
  })

  it('should display correct values for metrics', () => {
    renderWithProviders(<PersonalInfoSection user={user} />)
    expect(screen.getByTestId('metric-value-peso')).toHaveTextContent('70Kg')
    expect(screen.getByTestId('metric-value-altura')).toHaveTextContent('1.75m')
    expect(screen.getByTestId('metric-value-imc')).toHaveTextContent(
      '22.9kg/m²',
    )
    expect(screen.getByTestId('metric-value-tipo sanguíneo')).toHaveTextContent(
      'O+',
    )
  })

  it('should display correct content for detail sections', () => {
    renderWithProviders(<PersonalInfoSection user={user} />)
    expect(screen.getByTestId('detail-content-alergias')).toHaveTextContent(
      'Pollen',
    )
    expect(screen.getByTestId('detail-content-doenças')).toHaveTextContent(
      'Diabetes',
    )
    expect(
      screen.getByTestId('detail-content-medicações em uso'),
    ).toHaveTextContent('Metformin')
  })
})
