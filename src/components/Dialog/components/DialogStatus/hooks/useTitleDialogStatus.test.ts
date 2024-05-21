import { useTitleDialogStatus } from './useTitleDialogStatus'

describe('useTitleDialogStatus', () => {
  it('returns the full string wrapped in <span> when substring is not found', () => {
    const fullString = 'Hello, world!'
    const substring = 'test'

    const result = useTitleDialogStatus({ fullString, substring })

    expect(result).toBe('<span>Hello, world!</span>')
  })

  it('returns the string with the substring wrapped in <b> when substring is found', () => {
    const fullString = 'Hello, world!'
    const substring = 'world'

    const result = useTitleDialogStatus({ fullString, substring })

    expect(result).toBe('<span>Hello, <b>world</b>!</span>')
  })

  it('returns the string with the substring wrapped in <b> when substring is at the beginning', () => {
    const fullString = 'Hello, world!'
    const substring = 'Hello'

    const result = useTitleDialogStatus({ fullString, substring })

    expect(result).toBe('<span><b>Hello</b>, world!</span>')
  })

  it('returns the string with the substring wrapped in <b> when substring is at the end', () => {
    const fullString = 'Hello, world!'
    const substring = 'world!'

    const result = useTitleDialogStatus({ fullString, substring })

    expect(result).toBe('<span>Hello, <b>world!</b></span>')
  })

  it('handles the case where the substring is the entire string', () => {
    const fullString = 'Hello'
    const substring = 'Hello'

    const result = useTitleDialogStatus({ fullString, substring })

    expect(result).toBe('<span><b>Hello</b></span>')
  })

  it('handles the case where the substring appears multiple times', () => {
    const fullString = 'Hello, world! Hello again!'
    const substring = 'Hello'

    const result = useTitleDialogStatus({ fullString, substring })

    expect(result).toBe('<span><b>Hello</b>, world! Hello again!</span>')
  })
})
