import React from 'react';

interface CurrencyDisplayProps {
  amount: number;
  language: string;
}

function CurrencyDisplay({ amount, language }: CurrencyDisplayProps) {
  const formatCurrency = (value: number) => {
    const options = {
      style: 'currency',
      currency: language === 'pt' ? 'BRL' : 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    };

    return new Intl.NumberFormat(
      language === 'pt' ? 'pt-BR' : language === 'es' ? 'es' : 'en-US',
      options
    ).format(value);
  };

  return <span>{formatCurrency(amount)}</span>;
}

export default CurrencyDisplay