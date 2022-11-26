export function render(data){

  const list = document.createElement('div');
  list.classList.add('list-group', 'max-w-4xl' , 'mx-auto')
  let arr = data.results;

  let i = 1;
  let n ='';

  arr.forEach(element => {

    const filmName = document.createElement('a');

    if(element.episode_id === 4){
      n = 'IV';
    }
    else if (element.episode_id === 1){
      n = 'I';
    }
    else if (element.episode_id === 2){
      n = 'II';
    }
    else if (element.episode_id === 3){
      n = 'III';
    }
    else if (element.episode_id === 5){
      n = 'V';
    }
    else if (element.episode_id === 6){
      n = 'VI';
    }
    filmName.textContent = element.title + ` (Эпизод ${n})`;
    filmName.classList.add('list-group-item', 'list-group-item-action');
    filmName.href = `?films=${i++}`;
    filmName.classList.add('text-2xl' ,'font-bold', 'underline')
    list.append(filmName);
  });

 return list;
}






