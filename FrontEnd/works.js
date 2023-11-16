import { addFilterListener } from "./filters.js";

async function getWorks(){
    const response = await fetch("http://localhost:5678/api/works");
    return response.json()
}

async function getCategories(){
    const category = await fetch("http://localhost:5678/api/categories");
    return category.json()
}


function generateProjects(projects){

    for (let i = 0; i < projects.length; i++) {
        //TODO : faire une boucle maps !!
        const works = projects[i];
        // Récupération de l'élément du DOM qui accueillera les projets
        const divGallery = document.querySelector('.gallery');
        // Création d’une balise dédiée à un projet
        const projetElement = document.createElement('figure');
        // Création des balises des attributs image et titre de la balise figure
        const imageElement = document.createElement('img');
        imageElement.src = works.imageUrl;
        const nomElement = document.createElement('figcaption');
        nomElement.innerText = works.title;
    
        // On rattache la balise 
        divGallery.appendChild(projetElement);
        projetElement.appendChild(imageElement);
        projetElement.appendChild(nomElement);
    }
    
}

function generateFilterCategories(categories, works){
    // Récupération de l'élément du DOM qui accueillera les catégories
    const portfolio = document.getElementById('portfolio')
    // Création de la balise menu dédiée aux filtres
    const menu = document.getElementById('menu')
    
    portfolio.appendChild(menu);

    const place = document.getElementById('gallery')

    place.before(menu)
    
    categories.map((category) => {
        const bouton = document.createElement('button')
        bouton.classList.add('filter')
        // bouton.classList.add('style')
        bouton.innerHTML = category.name
        // On rattache la balise 
        menu.appendChild(bouton)  
    })
}

const works = await getWorks()

generateProjects(works)
const categories = await getCategories()

generateFilterCategories(categories,works)

Array.from(document.getElementsByClassName('filter')).map((bouton) => {
    bouton.addEventListener('click', function(event) {
        const buttonCategory = event.target.innerText
        console.log(buttonCategory)
        document.querySelector('#gallery').innerHTML = '' 
        if (buttonCategory != 'Tous') {
            const filteredWorks = works.filter((work) => work.category.name == buttonCategory)
            console.log(filteredWorks)
            generateProjects(filteredWorks)
        } else {
            generateProjects(works)
        }
    })
})