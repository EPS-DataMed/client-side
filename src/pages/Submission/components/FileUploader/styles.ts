import styled from 'styled-components'
import { scaleAnimation } from '../../../../styles/animations'

export const Container = styled.div`
  box-shadow: rgba(0, 0, 0, 0.16) 0px 0px 3px 0px;
  height: 360px;
  width: 346px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`

export const FileContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const FileName = styled.h3`
  font-weight: ${({ theme }) => theme.fontWeights.regular};
`

export const FileInfoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space[2]};
`

export const ContentButtonExclude = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space[1]};
`

interface FileUploaderProps {
  variant: 'invalid' | 'valid'
}

export const FileUploader = styled.div<FileUploaderProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-spacing: ${({ theme }) => theme.space[2]};
  padding: ${({ theme }) => theme.space[5]};
  background-image: url('data:image/svg+xml,%3csvg width="100%25" height="100%25" xmlns="http://www.w3.org/2000/svg"%3e%3crect width="100%25" height="100%25" fill="none" stroke="grey" stroke-width="4" stroke-dasharray="8" stroke-dashoffset="0" stroke-linecap="round"/%3e%3c/svg%3e');
  cursor: grab;
  height: 360px;
  width: 346px;

  ${({ variant }) =>
    variant === 'invalid' &&
    `
    background-image: url('data:image/svg+xml,%3csvg width="100%25" height="100%25" xmlns="http://www.w3.org/2000/svg"%3e%3crect width="100%25" height="100%25" fill="none" stroke="red" stroke-width="4" stroke-dasharray="8" stroke-dashoffset="0" stroke-linecap="round"/%3e%3c/svg%3e');
  `}
`

export const WrapperIconAndMessageUpload = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.space[3]};
`

export const AnimationUploadIcon = styled.div`
  animation: ${scaleAnimation} 2s ease infinite;
`

export const MessageUpload = styled.span`
  font-weight: normal;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  text-align: center;
`

export const MessageUploadBold = styled.span`
  font-weight: bold;
`

export const MessageUploadError = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.red500};
`

export const MessageUploadDescription = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  margin-left: ${({ theme }) => theme.space[4]};
`
