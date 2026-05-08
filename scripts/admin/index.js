import { Api } from "../apiFunction.js"
import { tempoRelativoCompleto } from "../funcoes.js"

//elementos html do header navigation
const linkDashboard = document.getElementById('linkDashboard')
const linkLivros = document.getElementById('linkLivros')
const linkCategoria = document.getElementById('linkCategoria')
const btnSair = document.querySelector('button[name = btnSair]')

//elementos do html do section 'Menus'
const mDashboard = document.getElementById('mDashboard')
const mLivros = document.getElementById('mLivros')
const mCategorias = document.getElementById('mCategorias')
const linkAcLivros = document.getElementById('linkAcLivros')
const linkAcCategorias = document.getElementById('linkAcCategorias')
const linkAcDefinicoes = document.getElementById('linkAcDefinicoes')
const dasboardDate = document.getElementById('dasboardDate')

const totalLivros = document.getElementById('totalLivros')
const totalLivrosRecent = document.getElementById('totalLivrosRecent')
const totalCategoria = document.getElementById('totalCategoria')
//elemento html da area de actividades

const actividadesCard = document.getElementById('actividadesCard')

//elementos da area do user
const profileInfo = document.getElementById('profileInfo')
const adminName = document.querySelector('input[name = adminName]')
const adminemail = document.querySelector('input[name = adminemail]')
const adminPass = document.querySelector('input[name = adminPass]')
const adminPassNew = document.querySelector('input[name = adminPassNew]')
const contentPassNew = document.getElementById('contentPassNew')
const btnCancelarModalAdmin = document.querySelector('button[name = btnCancelarModalAdmin]')
const btnSalvarAdmin = document.querySelector('button[name = btnSalvarAdmin]')
const btnEditModalAdmin = document.querySelector('button[name = btnEditModalAdmin]')
const toggleEditPassword = document.querySelector('button[name = toggleEditPassword]')







const adminModal = document.getElementById('adminModal')

//buscando dados da API
const api = new Api()
const livros = await api.getData('Book')
const categorias = await api.getData('category')
const actividades =await api.getData('activity')
let users = await api.getData('users')

const date = new Date()


    const token = localStorage.getItem('token')
    if(!token)
        window.location.href ='../../loginTela.html'


//codigos de navegação na secção do admin

linkDashboard.addEventListener('click',function(){
    menuVaegar('Dashboard')
    linkDashboard.classList.add('hidden')
    linkLivros.classList.add('hidden')
    linkCategoria.classList.add('hidden')
})

linkLivros.addEventListener('click',function(){
    menuVaegar('Livros')
})

linkCategoria.addEventListener('click',function(){
    menuVaegar('Categorias')
})

linkAcLivros.addEventListener('click',function(){
    menuVaegar('Livros')
    linkDashboard.classList.remove('hidden')
    linkLivros.classList.remove('hidden')
    linkCategoria.classList.remove('hidden')
})

linkAcCategorias.addEventListener('click',function(){
    menuVaegar('Categorias')
    linkDashboard.classList.remove('hidden')
    linkLivros.classList.remove('hidden')
    linkCategoria.classList.remove('hidden')
})

linkAcDefinicoes.addEventListener('click',()=>{
    adminModal.classList.remove('hidden')
    infoUser()
    preenncherDadosUser()
    if(!adminName.getAttribute('disabled')){
        adminName.setAttribute('disabled',true)
        adminemail.setAttribute('disabled',true)
    }
    document.getElementById('label-adminPassNew').classList.add('hidden')
    contentPassNew.classList.add('hidden')
    if(!adminPass.getAttribute('disabled')) adminPass.setAttribute('disabled',true)
})

