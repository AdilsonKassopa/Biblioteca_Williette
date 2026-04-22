//declaração dos elementos html
const input_email = document.querySelector('input[name = email]')
const input_senha = document.querySelector('input[name = password]')
const label_err_email = document.getElementById('inp_email--error')
const label_err_senha = document.getElementById('inp_senha--error')
const togglePassword = document.getElementById('togglePassword')
const eyeIcon = document.getElementById('eyeIcon')
const btn_entrar = document.getElementById('submitButton')
const elementInput = document.getElementsByClassName('relative')
const alertMessage = document.getElementById('alertMessage')
const alertText = document.getElementById('alertText')
const alertIcon = document.getElementById('alertIcon')

const url ='http://localhost:3000/users/login'



console.log(elementInput);

//evento acionado enquanto o campo é preenchido
input_email.addEventListener('input',()=>{
    input_email.style.borderColor ='rgba(45, 90, 61, 0.15)'
    label_err_email.textContent =''

})
input_senha.addEventListener('input',()=>{
    input_senha.style.borderColor ='rgba(45, 90, 61, 0.15)'
    label_err_senha.textContent=''

})
//Função submeter

btn_entrar.addEventListener('click', async ()=>{
    cleanElementText('inp_senha--error')
    cleanElementText('inp_email--error')

    if(input_email.value && !input_senha.value){
        label_err_senha.textContent='Por favor, insira sua senha'
        input_senha.style.borderColor ='#c4302b'
        return
    }
        
    else if(!input_email.value && input_senha.value){
        label_err_email.textContent ='Por favor, insira seu email'
        input_email.style.borderColor ='#c4302b'
        return
    }

    const mydata = {
        email: input_email.value,
        password: input_senha.value
    }

    try{
        const response = await fetch(url,
        {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(mydata)
        }
    )

    const user = await response.json()
    if (!(await response).ok){
        showAlert(`Credenciais inválidas`, 'error');
        throw new Error(user.erro || 'Credenciais inválidas')
    }
    // Show success message
    showAlert('Login realizado com sucesso! Redirecionando...', 'success');
    setTimeout(()=> window.location.replace('../admin.html'),1500)

    }catch(erro){
        console.log(erro.message);
        
    }
    
})

function showAlert(message,type){
    alertText.textContent = message;
    alertMessage.classList.remove('hidden', 'bg-error/10', 'text-error', 'bg-success/10', 'text-success', 'bg-warning/10', 'text-warning');
            
    if (type === 'error') {
        alertMessage.classList.add('bg-error/10', 'text-error');
        alertIcon.innerHTML = '<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>';
        } else if (type === 'success') {
           alertMessage.classList.add('bg-success/10', 'text-success');
            alertIcon.innerHTML = '<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>';
        } else if (type === 'warning') {
            alertMessage.classList.add('bg-warning/10', 'text-warning');
            alertIcon.innerHTML = '<path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>';
        }
            
    alertMessage.setAttribute('role', 'alert');
}

//função limpar
function cleanElementText(elementName){
    const Element = document.getElementById(elementName)
    Element.textContent =''

}

