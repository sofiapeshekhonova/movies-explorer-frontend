import Header from "../Header/Header";

function Layout({ className, title, children, isLoggedIn }) {
  return (
    <>
      <Header isLoggedIn={isLoggedIn} className={className}/>
      {children}
    </>
  );
}

export default Layout;
