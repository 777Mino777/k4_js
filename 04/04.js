document.addEventListener("DOMContentLoaded", () => {

});

const dice = () => {
    const adiv = document.querySelector("#adiv") ;
    

    let n = Math.floor(Math.random() * 6) + 1;
    console.log(n) ;
    //if (n == 1) adiv.innerHTML = "<img src='./img/1.png'>" ;
    //else if (n == 2) adiv.innerHTML = "<img src='./img/2.png'>" ;
    //else if (n == 3) adiv.innerHTML = "<img src='./img/3.png'>" ;
    //else if (n == 4) adiv.innerHTML = "<img src='./img/4.png'>" ;
    //else if (n == 5) adiv.innerHTML = "<img src='./img/5.png'>" ;
    //else if (n == 6) adiv.innerHTML = "<img src='./img/6.png'>" ;

    adiv.innerHTML = `<img src='./img/${n}.png'>` ;
}