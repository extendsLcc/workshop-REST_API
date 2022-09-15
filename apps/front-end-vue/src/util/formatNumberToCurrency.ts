const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

export const formatNumberToCurrency = (whichNumber: number) => {
  return currencyFormatter.format(whichNumber);
};
