import { RegisterAsync } from '@/app/stores/auth/async'; // Adjust the import based on your structure
import { useAppDispatch } from '@/app/stores/stores';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { AuthForm } from '../authFormLayout';

interface FormData {
  fullname: string;
  email: string;
  password: string;
}

export default function RegisterPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const handleRegisterSubmit = async (data: FormData) => {
    const res = await dispatch(RegisterAsync(data));
    if (RegisterAsync.fulfilled.match(res)) {
      navigate('/login');
    }
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
            className="text-gray-400"
          >
            Register
          </Button>
        </div>
      </div>

      {/* Register Form */}
      <AuthForm
        title="Register"
        inputs={[
          {
            type: 'text',
            placeholder: 'fullname',
            name: 'fullname',
            register,
            required: true,
          },
          {
            type: 'email',
            placeholder: 'Email',
            name: 'email',
            register,
            required: true,
          },
          {
            type: 'password',
            placeholder: 'Password',
            name: 'password',
            register,
            required: true,
          },
        ]}
        buttonText="Register"
        onSubmit={handleSubmit(handleRegisterSubmit)}
        errors={errors}
      />
    </div>
  );
}
