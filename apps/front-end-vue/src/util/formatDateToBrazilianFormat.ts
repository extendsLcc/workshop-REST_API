const brazilianDateFormatter = new Intl.DateTimeFormat('pt-BR', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
});

export const formatDateToBrazilianFormat = (whichDate: Date) => {
  return brazilianDateFormatter.format(whichDate);
};
