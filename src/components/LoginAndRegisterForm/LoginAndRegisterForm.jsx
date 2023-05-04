import "./LoginAndRegisterForm.scss";

function LoginAndRegisterForm({ children, buttonText, className, disabled, onSubmit, }) {
  return (
    <form className="form" noValidate onSubmit={onSubmit}>
      {children}
      <button
        className={className}
        type="submit"
        aria-label={buttonText}
        disabled={disabled}
      >
        {buttonText}
      </button>
    </form>
  );
}

export default LoginAndRegisterForm;
