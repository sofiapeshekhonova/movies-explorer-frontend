import "./LoginAndRegisterForm.scss";

function LoginAndRegisterForm({children, buttonText, className}) {
  return (
    <form className="form" noValidate>
      {children}
      <button className={className} type="submit" aria-label={buttonText}>
        {buttonText}
      </button>
    </form>
  );
}

export default LoginAndRegisterForm;