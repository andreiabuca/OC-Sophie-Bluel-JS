const gallery = document.querySelector(".gallery")
let works = []
const filtersContainer = containerFilter()
const modalGallery = document.querySelector(".modal-gallery")
const logOut = document.getElementById("logout")
const submitButton = document.querySelector(".button-submitwork")
const form = document.getElementById("form")
const categories = [
    {
        "id": 4,
        "name": "Tous"

    },

    {
        "id": 1,
        "name": "Objets"
    },
    {
        "id": 2,
        "name": "Appartements"
    },
    {
        "id": 3,
        "name": "Hotels & restaurants"
    }
]

//Fonction pourcréer le conteneur de filtres 
function containerFilter() {
    return document.getElementById("filters")
}

//Créer les boutons de filtre et ajouter des EventListener
categories.forEach(category => {
    const listFilter = document.createElement("li")
    const button = document.createElement("button")
    button.textContent = category.name
    button.classList.add("filter-button")

    button.addEventListener("click", () => filterWorksByCategory(category.id))

    listFilter.appendChild(button)
    filtersContainer.appendChild(listFilter)

})

//Ajouter un EventListener pour le bouton LogOut
logOut.addEventListener("click", () => {
    localStorage.removeItem("token")
    window.location.replace("assets/pagelogin.html")

})

//Filtrer les travaux par catégorie
function filterWorksByCategory(categoryId) {
    if (categoryId === 4) {
        generateWorks(works)
    }
    else {
        const filteredWorks = works.filter(work => work.categoryId === categoryId)
        generateWorks(filteredWorks)
    }
}

//Importer les travaux depuis le serveur
const importWorks = () => {
    fetch("http://localhost:5678/api/works")
        .then(response => response.json())
        .then(data => {
            works = data
            console.log(works)
            generateWorks(works)
        })
}

importWorks()

//Générer les travaux dans la galerie
const generateWorks = works => {
    gallery.innerHTML = ""
    works.forEach(work => {
        const article = document.createElement("article")
        gallery.appendChild(article)

        //Ajouter image à l'article
        const image = document.createElement("img")
        image.src = work.imageUrl
        article.appendChild(image)

        //Ajouter texte à l'article
        const titre = document.createElement("p")
        titre.innerHTML = work.title
        article.appendChild(titre)
    });
}

//Fonction pour vérifier si l'utilisateur est connecté
document.addEventListener('DOMContentLoaded', function () {
    const token = localStorage.getItem('token')
    const loginElement = document.getElementById('login')
    const logoutElement = document.getElementById('logout')
    const modalButton = document.querySelector('.projets-modifier')
    const editionMode = document.getElementById('edit-bar')
    const filters = document.getElementById("filters")

    if (token) {
        editionMode.style.display = 'flex'
        logoutElement.style.display = 'block'
        loginElement.style.display = 'none'
        modalButton.style.display = 'flex'
        filters.style.display = 'none'

    } else {
        editionMode.style.display = 'none'
        logoutElement.style.display = 'none'
        loginElement.style.display = 'block'
        modalButton.style.display = 'none'
        filters.style.display = 'flex'
    }
});

//Fonction pour ouvrir le modal
const openModal = function (e) {
    e.preventDefault()
    const modalId = e.target.getAttribute('href')
    const modal = document.querySelector(modalId)
    if (!modal) return

    modal.style.display = 'flex'
    modal.setAttribute('aria-hidden', false)
    modal.setAttribute('aria-modal', 'true')
    modal.addEventListener('click', closeModal)

    let imageModal = ""
    modalGallery.innerHTML = ""

    works.forEach(work => {
        imageModal += `
       <div class="image-modal">
       <article>
       <i class="fa-regular fa-trash-can" data-id="${work.id}"></i>
        <img src="${work.imageUrl}">
        </article>
        </div>`
    });

    modalGallery.innerHTML = imageModal

    //Suprimer les projets de la gallerie 
    const supWork = document.querySelectorAll(".fa-trash-can")
    supWork.forEach(trashCan => {
        trashCan.addEventListener("click", () => {
            const workId = trashCan.getAttribute("data-id")
            const token = localStorage.getItem("token")
            console.log("token", token)
            try {
                fetch(`http://localhost:5678/api/works/${workId}`, {
                    method: "DELETE",
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                })
                    .then(response => {
                        if (response.ok) {
                            updateModal()
                        } else {
                            console.error("Deletion failed:", response.status)
                        }
                    })
                    .catch(error => {
                        console.error("Network error:", error)
                    })
            } catch (error) {
                console.error("Error", error)
            }
        })
    })
}

