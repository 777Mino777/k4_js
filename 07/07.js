// 전역변수 선언 (변수 위치는 바깥쪽, 어디서든 쓸 수있는 변수)
// 하트와 폭탄의 위치를 결정ㅎ하는 배열
// 하트 : 0, 폭탄 : 1
let arr = [0, 0, 0, 0, 0, 0, 0, 0, 1];

// 폭탄섞기 확인용 플래그
let flag = true;

// 눌러진 박스 수
let cnt = 0;

// 초기화
/* 함수 배정 */
const init = (boxes) => {
    // 변수 초기화
    flag = true;
    cnt = 0;
    // 박스 숫자 초기화
    boxes.forEach(element => {
        let n = element.getAttribute("id").slice(-1);
        console.log(n);
        element.textContent = n;
    });
};

document.addEventListener("DOMContentLoaded", () => {

    // 박스 초기화
    // 컴포넌트 가져오기
    // .row > div 9개가 한번에 잡힌다.
    const boxes = document.querySelectorAll(".row > div");
    const bt = document.querySelector("button");
    const h2 = document.querySelector("h2");

    // 초기화
    init(boxes);

    // 폭탄섞기 버튼처리
    bt.addEventListener('click', () => {
        // flag 변수 확인
        if (flag) {
            // 배열 shuffle
            arr.sort(() => Math.random() - 0.5);
            console.log(arr);

            init(boxes);
            h2.textContent = "폭탄을 피해 선택해주세요.";
            h2.style.color = 'purple';
            flag = false;
        }
    });

    // 박스 클릭 처리
    boxes.forEach(element => {
        console.log(flag);
        element.addEventListener('click', () => {
            // 폭탄섞기가 되지 않았을 경우
            if (flag) {
                h2.textContent = "폭탄을 섞어주세요.";
                h2.style.color = 'brown';
                return;
            }

            let idx = parseInt(element.textContent);
            // 이미지가 이미 있는 경우
            if (isNaN(idx)) return;

            // 해당 위치의 숫자가 0인지 1인지 확인
            if (arr[idx - 1] === 0) {// -1번째의 값이 0이되면  
                // 하트
                element.innerHTML = '<img src = "./img/hart.png">'
                // 하트선택개수
                cnt++;

                //성공처리
                if (cnt === 8) {
                    h2.textContent = "성공!!";
                    h2.style.color = 'blue';
                    flag = true;

                    idx = arr.indexOf(1) ;
                    console.log(idx);

                    // 이것도 가능 -> document.getElementById("box" + (idx+1)).innerHTML = '<img src = "./img/hart.png">';
                    document.querySelector("#box" + (idx+1)).innerHTML = '<img src = "./img/hart.png">';
                
                }
            }
            else {
                // 폭탄
                element.innerHTML = '<img src = "./img/boom.png" width ="90%">';
                h2.textContent = "실패! 폭탄을 섞어주세요.";
                h2.style.color = 'red';
                flag = true;
            }
            console.log(element.textContent);
        });
    });


});