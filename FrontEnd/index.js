// Travaux //


const travauxContainer = document.querySelector('.gallery')

let travauxApi = await fetch('http://localhost:5678/api/works')
travauxApi = await travauxApi.json()

createWorks(travauxApi, travauxContainer)

function createWorks(travaux, gallery) {
  gallery.innerHTML = ''
  travaux.forEach(element => {
    gallery.innerHTML += `<figure> <img src="${ element.imageUrl }" alt="" /> ${ element.title }
         </figure>`
  })
  deleteProjects()
}

// Filtres //

const filtersContainer = document.querySelector('.filters')

async function getCategories() {
  const categoryApi = await fetch('http://localhost:5678/api/categories')
  return await categoryApi.json()
}


async function createCategories() {
  const categories = await getCategories()
  categories.forEach(category => {
    filtersContainer.innerHTML += `<button class = "filter__btn" id ="${ category.id }">${ category.name }</button>`

  })
}

await createCategories()


function filtersCategories() {
  const works = travauxApi
  const buttons = document.querySelectorAll('.filter__btn')
  buttons.forEach(button => {
    button.addEventListener('click', (e) => {
      const buttonId = e.target.id
      travauxContainer.innerHTML = ''
      if (buttonId !== 'null') {
        const worksFilters = works.filter(travail => {
          return travail.categoryId == buttonId
        })
        createWorks(worksFilters, travauxContainer)
      } else {
        createWorks(travauxApi, travauxContainer)
      }
    })
  })
}

filtersCategories()

//Changement couleur au clic //

const buttons = document.querySelectorAll('.filter__btn')
buttons.forEach(button => button.addEventListener('click', function (event) {
  buttons.forEach((bouton) => {
    bouton.classList.remove('filter__btn--active')
  })
  event.target.classList.add('filter__btn--active')
}))


// Quand l'utilisateur est connecté //

const loged = window.sessionStorage.Connecte
const token = window.sessionStorage.Token
const admin = document.querySelector('.admin')
const logout = document.querySelector('.logout')
const edit = document.querySelector('.edit')
const modaleContainer = document.querySelector('.modale__container')
const modaleGalery = document.querySelector('.modale')
const modaleButton = document.querySelector('.modale__button')
const modaleButton2 = document.querySelector('.modale__2 button')
const modaleAdd = document.querySelector('.modale__2')
const modaleX = document.querySelector('.modale__container .fa-xmark')
const modaleAddXbutton = document.querySelector('.modale__2 .fa-xmark')
const modale = document.querySelector('.modale__photos')
const returnArrow = document.querySelector('.modale__container .fa-arrow-left')

if (loged == 'true') {
  admin.classList.remove('admin')
  logout.innerHTML = 'logout'
  logout.classList.add('text-size')
  edit.style.display = 'flex'
  filtersContainer.classList.add('admin')
  logout.addEventListener('click', () => {
    window.sessionStorage.Connecte = false
  })
}

function firstModaleDisplay() {
  edit.addEventListener('click', () => {
    modaleContainer.style.display = 'flex'
    modaleAdd.style.display = null
    edit.style.display = null
  })

  modaleX.addEventListener('click', () => {
    modaleContainer.style.display = null
    edit.style.display = 'flex'
  })


  modaleContainer.addEventListener('click', (e) => {
    if (e.target.className == 'modale__container') {
      modaleContainer.style.display = null
      edit.style.display = 'flex'
      modaleButton2.classList.remove('modale__button')
      modaleButton2.classList.add('button')
      reset()
    }
  })
}

firstModaleDisplay()


// Affichage projets dans modale 

async function displayProjectsModale() {
  modale.innerHTML = ''
  const projects = await travauxApi
  projects.forEach(travail => {
    const figure = document.createElement('figure')
    const img = document.createElement('img')
    const span = document.createElement('span')
    const trash = document.createElement('i')
    trash.classList.add('fa-solid', 'fa-trash-can')
    trash.id = travail.id
    img.src = travail.imageUrl
    span.appendChild(trash)
    figure.appendChild(span)
    figure.appendChild(img)
    modale.appendChild(figure)
  })
  deleteProjects()

}

await displayProjectsModale()

