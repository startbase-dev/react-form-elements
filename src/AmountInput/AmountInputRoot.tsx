import React, {
  useState,
  useEffect,
  useRef,
  forwardRef,
  useMemo,
  useImperativeHandle,
  ElementType,
} from 'react';
import {
  isNumber,
  cleanValue,
  fixedDecimalValue,
  formatValue,
  getLocaleConfig,
  padTrimValue,
  CleanValueOptions,
  getSuffix,
  FormatValueOptions,
  repositionCursor,
} from '../utils';

type Overwrite<T, U> = Pick<T, Exclude<keyof T, keyof U>> & U;

export interface CurrencyInputOnChangeValues {
  float: number | null;
  formatted: string;
  value: string;
}

export interface IntlConfig {
  locale: string;
  currency?: string;
}

export type AmountInputRootProps = Overwrite<
  React.ComponentPropsWithRef<'input'>,
  {
    allowDecimals?: boolean;
    allowNegativeValue?: boolean;
    id?: string;
    maxLength?: number;
    className?: string;
    customInput?: ElementType;
    decimalsLimit?: number;
    decimalScale?: number;
    defaultValue?: number | string;
    disabled?: boolean;
    fixedDecimalLength?: number;
    onValueChange?: (
      value: string | undefined,
      name?: string,
      values?: CurrencyInputOnChangeValues
    ) => void;
    placeholder?: string;
    prefix?: string;
    suffix?: string;
    step?: number;
    decimalSeparator?: string;
    groupSeparator?: string;
    disableGroupSeparators?: boolean;
    disableAbbreviations?: boolean;
    intlConfig?: IntlConfig;
    transformRawValue?: (rawValue: string) => string;
    formatValueOnBlur?: boolean;
  }
>;

export const AmountInputRoot: React.ForwardRefExoticComponent<
  React.PropsWithoutRef<AmountInputRootProps> &
    React.RefAttributes<HTMLInputElement>
