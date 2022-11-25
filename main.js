const cssPromises = {};
const appContainer =document.getElementById('app');
const searchParams = new URLSearchParams(location.search);
const filmsNumber = searchParams.get('films');

function loadResourse(src) {
  if(src.endsWith('.js')){
    return import(src);
  }

  if(src.endsWith('.css')){
    if(!cssPromises[src]){
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = src;
      cssPromises[src] = new Promise(resolve => {
        link.addEventListener('load',  ()=> resolve());
      });
      document.head.append(link);
    }
    return cssPromises[src];
  }
  return fetch(src).then(res =>res.json());
}

function renderPage(moduleName, apiUrl, css){

  Promise.all([moduleName, apiUrl, css].map(src =>loadResourse(src)))
  .then(([pageModule,data])=> {
    appContainer.innerHTML ='';
    appContainer.append(pageModule.render(data));
    let links = document.querySelectorAll('.list-group-item');
    links.forEach(e => {
      e.addEventListener('click', element => {
        element.preventDefault();
        history.pushState(null, '', searchParams);
        appContainer.innerHTML ='';
        appContainer.append(pageModule.render(data));
      })
    })
  });
}

// window.onpopstate = function() {
//   rendering(history.state.number)
// }

// window.onpopstate = function() {
//   //   rendering(history.state.number)
//   console.log(`Перешли на адрес "${document.location}"`)
//   }

if(filmsNumber){
  renderPage(
    './film-details.js',
    `https://swapi.dev/api/films/${filmsNumber}`,
    'https://cdn.jsdelivr.net/npm/bootstrap@3.4.1/dist/css/bootstrap.min.css'
  );

} else {
  renderPage(
    './film-list.js',
    `https://swapi.dev/api/films`,
    'https://cdn.jsdelivr.net/npm/bootstrap@3.4.1/dist/css/bootstrap.min.css'
  );

}






