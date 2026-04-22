import { Api } from "../apiFunction.js"

//elementos do html [Botões]
const addNovoLivro = document.querySelector('button[name = addNovoLivro]') //botão para abrir o modal add livros


/**
 * elementos da secção de busca 
*/

const searchCategoryBook = document.getElementById('searchCategoryBook') //elemento select que vai pegar a categoria dos livros a serem pesquisado
const searchStatusBook = document.getElementById('searchStatusBook') //elemento select que vai pegar o estatu dos livros a serem pesquisado
const resultsCount = document.getElementById('resultsCount') // elemento que vai mostrar a quantidade de livro pesquisado
const accoesEmMassa = document.getElementById('accoesEmMassa')//elemeto que vai mostra as seleções em massa para livros marcados

//elementos do html [input]
const searchBook = document.querySelector('input[name = searchBook]')// input que recebera o livro a ser procurado
// elementos do htmal [botões]
const limparBookFiltro = document.querySelector('button[name = limparBookFiltro]')// botão que vai limpar todos os campos de pesquisa

/**
 * fim dos elementos da secção de busca 
*/

/**
 * elementos da tabela de lista de livros
*/

const selectAllBook = document.getElementById('selectAllBook') // elemento checkBox que vai seleciona todos os livros
const sortLivrosTitulos = document.getElementById('sortLivrosTitulos') //elemento que vai ordenar os livros de A-z ou de Z-A atraves do titulo
const sortLivrosAutor = document.getElementById('sortLivrosAutor') //elemento que vai ordenar os livros de A-z ou de Z-A atraves do Autor
const bodyLivros = document.getElementById('bodyLivros')// elemento body da tabela da lista de livros
const emptyStateBook = document.getElementById('emptyStateBook')// elemento acionado quando não existe nenhum livro

/**
 * fim dos elementos da tabela de lista de livros
*/



/**
 * Elementos dos modais
*/

//elementos do modal deleteModalBook
const deleteModalBook = document.getElementById('deleteModalBook') //formulario do modal para confirmar a eliminação do livro
//elementos html [Botão]
const modal_footer_canc = document.querySelector('button[name = modal_footer-canc]') // botão que vai cancelar a eliminação do livro e também fechar o modal
const modal_footer_del = document.querySelector('button[name = modal_footer-del]') //botão que vai confirmar a exclusão do livro

// fim dos elementos do modal deleteModalBook

//elementos do modal add livros

const bookModal = document.getElementById('bookModal')// modal do formulario para adicionar o livro
const bookCategory = document.getElementById('bookCategory')// elemento que vai pegar a categoria do livro
const bookSynopsis = document.getElementById('bookSynopsis')// elemento que vai pegar a Sinopse do livro
const fileName = document.getElementById('fileName')// elemento que vai mostrar o nome do livro ao carregar
const fileSize = document.getElementById('fileSize')// elemento que vai mostrar o tamanho do livro ao carregar
const progressBar = document.getElementById('progressBar')// elemento que vai mostrar progressBar a carregar
const fileUploadProgress = document.getElementById('fileUploadProgress')// elemento que vai mostrar progressBar
const bookPais = document.getElementById('bookPais')// elemento que vai pegar o pais do livro
const bookIdioma = document.getElementById('bookIdioma')// elemento que vai pegar o idioma do livro
const bookAboutAutor = document.getElementById('bookAboutAutor')// elemento que vai pegar o sobre o autor
const containerImgAutor = document.getElementById('containerImgAutor')// container que vai mostrar a imagem do autor
const containerAboutAutor = document.getElementById('containerAboutAutor')// container acerca do autor


//elementos html [Botão]
const closeModal = document.querySelector('button[name = closeModal]') // botão que vai  fechar o modal
const cancelModalAddBook = document.querySelector('button[name = cancelModalAddBook]') // botão que vai  fechar o modal add livro e cancelar a adição do livro
const addBook = document.querySelector('button[name = addBook]') // botão que vai salvar e adicionar a categoria


