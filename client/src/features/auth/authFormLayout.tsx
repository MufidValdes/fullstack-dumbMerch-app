import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface AuthFormProps {
  title: string;
  inputs: {
    type: string;
    placeholder: string;
    name: string;
    register: any;
    required?: boolean;
  }[];
  buttonText: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  errors: Record<string, any>;
}

export const AuthForm: React.FC<AuthFormProps> = ({
  title,
  inputs,
  buttonText,
  onSubmit,
  errors,
}) => {
  return (
    <div className="w-[416px] p-10 mr-24 bg-[#181818] rounded-lg">
      <h2 className="mb-8 text-4xl font-black text-white">{title}</h2>
      <form
        className="space-y-6"
        onSubmit={onSubmit}
      >
        {inputs.map((input, index) => (
          <div key={index}>
            <Input
              type={input.type}
              placeholder={input.placeholder}
              {...input.register(input.name, { required: input.required })}
              className="bg-[#D2D2D2]/25 border-gray-600 text-gray-300"
            />
            {errors[input.name] && (
              <span className="text-red-500">{`${input.placeholder} is required`}</span>
            )}
          </div>
        ))}
        <Button
          variant="secondary"
          className="w-full bg-red-500 text-zinc-100"
        >
          {buttonText}
        </Button>
      </form>
    </div>
  );
};
