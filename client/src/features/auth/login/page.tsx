import { Button } from '@/components/ui/button';
import { AuthForm } from '../authFormLayout';
import { Link } from 'react-router-dom';

export default function LoginPage() {
  const handleLoginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle login logic here
  };
  return (
    <div className="flex items-center justify-between w-screen h-screen bg-black">
      {/* Left Section */}
      <div className="ml-24">
        <div className="flex items-center gap-2 mb-10">
          <img
            className="size-[184px]"
            src="./src/assets/logo.svg"
            alt=""
          />
        </div>
        <h1 className="text-5xl font-semibold text-white">
          Easy, Fast and Reliable
        </h1>
        <p className="mt-6 text-lg text-gray-400 text-balance">
          Go shopping for merchandise, just go to dumb merch shopping. The
          biggest merchandise in{' '}
          <span className="font-extrabold text-white">Indonesia</span>.
        </p>

        {/* Login and Login Buttons */}
        <div className="flex mt-8 gap-4">
          <Button
            variant="secondary"
            className="bg-red-500 text-zinc-100"
          >
            Login
          </Button>
          <Link to={'/register'}>
            <Button
              variant="ghost"
              className=" text-gray-400"
            >
              Register
            </Button>
          </Link>
        </div>
      </div>

      {/* Login Form */}
      <AuthForm
        title="Login"
        inputs={[
          { type: 'email', placeholder: 'Email' },
          { type: 'password', placeholder: 'Password' },
        ]}
        buttonText="Login"
        onSubmit={handleLoginSubmit}
      />
    </div>
  );
}