//elementos html [input]
const capaBookFile = document.querySelector('input[name = capaBookFile]') // input que vai pegar o caminho da capa do livro
const bookTitulo = document.querySelector('input[name = bookTitulo]') // input que vai pegar o titulo do livro
const bookAutor = document.querySelector('input[name = bookAutor]') // elemento que vai pegar o nome do Autor
const bookISBN = document.querySelector('input[name = bookISBN]') // elemento que vai pegar o isbn
const bookYear = document.querySelector('input[name = bookYear]') // elemento que vai pegar o ano de publicação do livro
const bookFile = document.querySelector('input[name = bookFile]') // input que vai pegar o caminho do ficheiro do livro
const bookStatusActive = document.querySelector('input[name = bookStatusActive]') // input que vai pegar o estato Activo livro
const bookStatusInactive = document.querySelector('input[name = bookStatusInactive]') // input que vai pegar o estato inactivo livro
const bookVolume = document.querySelector('input[name = bookVolume]')//vai pegar o volume do ,ivro
const bookPage = document.querySelector('input[name = bookPage]')//vai pegar as páginas do livro
const BookAutorFile = document.querySelector('input[name = BookAutorFile]')//vai a imagem do autor


//fim dos elementos do modal add livros

/**
 * pegar os dados da api
 */
const api = new Api()
let categoria = await api.getData('category')
let livros = await api.getData('book')
let status = await api.getData('status')
const autores = await api.getData('autor')

const formData = new FormData();


/**
 * carregando a DOM
 */


    if(livros.length != 0)
        showBook(livros)
    else
        notFound()
        



/**
 * Códigos dos botões de navegação
 */


/*botão de navegação para o modal*/

//abrir o modal add livros
addNovoLivro.addEventListener('click',()=>{
    clearModallivros()
    bookModal.classList.remove('hidden')
})

closeModal.addEventListener('click',()=>{
    bookModal.classList.add('hidden')
})
cancelModalAddBook.addEventListener('click',()=>{
    bookModal.classList.add('hidden')
})

/**
 * códigos gerais
 */


//acções que vão alterar de um estado a outro
bookStatusActive.addEventListener('change',()=>{
    if(bookStatusActive.checked)
        bookStatusInactive.checked = false
    


})

bookStatusInactive.addEventListener('change',()=>{
    if(bookStatusInactive.checked)
        bookStatusActive.checked = false
    


})

// filtrar livros
//filtrar apartir do titulo ou do nome do Autor
searchBook.addEventListener('input',()=>{
    bodyLivros.innerHTML=''
    emptyStateBook.classList.add('hidden')

    const vet = filtrarLivros(searchBook.value)
    if(vet.length > 0)
        showBook(vet)
    else
        notFound()
})

//filtra apartir da categoria do livro
searchCategoryBook.addEventListener('change',()=>{
    bodyLivros.innerHTML=''
    emptyStateBook.classList.add('hidden')
    const vet = filtrarLivros(searchCategoryBook)
    if(vet.length > 0)
        showBook(vet)
    else
        notFound()
})

//filtrar apartir do estatu do livro
searchStatusBook.addEventListener('change',()=>{
    bodyLivros.innerHTML=''
    emptyStateBook.classList.add('hidden')
    const vet = filtrarLivros(searchStatusBook.value)
    if(vet.length > 0)
        showBook(vet)
    else
        notFound()
})

//limpar os campos do filtro
limparBookFiltro.addEventListener('click',()=>{
    searchBook.value = ''

    searchCategoryBook.value ='all'
    
    searchStatusBook.value ='all'
    emptyStateBook.classList.add('hidden')
    if(livros!= 0)
        showBook(livros )
    else
        notFound()
        
        
    
        
})


//preencher o section de categoria da secção de filtro
preencherCategory(searchCategoryBook)

//preencher o section de categoria do modal add Livro
preencherCategory(bookCategory)

    

bookAutor.addEventListener('blur',()=>{
    
    const autor = autores.find(item => item.name === bookAutor.value)
    if(autor){
        bookAutor.value = autor.name
        containerAboutAutor.classList.add('hidden')
        containerImgAutor.classList.add('hidden')
    }else if(bookAutor.value != ''){
        containerAboutAutor.classList.remove('hidden')
        containerImgAutor.classList.remove('hidden')

    }
    
    
    
})
//salvar os dados do livro
addBook.addEventListener('click',()=>{
    const data = retornarDadosDoLivro()
    
    if(addBook.getAttribute('data-id')){
        data.book.id = addBook.getAttribute('data-id')
        api.atualizarData(data.book,'book/update')
    }else{
        api.createData(data.book,'book/create')
    }

    bookModal.classList.add('hidden')
    livros = api.getData('book')
    showBook(livros)
})

//executar uma acção em massa

accoesEmMassa.addEventListener('click',()=>{
    const checkBoxes = document.querySelectorAll('.selectItemLivros:checked')
    if(checkBoxes.length == 0)
        accoesEmMassa.setAttribute('disabled','true')
})

