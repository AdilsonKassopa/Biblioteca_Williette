import { Api } from "../apiFunction.js"

//Elementos HTML da secção categoria
const btnAddCategoria = document.querySelector('button[name = btnAddCategoria]')

// elementos da secção de estatistica
const totalCategoria = document.getElementById('totalCategoria')
const totalCategoriaActiva = document.getElementById('totalCategoriaActiva')
const totalCategoriaVazia = document.getElementById('totalCategoriaVazia')
const totalLivrosCategorizado = document.getElementById('totalLivrosCategorizado')

//elementos da secção de filtro
const searchInput = document.querySelector('input[name = searchInput]')
const statusFilter = document.getElementById('statusFilter')
const bookCountFilter = document.getElementById('bookCountFilter')
const btnResetFilters = document.querySelector('button[name = btnResetFilters]')

// elementos da seccão de categorias marcadas
const categoriasSelecionadas = document.getElementById('categoriasSelecionadas')
const categoriasMarcadas = document.getElementById('categoriasMarcadas')
//elemento lista de categorias tabela

const selectAll = document.querySelector('input[name = selectAll]')
const sortCategories = document.querySelector('button[name = sortCategories]')
const sortBook = document.querySelector('button[name = sortBook]')
const sortDate = document.querySelector('button[name = sortDate]')
const categoriesTableBody = document.getElementById('categoriesTableBody')
const errCategoryName = document.getElementById('err-categoryName')
const labelCategoryName = document.getElementById('label-categoryName')



//elemento da div Empty State
const emptyState = document.getElementById('emptyState')

//Elementos Html dos modais

const deleteModalBook = document.getElementById('deleteModalBook')
const bookModal = document.getElementById('bookModal')
const categoryModal = document.getElementById('categoryModal')
const deleteModalCategory = document.getElementById('deleteModalCategory')
//modal categoria
const btnCloseModal = document.querySelector('button[name = btnCloseModal]')
const categoryName = document.querySelector('input[name = categoryName]')
const categoryDescription = document.getElementById('categoryDescription')
const parentCategory = document.getElementById('parentCategory')
const categoryStatusAtiva = document.querySelector('input[name = categoryStatusAtiva]')
const categoryStatusInativa = document.querySelector('input[name = categoryStatusInativa]')
const btnCancelarModalCategory = document.querySelector('button[name = btnCancelarModalCategory]')
const btnSalvarCategory = document.querySelector('button[name = btnSalvarCategory]')


//elementos do modal deletar categoria
const deleteCategoryName = document.getElementById('deleteCategoryName')
const deleteBookCount = document.getElementById('deleteBookCount')
const confirmDeleteCategoria = document.querySelector('button[name = confirmDeleteCategoria]')
const cancelarDeleteCategoria = document.querySelector('button[name = cancelarDeleteCategoria]')

//elementos de acções de categoria marcadas
const mark_ativar = document.getElementById('mark_ativar')
const mark_desativar = document.getElementById('mark_desativar')
const mark_excluir = document.getElementById('mark_excluir')

const api = new Api()
let categoria = await api.getData('category')
let livros = await api.getData('book')
let status = await api.getData('status')


const colorvet = [
    'bg-primary',
    'bg-accent',
    'bg-secondary',
    'bg-primary-400',
    'bg-accent-400',
    'bg-secondary-400',
    'bg-primary-300',
    'bg-secondary-600',
    'bg-accent-300',
    'bg-primary-200'
]



if(categoria.length === 0){
    notFound()
}else{
    showEstatistica(categoria)
    showCategory(categoria)
}


statusFilter.addEventListener('change',()=>{
    categoriesTableBody.innerHTML=''
    emptyState.classList.add('hidden')
    const vet = filtrarCategoria(statusFilter.value)
    if(vet.length > 0)
        showCategory(vet)
    else
        notFound()
})

bookCountFilter.addEventListener('change',()=>{
    categoriesTableBody.innerHTML=''
    emptyState.classList.add('hidden')
    const vet = filtrarCategoria(bookCountFilter.value)
    
    if(vet.length > 0)
        showCategory(vet)
    else
        notFound()
        
})
searchInput.addEventListener('input',()=>{
    categoriesTableBody.innerHTML=''
    emptyState.classList.add('hidden')
    const vet = filtrarCategoria(searchInput.value)
    if(vet.length > 0)
        showCategory(vet)
    else
        notFound()
})

btnResetFilters.addEventListener('click',()=>{
    resetFilters()
})

//botão adicionar categoria
btnAddCategoria.addEventListener('click',()=>{
    clearModalCategoria()
    categoryModal.classList.remove('hidden')
})
//Areas dos códigos do modal da categoria

 categoryStatusAtiva.addEventListener('change',()=>{
    categoryStatusInativa.checked = false
 })
