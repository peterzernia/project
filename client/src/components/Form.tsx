import * as React from 'react'

type handleSubmit = (values: object) => void;

interface Props {
    children: Array<React.ReactElement>;
    handleSubmit: handleSubmit;
}

export default function Form(props: Props): React.ReactElement {
  const [values, setValues] = React.useState({})
  const { children } = props

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const newValues = values
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
    </form>
  )
}
