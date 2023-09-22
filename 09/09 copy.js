let juso;                  // 전체 주소
let si;                    // 시
let gu;                    // 구
let dong;                  // 동
// 시설유형
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

console.log("-- object --")
console.log(equptype);
console.log(equptype["노인시설"]);
console.log(equptype.노인시설);

// object 순회
for (let k in equptype) {
    console.log(k, "=>", equptype[k]);
}
for (let [k, v] of Object.entries(equptype)) {
    console.log(k, "=>", v);
}

// 주소데이터 가져오기
fetch('juso2023.json')
.then(resp => resp.json())
.then(data => {
    juso = data ;
    console.log(juso) ;

    si = {} ;
    // juso 배열
    juso.forEach(element => {
        
        let {시도명칭, 시도코드} = element ;

        if (!si[시도명칭]) {
            si[시도명칭] = 시도코드;
        }
        
    });
    console.log(si);
})
.catch(err => console.log(err));

console.log(juso);