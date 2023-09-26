import { forwardRef } from 'react';

type InputProps = {
  id: string;
  label: string;
  type: 'text' | 'email' | 'password';
  placeholder: string;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ id, label, type, placeholder }, ref) => {
    return (
      <div>
        <label htmlFor={id}>{label}</label>
        <input ref={ref} id={id} type={type} placeholder={placeholder} />
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
