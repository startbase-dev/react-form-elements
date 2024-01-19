import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import Input from '../Input';
import s from './PhoneInput.module.css';
import { usePhoneInput, FlagImage } from 'react-international-phone';

const Index = forwardRef(
  (
    { name, onChange, value = '', defaultCountry = 'us', ...rest },
    inputRef
  ) => {
    const phoneInput = usePhoneInput({
      defaultCountry: defaultCountry,
      value,
      onChange: ({ phone }) => {
        onChange({
          target: {
            name: name,
            value: phone,
          },
        });
      },
      inputRef: inputRef,
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

Index.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  defaultCountry: PropTypes.string,
};

Index.displayName = 'PhoneInput';

export default Index;
