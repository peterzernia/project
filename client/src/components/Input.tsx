import * as React from 'react'

type handleChange = (e: object) => number;

interface Props {
    className?: string;
    handleChange?: handleChange;
    label: string;
    name: string;
    placeholder?: string;
    required: boolean;
    type: string;
    value?: any;
}

export default function Input(props: Props): React.ReactElement {
  const {
    className,
    handleChange,
    label,
    name,
    placeholder,
    required,
    type,
    value,
  } = props

  return (
    <div className={className}>
      <label htmlFor={className}>{label}</label>
      <input
        name={name}
        onChange={handleChange}
        placeholder={placeholder}
        required={required}
        type={type}
        value={value}
      />
    </div>
  )
}
