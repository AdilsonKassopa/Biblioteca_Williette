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
//elemento html da area de actividades

const actividadesCard = document.getElementById('actividadesCard')


//buscando dados da API
const api = new Api()
const livros = await api.getData('Book')
const categorias = await api.getData('category')
const actividades =await api.getData('activity')

const date = new Date()

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

btnSair.addEventListener('click',()=>{
    setTimeout(()=> window.location.replace('../home.html'),500)

})


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

