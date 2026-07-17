// ============================
// CAPILLA VIRTUAL
// ============================

// ---------- CARRUSEL ----------

const totalImagenes = 6;
let imagenActual = 1;

const imagen = document.getElementById("virgen");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
const dots = document.getElementById("dots");

function actualizarImagen() {
    imagen.src = `assets/imagenes/${imagenActual}.jpg`;

    dots.innerHTML = "";

    for (let i = 1; i <= totalImagenes; i++) {

        const punto = document.createElement("span");

        punto.innerHTML = "●";

        punto.style.margin = "5px";

        punto.style.cursor = "pointer";

        punto.style.opacity = (i === imagenActual) ? "1" : ".3";

        punto.onclick = () => {

            imagenActual = i;

            actualizarImagen();

        }

        dots.appendChild(punto);

    }

}

next.onclick = () => {

    imagenActual++;

    if (imagenActual > totalImagenes)
        imagenActual = 1;

    actualizarImagen();

}

prev.onclick = () => {

    imagenActual--;

    if (imagenActual < 1)
        imagenActual = totalImagenes;

    actualizarImagen();

}

setInterval(() => {

    imagenActual++;

    if (imagenActual > totalImagenes)
        imagenActual = 1;

    actualizarImagen();

}, 7000);

actualizarImagen();


// ---------- VELAS ----------

const boton = document.getElementById("encender");

const velas = document.getElementById("velas");

const peticion = document.getElementById("peticion");

boton.onclick = () => {

    const texto = peticion.value.trim();

    if (texto === "") {

        alert("Escribe primero una petición.");

        return;

    }

    const vela = document.createElement("div");

    vela.className = "vela";

    vela.innerHTML = "🕯️";

    vela.title = texto;

    velas.prepend(vela);

    peticion.value = "";

}


// ---------- ORACIONES ----------

const oraciones = {

avemaria:

`Dios te salve, María,
llena eres de gracia;
el Señor es contigo.
Bendita tú eres entre todas las mujeres
y bendito es el fruto de tu vientre, Jesús.

Santa María,
Madre de Dios,
ruega por nosotros pecadores,
ahora y en la hora de nuestra muerte.

Amén.`,

salve:

`Dios te salve,
Reina y Madre de misericordia,
vida, dulzura y esperanza nuestra.`,

angelus:

`El Ángel del Señor anunció a María,
y concibió por obra del Espíritu Santo.`,

magnificat:

`Proclama mi alma la grandeza del Señor,
se alegra mi espíritu en Dios mi Salvador.`,

consagracion:

`Oh Señora mía,
oh Madre mía,
yo me ofrezco enteramente a ti.`

}

document.querySelectorAll(".oracion").forEach(boton=>{

    boton.onclick=()=>{

        document.getElementById("textoOracion").innerText=
        oraciones[boton.dataset.oracion];

    }

})


// ---------- MÚSICA ----------

const audio=document.getElementById("audio");

const musica=document.getElementById("musica");

let reproduciendo=false;

musica.onclick=()=>{

    if(reproduciendo){

        audio.pause();

        musica.innerText="Reproducir música";

    }

    else{

        audio.play();

        musica.innerText="Pausar música";

    }

    reproduciendo=!reproduciendo;

}