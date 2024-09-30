import React, { ReactNode, HTMLProps } from 'react';
import cx from 'clsx';
import s from './Form.module.scss';

interface FormProps extends HTMLProps<HTMLFormElement> {
  children: ReactNode;
}

const Form: React.FC<FormProps> = ({ children, ...rest }) => {
  return (
    <form className={cx(s.root)} {...rest}>
      {children}
    </form>
  );
};

export default Form;

export { type FormProps };