accoesEmMassa.addEventListener('change',()=>{
    const checkBoxes = document.querySelectorAll('.selectItemLivros:checked')
    if(accoesEmMassa.value === 'deletar'){
        checkBoxes.forEach(checkBox => {
            const id = checkBox.getAttribute('data-id')
            deletarLivro(id)
        })

    }else{
        checkBoxes.forEach(checkBox => {
            const id = checkBox.getAttribute('data-id')
            
            ativarDesativarLivros(id,accoesEmMassa.value)
            
        })
    }
        accoesEmMassa.setAttribute('disabled','true')

})
    

    


/**
 * Area de funções para secção de livros
 */

async function ativarDesativarLivros(id,acao){
    
    const idstatus = (livros.find(item => item.id === id)).statusId
    let Idstatu = ''
    if(acao === 'Activar'){
        Idstatu = (status.find(item => item.status === 'Activo')).id
        if(Idstatu === idstatus)
            return
    }else if(acao ==='Desactivar'){
        Idstatu = (status.find(item => item.status === 'Inactivo')).id
        if(Idstatu === idstatus)
            return
    }
        
    //console.log('id:',Idstatu);
    

    const data = {
        id:id,
        data:{
            statusId: Idstatu
        }
    }
    const updateData = await api.atualizarData(data,'book/update')
    
    count = 0
    livros = await api.getData('book')
    showBook(livros)
}


//função para  mostrar os livros
function showBook(item){
    bodyLivros.innerHTML=''
    item.forEach(element => {
        const tr = document.createElement('tr')
        tr.className='table__linhas'
        
        
        tr.innerHTML = ` <td>
                                    <input type="checkbox"
                                        class="selectItemLivros"
                                        onchange="selectCheck(this)"
                                        data-id ="${element.id}"
                                    >
                                </td>
                                <td>
                                    <div class="table__linha--capa">
                                        <img 
                                            src="${element.pathCapa_livro || './assets/vanguarda_saga.jpeg'}" 
                                            alt="Capa do livro ${element.titulo}"
                                            class=""
                                            loading="lazy"
                                            onerror="this.src='https://images.unsplash.com/photo-1584824486509-112e4181ff6b?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'; this.onerror=null;"
                                        >
                                    </div>
                                </td>
                                <td>
                                    <div class="font-medium text-text-primary">${element.titulo}</div>
                                </td>
                                <td class="text-text-primary">${(autores.find(item => item.id === element.autorId)).name}</td>
                                <td><span class="badge badge-primary">${(categoria.find(Element => Element.id === element.categoryid)).name}</span></td>
                                <td><span class="badge ${(status.find(Element => Element.id === element.statusId)).status ==='Activo'?' badge-success':'badge-warning'}">${(status.find(Element => Element.id === element.statusId)).status}</span></td>
                                <td class="table__td">
                                <div>
                                        <button onclick="viewBook('${element.id}')" class=" text-text-secondary hover:text-primary transition-colors"  title="Visualizar">
                                            <svg  fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                                            </svg>
                                        </button>
                                        <button onclick="editBook('${element.id}')" class=" text-text-secondary hover:text-primary transition-colors"  title="Editar">
                                            <svg  fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                                            </svg>
                                        </button>
                                        <button onclick="deleteBook('${element.id}')" class=" text-text-secondary hover:text-error transition-colors" title="Excluir">
                                            <svg  fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                            </svg>
                                        </button>
                                    </div>
                                </td>`

        bodyLivros.appendChild(tr)
    });
}


//função de elemento não encotrado
function notFound(){
    emptyStateBook.innerHTML=`<div>
                    <svg class=" text-text-tertiary " fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
                    </svg>
                    <h3 class="text-xl  text-text-primary ">Nenhum Livro encontrada</h3>
                    <p class="text-text-secondary ">Tente ajustar seus filtros ou crie um novo livro</p>
                    <button onclick="openCreateCategoryModal()" class="btn btn-primary">
                        Criar Nova Livro
                    </button>
                </div>
                `

    emptyStateBook.classList.remove('hidden')
}


