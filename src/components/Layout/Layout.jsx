import Footer from "../Footer/Footer";
import Header from "../Header/Header";

function Layout({ className, children, isLoggedIn, page, onOpenBurgerPopup }) {
  return (
    <>
      <Header isLoggedIn={isLoggedIn} className={className} onOpenBurgerPopup={onOpenBurgerPopup}/>
          {children}
      <Footer page={page} />
    </>
  );
}

export default Layout;