> = forwardRef<HTMLInputElement, AmountInputRootProps>(
  (
    {
      allowDecimals = true,
      allowNegativeValue = true,
      id,
      name,
      className,
      customInput,
      decimalsLimit,
      defaultValue,
      disabled = false,
      maxLength: userMaxLength,
      value: userValue,
      onValueChange,
      fixedDecimalLength,
      placeholder,
      decimalScale,
      prefix,
      suffix,
      intlConfig,
      step,
      min,
      max,
      disableGroupSeparators = false,
      disableAbbreviations = false,
      decimalSeparator: _decimalSeparator,
      groupSeparator: _groupSeparator,
      onChange,
      onFocus,
      onBlur,
      onKeyDown,
      onKeyUp,
      transformRawValue,
      formatValueOnBlur = true,
      ...props
    }: AmountInputRootProps,
    ref
  ) => {
    if (_decimalSeparator && isNumber(_decimalSeparator)) {
      throw new Error('decimalSeparator cannot be a number');
    }

    if (_groupSeparator && isNumber(_groupSeparator)) {
      throw new Error('groupSeparator cannot be a number');
    }

    const localeConfig = useMemo(
      () => getLocaleConfig(intlConfig),
      [intlConfig]
    );
    const decimalSeparator =
      _decimalSeparator || localeConfig.decimalSeparator || '';
    const groupSeparator = _groupSeparator || localeConfig.groupSeparator || '';

    if (
      decimalSeparator &&
      groupSeparator &&
      decimalSeparator === groupSeparator &&
      disableGroupSeparators === false
    ) {
      throw new Error('decimalSeparator cannot be the same as groupSeparator');
    }

    const formatValueOptions: Partial<FormatValueOptions> = {
      decimalSeparator,
      groupSeparator,
      disableGroupSeparators,
      intlConfig,
      prefix: prefix || localeConfig.prefix,
      suffix: suffix,
    };

    const cleanValueOptions: Partial<CleanValueOptions> = {
      decimalSeparator,
      groupSeparator,
      allowDecimals,
      decimalsLimit: decimalsLimit || fixedDecimalLength || 2,
      allowNegativeValue,
      disableAbbreviations,
      prefix: prefix || localeConfig.prefix,
      transformRawValue,
    };

    const [stateValue, setStateValue] = useState(() =>
      defaultValue != null
        ? formatValue({
            ...formatValueOptions,
            decimalScale,
            value: String(defaultValue),
          })
        : userValue != null
          ? formatValue({
              ...formatValueOptions,
              decimalScale,
              value: String(userValue),
            })
          : ''
    );
    const [dirty, setDirty] = useState(false);
    const [cursor, setCursor] = useState(0);
    const [changeCount, setChangeCount] = useState(0);
    const [lastKeyStroke, setLastKeyStroke] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

    const processChange = (
      value: string,
      selectionStart?: number | null
    ): void => {
      setDirty(true);

      const { modifiedValue, cursorPosition } = repositionCursor({
        selectionStart,
        value,
        lastKeyStroke,
        stateValue,
        groupSeparator,
      });

      const stringValue = cleanValue({
        value: modifiedValue,
        ...cleanValueOptions,
      });

      if (
        userMaxLength &&
        stringValue.replace(/-/g, '').length > userMaxLength
      ) {
        return;
      }

      if (
        stringValue === '' ||
        stringValue === '-' ||
        stringValue === decimalSeparator
      ) {
        if (onValueChange)
          onValueChange(undefined, name, {
            float: null,
            formatted: '',
            value: '',
          });
        setStateValue(stringValue);
        // Always sets cursor after '-' or decimalSeparator input
        setCursor(1);
        return;
      }

      const stringValueWithoutSeparator = decimalSeparator
        ? stringValue.replace(decimalSeparator, '.')
        : stringValue;

      const numberValue = parseFloat(stringValueWithoutSeparator);

      const formattedValue = formatValue({
        value: stringValue,
        ...formatValueOptions,
      });

      if (cursorPosition != null) {
        let newCursor = cursorPosition + (formattedValue.length - value.length);
        newCursor = newCursor <= 0 ? (prefix ? prefix.length : 0) : newCursor;

        setCursor(newCursor);
        setChangeCount(changeCount + 1);
      }

      setStateValue(formattedValue);

      if (onValueChange) {
        const values: CurrencyInputOnChangeValues = {
          float: numberValue,
          formatted: formattedValue,
          value: stringValue,
        };
        onValueChange(stringValue, name, values);
      }
    };

    const handleOnChange = (
      event: React.ChangeEvent<HTMLInputElement>
    ): void => {
      const {
        target: { value, selectionStart },
      } = event;

      processChange(value, selectionStart);

      if (onChange) onChange(event);
    };

    const handleOnFocus = (
      event: React.FocusEvent<HTMLInputElement>
    ): number => {
      if (onFocus) onFocus(event);
      return stateValue ? stateValue.length : 0;
    };

    const handleOnBlur = (event: React.FocusEvent<HTMLInputElement>): void => {
      const {
        target: { value },
      } = event;

      const valueOnly = cleanValue({ value, ...cleanValueOptions });

      if (valueOnly === '-' || valueOnly === decimalSeparator || !valueOnly) {
        setStateValue('');
        if (onBlur) onBlur(event);
        return;
      }

      const fixedDecimals = fixedDecimalValue(
        valueOnly,
        decimalSeparator,
        fixedDecimalLength
      );

      const newValue = padTrimValue(
        fixedDecimals,
        decimalSeparator,
        decimalScale !== undefined ? decimalScale : fixedDecimalLength
      );

      const numberValue = parseFloat(newValue.replace(decimalSeparator, '.'));

      const formattedValue = formatValue({
        ...formatValueOptions,
        value: newValue,
      });

      if (onValueChange && formatValueOnBlur) {
        onValueChange(newValue, name, {
          float: numberValue,
          formatted: formattedValue,
          value: newValue,
        });
      }

      setStateValue(formattedValue);

      if (onBlur) onBlur(event);
    };

    const handleOnKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      const { key } = event;

      setLastKeyStroke(key);

      if (step && (key === 'ArrowUp' || key === 'ArrowDown')) {
        event.preventDefault();
        setCursor(stateValue.length);

        const currentValue =
          parseFloat(
            userValue != null
              ? String(userValue).replace(decimalSeparator, '.')
              : cleanValue({ value: stateValue, ...cleanValueOptions })
          ) || 0;
        const newValue =
          key === 'ArrowUp' ? currentValue + step : currentValue - step;

        if (min !== undefined && newValue < Number(min)) {
          return;
        }

        if (max !== undefined && newValue > Number(max)) {
          return;
        }

        const fixedLength = String(step).includes('.')
          ? Number(String(step).split('.')[1]!.length)
          : undefined;

        processChange(
          String(
            fixedLength ? newValue.toFixed(fixedLength) : newValue
          ).replace('.', decimalSeparator)
        );
      }

      if (onKeyDown) onKeyDown(event);
    };

    const handleOnKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
      const {
        key,
        currentTarget: { selectionStart },
      } = event;
      if (key !== 'ArrowUp' && key !== 'ArrowDown' && stateValue !== '-') {
        const suffix = getSuffix(stateValue, {
          groupSeparator,
          decimalSeparator,
        });

        if (
          suffix &&
          selectionStart &&
          selectionStart > stateValue.length - suffix.length
        ) {
          if (inputRef.current) {
            const newCursor = stateValue.length - suffix.length;
            inputRef.current.setSelectionRange(newCursor, newCursor);
          }
        }
      }

      if (onKeyUp) onKeyUp(event);
    };

    useEffect(() => {
      if (userValue == null && defaultValue == null) {
        setStateValue('');
      }
    }, [defaultValue, userValue]);

    useEffect(() => {
      if (
        dirty &&
        stateValue !== '-' &&
        inputRef.current &&
        document.activeElement === inputRef.current
      ) {
        inputRef.current.setSelectionRange(cursor, cursor);
      }
    }, [stateValue, cursor, inputRef, dirty, changeCount]);

    const getRenderValue = () => {
      if (
        userValue != null &&
        stateValue !== '-' &&
        (!decimalSeparator || stateValue !== decimalSeparator)
      ) {
        return formatValue({
          ...formatValueOptions,
          decimalScale: dirty ? undefined : decimalScale,
          value: String(userValue),
        });
      }

      return stateValue;
    };

    const inputProps: React.ComponentPropsWithRef<'input'> = {
      type: 'text',
      inputMode: 'decimal',
      id,
      name,
      className,
      onChange: handleOnChange,
      onBlur: handleOnBlur,
      onFocus: handleOnFocus,
      onKeyDown: handleOnKeyDown,
      onKeyUp: handleOnKeyUp,
      placeholder,
      disabled,
      value: getRenderValue(),
      ref: inputRef,
      ...props,
    };

    if (customInput) {
      const CustomInput = customInput;
      return <CustomInput {...inputProps} />;
    }

    return <input {...inputProps} />;
  }
);

AmountInputRoot.displayName = 'AmountInputRoot';

export default AmountInputRoot;
