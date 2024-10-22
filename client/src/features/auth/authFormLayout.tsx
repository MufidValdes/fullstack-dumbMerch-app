import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface AuthFormProps {
  title: string;
  inputs: { type: string; placeholder: string }[];
  buttonText: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export const AuthForm: React.FC<AuthFormProps> = ({
  title,
  inputs,
  buttonText,
  onSubmit,
}) => {
  return (
    <div className="w-[416px] p-10 mr-24 bg-[#181818] rounded-lg">
      <h2 className="mb-8 text-4xl font-black text-white">{title}</h2>
      <form
        className="space-y-6"
        onSubmit={onSubmit}
      >
        {inputs.map((input, index) => (
          <Input
            key={index}
            type={input.type}
            placeholder={input.placeholder}
            className="bg-[#D2D2D2]/25 border-gray-600 text-gray-300"
          />
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
