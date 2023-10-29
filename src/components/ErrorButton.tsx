function ErrorButton() {
  const throwError = () => {
    throw new Error('This is a test error.');
  };

  return (
    <button
      type="button"
      onClick={throwError}
      style={{
        color: 'red',
        padding: '0.2rem 0.5rem',
      }}
    >
      Throw Test Error
    </button>
  );
}

export default ErrorButton;
