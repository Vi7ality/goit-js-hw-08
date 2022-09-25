import throttle from "lodash.throttle";

// const refs = {
//     form: document.querySelector('.feedback-form'),
//     textarea: document.querySelector('textarea[name="message"]'),
//     email: document.querySelector('input[name="email"]')
// }
const formRef = document.querySelector('.feedback-form')
const LOCAL_STORAGE_KEY = "feedback-form-state"

fillTextArea();

formRef.addEventListener('submit', onSubmit);
// refs.textarea.addEventListener('input', onInput);
formRef.addEventListener('input', throttle(onInput, 500))

const formData = {}

function onSubmit (evt) {
    evt.preventDefault();
    const {
        elements: { email, message }
    } = evt.target
    console.log({email: email.value, message: message.value})
    evt.target.reset();
    localStorage.removeItem(LOCAL_STORAGE_KEY)
}

function onInput (evt)  {
    formData[evt.target.name] = evt.target.value;
    try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(formData));
    } catch (error) {
        console.error(error);
    }

}

function fillTextArea() {
    const savedData = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (savedData) {
        try {
        const parsedValue = JSON.parse(savedData);
            Object.entries(parsedValue).forEach(([name, value]) => {
                formRef.elements[name].value = value;
        })
        } catch (error) {
           console.error(error) 
        }

    }

}