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
  if (cpf.length !== 11) {
    throw new Error("CPF deve ter 11 dígitos.");
  }

  const parte1 = cpf.slice(0, 3);
  const parte2 = cpf.slice(3, 6);
  const parte3 = cpf.slice(6, 9);
  const parte4 = cpf.slice(9);

  return `${parte1}.${parte2}.${parte3}-${parte4}`;
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
