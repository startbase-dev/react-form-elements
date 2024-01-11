import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import PhoneInputModule from 'react-phone-number-input/input';
import { parsePhoneNumber, isSupportedCountry } from 'react-phone-number-input';
import { useDebouncedCallback } from 'use-debounce';
import flags from 'react-phone-number-input/flags';
import 'react-phone-number-input/style.css';
import Input from '../Input';
import s from './PhoneInput.module.css';

const Index = forwardRef(
  ({ name, onChange, value = '', ...rest }, inputRef) => {
    const phoneNumber = parsePhoneNumber(value);
    const isSupported = phoneNumber && isSupportedCountry(phoneNumber.country);

    const debounced = useDebouncedCallback((value) => {
      onChange({ target: { name, value } });
    }, 100);

    return (
      <div className={s.root}>
        <PhoneInputModule
          ref={inputRef}
          onChange={(v) => debounced(v)}
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

Index.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

Index.displayName = 'PhoneInput';

export default Index;