categoryStatusInativa.addEventListener('change',()=>{
    categoryStatusAtiva.checked = false
})


btnCloseModal.addEventListener('click',()=>{
    labelCategoryName.classList.remove('text-accent')
    errCategoryName.classList.remove('text-accent')
    errCategoryName.innerHTML=''
    categoryModal.classList.add('hidden')
})
btnCancelarModalCategory.addEventListener('click',()=>{
    labelCategoryName.classList.remove('text-accent')
    errCategoryName.classList.remove('text-accent')
    errCategoryName.innerHTML=''
    categoryModal.classList.add('hidden')
})

//preencher o section de categoria do modal
if(categoria.length === 0)
    parentCategory.innerHTML='<option value="">Nenhuma (Categoria Principal)</option>'
else{
    parentCategory.innerHTML=''
    const option = document.createElement('option')
    option.setAttribute=`value = ''`
    option.innerHTML ='Nenhuma (Categoria Principal)'
    parentCategory.appendChild(option)
    categoria.forEach(item =>{
        const option = document.createElement('option')
        option.setAttribute=`value = '${item.name}'`
        option.innerHTML =`${item.name}`
        parentCategory.appendChild(option)
    })
}
//btn salvar categoria
btnSalvarCategory.addEventListener('click',async ()=>{

    if(!categoryName.value){
        labelCategoryName.classList.add('text-accent')
        errCategoryName.classList.add('text-accent')
        errCategoryName.innerHTML = 'Este campo é obrigatorio'
        throw new Error('Campo obrigatorio')
    }

    labelCategoryName.classList.remove('text-accent')
    errCategoryName.classList.remove('text-accent')
    errCategoryName.innerHTML=''

    const id = btnSalvarCategory.getAttribute('data-id')
    const data = salvarCategoria()
    let activity  =''
    if(!id){
        const dadosSalvos = await api.createData(data,'category/create')
        activity ={
            activity:'Nova categoria criada',
            descricao:`Categoria "${data.name}" foi adicionada ao sistema`,
            pathImg:`img/${data.name}`
        }
        
    }else{
        const update = {
            id:id,
            data:data
        }
        const updateData = await api.atualizarData(update,'category/update')

            activity ={
                activity:'Categoria atualizada',
                descricao:`Informações de "${data.name}" foram atualizadas`,
                pathImg:`img/${data.name}`
            }
    }

    const dataActivity = await api.createData(activity,'activity/create')
    categoria = await api.getData('category')
    showEstatistica(categoria)
    showCategory(categoria)
    
    
    categoryModal.classList.add('hidden')
    
})
    
/**
 * códigos para o modal de confirmação para deletar a categoria
 */

cancelarDeleteCategoria.addEventListener('click',()=>{
     confirmDeleteCategoria.setAttribute('data-id',' ')

    deleteCategoryName.innerHTML = ''
    deleteBookCount.innerHTML =''

    deleteModalCategory.classList.add('hidden')
})

confirmDeleteCategoria.addEventListener('click',async ()=>{
    const id = confirmDeleteCategoria.getAttribute('data-id')
    deletarCategoria(id)
    
    
    
    confirmDeleteCategoria.setAttribute('data-id',' ')

    deleteCategoryName.innerHTML = ''
    deleteBookCount.innerHTML =''
    deleteModalCategory.classList.add('hidden')
})


/**
 * 
 * Aqui vão ser declaradas variavez que tem que executar depois de esperar a pagina carregar
 */




//códigos para acções de categoria marcadas


//marcar todas categorias
selectAll.addEventListener('click',()=>{
    
    if(selectAll.checked){
        selectItem.forEach(item=>{
            if(!item.checked){
                item.checked =true
                count++
            }
        })
        categoriasSelecionadas.innerHTML = count
        categoriasMarcadas.classList.remove('hidden')
    }else{
        selectItem.forEach(item=>{
            if(item.checked){
                item.checked =false
                
            }
        })
        count = 0
        categoriasSelecionadas.innerHTML =''
        categoriasMarcadas.classList.add('hidden')
    }
})


//botão para deletar categoria marcadas
mark_excluir.addEventListener('click',()=>{
    const selectItem = document.querySelectorAll('.selectItem:checked')

    selectItem.forEach(item=>{
        deletarCategoria(item.getAttribute('data-id'))
    })
    count = 0
    categoriasMarcadas.classList.add('hidden')
})



//botão para ativar categorias marcadas
mark_ativar.addEventListener('click',()=>{
    const selectItem = document.querySelectorAll('.selectItem:checked')
    selectItem.forEach(item=>{
        ativarDesativarCategory(item.getAttribute('data-id'),'Activar')
    })

})

