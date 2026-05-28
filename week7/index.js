const baseURL = "http://apis.data.go.kr/B551011/PhotoGalleryService1"; //한국 관광 공사 사진 갤러리 API 기본 주소

const option = { //option: API에 데이터 요청시 필요한 세부 조건 (파라미터) 모아둔 객체
    serviceKey:
        "1268cf36e96a03e1d00d6f3f375a95bd855b58fe606494b595de5042d6e7606e",
    numofRows: 6, //한 번에 불러올 사진 갯수
    MobileApp: "test", // 어플리케이션 이름
    MobileOS: "ETC", // OS 구분
    arrange: "A", // 정렬 기준 (A=제목 순 등)
    _type: "json", // 응답 데이터 타입
};

const container = document.getElementById("container"); // HTML에서 id="container"인 요소 찾아 변수에 저장

let photoIndex = 1; // 사진 순번 매기기 위해 사용하는 숫자 변수

async function getData () { // 비동기 함수 -> API 서버에서 데이터들을 가져오는 시간이 걸리는 작업들을 순차적으로 수행
    let count = Math.floor(Math.random() * 1000) + 1;
    // baseURL과 option 객체들의 값을 조랍하여 최종적으로 데이터를 요청할 주소를 만듦
    const url = `${baseURL}/galleryList1?numOfRows=${option.numofRows}&MobileApp=${option.MobileApp}&MobileOS=${option.MobileOS}&arrange=${option.arrange}&_type=${option._type}&pageNo=${count}&serviceKey=${option.serviceKey}`

    const fetchData = await fetch(url); // 해당 URL로 네트워크 요청을 보내 데이터를 가져옴
    const toJSON = await fetchData.json();
    const datas = await toJSON.response.body.items.item; // JSON 구조에서 실제로 우리가 필요한 '사진 정보'

    datas.forEach((data,i) => {
        const list = document.createElement("div");
        list.id = "list" // 위에서 만든 <div> 에 id="list" 라는 이름표 붙이게 됨

        const image = document.createElement("img");
        image.src = data.galWebImageUrl; // 자바스크립트가 image라는 변수로 만든 <img> 태그의 주소(img) 값으로 API에서 가져온 진짜 이미지 URL을 연결

        const info = document.createElement("span");
        info.innerText = `
        ${photoIndex++}번째 사진
        제목: ${data.galTitle}
        장소: ${data.galPhotographyLocation}`;

        const button = document.createElement("button");
        button.innerText = "더보기";

        button.addEventListener("click", () => {
            const params = new URLSearchParams({
                title: data.galTitle,
                location: data.galPhotographyLocation,
                date: data.galCreatedtime,
                photographer: data.galPhotographer,
                keywords: data.galSearchKeyword,
                image: data.galWebImageUrl,
            });
            window.location.href = `detail.html?${params.toString()}`;
        });

        list.appendChild(image);
        list.appendChild(info);
        list.appendChild(button);

        container.appendChild(list);
    });
}