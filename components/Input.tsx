import {
  ForwardedRef,
  InputHTMLAttributes,
  forwardRef,
  ReactNode,
} from "react";

interface InputProps {
  type?: string;
  placeholder?: string;
  required?: boolean;
  name: string;
  errors?: string[];
  icon?: ReactNode;
  className?: string;
}

const _Input = (
  {
    type = "text",
    placeholder,
    required,
    name,
    errors = [],
    icon,
    className,
    ...rest
  }: InputProps & InputHTMLAttributes<HTMLInputElement>,
  ref: ForwardedRef<HTMLInputElement>
) => {
  const hasError = errors && errors.length > 0;
  return (
    <>
      <label
        className={`relative flex items-center gap-4 my-1 mt-3 ${className}`}
      >
        {icon}
        <input
          ref={ref}
          name={name}
          type={type}
          className={`grow bg-slate-50 h-12 pl-10 focus:ring-2 focus:ring-rose ${
            hasError ? "outline outline-2 outline-red-500" : ""
          }`}
          placeholder={placeholder}
          required={required}
          {...rest}
        />
      </label>

      {errors.map((error, index) => (
        <span key={index} className="text-red-500 font-medium">
          * {error}
        </span>
      ))}
    </>
  );
};

export default forwardRef(_Input);
