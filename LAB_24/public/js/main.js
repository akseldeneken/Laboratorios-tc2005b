document.getElementById('enviar').addEventListener('click', () => {
  const mensaje = document.getElementById('mensaje').value;

  fetch('/mensaje', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ mensaje })
  })
    .then(res => res.json())
    .then(data => {
      document.getElementById('respuesta').innerText = data.respuesta;
    })
    .catch(err => console.error('Error:', err));
});
