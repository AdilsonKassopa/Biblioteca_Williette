import { Api } from "./apiFunction.js";

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

//elementos do modal
const linkalterarSenha = document.getElementById('linkalterarSenha')
const logiAlterSenhaModal = document.getElementById('logiAlterSenhaModal')


const btncloseModalASenha = document.querySelector('button[name = btncloseModalASenha]')
const btnVerifyEmail = document.querySelector('button[name = btnVerifyEmail]')
const btnCancelarModalSenha = document.querySelector('button[name = btnCancelarModalSenha]')
const btnAlterarSenha = document.querySelector('button[name = btnAlterarSenha]')


const AlterarSenhaemail = document.querySelector('input[name = AlterarSenhaemail]')
const AlterarSenhanPass = document.querySelector('input[name = AlterarSenhanPass]')
const AlterarSenhaPassNew = document.querySelector('input[name = AlterarSenhaPassNew]')


const url ='http://localhost:3000/users/login'

const api = new Api
const users = await api.getData('users')




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
    localStorage.setItem('token',user)
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








//FUNÇÕES DOS ELEMENTOS DO MODAL ALTERAR SENHA

//ABRIR O MODAL
linkalterarSenha.addEventListener('click',()=>{
    setTimeout(()=> logiAlterSenhaModal.classList.remove('hidden'),1000)

    document.getElementById('err-AlterarSenhaEmail').innerHTML =''
    
    
    document.getElementById('contentAlterarSenhaEmail').classList.remove('hidden')
    document.getElementById('label-AlterarSenhaEmail').classList.remove('hidden')

    document.getElementById('label-AlterarSenhaPass').classList.add('hidden')
    document.getElementById('contentPassword').classList.add('hidden')
    document.getElementById('label-AlterarSenhaPassNew').classList.add('hidden')
    document.getElementById('contentPassNew').classList.add('hidden')
    
})

//BOTÃO PARA FECHAR O MODAL
btncloseModalASenha.addEventListener('click',()=>{
    
    logiAlterSenhaModal.classList.add('hidden')

    document.getElementById('contentAlterarSenhaEmail').classList.remove('hidden')
    document.getElementById('label-AlterarSenhaEmail').classList.remove('hidden')



    document.getElementById('label-AlterarSenhaPass').classList.add('hidden')
    document.getElementById('contentPassword').classList.add('hidden')
    document.getElementById('label-AlterarSenhaPassNew').classList.add('hidden')
    document.getElementById('contentPassNew').classList.add('hidden')

})

//BOTÃO PARA FECHAR O MODAL

btnCancelarModalSenha.addEventListener('click',()=>{
    
    logiAlterSenhaModal.classList.add('hidden')

    document.getElementById('contentAlterarSenhaEmail').classList.remove('hidden')
    document.getElementById('label-AlterarSenhaEmail').classList.remove('hidden')



    document.getElementById('label-AlterarSenhaPass').classList.add('hidden')
    document.getElementById('contentPassword').classList.add('hidden')
    document.getElementById('label-AlterarSenhaPassNew').classList.add('hidden')
    document.getElementById('contentPassNew').classList.add('hidden')

})

//VERIFICAR SE EXISTE UMA CONTA COM O EMAIL
btnVerifyEmail.addEventListener('click',()=>{
    if(AlterarSenhaemail.value){
        const verify = users.find(item => item.email.trim() === AlterarSenhaemail.value.trim() )
        
        console.log(users);
        

        if(!verify){
        document.getElementById('err-AlterarSenhaEmail').innerHTML ='Nenhum usuario associado a este email'
        document.getElementById('err-AlterarSenhaEmail').classList.add('text-error')

        return
        }
        document.getElementById('err-AlterarSenhaEmail').innerHTML =''
        btnAlterarSenha.removeAttribute('disabled')

        setTimeout(()=> {
            document.getElementById('contentAlterarSenhaEmail').classList.add('hidden')
            document.getElementById('label-AlterarSenhaEmail').classList.add('hidden')



            document.getElementById('label-AlterarSenhaPass').classList.remove('hidden')
            document.getElementById('contentPassword').classList.remove('hidden')
            document.getElementById('label-AlterarSenhaPassNew').classList.remove('hidden')
            document.getElementById('contentPassNew').classList.remove('hidden')
        },1000)
        
        



    }
})



btnAlterarSenha.addEventListener('click',()=>{
    
        if(AlterarSenhanPass.value != AlterarSenhaPassNew.value ){
            document.getElementById('err-AdminPassNew').innerHTML ='As passes Não são Iguais'
            document.getElementById('err-AdminPassNew').classList.add('text-error')

            return
        }else{
            document.getElementById('err-AdminPassNew').innerHTML =''
            document.getElementById('err-AdminPassNew').classList.remove('text-error')

        }

        if(!AlterarSenhaemail.value) return
        
        const user = users.find(item => item.email.trim() === AlterarSenhaemail.value.trim() )

        const dataPass = api.atualizarData({id:user.id,
            password:AlterarSenhaPassNew.value
        },'users/updatePassword')

        


        logiAlterSenhaModal.classList.add('hidden')

        document.getElementById('contentAlterarSenhaEmail').classList.remove('hidden')
        document.getElementById('label-AlterarSenhaEmail').classList.remove('hidden')



        document.getElementById('label-AlterarSenhaPass').classList.add('hidden')
        document.getElementById('contentPassword').classList.add('hidden')
        document.getElementById('label-AlterarSenhaPassNew').classList.add('hidden')
        document.getElementById('contentPassNew').classList.add('hidden')

    
})







