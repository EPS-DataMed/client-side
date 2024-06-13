import { useEffect } from 'react'

export function TitleUpdater({ title }: { title: string }) {
  useEffect(() => {
    document.title = `Datamed • ${title}`
    return () => {
      document.title = 'Datamed'
    }
  }, [title])

  return null
}
