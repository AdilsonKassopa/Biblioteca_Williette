import { Api } from "./../apiFunction.js"
//Elementos do html
const bookDetailImg = document.getElementById('bookDetailImg')
const btnLerOnline = document.querySelector('button[name = btnLerOnline]')
const btnDowload = document.querySelector('button[name = btnDowload]')
const btnFavoritos = document.querySelector('button[name = btnFavoritos]')
const detailHeaderTitulo = document.getElementById('detailHeaderTitulo')
const detailHeaderAutor = document.getElementById('detailHeaderAutor')
const detailHeaderAnoDePublicacao = document.getElementById('detailHeaderAnoDePublicacao')
const detailHeaderCategoriaPai = document.getElementById('detailHeaderCategoriaPai')
const detailHeaderCategoria = document.getElementById('detailHeaderCategoria')
const synopsis_short = document.getElementById('synopsis-short')
const synopsisToggle = document.querySelector('button[name = synopsisToggle]')
const cabecalho = document.getElementById('cabecalho')
const btnDownBookDetails = document.querySelector('button[name = btnDownBookDetails]')
const biografiaAutor = document.getElementById('biografiaAutor') //elementos da biografia do autor

const BookDetalhes = document.getElementById('BookDetalhes')// div dos detalhes do livro

const bookDetailStats = document.getElementById('bookDetailStats')// detalhes do livro

const api = new Api()
const livros = await api.getData('book')
const categoria = await api.getData('category')
const autores = await api.getData('autor')
const urlDoc = 'http://localhost:3000/files'


const idBook = localStorage.getItem('idBook')
const idBookHome = localStorage.getItem('idBookHome')

let book = ''



if(idBook){
     book = livros.find(item => item.id === idBook)
    cabecalho.innerHTML=`        <div class="logo">
            <div class="logo__letra">
                B
            </div>
            <div class="logo__text">
                <strong>Biblioteca Williette</strong>
                <p>Acesso livre ao acervo digital</p>
            </div>
        </div>


        <!-- Navigation -->
        <nav class=" nav space-x-6">
            <a id="linkDashboard" href="./admin.html" class="text-text-secondary hover:text-primary transition-colors ">Dashboard</a>
            <a id="linkLivros" href="#" class="text-text-secondary hover:text-primary transition-colors hidden">Livros</>
            <a id="linkCategoria"  href="#" class="text-primary font-medium hover:text-primary transition-colors hidden">Categorias</a>
            <button name="btnSair" onclick="handleLogout()" class="btn btn-ghost text-sm">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                </svg>
                Sair
            </button>
        </nav>`
        localStorage.setItem('idBook','')
}else{
     book = livros.find(item => item.id === idBookHome)
        localStorage.setItem('idBidBookHomeook','')
}





    bookDetailImg.innerHTML =`
        <img 
            src="${urlDoc +'/'+ book.pathCapa_livro || 'https://images.unsplash.com/photo-1584824486509-112e4181ff6b?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3'}" 
            alt="Capa do livro ${book.titulo}"
            loading="lazy"
            onerror="this.src='https://images.unsplash.com/photo-1584824486509-112e4181ff6b?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'; this.onerror=null;"
        >`

detailHeaderTitulo.innerHTML = `${book.titulo}`
detailHeaderAutor.innerHTML = `${(autores.find(item => item.id === book.autorId)).name}`
detailHeaderAnoDePublicacao.innerHTML = `Publicado em ${book.ano_pub}`


