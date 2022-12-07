const main = document.querySelector("#main");
const qna = document.querySelector("#qna");
const result = document.querySelector("#result");

const addAnswer = (answerText, qIndex) => {
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
        function () {
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

const goNext = index => {
    const qBox = document.querySelector(".qBox");
    qBox.innerHTML = qnaList[index].q;
    for (let a of qnaList[index].a) {
        addAnswer(a.answer, index);
    }
};

const onClick = () => {
    let qIdx = 0;
    main.style.animation = "fadeOut 1s";
    main.style.WebkitAnimation = "fadeOut 1s";

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
