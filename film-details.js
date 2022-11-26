const container = document.createElement('div');

export function render(data) {
  console.log(data)
  container.classList.add('container' ,'max-w-4xl' , 'mx-auto');
  container.innerHTML = `<h1 class="text-center text-purple-700">${data.title} (Эпизод ${data.episode_id})</h1>
  <p class="italic text-center text-blue-800"> ${data.opening_crawl} </p>`
  getData([data.planets, data.species, data.starships]);

  // backBtn.classList.add('btn', 'btn-info');
  // backBtn.textContent = "Back to episodes";
  // container.append(backBtn);
  return container;
}

function getData(arrUrl){
let i = 0
  arrUrl.map(src => Promise.all(src.map(url => fetch(url).then(res =>res.json()))).then( arr => {

    console.log(arr)
    i++;
    let title = document.createElement('h2');

    if(i === 1) {
      title.textContent = "Planets"
    }
    else if(i === 2){
      title.textContent = "Species"
    }
    else if(i === 3){
      title.textContent = "Star Ships"
    }
    title.classList.add('text-center', 'text-indigo-700');
    container.append(title);
    let list = document.createElement('ul');
    container.append(list);
    arr.map(el => {
      let item = document.createElement('li');
      item.classList.add('text-center');
      item.textContent = `${el.name}`;
      list.append(item)
    })
  }))
}

// function getBtn(){
//   document.addEventListener('DOMContentLoaded', ()=>{
//     let backBtn = document.createElement('button');
//     backBtn.classList.add('btn', 'btn-info');
//     backBtn.textContent = "Back to episodes";
//     container.append(backBtn);
//   })
// }
