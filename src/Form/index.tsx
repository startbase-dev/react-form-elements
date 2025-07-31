import React, { ReactNode, HTMLProps } from 'react';
import cx from 'clsx';
import s from './Form.module.scss';
import { FormProvider, UseFormReturn } from 'react-hook-form';

interface FormProps extends HTMLProps<HTMLFormElement> {
  children: ReactNode;
  methods?: UseFormReturn;
}

const Form: React.FC<FormProps> = ({
  children,
  className,
  methods,
  ...rest
}) => {
  if (methods) {
    return (
      <FormProvider {...methods}>
        <form className={cx(s.root, className)} {...rest}>
          {children}
        </form>
      </FormProvider>
    );
  }

  return (
    <form className={cx(s.root, className)} {...rest}>
      {children}
    </form>
  );
};

export default Form;

export { type FormProps };
