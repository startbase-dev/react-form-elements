import React from 'react';

import PropTypes from 'prop-types';

import cx from 'classnames';

import s from './Form.module.css';

const Form = ({ children, ...rest }) => {
  return (
    <form className={cx(s.root)} {...rest}>
      {children}
    </form>
  );
};

Form.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.element]).isRequired,
};

export default Form;
