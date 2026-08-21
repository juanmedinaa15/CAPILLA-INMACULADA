/* =====================================================
   CAPILLA DE LA INMACULADA
   FUNCIONALIDAD
===================================================== */


/* =====================================================
   CARRUSEL
===================================================== */

const totalImagenes = 6;

let imagenActual = 1;

const imagen = document.getElementById("virgen");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
const dots = document.getElementById("dots");
const imageFrame = document.querySelector(".image-frame");

function crearDots() {

    dots.innerHTML = "";

    for (let i = 1; i <= totalImagenes; i++) {

        const dot = document.createElement("span");

        dot.className = "dot";

        if (i === imagenActual) {
            dot.classList.add("active");
        }

        dot.addEventListener("click", () => {

            cambiarImagen(i);

        });

        dots.appendChild(dot);
    }
}


function cambiarImagen(numero) {

    if (numero < 1) {
        numero = totalImagenes;
    }

    if (numero > totalImagenes) {
        numero = 1;
    }

    imagenActual = numero;

    imageFrame.classList.add("changing");

    setTimeout(() => {

        imagen.src = `assets/imagenes/${imagenActual}.jpg`;

        imagen.onload = () => {

            imageFrame.classList.remove("changing");

        };

    }, 250);

    crearDots();
}


prev.addEventListener("click", () => {

    cambiarImagen(imagenActual - 1);

});


next.addEventListener("click", () => {

    cambiarImagen(imagenActual + 1);

});


setInterval(() => {

    cambiarImagen(imagenActual + 1);

}, 8000);


crearDots();


/* =====================================================
   DESLIZAR EN MÓVIL
===================================================== */

let touchStartX = 0;
let touchEndX = 0;

imageFrame.addEventListener("touchstart", (event) => {

    touchStartX = event.changedTouches[0].screenX;

});


imageFrame.addEventListener("touchend", (event) => {

    touchEndX = event.changedTouches[0].screenX;

    const diferencia = touchEndX - touchStartX;

    if (Math.abs(diferencia) < 40) {
        return;
    }

    if (diferencia < 0) {

        cambiarImagen(imagenActual + 1);

    } else {

        cambiarImagen(imagenActual - 1);

    }

});


/* =====================================================
   PETICIONES
===================================================== */

const botonEncender = document.getElementById("encender");
const campoPeticion = document.getElementById("peticion");
const contador = document.getElementById("contador");
const altar = document.getElementById("velas");

const modal = document.getElementById("petitionModal");
const modalPetition = document.getElementById("modalPetition");
const closeModal = document.getElementById("closeModal");


/* CONTADOR DE CARACTERES */

campoPeticion.addEventListener("input", () => {

    contador.textContent =
        `${campoPeticion.value.length} / 500`;

});


/* CREAR VELA */

function crearVela(texto) {

    const vela = document.createElement("div");

    vela.className = "candle";

    vela.innerHTML = `
        <div class="flame-glow"></div>
        <div class="flame"></div>
        <div class="wick"></div>
        <div class="candle-body"></div>
    `;

    vela.addEventListener("click", () => {

        modalPetition.textContent = texto;

        modal.classList.add("open");

    });

    altar.insertBefore(
        vela,
        document.querySelector(".altar-surface")
    );
}


/* ENCENDER */

botonEncender.addEventListener("click", () => {

    const texto = campoPeticion.value.trim();

    if (!texto) {

        campoPeticion.focus();

        campoPeticion.style.borderColor = "#c9a75d";

        setTimeout(() => {

            campoPeticion.style.borderColor = "";

        }, 1500);

        return;
    }

    crearVela(texto);

    campoPeticion.value = "";

    contador.textContent = "0 / 500";

    document.querySelector(".altar-section")
        .scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

});


/* CERRAR MODAL */

closeModal.addEventListener("click", () => {

    modal.classList.remove("open");

});


document.querySelector(".modal-overlay").addEventListener("click", () => {

    modal.classList.remove("open");

});


document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

        modal.classList.remove("open");

    }

});


/* =====================================================
   ORACIONES
===================================================== */

const oraciones = {

    avemaria: `Dios te salve, María,
llena eres de gracia;
el Señor es contigo.

Bendita tú eres entre todas las mujeres,
y bendito es el fruto de tu vientre, Jesús.

Santa María, Madre de Dios,
ruega por nosotros, pecadores,
ahora y en la hora de nuestra muerte.

Amén.`,

    salve: `Dios te salve, Reina y Madre de misericordia,
vida, dulzura y esperanza nuestra.

Dios te salve.

A ti llamamos los desterrados hijos de Eva;
a ti suspiramos, gimiendo y llorando,
en este valle de lágrimas.

Ea, pues, Señora, abogada nuestra,
vuelve a nosotros esos tus ojos misericordiosos.

Y después de este destierro,
muéstranos a Jesús,
fruto bendito de tu vientre.

Oh clementísima, oh piadosa,
oh dulce Virgen María.

Ruega por nosotros, Santa Madre de Dios,
para que seamos dignos de alcanzar
las promesas de Nuestro Señor Jesucristo.

Amén.`,

    angelus: `El Ángel del Señor anunció a María.

— Y concibió por obra del Espíritu Santo.

Dios te salve, María...

He aquí la esclava del Señor.

— Hágase en mí según tu palabra.

Dios te salve, María...

Y el Verbo se hizo carne.

— Y habitó entre nosotros.

Dios te salve, María...

Ruega por nosotros, Santa Madre de Dios.

— Para que seamos dignos de alcanzar
las promesas de Jesucristo.

Amén.`,

    magnificat: `Proclama mi alma la grandeza del Señor,
se alegra mi espíritu en Dios, mi Salvador.

Porque ha mirado la humildad de su esclava.
Desde ahora me felicitarán todas las generaciones.

Porque el Poderoso ha hecho obras grandes en mí:
su nombre es santo.

Y su misericordia llega a sus fieles
de generación en generación.`,

    consagracion: `Oh Señora mía,
oh Madre mía,

yo me ofrezco enteramente a ti
y en prueba de mi filial afecto
te consagro en este día
mis ojos, mis oídos, mi lengua,
mi corazón;

en una palabra, todo mi ser.

Ya que soy todo tuyo,
oh Madre de bondad,
guárdame y defiéndeme
como cosa y posesión tuya.

Amén.`
};


document.querySelectorAll(".prayer-button").forEach((button) => {

    button.addEventListener("click", () => {

        const nombre = button.dataset.oracion;

        const texto = document.getElementById("textoOracion");

        texto.textContent = oraciones[nombre];

        texto.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    });

});


/* =====================================================
   MÚSICA
===================================================== */

const audio = document.getElementById("audio");
const musica = document.getElementById("musica");
const musicText = document.getElementById("musicText");

let reproduciendo = false;


musica.addEventListener("click", () => {

    if (!reproduciendo) {

        audio.play()
            .then(() => {

                reproduciendo = true;

                musicText.textContent = "Pausar";

            })
            .catch(() => {

                musicText.textContent =
                    "No se pudo reproducir";

            });

    } else {

        audio.pause();

        reproduciendo = false;

        musicText.textContent = "Reproducir";

    }

});