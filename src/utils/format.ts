export const formatCPF = (cpf: string) =>
  cpf
.replace(/\D/g, "")
.replace(/(\d{3})(\d)/, "$1.$2")
.replace(/(\d{3})(\d)/, "$1.$2")
.replace(/(\d{3})(\d{1,2})/, "$1-$2")
.replace(/(-\d{2})\d+?$/, "$1");