//botão para desativar categorias marcadas
mark_desativar.addEventListener('click',()=>{
    const selectItem = document.querySelectorAll('.selectItem:checked')
    selectItem.forEach(item=>{
        ativarDesativarCategory(item.getAttribute('data-id'),'Desactivar')
    })
})


/**
*secção defunções 
*/


//função para salvar os dados da categoria
function salvarCategoria(){
    return {
        name: categoryName.value,
        descricao: categoryDescription.value,
        categoriaId:(categoria.find(item => item.name === parentCategory.value))?.id,
        statusId:(status.find(item =>{
            if(categoryStatusAtiva.checked)
                return item.status === categoryStatusAtiva.value
            else if(categoryStatusInativa.checked)
                return item.status === categoryStatusInativa.value
        })).id
    }
    
}

//função de elemento não encotrado
function notFound(){
    emptyState.innerHTML=`<div>
                    <svg class=" text-text-tertiary " fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
                    </svg>
                    <h3 class="text-xl  text-text-primary ">Nenhuma categoria encontrada</h3>
                    <p class="text-text-secondary ">Tente ajustar seus filtros ou crie uma nova categoria</p>
                    <button onclick="openCreateCategoryModal()" class="btn btn-primary">
                        Criar Nova Categoria
                    </button>
                </div>
                `

    emptyState.classList.remove('hidden')
}



// Reset filters
function resetFilters() {
    searchInput.value = '';
    statusFilter.value = 'all';
    bookCountFilter.value = 'all';
    showCategory(categoria)
    
}




//função para filtrar categoria
function filtrarCategoria(valor){
    return categoria.filter(element =>{
        if(valor ==='all')
            return element
        else if(valor === 'Activo' || valor === 'Inactivo'){
            const statu = status.find(Element => Element.status === valor)
            
            return element.statusId === statu.id
        }else if(valor === 'empty'){
            let index = (livros.filter(Element => Element.categoryid === element.id)).length
            if(!index)
                return element
        }else if(valor ==='low'){
            let index = (livros.filter(Element => Element.categoryid === element.id)).length
            if(index < 11)
                return element
        }else if(valor ==='medium'){
            let index = (livros.filter(Element => Element.categoryid === element.id)).length
            if(index>=11 && index <=50)
                return element
        }else if(valor ==='high'){
            let index = (livros.filter(Element => Element.categoryid === element.id)).length
            if(index>=50)
                return element
        }else{
            return element.name.toLowerCase().includes(valor.toLowerCase())
        }
    })
    
}

//função para buscar categorias
function showCategory(item){
    let id =0
    categoriesTableBody.innerHTML=''
    item.forEach(element => {
        const tr = document.createElement('tr')
        tr.className='category-row'
        id++
        let index = Math.floor(Math.random()*colorvet.length)
        
        
        tr.innerHTML = `<td>
                                    <input 
                                        type="checkbox" 
                                        class="category-checkbox selectItem  text-primary focus:ring-accent"
                                        data-id ="${element.id}"
                                        onchange = "selectCheckBox(this)"
                                    >
                                </td>
                                <td>
                                    <div class="category-row_tdcategoria">
                                        <div class="tdcategoria__div1 ${colorvet[index]}"></div>
                                        <div>
                                            <p class="tdcategoria__divp1 text-text-primary">${element.name}</p>
                                            <p class="tdcategoria__divp2 text-text-secondary">ID: CAT-0${id}</p>
                                        </div>
                                    </div>
                                </td>
                                <td class="text-text-secondary category-row_tddescricao">
                                    <p class="line-clamp-2">${element.descricao}</p>
                                </td>
                                <td>
                                    <span class="text-text-secondary  text-sm">${element.categoriaId? (categoria.find((item) => item.id === element.categoriaId)).name:'—'}</span>
                                </td>
                                <td>
                                    <span class="badge badge-primary">${(livros.filter(item => item.categoryid === element.id)).length} livros</span>
                                </td>
                                <td>
                                    <span class=" badge ${(status.find(item => item.id === element.statusId)).status ==='Activo'?' badge-success':'badge-warning'}">${(status.find(item => item.id === element.statusId)).status}</span>
                                </td>
                                <td class="text-text-secondary text-sm">${new Date(element.createdAt).toLocaleDateString()}</td>
                                <td>
                                    <div class="category-row_tdBtn">
                                        <button onclick="editCategory('${element.id}')" class="p-2 text-text-secondary hover:text-primary transition-colors" title="Editar">
                                            <svg  fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                                            </svg>
                                        </button>
                                        <button onclick="changeCategoryStatus('${element.id}', 'active')" class="p-2 text-text-secondary hover:text-warning transition-colors" title="Desativar">
                                            <svg  fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            ${(status.find(item => item.id === element.statusId)).status === 'Activo'?'<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"></path>':'<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>'}
                                            </svg>
                                        </button>
                                        <button onclick="deleteCategory('${element.id}', 45)" class="p-2 text-text-secondary hover:text-error transition-colors" title="Excluir">
                                            <svg  fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                            </svg>
                                        </button>
                                    </div>
                                </td>`

        categoriesTableBody.appendChild(tr)
    });
}
//Cards de estatisticas
function showEstatistica(item){

totalCategoria.innerHTML =`${item.length}`
totalCategoriaActiva.innerHTML =`${(item.filter(element =>{
    const statu = status.find(item => item.status ==='Activo')
    return element.statusId === statu.id
})).length}`
totalCategoriaVazia.innerHTML =`${(item.filter(element =>{
    const statu = status.find(item => item.status ==='Inactivo')
    return element.statusId === statu.id
})).length}`
totalLivrosCategorizado.innerHTML =`${(livros.filter(element => element.categoryid)).length}`


}


