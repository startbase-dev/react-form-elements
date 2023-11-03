import React, { forwardRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import DOMPurify from 'dompurify';
import PhoneInputModule from 'react-phone-number-input/input';
import { parsePhoneNumber, isSupportedCountry } from 'react-phone-number-input';
import flags from 'react-phone-number-input/flags';
import 'react-phone-number-input/style.css';
import Input from '../Input/Input';
import s from './PhoneInput.module.css';

const PhoneInput = forwardRef(
  ({ name, onChange, value = '', ...rest }, inputRef) => {
    const handleChange = useCallback(
      (value) => {
        onChange({ target: { name, value: DOMPurify.sanitize(value) } });
      },
      [name, onChange]
    );

    const phoneNumber = parsePhoneNumber(value);
    const isSupported = phoneNumber && isSupportedCountry(phoneNumber.country);

    return (
      <div className={s.root}>
        <PhoneInputModule
          ref={inputRef}
          onChange={handleChange}
          inputComponent={Input}
          name={name}
          value={value}
          {...rest}
          append={
            <>
              {phoneNumber && isSupported
                ? flags[phoneNumber?.country]({ title: phoneNumber?.country })
                : null}
            </>
          }
          appendClassName={s.prepend}
        />
      </div>
    );
  }
);

PhoneInput.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

PhoneInput.displayName = 'PhoneInput';

export default PhoneInput;
