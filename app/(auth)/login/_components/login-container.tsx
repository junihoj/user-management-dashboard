import LoginForm from "./login-form";

const LoginContainer = () => {
  return (
    <div className="w-full h-full flex  flex-col items-center justify-center">
      <div className="w-1/3 max-h-[80dvh] bg-white p-10 rounded-2xl flex flex-col gap-y-8">
        <header className="flex justify-center">
          <h1>Welcome Back</h1>
        </header>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginContainer;
