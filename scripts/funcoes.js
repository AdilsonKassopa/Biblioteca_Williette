export function tempoRelativoCompleto(dataString) {
  const agora = new Date();
  const data = new Date(dataString);

  const diffMs = agora - data;

  const segundos = Math.floor(diffMs / 1000);
  const minutos = Math.floor(segundos / 60);
  const horas = Math.floor(minutos / 60);
  const dias = Math.floor(horas / 24);
  const meses = Math.floor(dias / 30);
  const anos = Math.floor(dias / 365);

  if (segundos < 60) return `há ${segundos} segundos`;
  if (minutos < 60) return `há ${minutos} minutos`;
  if (horas < 24) return `há ${horas} horas`;
  if (dias < 30) return `há ${dias} dias`;
  if (meses < 12) return `há ${meses} meses`;
  return `há ${anos} anos`;
}