document.getElementById('sendAsJson').addEventListener('click', postData);

function postData() {
   let country = document.getElementById('country').value;
   return fetch('/countryJson', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      referrer: 'no-referrer',
      body: JSON.stringify({ country }),
   })
   .then(response => {
      response.json().then( data => {
         window.location.replace(`http://localhost:3000/country/${data.id}`);
      });
   });
}