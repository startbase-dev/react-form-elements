import React from 'react';
import s from './Slot.module.css';
import cx from 'clsx';

interface SlotProps {
  char?: string | null;
  hasFakeCaret: boolean;
  isActive: boolean;
  disabled?: boolean;
  inputClassName?: string;
  error?: boolean;
}

const Slot: React.FC<SlotProps> = ({
  char,
  hasFakeCaret,
  isActive,
  disabled,
  inputClassName,
  error = false,
}) => {
  return (
    <div
      className={cx(s.slot, {
        [s.slotDisabled]: disabled,
        [s.slotActive]: isActive,
        [s.slotError]: error,
        ...(inputClassName ? { [inputClassName]: true } : {}),
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
};

export default Slot;
