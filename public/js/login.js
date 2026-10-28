document.getElementById('formulario').addEventListener('submit', async (event)=> {
  event.preventDefault()

  //Verificar los datos
  const resultLogin =await fetch('/api/auth/login',{
    method: 'POST',
    headers: {},
    body: {}
  })
})