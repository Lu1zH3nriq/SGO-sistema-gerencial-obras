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
  const cpfLimpo = cpf.replace(/\D/g, ""); 
  
  if (cpfLimpo.length > 11) {
    throw new Error("CPF deve ter no máximo 11 dígitos.");
  }

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
  if (cnpj.length !== 14) {
    throw new Error("CNPJ deve ter 14 dígitos.");
  }

  const parte1 = cnpj.slice(0, 2);
  const parte2 = cnpj.slice(2, 5);
  const parte3 = cnpj.slice(5, 8);
  const parte4 = cnpj.slice(8, 12);
  const parte5 = cnpj.slice(12);

  return `${parte1}.${parte2}.${parte3}/${parte4}-${parte5}`;
}

export function removerFormatacaoCNPJ(cnpj) {
  return cnpj.replace(/\D/g, "");
}