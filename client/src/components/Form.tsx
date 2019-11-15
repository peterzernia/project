import * as React from 'react'

type handleSubmit = (values: object) => void;

interface Props {
    children: Array<React.ReactElement>;
    handleSubmit: handleSubmit;
}

export default function Form(props: Props) {
    const [values, setValues] = React.useState({})

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValues = values
        newValues[e.target.name] = e.target.value
        setValues(newValues)
    }

    const handleSubmit = (e: any) => {
        e.preventDefault()

        if (e.target.form.checkValidity()) {
            props.handleSubmit(values)
        }
    }

    // Assign handleChange func and values to children inputs
    const inputs = props.children.map((child, i) => {
        return React.cloneElement(child, { 
            handleChange: handleChange,
            value: values[child.props.name],
            key: i
        })
    })

    return (
        <form>
            {inputs}
            <button type="submit" onClick={handleSubmit}>
                Submit
            </button>
        </form>
    )
}