async function deleteProjects() {
  const trashes = document.querySelectorAll('.fa-trash-can')
  trashes.forEach(async (trash) => {
    const id = parseInt(trash.id, 10)
    trash.addEventListener('click', async (e) => {
      e.preventDefault()
      const response = await fetch(`http://localhost:5678/api/works/${ id }`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${ token }`,
        }
      })
      if (response.ok) {
        travauxApi = travauxApi.filter((travail) => (id !== travail.id))
        createWorks(travauxApi, travauxContainer)
        displayProjectsModale()
      } else {
        alert('Echec de suppression')
      }
    })
  })

}

// Affichage 2e modale 

function secondModaleDisplay() {
  modaleButton.addEventListener('click', () => {
    modaleGalery.style.display = 'none'
    modaleAdd.style.display = 'flex'
  })

  returnArrow.addEventListener('click', () => {
    modaleGalery.style.display = 'flex'
    modaleAdd.style.display = 'none'
    modaleButton2.classList.remove('modale__button')
    modaleButton2.classList.add('button')
    reset();
  })

  modaleAddXbutton.addEventListener('click', () => {
    modaleContainer.style.display = null
    edit.style.display = 'flex'
    modaleButton2.classList.remove('modale__button')
    modaleButton2.classList.add('button')
    reset();
  })

  edit.addEventListener('click', () => {
    modaleContainer.style.display = 'flex'
    modaleGalery.style.display = 'flex'
    edit.style.display = null
  })

}

secondModaleDisplay()

function changeButtonColor() {
  modaleButton2.classList.remove('button')
  modaleButton2.classList.add('modale__button')
}

function reset() {
  form.reset()
  imagePreview.style.display = 'none'
  imageLabel.style.display = 'flex'
  imageLogo.style.display = 'flex'
}

function backToModal() {
  modaleContainer.style.display = 'flex'
  modaleGalery.style.display = 'flex'
  modaleAdd.style.display = null
  edit.style.display = null
}

const imageInput = document.getElementById('file')
const imageLabel = document.querySelector('.form-group-photo label')
const imagePreview = document.querySelector('.form-group-photo img')
const imageLogo = document.querySelector('.form-group-photo span')


const previewImage = () => {
  const file = imageInput.files
  if (file) {
    const fileReader = new FileReader()
    const preview = document.getElementById('file-preview')
    fileReader.onload = () => {
      imagePreview.style.display = 'flex'
      preview.setAttribute('src', event.target.result)
    }
    fileReader.readAsDataURL(file[ 0 ])
    imageLabel.style.display = 'none'
    imageLogo.style.display = 'none'
    changeButtonColor()
    
  }
}
imageInput.addEventListener('change', previewImage)

// Ajouter un projet

const form = document.querySelector('.modale__2 form')
const title = document.querySelector('#title')
const formCategory = document.querySelector('#category')
let allowedExtension = [ 'image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/bmp' ]


form.addEventListener('submit', async (e) => {
  e.preventDefault() 
  if (title.value === "" || formCategory.value === "" || !imageInput.files[0] ) {
    alert("Merci de remplir tous les champs");
  } else if (allowedExtension.indexOf(type) > -1) {
    let type = imageInput.files[ 0 ].type
    const formData = new FormData()
    formData.append('title', title.value)
    formData.append('image', imageInput.files[ 0 ])
    formData.append('category', formCategory.value)
    const response = await fetch('http://localhost:5678/api/works', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${ token }`,
      },
      body: formData,
    })

    if (response.status === 201) {
      const image = await response.json()
      travauxApi.push(image)
      backToModal()
      reset()
      displayProjectsModale()
      createWorks(travauxApi, travauxContainer)

      alert('Projet ajouté avec succès :)')

    } else if (response.status === 500) {
      alert('Erreur inattendu')
      modaleButton2.classList.remove('modale__button')
      modaleButton2.classList.add('button')
      reset()

    } else if (response.status === 400) {
      alert('Merci de remplir tous les champs')
      modaleButton2.classList.remove('modale__button')
      modaleButton2.classList.add('button')
      reset()

    } else if (response.status === 401) {
      alert('Vous n\'êtes pas authorisé à ajouter a un projet')
      window.location.href = 'login.html'
    }
  } else {
    alert('Not a image')
    modaleButton2.classList.remove('modale__button')
    modaleButton2.classList.add('button')
    reset()
  }
})