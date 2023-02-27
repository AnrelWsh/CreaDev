var txtList = [
    'Angel Hmeli', 'Développeur Front-End', 'Recherche Stage et Alternance', 'Stage du 8 Mai 2023 et pour 3 mois', 'Alternance à partir de Septembre 2023', 'Contactez-moi sur Linkedin : Angel Hmeli', 'A très bientôt !'
]
let i = 0
const txt = document.querySelector('.txt')
const shakeDiv = document.querySelector('.shake')

txt.addEventListener('mouseover', () =>{

    txt.classList.add('hide');
    setTimeout(function() { 
        txt.textContent = txtList[i];
        i = (i + 1) % txtList.length;
    }, 500);
    setTimeout(function() { 
        txt.classList.remove('hide')
    }, 500)
    txt.style.color= '#' + Math.floor(Math.random() * 500).toString(16)
    shakeDiv.style.backgroundColor= '#' + Math.floor(Math.random() * 700).toString(16)
})