//função para limpar os campos do modal da categoria
function clearModalCategoria(){
    categoryName.value = ''
    categoryDescription.value = ''
    categoryStatusAtiva.checked = false
    categoryStatusInativa.checked = false
}


//função para pegar o id e abrir modal confirmar
function deleteCategory(id){
    confirmDeleteCategoria.setAttribute('data-id',id)

    deleteCategoryName.innerHTML = `${(categoria.find(item => item.id === id)).name}`
    deleteBookCount.innerHTML =`${(livros.filter(item => item.categoryid === id)).length}`

    deleteModalCategory.classList.remove('hidden')
}
//função para mudar o estado da categoria
async function changeCategoryStatus(id){
    const idstatu = (categoria.find(item => item.id === id)).statusId
    const statusid = (status.find(item => item.id!=idstatu)).id
    
    const data = {
        id:id,
        data:{
            statusId:statusid
        }
    }
    const updateData = await api.atualizarData(data,'category/update')
    categoria = await api.getData('category')
    showCategory(categoria)
    showEstatistica(categoria)
    
}
//funcão para ativar categoria

async function ativarDesativarCategory(id,acao){
    
    const idstatus = (categoria.find(item => item.id === id)).statusId
    let Idstatu=''
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
            statusId:Idstatu
        }
    }
    const updateData = await api.atualizarData(data,'category/update')
    //console.log('Alterado',updateData);
    count = 0
    categoriasMarcadas.classList.add('hidden')
    categoria = await api.getData('category')
    showCategory(categoria)

    showEstatistica(categoria)
}

//função para abrir o modal para editar a categoria
async function editCategory(id){
    clearModalCategoria()
    const category = categoria.find(item => item.id === id)
    categoryName.value = category.name
    categoryDescription.value = category.descricao
    const idStatus = (categoria.find(item => item.id === id)).statusId
    const statusName = (status.find(item => item.id === idStatus)).status
    
    
    if(statusName === 'Activo')
        categoryStatusAtiva.checked = true
    else if(statusName === 'Inactivo')
        categoryStatusInativa.checked = true

    btnSalvarCategory.setAttribute('data-id',id)
    
    categoryModal.classList.remove('hidden')
}



//função dispara quando um checkBox é selecionado

let count = 0

//função para pegar o id da categoria quando um checkBox é selecionado
function selectCheckBox(element){
    if(element.checked){
                categoriasMarcadas.classList.remove('hidden')
                count++
    }else if(!element.checked && count > 1){
        count--
    }else{
        categoriasMarcadas.classList.add('hidden')
        count--
    }
        categoriasSelecionadas.innerHTML=count; 

   // console.log(element);
    

    // console.log(element.getAttribute('data-id'));
    

    
}

//função para deletar categoria
async function deletarCategoria(id){
    const data = await categoria.find(item => item.id === id)
    
    const deleteCategory = await api.deleteData({id:id},'category/delete')
    
    if(deleteCategory){
            const activity ={
                activity:'Categoria eliminada',
                descricao:`Informações de "${data.name}" foram Eliminadas`,
                pathImg:`img/${data.name}`
            }
    

    const dataActivity = await api.createData(activity,'activity/create')
    
    }


    categoria = await api.getData('category')
    showCategory(categoria)
    showEstatistica(categoria)
}



window.selectCheckBox = selectCheckBox
window.editCategory = editCategory
window.changeCategoryStatus = changeCategoryStatus
window.deleteCategory = deleteCategory