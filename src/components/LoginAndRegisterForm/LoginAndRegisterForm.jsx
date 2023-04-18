import "./LoginAndRegisterForm.scss";

function LoginAndRegisterForm({children, buttonText, className, disabled, onSubmit}) {
  return (
    <form className="form" noValidate>
      {children}
      <button className={className} type="submit" aria-label={buttonText} disabled={disabled} onClick={onSubmit}>
        {buttonText}
      </button>
    </form>
  );
}

export default LoginAndRegisterForm;