"use strict"

const formHTML = document.getElementById('form')
const inputs = document.querySelectorAll('#form input')

/** Contiene las expreciones para la validacion y el resultado de la misma. */
const form = {
    user: {
        exprecionForValidation: /^[a-zA-Z0-9\_\-]{4,16}$/,
        isValid: false
    },
    name: {
        exprecionForValidation: /^[a-zA-ZÁ-ÿ\s]{1,40}$/,
        isValid: false
    },
    pass: {
        exprecionForValidation: /^.{4,12}$/,
        isValid: false /* De 4 a 12 digitos */
    },
    pass2: {
        exprecionForValidation: /^.{4,12}$/,
        isValid: false /* De 4 a 12 digitos */
    },
    address: {
        exprecionForValidation: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
        isValid: false
    },
    phone: {
        exprecionForValidation: /^\d{7,14}$/,
        isValid: false /* De 7 a 14 numeros */
    }
}

const inputIsRightStyles = (inputName) => {
    const inputGroupHTML = document.getElementById(`group-${inputName}`)
    //Styles
    inputGroupHTML.classList.remove('form__group--error')
    inputGroupHTML.classList.add('form__group--fine')
    document.querySelector(`#group-${inputName} i`).classList.replace('fa-times-circle', 'fa-check-times')
    document.querySelector(`#group-${inputName} .form__input-error`).classList.remove('form__input-error--active')
}
const inputIsWrongStyles = (inputName) => {
    const inputGroupHTML = document.getElementById(`group-${inputName}`)
    //Styles
    inputGroupHTML.classList.remove('form__group--fine')
    inputGroupHTML.classList.add('form__group--error')
    document.querySelector(`#group-${inputName} i`).classList.replace('fa-check-times', 'fa-times-circle')
    document.querySelector(`#group-${inputName} .form__input-error`).classList.add('form__input-error--active')
}

/**
 * Valida los formulario de password.
 * @returns {Boolean} Retorna un booleano dependiendo de la validacion.
 */
 const validatePassword = () => {
    const inputPass1 = document.getElementById('pass')
    const inputPass2 = document.getElementById('pass2')

    if (inputPass1.value === inputPass2.value && form.pass.exprecionForValidation.test(inputPass1.value)) {
        inputIsRightStyles('pass')
        return true
    }
    return false
}

const validationInput = (e) => {
    /**  Contiene el nombre de todos los inputs y su respectiva validacion. */
    const allInputsValidation = {
        user: form.user.exprecionForValidation.test(e.target.value),
        name: form.name.exprecionForValidation.test(e.target.value),
        pass: validatePassword(),
        pass2: validatePassword(),
        address: form.address.exprecionForValidation.test(e.target.value),
        phone: form.phone.exprecionForValidation.test(e.target.value),
    }
    const inputName = e.target.name

    Object.keys(allInputsValidation).map(key => {
        const inputIsValid = allInputsValidation[key]

        if (key == inputName && inputIsValid) {
            inputIsRightStyles(inputName)
            form[key].isValid = true
        }
        else if (key == inputName && !inputIsValid) inputIsWrongStyles(inputName)
    })
}

inputs.forEach(input => {
    input.addEventListener('keyup', validationInput)
    input.addEventListener('input', validationInput)
    input.addEventListener('blur', validationInput)
})

/**
 * Verifica que todos los inputs del formulario esten ya validados correctamente. 
 * @returns {Boolean} 
 */
const validateAllInputs = () => {
    /** Indica si un formulario fue validado correctamente. */
    let inputValid = false
    const checkbox = document.getElementById('form-checkbox').checked

    Object.keys(form).map(key => {
        form[key].isValid && checkbox ? inputValid = true : inputValid = false
    })
    return inputValid
}

formHTML.addEventListener('submit', (e) => {
    e.preventDefault()

    const msgError = document.getElementById('smg-error')
    const msgFine = document.getElementById('smg-fine')

    validateAllInputs()
        ? (formHTML.reset(), msgFine.classList.add('form__msg--show'))
        : msgError.classList.add('form__msg--show')
})