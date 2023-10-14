import React from 'react';

import cx from 'classnames';

import s from './Form.module.css';

const Form = ({ children, ...rest }) => {
  return (
    <form className={cx(s.root)} {...rest}>
      {children}
    </form>
  );
};

Form.propTypes = {};

Form.defaultProps = {};

export default Form;
