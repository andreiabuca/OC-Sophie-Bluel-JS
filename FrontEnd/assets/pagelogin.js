//definir les elements (password, button de conextion, e-mail)
const email = document.querySelector("#email")
const password = doucment.querySelector("#password")
const submit = document.querySelector("#submit")



//ajouter eventListener sur le button de conextion

/*quand le button de conextion é envoyer, on va executer une fonction 
debut de la fonction 
bloquer le comportement par default de la fonction 
virifier le e-mail valid 
si il est pas valid on affiche une message d'error et on arrete 
si il est valid:
envoyer la raquette post à l'API
-Header
-Body (e-mail et password)
recuperer la response et convertir en JSON
si on reçu le token:
stocker le token dans le stockage local 
ridiriger dans l'accueil 
si on a pas reçu:
afficher une message d'error */

submit.addEventListener("submit",async (event) => {
    event.preventDefault()
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if(emailRegex.test(email.value) == false){
        const messageEmail = document.querySelector("message-email")
        messageEmail.style.display = "flex"
        return
    }
})