const categoriaPai = categoria.find((Element) => Element.id === book.categoryid)

    detailHeaderCategoriaPai? detailHeaderCategoriaPai.innerHTML =`${
    (categoria.find((Element) => Element.id === categoriaPai.categoriaId))?.name ?? 'não  informado'
    }`: detailHeaderCategoriaPai.innerHTML='erro ao carregar...'

    detailHeaderCategoria? detailHeaderCategoria.innerHTML =`${
    (categoria.find((Element) => Element.id === book.categoryid))?.name ?? 'não  informado'
    }`: detailHeaderCategoriaPai.innerHTML='erro ao carregar...'

    synopsis_short.innerHTML=`
    <p >
    ${book.sinopse}
    </p>
    `

    biografiaAutor.innerHTML=`<img 
                                src="${urlDoc +'/'+ (autores.find(item => item.id === book.autorId)).pathImg || 'https://img.rocket.new/generatedImages/rocket_gen_img_1a577c12d-1766641008988.png'}" 
                                alt="Retrato histórico de Machado de Assis, escritor brasileiro do século XIX"
                                loading="lazy"
                                onerror="this.src='https://images.unsplash.com/photo-1584824486509-112e4181ff6b?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'; this.onerror=null;"
                            >
                            <div>
                                <h3 class="font-heading font-medium text-text-primary mb-2">${(autores.find(item => item.id === book.autorId)).name}</h3>
                                <p class="text-text-secondary text-sm leading-relaxed">
                                    ${(autores.find(item => item.id === book.autorId)).descricao}
                                </p>
                            </div>`



                        
BookDetalhes.innerHTML =`<div class="publication__divs">
                            <h3 class="font-medium text-text-primary mb-2">Informações Gerais</h3>
                            <div class="space-y-2 text-sm">
                                <div >
                                    <span class="text-text-secondary">Título Original:</span>
                                    <span class="text-text-primary">${book.titulo}</span>
                                </div>
                                <div >
                                    <span class="text-text-secondary">Ano de Publicação:</span>
                                    <span class="text-text-primary">${book.ano_pub}</span>
                                </div>
                                <div >
                                    <span class="text-text-secondary">Idioma:</span>
                                    <span class="text-text-primary">${book.Idioma}</span>
                                </div>
                                <div >
                                    <span class="text-text-secondary">País:</span>
                                    <span class="text-text-primary">${book.Pais}</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="publication__divs">
                            <h3 class="font-medium text-text-primary mb-2">Detalhes Técnicos</h3>
                            <div class="space-y-2 text-sm">
                                <div >
                                    <span class="text-text-secondary">Gênero:</span>
                                    <span class="text-text-primary">${(categoria.find(item => item.id === book.categoryid)).name}</span>
                                </div>
                                <div >
                                    <span class="text-text-secondary">Páginas:</span>
                                    <span class="text-text-primary">${book.Paginas}</span>
                                </div>
                                <div >
                                    <span class="text-text-secondary">ISBN:</span>
                                    <span class="text-text-primary">${book.ISBN}</span>
                                </div>
                            </div>
                        </div>`


            


bookDetailStats.innerHTML=`<div >
                                <span class="text-text-secondary">Visualizações:</span>
                                <span class="text-text-primary">1.247</span>
                            </div>
                            
                            <div >
                                <span class="text-text-secondary">Formato:</span>
                                <span class="text-text-primary">PDF, EPUB</span>
                            </div>
                            <div >
                                <span class="text-text-secondary">Páginas:</span>
                                <span class="text-text-primary">${book.Paginas}</span>
                            </div>`



btnLerOnline.addEventListener('click', ()=>{
    window.location.href =`${urlDoc +'/'+ book.path_book}`
    btnLerOnline.setAttribute('target','_blank')
})
btnDownBookDetails.addEventListener('click',async ()=>{
    const resposta = await fetch(`${urlDoc +'/'+ book.path_book}`)
    //console.log(await resposta.json());
    //console.log(await resposta.blob());

    
    const blob = await resposta.blob()
    const url = window.URL.createObjectURL(blob)

    const linkInvisivel = document.createElement('a')
    linkInvisivel.style.display ='none'
    linkInvisivel.href = url
    linkInvisivel.download = book.path_book

    document.body.appendChild(linkInvisivel)
    linkInvisivel.click()
    
    // window.location.href = url
    // btnLerOnline.download = book.path_book

    //limpeza 
    //window.URL.createObjectURL(url)
})