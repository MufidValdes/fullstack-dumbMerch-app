import { Button } from '@/components/ui/button';
import { AuthForm } from '../authFormLayout';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { LoginAsync, checkAuth } from '@/app/stores/auth/async'; // Adjust import based on your structure
import { useAppDispatch, useAppSelector } from '@/app/stores/stores';
import { useEffect } from 'react';
import Swal from 'sweetalert2';
interface LoginData {
  email: string;
  password: string;
}

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>();

  const user = useAppSelector((state) => state.auth.user);

  const handleLoginSubmit = async (data: LoginData) => {
    const res = await dispatch(LoginAsync(data));
    if (LoginAsync.fulfilled.match(res)) {
      Swal.fire({
        title: 'Login Success!',
        icon: 'success',
      });
    }

    dispatch(checkAuth());
    // navigate('/');
  };
  useEffect(() => {
    if (user?.role === 'USER') {
      navigate('/');
    } else if (user?.role === 'ADMIN') {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  return (
    <div className="flex items-center justify-between w-screen h-screen bg-black">
      {/* Left Section */}
      <div className="ml-24">
        <div className="flex items-center gap-2 mb-10">
          <img
            className="size-[184px]"
            src="https://res.cloudinary.com/dje40bx3b/image/upload/v1732637144/ecommerce_products/kxsnud5johi1cjtn2nso.png"
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
          <Button
            variant="secondary"
            className="bg-red-500 text-zinc-100"
          >
            Login
          </Button>
          <Link to={'/register'}>
            <Button
              variant="ghost"
              className="text-gray-400"
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
        buttonText="Login"
        onSubmit={handleSubmit(handleLoginSubmit)}
        errors={errors}
      />
    </div>
  );
}
