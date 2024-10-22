import { Button } from '@/components/ui/button';
import { AuthForm } from '../authFormLayout';
import { Link } from 'react-router-dom';

export default function RegisterPage() {
  const handleRegisterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle register logic here
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

        {/* Login and Register Buttons */}
        <div className="flex mt-8 gap-4">
          <Link to={'/login'}>
            <Button
              variant="secondary"
              className="bg-red-500 text-zinc-100"
            >
              Login
            </Button>
          </Link>

          <Button
            variant="ghost"
            className=" text-gray-400"
          >
            Register
          </Button>
        </div>
      </div>

      {/* Register Form */}
      <AuthForm
        title="Register"
        inputs={[
          { type: 'text', placeholder: 'Name' },
          { type: 'email', placeholder: 'Email' },
          { type: 'password', placeholder: 'Password' },
        ]}
        buttonText="Register"
        onSubmit={handleRegisterSubmit}
      />
    </div>
  );
}
