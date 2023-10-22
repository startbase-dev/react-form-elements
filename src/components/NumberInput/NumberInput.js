import React from 'react';

import PropTypes from 'prop-types';

import Input from '../Input/Input';
import s from './NumberInput.module.css';

function NumberInput({ value, onChange, name, ...rest }) {
  const handleIncrease = () => {
    handleChange(parseInt(value) + 1);
  };

  const handleDecrease = () => {
    handleChange(parseInt(value) - 1);
  };

  const handleChange = (value) => {
    onChange({
      target: {
        name: name,
        value: value,
      },
    });
  };

  return (
    <Input
      {...rest}
      type="number"
      name={name}
      value={value}
      onChange={onChange}
      append={
        <div className={s.buttons}>
          <button type="button" className={s.button} onClick={handleIncrease}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlSpace="preserve"
              width={12}
              height={12}
              viewBox="0 0 330 330"
            >
              <path
                fill={'currentColor'}
                d="m325.606 229.393-150.004-150a14.997 14.997 0 0 0-21.213.001l-149.996 150c-5.858 5.858-5.858 15.355 0 21.213 5.857 5.857 15.355 5.858 21.213 0l139.39-139.393 139.397 139.393A14.953 14.953 0 0 0 315 255a14.95 14.95 0 0 0 10.607-4.394c5.857-5.858 5.857-15.355-.001-21.213z"
              />
            </svg>
          </button>
          <button type="button" className={s.button} onClick={handleDecrease}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlSpace="preserve"
              width={12}
              height={12}
              viewBox="0 0 330 330"
            >
              <path
                fill={'currentColor'}
                d="M325.607 79.393c-5.857-5.857-15.355-5.858-21.213.001l-139.39 139.393L25.607 79.393c-5.857-5.857-15.355-5.858-21.213.001-5.858 5.858-5.858 15.355 0 21.213l150.004 150a14.999 14.999 0 0 0 21.212-.001l149.996-150c5.859-5.857 5.859-15.355.001-21.213z"
              />
            </svg>
          </button>
        </div>
      }
    />
  );
}

NumberInput.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default NumberInput;
