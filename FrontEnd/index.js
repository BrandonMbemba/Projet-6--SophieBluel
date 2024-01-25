// Travaux //


const travauxContainer = document.querySelector('.gallery')

let travauxApi = await fetch ('http://localhost:5678/api/works')
travauxApi = await travauxApi.json()

createWorks(travauxApi,travauxContainer)

function createWorks (travaux, gallery) {
    travaux.forEach(element => {
        gallery.innerHTML += `<figure> <img src="${element.imageUrl}" alt="" /> ${element.title}
         </figure>`      
    });
}

// Filtres //

const filtersContainer = document.querySelector('.filters')

async function getCategories () {
    const categoryApi = await fetch ('http://localhost:5678/api/categories');
    return await categoryApi.json();
}


async function createCategories () {
    const categories = await getCategories();
    categories.forEach(category => {
        filtersContainer.innerHTML += `<button class = "filter__btn" id ="${category.id}">${category.name}</button>`
        
    });
}

await createCategories();


async function filtersCategories() {
const works = await travauxApi;
const buttons = document.querySelectorAll(".filter__btn");
buttons.forEach(button => {
    button.addEventListener("click",(e)=> {
        const buttonId = e.target.id;
        travauxContainer.innerHTML = "";
        if (buttonId !== "null") {
            const worksFilters = works.filter(travail => {
                return travail.categoryId == buttonId;
            });
           createWorks(worksFilters,travauxContainer);
        } else {
            createWorks(travauxApi,travauxContainer);
        }
        })
    })
};

await filtersCategories();

//Changement couleur au clic //

const buttons = document.querySelectorAll(".filter__btn");
buttons.forEach(button => button.addEventListener("click", function() {
    buttons.forEach((bouton) => {
      bouton.classList.remove("filter__btn--active");
    });
const buttonsId = document.getElementById(`${button.id}`);
buttonsId.classList.add("filter__btn--active");
}))


// Quand l'utilisateur est connecté //

const loged = window.sessionStorage.Connecté;
const token = window.sessionStorage.Token;
console.log(token);
const admin = document.querySelector(".admin");
const logout = document.querySelector(".logout");
const edit = document.querySelector(".edit");
console.log(edit);
const modaleContainer = document.querySelector(".modale__container");
const x = document.querySelector(".modale__container .fa-xmark");
console.log(x);
const modale = document.querySelector(".modale__photos");

if (loged == "true") {
    admin.classList.remove("admin");
    logout.innerHTML = "logout";
    logout.classList.add("text-size");
    edit.style.display = "flex";
    filtersContainer.classList.add("admin");
    logout.addEventListener("click", ()=>{
        window.sessionStorage.Connecté = false
    })
}

edit.addEventListener("click", () => {
    modaleContainer.style.display = "flex";
    edit.style.display = "none";
})

x.addEventListener("click", () => {
    modaleContainer.style.display = "none";
    edit.style.display = "flex";
})

modaleContainer.addEventListener("click", (e) => {
    console.log(e.target.className);
    if(e.target.className == "modale__container") {
        modaleContainer.style.display = "none";
        edit.style.display = "flex";
    }
})

// Affichage projets dans modale 

async function displayProjectsModale() {
    modale.innerHTML = ""
    const projects = await travauxApi;
    projects.forEach(travail => {
        const figure = document.createElement("figure");
        const img = document.createElement("img");
        const span = document.createElement("span");
        const trash = document.createElement("i");
        trash.classList.add("fa-solid", "fa-trash-can");
        trash.id = travail.id;
        img.src = travail.imageUrl;
        span.appendChild(trash);
        figure.appendChild(span);
        figure.appendChild(img);
        modale.appendChild(figure);
    });

    deleteProjects();
}

await displayProjectsModale(); 

async function deleteProjects() {
    const trashes = document.querySelectorAll(".fa-trash-can");
    const id = travauxApi.id;
    console.log(trashes);
};