let juso;          //전체주소 : juso2023.json
let si;            //시
let gu;            //구
let dong;          //동

 
//시설유형
let equptype = {
    "노인시설": "001",
    "복지회관": "002",
    "마을회관": "003",
    "보건소": "004",
    "주민센터": "005",
    "면동사모소": "006",
    "종교시설": "007",
    "금융기관": "008",
    "정자": "009",
    "공원": "010",
    "정자 파고라": "011",
    "공원": "012",
    "교량하부": "013",
    "나무그늘": "014",
    "하천둔치": "015",
    "기타": "099"
}

//select박스 내용 지우기
const removeOption = (s, firstS) => {
    while (s.hasChildNodes()) {
        s.removeChild(s.firstChild); 
    }
    const option = document.createElement("option") ;
    option.value = "" ;
    option.text = firstS ;
    s.appendChild(option) ;
}

//select박스 채우기
//d : data, s : select box
const addOption = (d, s) => {
    for(let [k, v] of Object.entries(d)) {
        console.log(k, v)
        const option = document.createElement("option") ;
        option.value = v ;
        option.text = k ;
        s.appendChild(option) ;
    }
}
//주소정보가져오기
const getJuso = async (sel1) => {
    const resp = await fetch("juso2023.json") ;
    // const data = await resp.json() ;
    // juso = data ;
    juso = await resp.json() ; 
    si = {} ;
    //jsuo 배열
    juso.forEach(element => {
        let {시도명칭, 시도코드 } = element ;
        
        if (!si[시도명칭]) {
            si[시도명칭] = 시도코드 ;
        }       
    });
    console.log(si) ;
    addOption(si, sel1) ;
}

//무더위 쉼터 정보가져오기
const getData = async(cd, etype, h2) => {
    let ServiceKey = "8qw7g%2FC%2BMGd2iRqEvb%2FEx0Sg3ZwAAsnS%2FQ7rRaU3l4UUYfNWgyAbYpNw541yy9pueEvoCcNwmCww8ss32BBWEA%3D%3D";
    let pageNo = 1; 
    let numOfRows = 10;
    let type = "json" ;
    let year = 2023;

    let url = "https://apis.data.go.kr/1741000/HeatWaveShelter2/getHeatWaveShelterList2?" ;
    url = url + `ServiceKey=${ServiceKey}` ;
    url = url + `&pageNo=${pageNo}`;
    url = url + `&numOfRows=${numOfRows}`;
    url = url + `&type=${type}`;
    url = url + `&year=${year}`;
    url = url + `&areaCd=${cd}`;
    url = url + `&equptype=${etype}`;

    console.log(url);
    /* 데이터가 없을 경우
        {
            "RESULT": {
                "resultCode": "INFO-3",
                "resultMsg": "데이터없음 에러"
            }
        }
    */

    const resp = await fetch(url) ;
    const data = await resp.json() ;
    const viewTb = document.getElementById("viewTb") ;

    console.log(data["RESULT"])
    if (data["RESULT"] !== undefined) {
        h2.innerHTML = `<span class='h2Sel1'>${data["RESULT"]["resultMsg"]}</span>` ;
        viewTb.innerHTML = "" ;
        return ;
    } 

    console.log(data)
    h2.innerHTML = h2.innerHTML + `, <span class='h2Sel1'>totalCount : ${data["HeatWaveShelter"][0]["head"][0]["totalCount"]}</span>` ;
    let row = data['HeatWaveShelter'][1].row ;
    console.log(row);

    let conTag =  "<table>" ;
    conTag =  conTag + `<thead> 
                <tr>
                    <th scope="col">쉼터명</th>
                    <th scope="col">주소</th>
                    <th scope="col">인원수</th>
                    <th scope="col">선풍기</th>
                    <th scope="col">에어컨</th> 
                </tr>
                </thead> `;

    conTag =  conTag + '<tbody>' ;
    for(let item of row) {
        conTag = conTag + '<tr>' ;
        conTag = conTag + `<td>${item.restname}</td>` ; 
        conTag = conTag + `<td>${item.restaddr}</td>` ; 
        conTag = conTag + `<td>${item.usePsblNmpr}명</td>` ;
        conTag = conTag + `<td>${item.colrHoldElefn}대</td>` ;
        conTag = conTag + `<td>${item.colrHoldArcndtn}대</td>` ;
        conTag = conTag + '</tr>' ;
    } ;
    conTag = conTag + "</tbody></table>";


    viewTb.innerHTML = conTag;
} ;

document.addEventListener("DOMContentLoaded", () => {
    //컴포넌트 가져오기
    const sel1 = document.querySelector("#sel1");
    const sel2 = document.querySelector("#sel2");
    const sel3 = document.querySelector("#sel3");
    const sel4 = document.querySelector("#sel4");
    const bt = document.querySelector("#bt");
    const h2 = document.querySelector("h2");

    //시설유형
    addOption(equptype, sel4) ;

    //시 정보
    getJuso(sel1);

    //구 정보
    sel1.addEventListener("change", ()=>{
        gu = {} ;
        juso
        .filter(item => item.시도코드 == sel1.value) 
        .map(item => {
            let {시군구명칭,시군구코드 } = item ;
            if (!gu[시군구명칭]) {
                gu[시군구명칭] = 시군구코드 ;
            }
        });

        console.log(gu); 
        removeOption(sel2, "--구선택--") ;
        removeOption(sel3, "--동선택--") ;
        addOption(gu, sel2) ;
    });

    //동 정보
    sel2.addEventListener("change", ()=>{
        dong = {} ;
        juso
        .filter(item => item.시도코드 == sel1.value && 
                        item.시군구코드 == sel2.value) 
        .map(item => {
            let {읍면동명칭,읍면동코드 } = item ;
            if (!dong[읍면동명칭]) {
                dong[읍면동명칭] = 읍면동코드 ;
            }
        });

        console.log(dong); 
        removeOption(sel3, "--동선택--") ;
        addOption(dong, sel3) ;
    });

    //확인버튼
    bt.addEventListener("click", (e) => {
        //form 기본 이벤트 처리 안함
        e.preventDefault() ;

        if (sel1.value == "") {
            h2.innerHTML = `<span class='h2Sel1'>시를 선택해 주세요.</span>` ;
            return ;
        }

        if (sel2.value == "") {
            h2.innerHTML = `<span class='h2Sel1'>구를 선택해 주세요.</span>` ;
            return ;
        }

        if (sel3.value == "") {
            h2.innerHTML = `<span class='h2Sel1'>동을 선택해 주세요.</span>` ;
            return ;
        }

        if (sel4.value == "") {
            h2.innerHTML = `<span class='h2Sel1'>시설유형을 선택해 주세요.</span>` ;
            return ;
        }

        //지역코드
        let areaCd  = `${sel1.value}${sel2.value}${sel3.value}00`;
        let equpName ;
        // for(let [k, v] of Object.entries(equptype)) {
        //     if (v == sel4.value) {
        //         equpName = k ;
        //         break;
        //     }
        // }

        equpName = Object
                    .entries(equptype)
                    .filter( item => item[1] == sel4.value)[0][0]  ;

        h2.innerHTML = `<span class='h2Sel2'>지역코드 (행정동코드) : ${areaCd}, 시설유형 : ${sel4.value}(${equpName})</span>` ;
        getData(areaCd, sel4.value, h2);
    });
});