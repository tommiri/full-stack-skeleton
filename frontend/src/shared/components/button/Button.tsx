import { ComponentPropsWithoutRef } from 'react';

const Button = ({
  id,
  type = 'button',
  onClick,
  disabled,
  children,
}: ComponentPropsWithoutRef<'button'>) => {
  return (
    <button id={id} type={type} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
