import { ComponentProps } from 'react'
import { Dialog } from '../Dialog'
import { ButtonProps, DialogItemToRender } from './interfaces'
import * as S from './styles'
import { CloseIcon } from '../Dialog/icons/CloseIcon'
import { PrimaryButton } from '../PrimaryButton'
import { defaultTheme } from '../../styles/themes/default'
import { Spinner } from '../Spinner'

type Props = ComponentProps<typeof Dialog.Root>

interface DialogCredentialOptionsProps extends Props {
  isDialogControlledOpen: boolean
  handleUpdateDialogControlled: (open: boolean) => void
  dialogItemToRender: DialogItemToRender
  isLoadingRequisition: boolean
  onSubmit?: any
  onClose?: () => void
  blockClickOutsideDialog?: boolean
}

export function DialogControlled({
  handleUpdateDialogControlled,
  isDialogControlledOpen,
  dialogItemToRender,
  isLoadingRequisition,
  onSubmit,
  onClose,
  blockClickOutsideDialog = false,
}: DialogCredentialOptionsProps) {
  const buttonWithSubmit =
    !!dialogItemToRender?.buttonConfig &&
    dialogItemToRender?.buttonConfig.some((button) => button.type === 'submit')

  const spaceAfterTitle = dialogItemToRender.spaceAfterTitle || '20px'
  const dialogContentWidth = dialogItemToRender.width || '32rem'
  const dialogItemToRendeMarginTopButton =
    dialogItemToRender.marginTopWrapperButton || '32px'

  function handleOutsideClick() {
    if (!isLoadingRequisition) {
      if (onClose) onClose()
      handleUpdateDialogControlled(false)
    }
  }

  const renderCloseIcon = () => {
    if (!dialogItemToRender.hideCloseButton) {
      return (
        <Dialog.CloseIconButton
          asChild
          onClick={isLoadingRequisition ? undefined : handleOutsideClick}
          data-testid="close-icon-button"
        >
          <Dialog.CloseIconButton asChild>
            <CloseIcon />
          </Dialog.CloseIconButton>
        </Dialog.CloseIconButton>
      )
    }

    return null
  }

  const renderTitle = () => {
    if (!dialogItemToRender.title) return null

    return (
      <S.WrapperTitle
        style={{ marginBottom: spaceAfterTitle }}
        data-testid="dialog-title-wrapper"
      >
        <Dialog.Title>{dialogItemToRender.title}</Dialog.Title>
      </S.WrapperTitle>
    )
  }

  const renderDescription = () => {
    if (!dialogItemToRender.description) return null

    return (
      <Dialog.Description data-testid="dialog-description">
        {dialogItemToRender.description}
      </Dialog.Description>
    )
  }

  const renderButton = (button: ButtonProps) => {
    const canShowSpinnerLoading = isLoadingRequisition && button.id !== 'back'

    const commonButtonProps = {
      key: button.id,
      variant: button.variant,
      size: button.size || 'sm',
      disabled: button.disabled || isLoadingRequisition,
      children: canShowSpinnerLoading ? (
        <div
          style={{
            display: 'flex',
            gap: '4px',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          Carregando
          <Spinner
            customColor={
              button.id === 'delete' ? defaultTheme.colors.red500 : ''
            }
          />
        </div>
      ) : (
        <>
          {button?.icon && button.icon}
          {button.label}
        </>
      ),
    }

    const buttonStyle: React.CSSProperties = {}

    if (button.color) {
      buttonStyle.color = button.color
    }
    if (button.backgroundColor) {
      buttonStyle.backgroundColor = button.backgroundColor
    }
    if (button.borderColor) {
      buttonStyle.borderColor = button.borderColor
      buttonStyle.borderWidth = '1px'
      buttonStyle.borderStyle = 'solid'
    }

    if (button.type === 'submit') {
      return (
        <PrimaryButton
          style={Object.keys(buttonStyle).length > 0 ? buttonStyle : undefined}
          {...commonButtonProps}
          type={button.type}
          data-testid={`button-${button.id}`}
        />
      )
    } else {
      return (
        <PrimaryButton
          {...commonButtonProps}
          type={button.type || 'button'}
          style={Object.keys(buttonStyle).length > 0 ? buttonStyle : undefined}
          onClick={
            button.action as unknown as React.MouseEventHandler<HTMLButtonElement>
          }
          data-testid={`button-${button.id}`}
        />
      )
    }
  }

  const renderContent = () => {
    return (
      <Dialog.Content
        onInteractOutside={
          blockClickOutsideDialog ? undefined : handleOutsideClick
        }
        style={{
          width: dialogContentWidth,
        }}
        data-testid="dialog-content"
      >
        {renderCloseIcon()}
        {renderTitle()}
        {renderDescription()}
        {dialogItemToRender.component}
        {!!dialogItemToRender?.buttonConfig && (
          <S.WrapperActionButtons
            style={{
              marginTop: dialogItemToRendeMarginTopButton,
            }}
            data-testid="dialog-buttons-wrapper"
          >
            {dialogItemToRender.buttonConfig.map((button) =>
              renderButton(button),
            )}
          </S.WrapperActionButtons>
        )}
      </Dialog.Content>
    )
  }
  return (
    <Dialog.Root open={isDialogControlledOpen} data-testid="dialog-root">
      <Dialog.Portal>
        <Dialog.Overlay data-testid="dialog-overlay" />
        {buttonWithSubmit ? (
          <form
            autoComplete="off"
            onSubmit={onSubmit}
            data-testid="dialog-form"
          >
            {renderContent()}
          </form>
        ) : (
          renderContent()
        )}
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export { useDialogControlled } from './hooks/useDialogControlled'
export type { DialogControlledState } from './hooks/useDialogControlled'

export type {
  DialogItemToRender,
  ButtonProps as ButtonDialogItemProps,
} from './interfaces'
