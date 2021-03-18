const btn_create = document.querySelector('.btn-create')
const user_input = document.querySelector('#username')
const pass_input = document.querySelector('#password')
const email_input = document.querySelector('#email')
const user_input_update = document.querySelector('#username-update')
const pass_input_update = document.querySelector('#password-update')
const email_input_update = document.querySelector('#email-update')
const status = document.querySelector('.status')
const btn_update = document.querySelector('.btn-update')
const btn_delete = document.querySelector('.btn-delete')

if (btn_create) {
  btn_create.addEventListener('click', function () {
    fetch('https://lnjs.muf-hax.net/users/create', {
      method: 'post',
      body: new URLSearchParams(`username=${user_input.value.trim()}&password=${pass_input.value.trim()}&email=${email_input.value.trim()}`)
    }).then(res => {
      if (res) {
        status.innerHTML = succ
        user_input.value = ''
        pass_input.value = ''
        email_input.value = ''
      }
    })
  })
}


const succ = `
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




// Update
if (btn_update) {
  const id = document.querySelector('#update-id').value || undefined
  btn_update.addEventListener('click', function () {
    fetch('https://lnjs.muf-hax.net/users/update', {
      method: 'put',
      body: new URLSearchParams(`id=${id.trim()}&email=${email_input_update.value}&username=${user_input_update.value}&password=${pass_input_update.value}`)
    }).then(res => {
      if (res) {
        window.location.href = "https://lnjs.muf-hax.net/users/"
      }
    }).catch(res => {
      if (res) alert('Gagal UPDATE data')
    })
  })
}



// Delete
if (btn_delete) {
  const id = document.querySelector('h4').textContent.split(':') || undefined
  btn_delete.addEventListener('click', function () {
    fetch('https://lnjs.muf-hax.net/users/delete', {
        method: 'delete',
        body: new URLSearchParams(`id=${id[1].trim()}`)
      })
      .then(res => {
        if (res) {
          alert('Berhasil menghapus data')
          window.location.href = "https://lnjs.muf-hax.net/users"
        }
      })
      .catch(res => {
        if (res) console.log(res.error)
      })
  })
}