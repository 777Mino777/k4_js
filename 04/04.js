document.addEventListener("DOMContentLoaded", () => {
    // 6개 버튼 가져오기
    const bts = document.querySelectorAll("button");
    bts.forEach((item) => {
        item.addEventListener("click", () => {
            // 문자를 숫자로 변환
            dice2(parseInt(item.textContent));
        });
    })
    //    document.querySelector("#bt1").addEventListener("click", () => {
    //   console.log(document.querySelector("#bt1").textContent)
    //    }) ;

    //const bt1 = document.querySelector("#bt1") ;
    //bt1.addEventListener("click", () => {

    //}) ;

    //버튼 가져오기
    //const bts = document.querySelectorAll("button");
    //console.log(bts);

    // 각 버튼에 이벤트 달기
    //bts.forEach((item) => {
    //    item.addEventListener('click', () => {

    //    });
    //});

    // 확인 버튼 가져오기
    const bt = document.querySelector("button");
    const radios = document.ATTRIBUTE_NODE.querySelectorAll("input[type=radio]")
    bt.addEventListener("click", ()=> {
        for(let item of radios) {
            if (item.checked) {
            console.log(item.value);
            //문자를 숫자로 변환
            dice2(parseInt(item.value));
            // for each()는 break구문 사용안됨
            break;
            }
        }
    });
});
// 주사위 보기
const dice = () => {
    const adiv = document.querySelector("#adiv");


    let n = Math.floor(Math.random() * 6) + 1;
    console.log(n);
    //if (n == 1) adiv.innerHTML = "<img src='./img/1.png'>" ;
    //else if (n == 2) adiv.innerHTML = "<img src='./img/2.png'>" ;
    //else if (n == 3) adiv.innerHTML = "<img src='./img/3.png'>" ;
    //else if (n == 4) adiv.innerHTML = "<img src='./img/4.png'>" ;
    //else if (n == 5) adiv.innerHTML = "<img src='./img/5.png'>" ;
    //else if (n == 6) adiv.innerHTML = "<img src='./img/6.png'>" ;

    adiv.innerHTML = `<img src='./img/${n}.png'>`;
}

// 버튼 클릭시 주사위 보기
const dice2 = (seln) => {
    // 주사위 숫자 1~6
    let n = Math.floor(Math.random() * 6) + 1;

    // 주사위 이미지 넣을 위치
    //const adiv = document.getElementById("adiv") ; 아래와 같다
    const adiv = document.querySelector("#adiv");
    adiv.innerHTML = `<img src= './img/${n}.png'>`;

    // 결과 출력을 위한 위치
    const h2 = document.querySelector("hgroup > h2");

    if (n === seln) {
        h2.textContent = "맞음(승)";
        h2.style.color = "blue";
    }
    else {
        h2.textContent = "틀림(패)"
        h2.style.color = "red";
    }
}