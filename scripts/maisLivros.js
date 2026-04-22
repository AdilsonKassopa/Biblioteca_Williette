const apiBaseUrl = 'http://localhost:3000';

const booksContainer = document.getElementById('booksContainer');
const searchInput = document.querySelector('.search__inp');


async function obterLivros() {
  try {
    const res = await fetch(`${apiBaseUrl}/book`);
    if (!res.ok) throw new Error('Falha ao carregar livros (status ' + res.status + ')');

    const livros = await res.json();
    retornarLivros(livros);
    preencherAutores(livros);
  } catch (err) {
    console.error(err);
    if (booksContainer) {
      booksContainer.innerHTML = `<p style="color: #c4302b; padding: 1rem;">Erro ao carregar lista de livros: ${err.message}</p>`;
    }
  }
}

async function obterCategoria() {
  try {
    const res = await fetch(`${apiBaseUrl}/category`);
    if (!res.ok) throw new Error('Falha ao carregar categoria (status ' + res.status + ')');

    return await res.json();
  } catch (err) {
    console.error(err);
    if (booksContainer) {
      booksContainer.innerHTML = `<p style="color: #c4302b; padding: 1rem;">Erro ao carregar lista de categoria: ${err.message}</p>`;
    }
  }
}

async function retornarLivros(livros) {
  if (!booksContainer) return;
  const categories = await obterCategoria()
  
  booksContainer.innerHTML = '';

  if (!Array.isArray(livros) || livros.length === 0) {
    booksContainer.innerHTML = '<p>Nenhum livro encontrado.</p>';
    return;
  }

  livros.forEach((livro) => {
    const card = document.createElement('div');
    card.className = 'shadow-sm transition-all hover:shadow-md hover:-translate-y-1 book-card group cursor-pointer';
    card.onclick = () => {
      localStorage.setItem('selectedBook', JSON.stringify(livro));
      window.location.href = 'book_details.html';
    };
    let category = categories.find((Element) => Element.id === livro.categoryid)
    card.innerHTML = `
      <div class="aspect-[3/4] bg-surface overflow-hidden">
        <img
          src="${livro.pathCapa_livro || 'https://images.unsplash.com/photo-1584824486509-112e4181ff6b?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3'}"
          alt="Capa do livro ${livro.titulo}"
          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
          onerror="this.src='https://images.unsplash.com/photo-1584824486509-112e4181ff6b?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3'"
        >
      </div>
      <div class="p-4">
        <h3 class="font-heading font-medium text-text-primary text-sm mb-1 line-clamp-2">${livro.titulo || 'Sem título'}</h3>
        <p class="text-text-secondary text-xs mb-2">${livro.Autor || 'Autor desconhecido'}</p>
        <span class="badge badge-primary text-xs">${category.name || 'Sem categoria'}</span>
      </div>
    `;

    
    booksContainer.appendChild(card);
  });
}

function preencherAutores(livros) {
  const authorsContainer = document.getElementById('authorsList');
  if (!authorsContainer || !Array.isArray(livros)) return;

  const authors = Array.from(new Set(livros.map((x) => x.Autor).filter(Boolean)));
  authorsContainer.innerHTML = '';

  if (authors.length === 0) {
    authorsContainer.innerHTML = '<p>Sem autores cadastrados.</p>';
    return;
  }

  authors.forEach((autor) => {
    const item = document.createElement('li');
    item.textContent = autor;
    authorsContainer.appendChild(item);
  });
}

function filtrarLivros() {
  const term = (searchInput?.value || '').toLowerCase().trim();
  if (!term) {
    obterLivros();
    return;
  }

  fetch(`${apiBaseUrl}/book`)
    .then((res) => res.json())
    .then((livros) => {
      const filtrados = livros.filter((livro) => {
        const titulo = (livro.titulo || '').toLowerCase();
        const autor = (livro.Autor || '').toLowerCase();
        const isbn = (livro.ISBN || '').toLowerCase();

        return titulo.includes(term) || autor.includes(term) || isbn.includes(term);
      });
      retornarLivros(filtrados);
    })
    .catch((err) => console.error('Erro ao buscar livros para filtro: ', err));
}

if (searchInput) {
  searchInput.addEventListener('input', () => {
    filtrarLivros();
  });
}

if (booksContainer) {
  obterLivros();
} else {
  console.warn('booksContainer não encontrado em maisLivros.html');
}
