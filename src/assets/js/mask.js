export function formatarCpfCnpj(cpfCnpj) {
  cpfCnpj = cpfCnpj.replace(/\D/g, "");

  if (cpfCnpj.length > 11) {
    // Máscara de CNPJ
    cpfCnpj = cpfCnpj.replace(
      /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
      "$1.$2.$3/$4-$5"
    );
  } else {
    // Máscara de cpfCnpj
    cpfCnpj = cpfCnpj.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  }

  return cpfCnpj;
}

export function formatarCel(cel) {
  cel = cel.replace(/\D/g, "");
  cel = cel.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");

  return cel;
}

export function formatarTel(tel) {
  tel = tel.replace(/\D/g, "");
  tel = tel.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");

  return tel;
}
