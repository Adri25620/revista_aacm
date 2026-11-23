const dashboardEl = document.getElementById("dashboard");
const seccionRevistaEl = document.getElementById("seccionRevista");
const btnVerRevista = document.getElementById("btnVerRevista");
const btnVolver = document.getElementById("btnVolver");
const btnPrev = document.getElementById("btnPrev");
const btnNext = document.getElementById("btnNext");
const numPaginaEl = document.getElementById("numPagina");

let pageFlip = null;

function inicializarRevista() {
  if (pageFlip) return;

  const esMovil = window.innerWidth < 768;

  pageFlip = new St.PageFlip(document.getElementById("revista"), {
    width: esMovil ? 320 : 460,
    height: esMovil ? 426 : 613,
    size: "stretch",
    minWidth: 260,
    maxWidth: 1000,
    minHeight: 340,
    maxHeight: 1330,
    showCover: true,
    usePortrait: true, // En celular muestra 1 hoja a la vez para que no se vea diminuta
    mobileScrollSupport: true
  });

  pageFlip.loadFromHTML(document.querySelectorAll(".pagina"));

  pageFlip.on("flip", (e) => {
    numPaginaEl.textContent = `Página ${e.data + 1}`;
  });
}

btnVerRevista.addEventListener("click", () => {
  dashboardEl.style.display = "none";
  seccionRevistaEl.classList.add("activa");
  inicializarRevista();
  setTimeout(() => {
    if (pageFlip) pageFlip.update();
  }, 50);
});

btnVolver.addEventListener("click", () => {
  seccionRevistaEl.classList.remove("activa");
  dashboardEl.style.display = "grid";
});

btnPrev.addEventListener("click", () => {
  if (pageFlip) pageFlip.flipPrev();
});

btnNext.addEventListener("click", () => {
  if (pageFlip) pageFlip.flipNext();
});