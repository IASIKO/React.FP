import React, { useState } from 'react'

export const useForm = ({defaultFormValues}) => {
    const [formValues, setFormValues] = useState(defaultFormValues)
    const onInputChange = (event) => {
        const eventName = event.target.name
        const {validateInput} = formValues[eventName]
        setFormValues((prevFormValues) => {
            return {
                ...prevFormValues,
                [eventName]: {
                    ...prevFormValues[eventName],
                    value: event.target.value,
                    error: validateInput ? validateInput(event.target.value) : "",
                }
            }
        })
    }

    const checkButtonDisable = (values) => {
        for (const [key, objValue] of Object.entries(values)) {
            if (objValue.required && (objValue.error || !objValue.value)) {
                return true
            }
        }
    }

    const clearForm = (obj) => {
        setFormValues(obj)
    }
  return {
    formValues,
    setFormValues,
    onInputChange,
    clearForm,
    checkButtonDisable,
  }
}
