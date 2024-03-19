//definir les elements (password, button de conextion, e-mail)
const email = document.querySelector("#email")
const password = document.querySelector("#password")
const submit = document.querySelector("#submit")
const form = document.querySelector("form")
const messageEmail = document.querySelector("#message-email")

const apiURL = "http://localhost:5678/api/users/login"



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

form.addEventListener("submit", async (event) => {
    event.preventDefault()
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (emailRegex.test(email.value) == false) {
        messageEmail.style.display = "flex"
        return
    }

    //créer un objet avec les données à envoyer 
    const requestData = {
        email: email.value,
        password: password.value,
    }

    try {
        const response = await fetch(apiURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),

        });

        //verifier si un token a été renvoyé par l'API 
        if (response.ok) {
            const responseData = await response.json()

            if (responseData.token) {
                //stocker le token dans le stockage local
                localStorage.setItem('token', responseData.token)

                //rediriger vers la page d'accueil 
                window.location.href = '/FrontEnd/index.html';
            } else {
                console.error("Token manquant dans la réponse de l'API")
                messageEmail.style.display = "flex";
            }

        } else {
            console.error("Erreur lors de la requête vers l'API :", response.status)
            messageEmail.style.display = "flex"
        }

    } catch (error) {
        console.error("Error during the API request", error)
    }
})


