import { formatNumberToCurrency } from './formatNumberToCurrency';
import { convertCentsToBrl } from './convertCentsToBrl';

export const formatCentsToBrlCurrency = (cents: number) => {
  return formatNumberToCurrency(convertCentsToBrl(cents));
};