btnCancelarModalAdmin.addEventListener('click',()=>{
    adminModal.classList.add('hidden')

    if(!adminName.getAttribute('disabled')){
        adminName.setAttribute('disabled',true)
        adminemail.setAttribute('disabled',true)
    }

    document.getElementById('label-adminPassNew').classList.add('hidden')
    contentPassNew.classList.add('hidden')
    if(!adminPass.getAttribute('disabled')) adminPass.setAttribute('disabled',true)
            
    document.getElementById('err-AdminPassNew').innerHTML =''


})
btnEditModalAdmin.addEventListener('click',()=>{
    adminName.removeAttribute('disabled')
    adminemail.removeAttribute('disabled')
    adminName.focus()
    
    
})
toggleEditPassword.addEventListener('click',()=>{
    document.getElementById('label-adminPassNew').classList.remove('hidden')
    contentPassNew.classList.remove('hidden')
    adminPass.removeAttribute('disabled')
    adminPass.focus()

})

btnSalvarAdmin.addEventListener('click',()=>{
    
    if(!adminName.getAttribute('disabled') && !adminPass.getAttribute('disabled') ){
        if(adminPass.value != adminPassNew.value ){
            document.getElementById('err-AdminPassNew').innerHTML ='As passes Não são Iguais'
            return
        }else{
            document.getElementById('err-AdminPassNew').innerHTML =''
        }
    const DataToken = obterDadosDoToken(token)

        const data = api.atualizarData({id:DataToken.id,
            userName:adminName.value,
            email:adminemail.value
        },'users/update')
        
        const dataPass = api.atualizarData({id:DataToken.id,
            password:adminPassNew.value
        },'users/updatePassword')

        if(data) users = api.getData('users')

    }else if(!adminName.getAttribute('disabled') && adminPass.getAttribute('disabled')){
        const DataToken = obterDadosDoToken(token)

        const data = api.atualizarData({id:DataToken.id,
            userName:adminName.value,
            email:adminemail.value
        },'users/update')

        if(data) users = api.getData('users')
        
        console.log(data);
        
    }
    else if(adminName.getAttribute('disabled') && !adminPass.getAttribute('disabled')){
        if(adminPass.value != adminPassNew.value ){
            document.getElementById('err-AdminPassNew').innerHTML ='As passes Não são Iguais'
            return
        }else{
            document.getElementById('err-AdminPassNew').innerHTML =''
        }
        
        const DataToken = obterDadosDoToken(token)

        const dataPass = api.atualizarData({id:DataToken.id,
            password:adminPassNew.value
        },'users/updatePassword')

        console.log(dataPass);
        
        
    }





    if(!adminName.getAttribute('disabled')){
        adminName.setAttribute('disabled',true)
        adminemail.setAttribute('disabled',true)
    }

    document.getElementById('label-adminPassNew').classList.add('hidden')
    contentPassNew.classList.add('hidden')
    if(!adminPass.getAttribute('disabled')) adminPass.setAttribute('disabled',true)
    adminModal.classList.add('hidden')
})

const dadosToken = obterDadosDoToken(token)








btnSair.addEventListener('click',()=>{
    localStorage.setItem('token','')
    setTimeout(()=> window.location.replace('../home.html'),500)

})

totalLivros.innerHTML=`${livros.length}` //buscar o total de livros

totalLivrosRecent.innerHTML =`<p>+${
    (livros.filter(item => {
        const datebd = new Date(item.createdAt)
        return datebd.toLocaleString('pt-BR',{month:'long'}) === date.toLocaleString('pt-BR',{month:'long'})
    })).length
} novos neste mês</p>` //buscar total de livros adicionados recentemente

totalCategoria.inert =`${categorias.length}`

document.getElementById('totalCategoriaRecent').innerHTML =`<p>+${
    (categorias.filter(item => {
        const datebd = new Date(item.createdAt)
        return datebd.toLocaleString('pt-BR',{month:'long'}) === date.toLocaleString('pt-BR',{month:'long'})
    })).length
} adicionadas recentemente</p>`

dasboardDate.innerHTML = `${date.toLocaleString('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
})}`


if(actividades.length == 0){
    const newElement = document.createElement('div')
    newElement.className='actividades__card  items-center justify-center'

    newElement.innerHTML = `<div id="emptyState" class=" categoria__emptyState ">
                    <svg class=" text-text-tertiary " fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
                    </svg>
                    <h3 class="text-xl  text-text-primary ">Nenhuma Actividade encontrada</h3>
                    <p class="text-text-secondary "></p>
                </div>`
    
    
    actividadesCard.appendChild(newElement)
}

