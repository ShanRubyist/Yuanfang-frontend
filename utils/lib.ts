export function parseSSEMessage(message: string) {
    const lines = message.split('\n')
    const lineFields = []
    const lineValues = []
    for (const line of lines) {
        const { field, value } = parseSSELine(line)
        lineFields.push(field)
        lineValues.push(value)
    }
    if (new Set(lineFields).size > 1) {
        throw new Error(
            `Multiple fields appear in a message: ${new Set(lineFields).values()}`,
        )
    }
    return { field: lineFields[0], value: lineValues.join('\n') }
}

export function parseSSELine(line: string) {
    const pos = line.indexOf(': ')
    if (pos === -1)
        throw new Error(`Can't find ': ' in line '${line}'`)
    if (pos === 0)
        return { field: '', value: line.slice(2) }
    return {
        field: line.slice(0, pos),
        value: line.slice(pos + 2),
    }
}

export async function copyToClipboard(text: string) {
    if (!text) return
    try {
        return await navigator.clipboard.writeText(text)
    } catch {
        const element: HTMLTextAreaElement = document.createElement("textarea")
        const previouslyFocusedElement = document.activeElement

        element.value = text;

        // Prevent labelboard from showing on mobile
        (element.setAttribute as any)("readonly", "")
        (element.style as any).contain = "strict"
        element.style.position = "absolute"
        element.style.left = "-9999px"
        element.style.fontSize = "12pt" // Prevent zooming on iOS

        const selection = document.getSelection()
        const originalRange = selection
            ? selection.rangeCount > 0 && selection.getRangeAt(0)
            : null

        document.body.appendChild(element)
        element.select()

        // Explicit selection workaround for iOS
        element.selectionStart = 0
        element.selectionEnd = text.length

        document.execCommand("copy")
        document.body.removeChild(element)

        if (originalRange) {
            selection?.removeAllRanges() // originalRange can't be truthy when selection is falsy
            selection?.addRange(originalRange)
        }

        // Get the focus back on the previously focused element, if any
        if (previouslyFocusedElement) {
            ; (previouslyFocusedElement as HTMLElement).focus()
        }
    }
}