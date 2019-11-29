import * as React from 'react'

type Props = {
    children: React.ReactElement[];
    initialValues?: object;
    handleSubmit: (values: object) => void;
    secondaryButton?: {
      label: string;
      handleClick: () => void;
    };
}

export default function Form(props: Props): React.ReactElement {
  const { children, initialValues, secondaryButton } = props
  // Create initial values object with the names of the input
  const [values, setValues] = React.useState(
    children.map((child) => child.props.name).reduce((acc, curr) => {
      acc[curr] = initialValues ? initialValues[curr] : ''
      return acc
    }, {}),
  )


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const newValues = { ...values }
    newValues[e.target.name] = e.target.value
    setValues(newValues)
  }

  const handleSubmit = (e: any): void => {
    e.preventDefault()

    if (e.target.form.checkValidity()) {
      props.handleSubmit(values)
    }
  }

  // Assign handleChange func and values to children inputs
  const inputs = children.map((child) => React.cloneElement(child, {
    handleChange,
    value: values[child.props.name],
    key: child.props.name,
  }))

  return (
    <form>
      {inputs}
      <button type="submit" onClick={handleSubmit}>
        Submit
      </button>
      {
        secondaryButton
          && (
            <button
              type="button"
              onClick={secondaryButton.handleClick}
            >
              {secondaryButton.label}
            </button>
          )
      }
    </form>
  )
}
