import React from 'react';
import { Eye, EyeOff, Lock } from 'lucide-react';
import Input from '../ui/Input';

export default function PasswordInput({ label, error, id, disabled, ...rest }) {
  const [show, setShow] = React.useState(false);

  return (
    <Input
      id={id}
      label={label}
      error={error}
      type={show ? 'text' : 'password'}
      icon={Lock}
      disabled={disabled}
      rightElement={(
        <button
          type="button"
          className="auth-input-action"
          onClick={() => setShow((value) => !value)}
          aria-label={show ? 'Hide password' : 'Show password'}
          disabled={disabled}
        >
          {show ? <EyeOff size={20} aria-hidden="true" /> : <Eye size={20} aria-hidden="true" />}
        </button>
      )}
      {...rest}
    />
  );
}
