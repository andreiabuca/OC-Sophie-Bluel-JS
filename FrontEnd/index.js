const gallery = document.querySelector(".gallery")
let works = []
const filtersContainer = containerFilter()
const modalGallery = document.querySelector(".modal-gallery")
const logOut = document.getElementById("logout")

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

function containerFilter() {
    return document.getElementById("filters")
}

categories.forEach(category => {
    const listFilter = document.createElement("li")
    const button = document.createElement("button")
    button.textContent = category.name
    button.classList.add("filter-button")

    //addEventListener
    button.addEventListener("click", () => filterWorksByCategory(category.id))

    listFilter.appendChild(button)
    filtersContainer.appendChild(listFilter)

})

logOut.addEventListener("click", () => {
    localStorage.removeItem("token")
    window.location.replace("assets/pagelogin.html")

})

function filterWorksByCategory(categoryId) {
    if (categoryId === 4) {
        generateWorks(works)
    }
    else {
        const filteredWorks = works.filter(work => work.categoryId === categoryId)
        generateWorks(filteredWorks)
    }
}



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

const generateWorks = works => {
    gallery.innerHTML = ""
    works.forEach(work => {
        const article = document.createElement("article")
        gallery.appendChild(article)

        //ajoute image à l'article

        const image = document.createElement("img")
        image.src = work.imageUrl
        article.appendChild(image)

        //ajouter texte à l'article

        const titre = document.createElement("p")
        titre.innerHTML = work.title
        article.appendChild(titre)



    });
}


document.addEventListener('DOMContentLoaded', function () {
    const token = localStorage.getItem('token')
    const loginElement = document.getElementById('login')
    const logoutElement = document.getElementById('logout')
    const modalButton = document.querySelector('.projets-modifier')

    console.log('Token:', token)

    if (token) {
        logoutElement.style.display = 'block'
        loginElement.style.display = 'none'

        modalButton.style.display = 'flex'

    } else {
        logoutElement.style.display = 'none'
        loginElement.style.display = 'block'
        modalButton.style.display = 'none'
    }

});


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
       <i class="fa-regular fa-trash-can" data-id="${work.id}"></i>
        <img src="${work.imageUrl}">
        </div>`
    });

    modalGallery.innerHTML = imageModal

    const supWork = document.querySelectorAll(".fa-trash-can")
    supWork.forEach(trashCan => {
        trashCan.addEventListener("click", () => {
            const workId = trashCan.getAttribute("data-id")
            const token = localStorage.getItem("token")
            console.log("token", token)
            try {
                fetch(`http://localhost:5678/api/works/${workId}`, {
                    method: "DELETE", //mettre authorization
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        // 'Content-Type': 'application/json'
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

const closeModal = function (e) {
    const modal = e.currentTarget
    if (!modal) return
    e.preventDefault()
    modal.style.display = 'none'
    modal.setAttribute('aria-hidden', true)
    modal.removeAttribute('aria-modal')
    modal.removeEventListener('click', closeModal)
}

const modal = document.querySelector('.modal-aside')

const closeButton = modal.querySelector('.js-close-modal')
closeButton.addEventListener('click', function (e) {
    console.log('The button was clicked')
})

const boxModal = modal.querySelector('.js-modal-stop')
boxModal.addEventListener('click', function (e) {
    console.log('The box was clicked')
    e.stopPropagation()
})


document.querySelectorAll('.js-modal').forEach(button => {
    button.addEventListener('click', openModal)
})

const secondModalElements = document.querySelectorAll('.txt-ajout, .upload-container, .label-title, .label-category, .btn-valider, .fa-arrow-left')
secondModalElements.forEach(element => {
    element.style.display = 'none'
})

const ajouterButton = document.querySelector('.btn-ajouter')
ajouterButton.addEventListener('click', function () {
    secondModalElements.forEach(element => {
        element.style.display = 'block'
    })
    const firstModalElements = document.querySelectorAll('.txt-galerie, .modal-gallery')
    firstModalElements.forEach(element => {
        element.style.display = 'none'
    })
    ajouterButton.style.display = 'none'
})

const arrowBackButton = document.querySelector('.fa-arrow-left')
arrowBackButton.addEventListener('click', function () {
    secondModalElements.forEach(element => {
        element.style.display = 'none'
    })
    const firstModalElements = document.querySelectorAll('.txt-galerie, .modal-gallery')
    firstModalElements.forEach(element => {
        element.style.display = 'flex'
    })
    ajouterButton.style.display = 'block'

})
