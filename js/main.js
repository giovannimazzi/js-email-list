// API Boolean mail
const apiUrl = `https://flynn.boolean.careers/exercises/api/random/mail`;

// richiesta AXIOS
axios
  .get(apiUrl)
  .then((response) => console.log(response))
  .catch((error) => {
    alert(error);
  })
  .finally(() => {
    console.log("request-end");
  });
