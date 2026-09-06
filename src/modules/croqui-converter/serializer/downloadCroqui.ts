/**
 * Sanitiza o nome do arquivo para garantir compatibilidade com sistemas operacionais (Windows, Linux, macOS)
 */
export function sanitizeFileName(name: string, fallback = 'croqui_convertido'): string {
  if (!name || typeof name !== 'string') {
    return fallback;
  }

  let cleaned = name.trim().replace(/\.croqui$/i, '');
  cleaned = cleaned.replace(/[\\/:*?"<>|]+/g, '_');
  cleaned = cleaned.replace(/\s+/g, '_');

  return cleaned.trim() || fallback;
}

/**
 * Dispara o download nativo do arquivo .croqui no navegador
 */
export function downloadCroquiBlob(blob: Blob, baseName: string): string {
  const safeName = sanitizeFileName(baseName);
  const fullName = `${safeName}.croqui`;

  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = fullName;
  anchor.style.display = 'none';

  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);

  setTimeout(() => {
    URL.revokeObjectURL(url);
  }, 2000);

  return fullName;
}
