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

// affichage travaux par filtres //

async function getCategory () {
    let categoryApi = await fetch ('http://localhost:5678/api/categories');
    categoryApi = await categoryApi.json();
    console.log(categoryApi)
}

getCategory();
