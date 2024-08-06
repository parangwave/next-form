interface IFormProps {
  type: string;
  placeholder: string;
  required: boolean;
  errors: string[];
  name: string;
}

export default function FormInput({
  type,
  placeholder,
  required,
  errors,
  name,
}: IFormProps) {
  return (
    <div>
      <input
        name={name}
        className={`h-10 p-2 w-full rounded-full border-neutral-100 bg-transparent ring-1 ring-neutral-200 transition-colors duration-100 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-300 ring-offset-2 
          ${errors.length !== 0 ? "focus:ring-red-500" : ""}`}
        type={type}
        placeholder={placeholder}
        required={required}
      />
      <div className="my-2">
        {errors.map((error, index) => (
          <span key={index} className="font-medium text-red-500 inline-block">
            {error}
          </span>
        ))}
      </div>
    </div>
  );
}
