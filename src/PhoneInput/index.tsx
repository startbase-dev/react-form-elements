import React, { forwardRef } from 'react';
import Input, { type InputProps } from '../Input';
import s from './PhoneInput.module.css';
import { usePhoneInput, FlagImage } from 'react-international-phone';

interface PhoneInputProps extends InputProps {
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string | number;
  defaultCountry?: string;
  [key: string]: any;
}

const PhoneInput = forwardRef<HTMLInputElement, PhoneInputProps>(
  (
    { name, onChange, value = '', defaultCountry = 'us', ...rest },
    inputRef
  ) => {
    const phoneInput = usePhoneInput({
      defaultCountry,
      value,
      onChange: ({ phone }) => {
        onChange({
          target: {
            name,
            value: phone,
          },
        });
      },
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      inputRef,
    });

    return (
      <div className={s.root}>
        <Input
          ref={phoneInput.inputRef}
          onChange={phoneInput.handlePhoneValueChange}
          name={name}
          type="tel"
          value={phoneInput.inputValue}
          {...rest}
          append={<FlagImage iso2={phoneInput.country.iso2} size="24px" />}
          appendClassName={s.prepend}
        />
      </div>
    );
  }
);

PhoneInput.displayName = 'PhoneInput';

export default PhoneInput;
