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



