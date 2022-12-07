const main = document.querySelector("#main");
const qna = document.querySelector("#qna");
const result = document.querySelector("#result");

const selected = [];
let isImageChange = true;

const calcResult = () => {
    let diffObj = {};
    for (let i = 0; i < qnaList.length; i++) {
        for (const j of qnaList[i].a[selected[i]].type) {
            diffObj[j] = diffObj[j] ? ++diffObj[j] : 1;
        }
    }
    const targetName = Object.entries(diffObj).sort((a, b) => {
        if (a[1] > b[1]) {
            return -1;
        }
        if (a[1] < b[1]) {
            return 1;
        }
        return 0;
    })[0][0];

    const resultDiscribtion = infoList.filter(
        item => item.type === targetName,
    )[0];

    const result = document.querySelector("#resultBlock");
    const resultImg = document.createElement("img");
    const resultSubTitle = document.createElement("h3");
    const resultDetail = document.createElement("p");
    resultImg.id = "resultImg";
    resultSubTitle.id = "resultSubTitle";
    resultDetail.id = "resultDetail";

    resultImg.src = `./img/${targetName}.png`;
    resultSubTitle.innerText = resultDiscribtion.name;
    resultDetail.innerText = resultDiscribtion.desc;

    result.appendChild(resultSubTitle);
    result.appendChild(resultImg);
    result.appendChild(resultDetail);
};

const addAnswer = (answerText, qIndex, index) => {
    const answerBox = document.querySelector(".answerBox");
    const answer = document.createElement("button");
    answer.classList.add("addList");
    answer.classList.add("btn");
    answer.classList.add("btn-outline-secondary");
    answer.classList.add("fadeIn");

    answerBox.appendChild(answer);
    answer.innerHTML = answerText;

    answer.addEventListener(
        "click",
        function (e) {
            selected.push(Number(index));
            const list = document.querySelectorAll(".addList");

            list.forEach(item => {
                answer.classList.remove("fadeIn");
                answer.classList.add("fadeOut");
                item.disabled = true;
                item.style.display = "none";
            });
            setTimeout(() => {
                list.forEach(item => {
                    item.style.display = "none";
                });
                goNext(++qIndex);
            }, 480);
        },
        false,
    );
};

const setProgressBar = value => {
    const status = document.querySelector("#status");
    status.style.width = `${value}%`;
};

const goResult = () => {
    calcResult();
    qna.style.animation = "fadeOut 1s";
    qna.style.WebkitAnimation = "fadeOut 1s";

    setTimeout(() => {
        result.style.animation = "fadeIn 1s";
        result.style.WebkitAnimation = "fadeIn 1s";
        setTimeout(() => {
            qna.style.display = "none";
            result.style.display = "block";
        }, 450);
    }, 500);
};

const goNext = index => {
    if (index === qnaList.length) {
        goResult();
        return;
    }
    const qBox = document.querySelector(".qBox");
    qBox.innerHTML = qnaList[index].q;

    const percent = Math.round(((index + 1) / qnaList.length) * 100);

    for (let i in qnaList[index].a) {
        addAnswer(qnaList[index].a[i].answer, index, i);
    }

    setProgressBar(percent);
};

const onClick = () => {
    let qIdx = 0;
    main.style.animation = "fadeOut 1s";
    main.style.WebkitAnimation = "fadeOut 1s";
    isImageChange = false;

    setTimeout(() => {
        qna.style.animation = "fadeIn 1s";
        qna.style.WebkitAnimation = "fadeIn 1s";
        setTimeout(() => {
            main.style.display = "none";
            qna.style.display = "block";
        }, 450);
    }, 500);

    goNext(qIdx);
};

const changeImg = async () => {
    if (!isImageChange) return;
    const mainImg = document.querySelector("#mainImg");

    const promise = target =>
        new Promise(resolve =>
            setTimeout(() => {
                mainImg.src = `./img/${target}.png`;
                resolve();
            }, 700),
        );

    for (let i = 0; i < animalList.length; i++) {
        await promise(animalList[i]);
    }
    changeImg();
};

if (isImageChange) {
    changeImg();
}
