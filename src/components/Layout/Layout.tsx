import React from 'react';
import Appbar from '../AppBar/AppBar';

const Layout: React.FC<React.PropsWithChildren> = ({children}) => {
  return (
    <>
      <header>
        <Appbar />
      </header>
      <main className="container-fluid pt-2">
        {children}
      </main>
    </>

  );
};

export default Layout;