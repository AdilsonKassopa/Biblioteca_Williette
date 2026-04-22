
import { Api } from "./apiFunction.js"
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
const relatedBody = document.getElementById('relatedBody')

//funções da api
const api = new Api()
const livros = await api.getData('book')
const categoria = await api.getData('category')

console.log(btnLerOnline)

bookDetailImg.innerHTML =''
detailHeaderTitulo.innerHTML=''
detailHeaderAutor.innerHTML=''
detailHeaderAnoDePublicacao.innerHTML=''
detailHeaderCategoriaPai.innerHTML = ''
synopsis_short.innerHTML=''
relatedBody.innerHTML=''


    bookDetailImg.innerHTML =`
        <img 
            src="${!livros[0].pathCapa_livro || 'https://images.unsplash.com/photo-1584824486509-112e4181ff6b?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3'}" 
            alt="Capa do livro ${livros[0].titulo}"
            loading="lazy"
            onerror="this.src='https://images.unsplash.com/photo-1584824486509-112e4181ff6b?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'; this.onerror=null;"
        >
    `
    detailHeaderTitulo.innerHTML = `${livros[0].titulo}`
    detailHeaderAutor.innerHTML = `${livros[0].Autor}`
    detailHeaderAnoDePublicacao.innerHTML = `Publicado em ${livros[0].ano_pub}`

    const categoriaPai = categoria.find((Element) => Element.id === livros[0].categoryid)

    detailHeaderCategoriaPai? detailHeaderCategoriaPai.innerHTML =`${
    (categoria.find((Element) => Element.id === categoriaPai.categoriaId))?.name ?? 'não  informado'
    }`: detailHeaderCategoriaPai.innerHTML='erro ao carregar...'

    detailHeaderCategoria? detailHeaderCategoria.innerHTML =`${
    (categoria.find((Element) => Element.id === livros[0].categoryid))?.name ?? 'não  informado'
    }`: detailHeaderCategoriaPai.innerHTML='erro ao carregar...'

    synopsis_short.innerHTML=`
    <p >
    ${livros[0].sinopse}
    </p>
    `
    let count = 0
    livros.forEach(element => {
    const card = document.createElement('div');
    card.className = 'shadow-sm transition-all hover:shadow-md hover:-translate-y-1 book-card group cursor-pointer';
    card.onclick = () => {
    localStorage.setItem('selectedBook', JSON.stringify(livro));
    window.location.href = 'book_details.html';
    };
        if(count < 5)
            card.innerHTML =`<div class="aspect-[3/4] bg-surface overflow-hidden">
                        <img 
                            src="${!element.pathCapa_livro || 'https://images.unsplash.com/photo-1584824486509-112e4181ff6b?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3'}" 
                            alt="Capa do livro ${element.titulo}"
                            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                            onerror="this.src='https://images.unsplash.com/photo-1584824486509-112e4181ff6b?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'; this.onerror=null;"
                        >
                    </div>
                    <div class="p-4">
                        <h3 class="font-heading font-medium text-text-primary text-sm mb-1 line-clamp-2">${element.titulo}</h3>
                        <p class="text-text-secondary text-xs mb-2">${element.Autor}</p>
                        <span class="badge badge-primary text-xs">${(categoria.find(Element => Element.id === element.categoryid)).name}</span>
                    </div>
                `
        else
            return
        console.log(element);
        
        count++
        relatedBody.appendChild(card);
    });






