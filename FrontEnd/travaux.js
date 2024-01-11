// Travaux //


const travauxContainer = document.querySelector('.gallery')

let travauxApi = await fetch ('http://localhost:5678/api/works')
travauxApi = await travauxApi.json()

createWorks(travauxApi,travauxContainer)

console.log(travauxApi)

//<figure> <img src="assets/images/abajour-tahina.png" alt="Abajour Tahina" /> <figcaption>Abajour Tahina</figcaption> </figure>


function createWorks (travaux, gallery) {
    gallery.innerHTML = '' 
    travaux.forEach(element => {console.log(travaux) 
        console.log(element.title)

        gallery.innerHTML += `<figure> <img src="${element.imageUrl}" alt="" /> ${element.title}
         </figure>`      
    });

}

// Filtres //

const filtersContainer = document.getElementById("portfolio")

// Récupération des catégories
async function getCategories () {
    const categoryApi = await fetch ('http://localhost:5678/api/categories');
    return await categoryApi.json();
}



async function createCategories () {
    const categories = await getCategories();
    categories.forEach((category) => {
        filtersContainer.innerHTML += `<button id ="${category.id}">${category.name}</button>`
    });
}

await createCategories();

// Filtrer les travaux par catégories //

async function filtersWorks() {
    const travaux = travauxApi
    console.log(travaux);
    const buttons = document.querySelectorAll("#portfolio button")
    console.log(buttons);
    buttons.forEach(button => {button.addEventListener("click", function(e){
        console.log(e.target.getAttribute("id"));
        const idSelected = e.target.getAttribute("id");
        const idSelectedNumber = parseInt(idSelected, 10)
        const objets = travauxApi.filter(travail => idSelectedNumber === travail.categoryId);
        console.log(objets)


        createWorks(objets,travauxContainer)

    })

        
    });
}

filtersWorks();