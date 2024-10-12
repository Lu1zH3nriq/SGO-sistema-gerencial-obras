export function formatarTelefone(telefone) {
  if (!telefone) {
    return "";
  }
  const apenasNumeros = telefone.replace(/\D/g, "");
  if (apenasNumeros.length <= 2) {
    return `(${apenasNumeros}`;
  } else if (apenasNumeros.length <= 7) {
    return `(${apenasNumeros.slice(0, 2)}) ${apenasNumeros.slice(2)}`;
  } else if (apenasNumeros.length <= 11) {
    return `(${apenasNumeros.slice(0, 2)}) ${apenasNumeros.slice(
      2,
      7
    )}-${apenasNumeros.slice(7)}`;
  } else {
    return "Número de telefone inválido";
  }
}

export function removerFormatacaoTelefone(numero) {
  return numero.replace(/\D/g, "");
}

export function formatarCPF(cpf) {
  if (!cpf) return '';
  const cpfLimpo = cpf.replace(/\D/g, "");


  const parte1 = cpfLimpo.slice(0, 3);
  const parte2 = cpfLimpo.slice(3, 6);
  const parte3 = cpfLimpo.slice(6, 9);
  const parte4 = cpfLimpo.slice(9);

  let cpfFormatado = parte1;
  if (parte2) cpfFormatado += `.${parte2}`;
  if (parte3) cpfFormatado += `.${parte3}`;
  if (parte4) cpfFormatado += `-${parte4}`;

  return cpfFormatado;
}

export function removerFormatacaoCPF(cpf) {
  return cpf.replace(/\D/g, "");
}

export function formatarData(data) {
  const date = new Date(data);
  const dia = String(date.getUTCDate()).padStart(2, "0");
  const mes = String(date.getUTCMonth() + 1).padStart(2, "0");
  const ano = date.getUTCFullYear();

  return `${dia}/${mes}/${ano}`;
}

export function formatarDataISO(data) {
  return new Date(data).toISOString();
}

export function formatarCNPJ(cnpj) {
  if (!cnpj) return '';
  const cnpjLimpo = cnpj.replace(/\D/g, "");


  const parte1 = cnpjLimpo.slice(0, 2);
  const parte2 = cnpjLimpo.slice(2, 5);
  const parte3 = cnpjLimpo.slice(5, 8);
  const parte4 = cnpjLimpo.slice(8, 12);
  const parte5 = cnpjLimpo.slice(12);

  let cnpjFormatado = parte1;
  if (parte2) cnpjFormatado += `.${parte2}`;
  if (parte3) cnpjFormatado += `.${parte3}`;
  if (parte4) cnpjFormatado += `/${parte4}`;
  if (parte5) cnpjFormatado += `-${parte5}`;

  return cnpjFormatado;
}

export function removerFormatacaoCNPJ(cnpj) {
  return cnpj.replace(/\D/g, "");
}

export function formatarOrcamento(valor) {
  if (typeof valor !== 'number' && typeof valor !== 'string') return '';

  const numero = typeof valor === 'string' ? parseFloat(valor.replace(/\D/g, '')) : valor;

  const numeroFormatado = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  }).format(numero / 100);

  return numeroFormatado;
}

export function removerFormatacaoOrcamento(valorFormatado) {
  if (typeof valorFormatado !== 'string') return '';
  return valorFormatado.replace(/\D/g, '');
};