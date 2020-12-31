export const $ = (qs) => document.querySelector(qs);
const musicaTemporal=$('#musica-temporal');
const listaMusica=$('#lista-musica');
export function cargarMusica(e) {
  //console.log(e.target.files);
  const files=Array.from(e.target.files);
  files.forEach(f => {
    const reader = new FileReader();
    reader.onload=(function(archivo){
      return function(evt){
          const li =document.createElement('li');
          //li.className='list-item';
          li.classList.add('list-item')
          li.id='music';

          li.innerHTML=`
              <input type="hidden" value="${evt.target.result}">
              <input type="hidden" value="${archivo.name}">
              <audio src="${evt.target.result}"></audio>
              ${archivo.name}
          `;
          listaMusica.appendChild(li);
      }
    })(f);
    reader.readAsDataURL(f); 
  });
}

export function reproducirMusica(e){
    /*console.log(e.target.children[2])
    e.target.children[2].play();*/
    //console.log(e.target.classList.contains('list-item'))
    if (e.target.classList.contains('list-item')) {
        musicaTemporal.innerHTML=`<audio src="${e.target.children[0].value}" autoplay></audio><input type="hidden" value="${e.target.children[0].value}">`;
        const srcMusica=e.target.children[0].value;
        const nombreMusica=e.target.children[1].value;
        cargarTemporal(srcMusica,nombreMusica)
    }

}
const cargarTemporal=(src,nombreM)=>{
    musicaTemporal.innerHTML=`<audio src="${src}" autoplay></audio><input type="hidden" value="${src}">`;
    $('#name-music').innerText=nombreM;
    siguienteAutomatico();
}
export function pausarMusica(){
    musicaTemporal.children[0].pause();
}
export function continuarMusica(){
    musicaTemporal.children[0].play();
}
export function siguienteMusica(){
    const musicArray=Array.from(listaMusica.children);
    const actual=musicaTemporal.children[1].value;
    musicArray.forEach(limusica => {
        if (limusica.children[0].value === actual) {
            const siguientemusic=limusica.nextSibling.children[0].value;
            const nombreSiguiente=limusica.nextSibling.children[1].value;
            cargarTemporal(siguientemusic,nombreSiguiente)

        }
    });
}
export function anteriorMusica(){
    const musicArray=Array.from(listaMusica.children);
    const actual=musicaTemporal.children[1].value;
    musicArray.forEach(limusica => {
        if (limusica.children[0].value === actual) {
            const anteriormusic=limusica.previousElementSibling.children[0].value;
            const nombreAnterior=limusica.previousElementSibling.children[1].value;
            cargarTemporal(anteriormusic,nombreAnterior)

        }
    });
}
const siguienteAutomatico=()=>{
    const actual=musicaTemporal.children[0];
    actual.addEventListener('ended',siguienteMusica);
}