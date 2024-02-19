const gallery = document.querySelector(".gallery")
let works = []
const filtersContainer = containerFilter()

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

    const closeButton = modal.querySelector('.js-close-modal')
    if (closeButton) {
        closeButton.style.display = 'block'
    }

}

const closeModal = function (e) {
    const modal = e.currentTarget
    if (!modal) return
    e.preventDefault()
    modal.style.display = 'none'
    modal.setAttribute('aria-hidden', true)
    modal.removeAttribute('aria-modal')
    modal.removeEventListener('click', closeModal)
    
    const closeButton = modal.querySelector('.js-close-modal')
    if (closeButton) {
        closeButton.style.display = 'none'
    }
}

document.querySelectorAll('.js-modal').forEach(button => {
    button.addEventListener('click', openModal)
})


