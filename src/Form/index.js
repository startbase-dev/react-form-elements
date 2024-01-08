import React from 'react';

import PropTypes from 'prop-types';

import cx from 'classnames';

import s from './Form.module.css';

const Index = ({ children, ...rest }) => {
  return (
    <form className={cx(s.root)} {...rest}>
      {children}
    </form>
  );
};

Index.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.element]).isRequired,
};

export default Index;
