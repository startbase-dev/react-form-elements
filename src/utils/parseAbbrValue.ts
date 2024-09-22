import { escapeRegExp } from './escapeRegExp';

type AbbrMap = Record<string, number>;

const abbrMap: AbbrMap = { k: 1000, m: 1000000, b: 1000000000 };

export const parseAbbrValue = (
  value: string,
  decimalSeparator = '.'
): number | undefined => {
  const reg = new RegExp(
    `(\\d+(${escapeRegExp(decimalSeparator)}\\d*)?)([kmb])$`,
    'i'
  );
  const match = value.match(reg);

  if (match) {
    const [, digits, , abbr] = match;
    const multiplier = abbrMap[abbr!.toLowerCase()];

    return Number(digits!.replace(decimalSeparator, '.')) * multiplier!;
  }

  return undefined;
};
