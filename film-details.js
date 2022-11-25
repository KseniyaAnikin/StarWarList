export function render(data) {
  console.log(data)
  const container = document.createElement('div');
  container.classList.add('container');
  container.style.width = "50%";
  container.style.margin = "auto";
  container.innerHTML = `<h1>${data.title} (Эпизод ${data.episode_id})</h1>`
  return container;
}
