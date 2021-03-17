const btn = document.querySelector('.btn')
const user_input = document.querySelector('#username')
const pass_input = document.querySelector('#password')
const email_input = document.querySelector('#email')
const status = document.querySelector('.status')

btn.addEventListener('click', function () {
  fetch('https://lnjs.muf-hax.net/users/create', {
      method: 'post',
      body: new URLSearchParams(`username=${user_input.value}&password=${pass_input.value}&email=${email_input.value}`)
    })
    .then(res => {
      if (res) {
        status.innerHTML = sccs
      }
    })
    .catch(res => {
      if (res) {
        status.innerHTML = err
      }
    })
  user_input.value = ''
  pass_input.value = ''
  email_input.value = ''
})


const sccs = `
    <div class="alert alert-success alert-dismissible fade show" role="alert">
      <strong>Berhasil</strong> menambah data
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  `

const err = `
    <div class="alert alert-danger alert-dismissible fade show" role="alert">
      <strong>Gagal</strong> menambah data
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  `