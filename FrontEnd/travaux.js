// Travaux //


const travauxContainer = document.querySelector('.gallery')

let travauxApi = await fetch ('http://localhost:5678/api/works')
travauxApi = await travauxApi.json()

createWorks(travauxApi,travauxContainer)

console.log(travauxApi)

//<figure> <img src="assets/images/abajour-tahina.png" alt="Abajour Tahina" /> <figcaption>Abajour Tahina</figcaption> </figure>


function createWorks (travauxApi, gallery) { 
    travauxApi.forEach(element => {console.log(travauxApi) 
        console.log(element.title)

        travauxContainer.innerHTML += `<figure> <img src="${element.imageUrl}" alt="" /> ${element.title}
         </figure>`      
    });

}

// Filtres //

const filtersContainer = document.getElementById("portfolio")

// Récupération des catégories
async function getCategory () {
    let categoryApi = await fetch ('http://localhost:5678/api/categories');
    return await categoryApi.json();
}

getCategory();

// Création des catégories //

async function createCategory () {
    const categorys = await getCategory();
    categorys.forEach((category) => {
        filtersContainer.innerHTML += `<button id ="${category.id}">${category.name}</button>`
    });
}

createCategory();

// Filtrer les travaux par catégories //

async function worksWithinCategory() {
    const travaux = await travauxApi
    console.log(travaux);
    const button = document.querySelectorAll("portfolio button")
    console.log(button)
}

worksWithinCategory();