//função para abrir o modal para editar os livros
async function editBook(id){
    clearModallivros()
    const book =  livros.find(item => item.id === id)
    
    
    const idStatus = (livros.find(item => item.id === id)).statusId
    const statusName = (status.find(item => item.id === idStatus)).status
    
    bookTitulo.value = book.titulo
    capaBookFile.file = book.pathCapa_livro
    bookAutor.value = book.Autor
    bookISBN.value = book.ISBN
    bookYear.value = book.ano_pub
    bookSynopsis.value = book.sinopse
    bookFile.file = book.path_book
    
    
    
    if(statusName === 'Activo')
        bookStatusActive.checked = true
    else if(statusName === 'Inactivo')
        bookStatusInactive.checked = true

    addBook.setAttribute('data-id',id)
    
    bookModal.classList.remove('hidden')
}

//função para limpar os campos do modal
function clearModallivros(){
    bookTitulo.value = ''
    capaBookFile.file = ''
    bookAutor.value = ''
    bookISBN.value = ''
    bookYear.value = ''
    bookSynopsis.value = ''
    bookFile.file = ''
    bookStatusActive.checked = false
    bookStatusInactive.checked = false
    
}

//função para filtrar livros
function filtrarLivros(valor){
    const item = livros.filter(element =>{
        if(valor ==='all')
            return element
        else if(valor === 'Activo' || valor === 'Inactivo'){
            const statu = status.find(Element => Element.status === valor)
            
            return element.statusId === statu.id
        }else if(valor.value){
            const category = categoria.find(item => item.name === valor.value)
            return element.categoryid === category.id
        }else{
            return element.titulo.toLowerCase().includes(valor.toLowerCase()) || element.Autor.toLowerCase().includes(valor.toLowerCase())
        }
        
    })
    return item
}

    //preencher o section de categoria da secção de filtro
function preencherCategory(element){
    
if(categoria.length != 0){
    categoria.forEach(item =>{
        const option = document.createElement('option')
        option.setAttribute=`value = '${item.name}'`
        option.innerHTML =`${item.name}`
        element.appendChild(option)
    })
}
}

//função para retornar os dados do livro para serem salvos
function retornarDadosDoLivro(){

    const fd = new FormData();
    // 1. Adicionar os arquivos com nomes de campos específicos
    if (bookFile.files[0]) fd.append('livro_pdf', bookFile.files[0]);
    if (capaBookFile.files[0]) fd.append('capa_livro', capaBookFile.files[0]);
    if (BookAutorFile.files[0]) fd.append('foto_autor', BookAutorFile.files[0]);
    return {
        book:{
            titulo:bookTitle.value,
            ISBN:bookISBN.value,
            Idioma:bookIdioma.value,
            Pais:bookPais.value,
            Paginas:bookPage.value,
            volume: bookVolume.value,
            ano_pub:bookYear.value,
            sinopse:bookSynopsis.value,
            path_book:fd.get('livro_pdf'), //bookFile.files[0],
            pathCapa_livro:fd.get('capa_livro'), //capaBookFile.files[0],
            statusId:(status.find(item =>{
                if(bookStatusActive.checked)
                    return item.status === bookStatusActive.value
                else if(bookStatusInactive.checked)
                    return item.status === bookStatusInactive.value
            })).id,
            autorId:(autores.find(item => item.name === bookAutor.value)).id,
            categoryid:(categoria.find(item => item.name === bookCategory.value)).id
        },
        autor:{
            name:bookAutor.value,
            descricao:bookAboutAutor.value,
            pathImag:fd.get('foto_autor') //BookAutorFile.files[0]
        }
    }
}


let count = 0
function selectCheck(element){
    if(element.checked){
                accoesEmMassa.removeAttribute('disabled')
                count++
    }else if(!element.checked && count > 1){
        count--
    }else{
        accoesEmMassa.setAttribute('disabled','true')
        count--
    }

    if(count != 0){
        document.getElementById('resultadoFiltro').innerHTML=`
        Mostrando <span id="resultsCount" class="font-medium text-text-primary">${count}</span> de <span id="searcTotalBook" class="font-medium text-text-primary">${(livros.filter(item => item)).length}</span> livros
        `
    }else{
        document.getElementById('resultadoFiltro').innerHTML=''
    }
}


async function deletarLivro(id){
    const data =  livros.find(item => item.id === id)
    
    const livroDeletado = await api.deleteData({id:id},'book/delete')
    
    if(livroDeletado){
            const activity ={
                activity:'Livro eliminado',
                descricao:`Informações do "${data.name}" foram Eliminadas`,
                pathImg:`img/${data.name}`
            }
    
    const dataActivity = await api.createData(activity,'activity/create')
    
    }


    livros = await api.getData('book')
    showBook(categoria)
}

window.selectCheck = selectCheck
window.editBook = editBook