var txtList = [
    'Waw!', 'It\'s working', 'For real??', 'No way!!', 'I feel powerful' , 'I AM powerful', 'Zoubis'
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
    txt.style.color= '#' + Math.floor(Math.random() * 780).toString(16)
    shakeDiv.style.backgroundColor= '#' + Math.floor(Math.random() * 500).toString(16)
})