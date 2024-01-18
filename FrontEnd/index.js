const gallery = document.querySelector(".gallery")


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