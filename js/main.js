// parametro esercizio
const cardinality = 10;

// generazione lista mail al caricamento della pagina
requestNEmailAddresses(cardinality);

// funzione che gestisce le richieste API
function requestNEmailAddresses(n) {
  // elementi html coinvolti
  const parent = document.getElementById("list");
  if (!parent) return;
  const loadingBar = document.getElementById("loading-bar");
  if (!loadingBar) return;

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
        li.classList.add("h4");
        li.innerHTML = `<a class="text-decoration-none" href="mailto:${result.data.response}">📨  ${result.data.response}</a>`;
      })
      .catch((error) => {
        console.log(`%cERROR:%c ${error}`, "color: orangered", "");
        li.classList.remove("h4");
        li.textContent = " ❌ " + error;
        li.classList.add("text-warning", "text-opacity-75");
      })
      .finally(() => {
        parent.appendChild(li);
        if (parent.childElementCount === n) {
          setTimeout(() => {
            clearInterval(loadID);
            loadingBar.classList.add("d-none");
          }, 1500);
        }
      });
  }
}
