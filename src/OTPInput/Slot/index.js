import React from 'react';
import s from './Slot.module.css';
import PropTypes from 'prop-types';
import cx from 'clsx';

function Slot({
  char,
  hasFakeCaret,
  isActive,
  disabled,
  inputClassName = null,
  error = false,
}) {
  return (
    <div
      className={cx(s.slot, {
        [s.slotDisabled]: disabled,
        [s.slotActive]: isActive,
        [s.slotError]: error,
        [inputClassName]: inputClassName,
      })}
    >
      {char !== null && <div>{char}</div>}
      {hasFakeCaret ? (
        <div className={s.caretRoot}>
          <div className={s.caret} />
        </div>
      ) : null}
    </div>
  );
}

Slot.propTypes = {
  hasFakeCaret: PropTypes.bool.isRequired,
  isActive: PropTypes.bool.isRequired,
  char: PropTypes.string,
  inputClassName: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
};

export default Slot;
