async function getWorks(){
    const response = await fetch("http://localhost:5678/api/works");
    return response.json()
}

function genererProjets(projets){
    // const baliseTitre = document.createElement('h2')
    // baliseTitre.textContent = "Mes Projets"
    for (let i = 0; i < projets.length; i++) {

        const works = projets[i];
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

const works = await getWorks()
console.log(works)
genererProjets(works)