function make_node(el, c, text){
  node = document.createElement(el)
  node.textContent = text
  node.className = c
  return node
};

function display_event(evento, dia){
  event_node = document.createElement('a')
  event_node.href = evento['link']
  event_node.target = '_blank'
  event_node.className = 'evento'
  time_node = document.createElement('div')
  time_node.className = 'tiempo'
  time_node.appendChild(make_node('span', 'dia', dia))
  time_node.appendChild(make_node('span', 'hora', evento['hora']))
  time_node.appendChild(make_node('span', 'ciudad', evento['ciudad']))
  event_node.appendChild(time_node)
  event_node.appendChild(make_node('div', 'titulo', evento['título']))
  event_node.appendChild(make_node('div', 'descripcion', evento['descripción']))
  eventos_container.appendChild(event_node)
};

function display_day(e){
  eventos_container.innerHTML = ''
  data[e.target.id].forEach((evento) => display_event(evento, e.target.id))
}

function display_daylist(dia){
  day_node = make_node('div', 'dia', dia)
  day_node.id = dia
  day_node.addEventListener('mousedown', display_day)
  dias_container.appendChild(day_node)
}

function init(){
  const url = "noche_museos.json"
  fetch(url).then((response) => {
    response.json().then((d) => {
      data = d
      Object.keys(data).forEach(display_daylist)
    })})
};

let data;
const dias_container = document.querySelector('#dias')
const eventos_container = document.querySelector('#eventos')
init()
