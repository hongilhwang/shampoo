import React from 'react';
import { Typography } from "@material-ui/core";

const Header = ({logo, children}) => {

  return (
    <>
      <Typography variant="h6" noWrap>
        {logo}
      </Typography>
      {children}
    </>
  );
};

export default Header;
