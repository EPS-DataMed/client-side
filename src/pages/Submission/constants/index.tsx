import { LoadFileIcon } from '../components/StepBox/icons/LoadFileIcon'
import { CheckIcon } from '../components/StepBox/icons/CheckIcon'

interface EnabledOptionProps {
  [key: string]: {
    message: string
    icon: () => JSX.Element | null
    animation: 'slide' | 'vertical' | 'rotate' | 'fadeIn'
    typeAnimation: 'infinite' | 'linear' | 'ease-in-out'
    enabled: boolean
    timeAnimation: string
  }
}

export const SUBMIT_EXAM_OPTIONS: EnabledOptionProps = {
  SUCCESS: {
    message: `Exame(s) carregados com sucesso! Gerencie-os ao lado.`,
    icon: CheckIcon,
    animation: 'fadeIn',
    typeAnimation: 'linear',
    enabled: true,
    timeAnimation: '2s',
  },
  NO_FILE: {
    message: `Não existem exame(s) para serem carregados.`,
    icon: LoadFileIcon,
    animation: 'slide',
    typeAnimation: 'infinite',
    enabled: false,
    timeAnimation: '2s',
  },
  PENDING: {
    message: `Carregando arquivo(s)...`,
    icon: LoadFileIcon,
    animation: 'rotate',
    typeAnimation: 'infinite',
    enabled: true,
    timeAnimation: '2s',
  },
}
