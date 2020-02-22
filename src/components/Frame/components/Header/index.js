import React from 'react';
import { Typography } from '@material-ui/core';
import PropTypes from 'prop-types';

const Header = ({ logo, children }) => {
  return (
    <>
      <Typography variant="h6" noWrap>
        {logo}
      </Typography>
      {children}
    </>
  );
};

Header.propTypes = {
  logo: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  children: PropTypes.element
};

Header.defaultProps = {
  logo: undefined,
  children: undefined
};

export default Header;
