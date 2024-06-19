interface CreateDownloadLinkProps {
  data: Blob
  fileName: string
}

export const createDownloadLink = ({
  data,
  fileName,
}: CreateDownloadLinkProps) => {
  const url = window.URL.createObjectURL(data)
  const a = document.createElement('a')
  a.href = url
  a.download = fileName
  document.body.appendChild(a)
  a.click()
  a.remove()
}
