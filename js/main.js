// parametro esercizio
const cardinality = 10;

// pulsante per rigenerare la lista
const refreshListButton = document.getElementById("ref-list-btn");

// generazione lista mail al caricamento della pagina
requestNEmailAddresses(cardinality, refreshListButton);

// click sul pulsante per rigenerare la lista
refreshListButton.addEventListener("click", () => {
  requestNEmailAddresses(cardinality, refreshListButton);
});

// funzione che gestisce le richieste API
function requestNEmailAddresses(n, refButtonElement) {
  // elementi html coinvolti
  const parent = document.getElementById("list");
  if (!parent) return;
  const loadingBar = document.getElementById("loading-bar");
  if (!loadingBar) return;

  if (refButtonElement) refreshListButton.disabled = true;

  // API Boolean mail
  const apiUrl = `https://flynn.boolean.careers/exercises/api/random/mail`;

  // Svuota la lista prima di ripopolarla
  parent.replaceChildren(); // oppure: parent.innerHTML = '';

  // Reset loading bar
  loadingBar.classList.remove("d-none");
  loadingBar.innerText = "LOADING";

  let loadID = setInterval(() => {
    loadingBar.innerText += " . ";
  }, 500);

  for (let i = 0; i < n; i++) {
    // creazione elemento
    const li = document.createElement("li");
    li.style.lineHeight = "2rem";

    // richiesta AXIOS
    axios
      .get(apiUrl)
      .then((result) => {
        li.innerHTML = `<a class="text-decoration-none text-nowrap" href="mailto:${result.data.response}">📨  ${result.data.response}</a>`;
      })
      .catch((error) => {
        console.log(`%cERROR:%c ${error}`, "color: orangered", "");

        li.textContent = " ❌ " + error;
        li.classList.add("text-warning", "text-opacity-75");
      })
      .finally(() => {
        parent.appendChild(li);
        if (parent.childElementCount === n) {
          setTimeout(() => {
            clearInterval(loadID);
            loadingBar.classList.add("d-none");
            if (refButtonElement) refButtonElement.disabled = false;
          }, 1500);
        }
      });
  }
}
