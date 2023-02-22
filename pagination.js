import { API_GENRES } from "./genres-list";

const API_KEY = 'ae41ac8beda98b2e2d51e160e21365e8';
const BASE_URL = 'https://api.themoviedb.org/3';

let pageN = 1;

async function fetchTrendingFilms() {
  try {
    const response = await fetch(
      `${BASE_URL}/trending/movie/day?api_key=${API_KEY}&page=${pageN}`
    );
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
  }
}

async function main() {
  const postsData = await fetchTrendingFilms();
    let currentPage = pageN
    
    // console.log(currentPage);
  let rows = postsData.results.length;

    function displayList(arrData, rowPerPage, page) {
    currentPage = page
        console.log(currentPage);
      
    const postsEl = document.querySelector('.posts');
    postsEl.innerHTML = "";
    pageN--;

    const start = rowPerPage * currentPage;
    const end = start + rowPerPage;
    const paginatedData = arrData.results.slice(start, end);

      const newMarkup = paginatedData.map(movie => {
let genres = movie.genre_ids.map(genre_id => { return (API_GENRES.find(genre => genre.id === genre_id)).name}).join(', ');
       
        return `
 <a id=${movie.id} class="gallery__poster-card" href="">
  <img class="poster-card__image" src="https://image.tmdb.org/t/p/w780${
    movie.poster_path
  }" alt="" loading="lazy" />
  <div class="poster-card__info">
    <p class="info-item title">
      ${movie.original_title}
    </p>
    <p class="info-item">
    ${genres} | ${movie.release_date.substring(0, 4)}
    </p>
  
  </div>
  </a>
`;
      })
      .join('');
        postsEl.innerHTML = newMarkup;
        
        // console.log(postsEl.innerHTML);
  };
  

  function displayPagination(arrData, rowPerPage) {
    const paginationEl = document.querySelector('.pagination');
      const pagesCount = Math.ceil(arrData.total_results / rowPerPage);
      
      
    const ulEl = document.createElement("ul");
    ulEl.classList.add('pagination__list');

    for (let i = 0; i < pagesCount; i++) {
      const liEl = displayPaginationBtn(i + 1);
      ulEl.appendChild(liEl)
    }
    paginationEl.appendChild(ulEl)
  }

  function displayPaginationBtn(page) {
    const liEl = document.createElement("li");
    liEl.classList.add('pagination__item')
    liEl.innerText = page

    if (currentPage === page) {liEl.classList.add('pagination__item--active')};

    liEl.addEventListener('click', () => {
      currentPage = page
      displayList(postsData, rows, currentPage)

      let currentItemLi = document.querySelector('li.pagination__item--active');
      currentItemLi.classList.remove('pagination__item--active');

      liEl.classList.add('pagination__item--active');
    })

    return liEl;
  }

  displayList(postsData, rows, currentPage);
  displayPagination(postsData, rows);
}

main();