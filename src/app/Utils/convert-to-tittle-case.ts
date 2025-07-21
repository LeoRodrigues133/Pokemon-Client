export function ToTitleCase(texto: string): string {
  if (texto.length < 0) return texto;

  return texto[0].toUpperCase() + texto.substring(1).toLowerCase();
}