actividades.forEach(element => {
    const newElement = document.createElement('div')
    newElement.className='actividades__card'
    
    
    if(element.activity === 'Novo livro adicionado'){
        newElement.innerHTML=` <div class="actividades__card--icon">
                        <svg id="card__icon--novoliro" class="w-5 h-5 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                        </svg>
                    </div>
                    <div class="actividades__card--text">
                        <p class="card__text--titulo">${element.activity}</p>
                        <p class="card__text--details">${element.descricao}</p>
                        <p class="card__text--hours">${tempoRelativoCompleto(element.createdAt)}</p>
                    </div>`
    }else if(element.activity === 'Nova categoria criada'){

        newElement.innerHTML = ` <div class="actividades__card--icon">
                        <svg id="card__icon--novocategoria" class="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
                        </svg>
                    </div>
                    <div class="actividades__card--text">
                        <p class="card__text--titulo">${element.activity}</p>
                        <p class="card__text--details">${element.descricao}</p>
                        <p class="card__text--hours">${tempoRelativoCompleto(element.createdAt)}</p>
                    </div>`
    }else if(element.activity === 'Livro atualizado' || element.activity === 'Categoria atualizada'){
        newElement.innerHTML =`<div class="actividades__card--icon">
                        <svg id="card__icon--livroAtualizado" class="w-5 h-5 text-warning" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                        </svg>
                    </div>
                    <div class="actividades__card--text">
                        <p class="card__text--titulo">${element.activity}</p>
                        <p class="card__text--details">${element.descricao}</p>
                        <p class="card__text--hours">${tempoRelativoCompleto(element.createdAt)}</p>
                    </div>`
    }else if(element.activity === 'Livro eliminado' || element.activity === 'Categoria eliminada'){
        newElement.innerHTML =`<div class="actividades__card--icon">
                        <svg class="w-5 h-5 text-error"  fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                        </svg>
                    </div>
                    <div class="actividades__card--text">
                        <p class="card__text--titulo">${element.activity}</p>
                        <p class="card__text--details">${element.descricao}</p>
                        <p class="card__text--hours">${tempoRelativoCompleto(element.createdAt)}</p>
                    </div>`
    }
    actividadesCard.appendChild(newElement)
});



//função com opções de navegação da página admin
function menuVaegar(elementMenu){
    if(elementMenu === 'Dashboard'){
        mDashboard.className = 'section'
        mLivros.className='section hidden'
        mCategorias.className='section hidden'

    }else if(elementMenu === 'Livros'){
        mDashboard.className = 'section hidden'
        mLivros.className='section '
        mCategorias.className='section hidden'

    }else if(elementMenu === 'Categorias'){
        mDashboard.className = 'section hidden'
        mLivros.className='section hidden'
        mCategorias.className='section '
    }
}

function obterDadosDoToken(token){
    try{
        const base64url = token.split('.')[1]

    //converter a base para string
    const base64 = base64url.replace(/-/g,'+').replace(/_/g,'/')
    const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(c=>{
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
    }).join(''))

    //transformar em objecto JSON
    return JSON.parse(jsonPayload)
    }catch(err){
        console.error("token Invalido",err);
        return null
        
    }
}

function preenncherDadosUser(){
    const DataToken = obterDadosDoToken(token)
    adminName.value = users.find(item => item.id === DataToken.id).userName
    adminemail.value = users.find(item => item.id === DataToken.id).email
    // adminPass = 
    // adminPassNew = 
    

}

async function infoUser(){
    users = await api.getData('users')
    //informações do user
profileInfo.innerHTML=` <h1>${(users.find(item => item.id === dadosToken.id)).userName}</h1>
                    <p class="profile-role">Administrador</p>
                    <p class="profile-email">
                        <svg class="w-5 h-5 text-text-secondary info-icon" fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24">

                            <path stroke-linecap="round" 
                                stroke-linejoin="round" 
                                stroke-width="2" 
                                d="M16 12l-4 4-4-4m8-4l-4 4-4-4M4 6h16a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2z">
                            </path>

                        </svg> 
                          ${(users.find(item => item.id === dadosToken.id)).email}
                    </p>`
}