//Fonction pour fermer le modal 
const modal = document.querySelector('.modal-aside')
const closeModal = function (e) {
    const modal = e.currentTarget
    if (!modal) return
    e.preventDefault()
    modal.style.display = 'none'
    modal.setAttribute('aria-hidden', true)
    modal.removeAttribute('aria-modal')
    modal.removeEventListener('click', closeModal)
}
document.querySelector('.xmark-btn').addEventListener('click', (e) => {
    e.preventDefault();
    modal.style.display = 'none';
})
const boxModal = modal.querySelector('.js-modal-stop')
boxModal.addEventListener('click', function (e) {
    e.stopPropagation()
})

//Ajouter des EventListener pour ouvrir le modal
document.querySelectorAll('.js-modal').forEach(button => {
    button.addEventListener('click', openModal)
})

//élements du second modal
const secondModalElements = document.querySelectorAll('.txt-ajout, .upload-work, .arrow-left-btn, .inputs-ajoutwork, .button-submitwork')
secondModalElements.forEach(element => {
    element.style.display = 'none'
})


//Ajouter EventListener pour le bouton "Ajouter"
const ajouterButton = document.querySelector('.modal-btn-ajouter')
ajouterButton.addEventListener('click', function () {
    secondModalElements.forEach(element => {
        element.style.display = 'flex'
    })
    const firstModalElements = document.querySelectorAll('.txt-galerie, .modal-gallery')
    firstModalElements.forEach(element => {
        element.style.display = 'none'
    })
    ajouterButton.style.display = 'none'

    document.querySelector('.tittle-ajoutwork').value = '';
    document.querySelector('.button-ajoutwork').value = '';
    document.querySelector('.category-ajoutwork').selectedIndex = 0;
})

//EventListener pour le bouton de retour arrière
const arrowBackButton = document.querySelector('.arrow-left-btn')
arrowBackButton.addEventListener('click', function () {
    secondModalElements.forEach(element => {
        element.style.display = 'none'
    })
    const firstModalElements = document.querySelectorAll('.txt-galerie, .modal-gallery')
    firstModalElements.forEach(element => {
        element.style.display = 'grid'
    })
    ajouterButton.style.display = 'block'

})

// Gerer la soumisson du formulaire 
document.getElementById('ajoutwork-form').addEventListener('submit', async (e) => {
    e.preventDefault(); // Empêcher le comportement de soumission par défaut du formulaire

    try {
        const photo = document.querySelector('.button-ajoutwork').files[0];
        const title = document.querySelector('.tittle-ajoutwork').value;
        const category = document.querySelector('.category-ajoutwork').value;

        // Valider les données du formulaire
        if (!photo || !title || !category) {
            alert("Veuillez remplir tous les champs du formulaire.");
            return;
        }

        const formData = new FormData(); // Créer un objet FormData
        formData.append('image', photo); // Ajouter la photo à FormData
        formData.append('title', title); // Ajouter le titre à FormData
        formData.append('category', category); // Ajouter la category à FormData

        // Appeler l'API pour soumettre les données du formulaire
        const response = await fetch('http://localhost:5678/api/works', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: formData
        });

        if (response.ok) {
            // Gérer la réponse ok
            const data = await response.json();
            console.log("New work added:", data);
        } else {
            // Erreur response
            console.error("Error adding new work:", response.status);
            alert("Une erreur est survenue lors de l'ajout du projet.");
        }
    } catch (error) {
        // Erreurs inattendues
        console.error("An error occurred:", error);
        alert("Une erreur est survenue lors de l'ajout du projet.");
    }
});


//Add categories  
async function showCategories() {
    try {
        const resultFetch = await fetch('http://localhost:5678/api/categories');
        const data = await resultFetch.json();

        for (const el of data) {
            // Add categories pour selecioner dans le modal
            document.querySelector('.category-ajoutwork').insertAdjacentHTML('beforeend', `<option value="${el.id}">${el.name}</option>`);
        }
    } catch (e) {
        console.log(e);
        alert("Une erreur est survenue lors de la récupération des catégories.");
    }
}

// Appelle function
showCategories();


//Ajouter des input fichier pour ajouter le work 
const uploadWorkForm = document.querySelector('.upload-work-form');
uploadWorkForm.addEventListener('change', (e) => {

    uploadWorkForm.style.display = 'none';

    const uploadWorkImg = document.querySelector('.upload-work-img');

    uploadWorkImg.style.display = 'flex';


    uploadWorkImg.innerHTML = '';


    uploadWorkImg.insertAdjacentHTML('beforeend',
        `<img src="${URL.createObjectURL(e.target.files[0])}" 
        alt="${e.target.files[0].name}" 
        class="current-img-upload">`
    );
})

// Check si les inputs est vide ou pas pour changer le color du button (green)
document.getElementById('ajoutwork-form').addEventListener('input', () => {
    document.querySelector('.button-submitwork').style.backgroundColor = document.querySelector('.tittle-ajoutwork').value.length > 0 && document.querySelector('.button-ajoutwork').value.length > 0 ? '' : 'rgb(167, 167, 167)';
});

// Submit work
document.getElementById('ajoutwork-form').addEventListener('submit', (e) => {
    e.preventDefault();
    addWork();
})