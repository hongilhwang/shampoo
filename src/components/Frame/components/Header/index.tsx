import React from 'react';
import { Typography } from '@material-ui/core';

interface HeaderProps {
  logo: React.ReactElement | string;
  children: React.ReactElement;
}

const Header: React.FunctionComponent<HeaderProps> = ({
  logo,
  children
}: HeaderProps): React.ReactElement => {
  return (
    <>
      <Typography variant="h6" noWrap>
        {logo}
      </Typography>
      {children}
    </>
  );
};

Header.defaultProps = {
  logo: undefined,
  children: undefined
};

export default Header;
