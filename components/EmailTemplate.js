const EmailTemplate = ({ name, email, message }) => {
  return (
    <div className="flex flex-col gap-10">
      <div className="text-lg">Email - {email}</div>

      <div className="text-lg">Name - {name}</div>

      <p>{message}</p>
    </div>
  );
};

export default EmailTemplate;
