/** Escape HTML special characters. */
export function escapeHtml(s) {
    if (!s) return '';
    return String(s)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

/**
 * Escape HTML, then render inline **bold** and *italic* markers used in briefing JSON.
 * Bold is applied before italic so **…** is not misread as italic.
 */
export function formatInlineMarkup(s) {
    return escapeHtml(s)
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.+?)\*/g, '<em>$1</em>');
}
