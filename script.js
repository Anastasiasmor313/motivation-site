// Логика мобильного меню
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const mainNav = document.getElementById('mainNav');

mobileMenuToggle.addEventListener('click', () => {
    mainNav.classList.toggle('active');
    mobileMenuToggle.classList.toggle('active');
});

// Логика навигации
const navButtons = document.querySelectorAll('.nav-btn');
const pages = document.querySelectorAll('.page');

navButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Закрываем мобильное меню при переходе
        if (window.innerWidth <= 768) {
            mainNav.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        }

        // Убираем активный класс у всех кнопок и страниц
        navButtons.forEach(btn => btn.classList.remove('active'));
        pages.forEach(page => page.classList.remove('active'));

        // Добавляем активный класс нажатой кнопке
        button.classList.add('active');

        // Показываем соответствующую страницу
        const pageId = button.getAttribute('data-page') + '-page';
        document.getElementById(pageId).classList.add('active');
        
        // Прокручиваем к верху страницы
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});

// Логика мотивационного теста
const quizContainer = document.getElementById('quiz-container');
const resultDiv = document.getElementById('result');
const motivationImage = document.getElementById('motivation-image');
const retryBtn = document.getElementById('retry-btn');

// Ваши 3 вопроса
const questions = [
    {
        question: "Что вас сейчас больше всего беспокоит?",
        answers: ["Работа/Учеба", "Отношения", "Саморазвитие"]
    },
    {
    question: "Что вам больше всего нужно в данный момент?",
        answers: ["Мотивация для новых свершений", "Поддержка и понимание", "Отдых и восстановление сил"]
    },
    {
        question: "Откуда вы обычно черпаете силы?",
        answers: ["Из активной деятельности", "Из общения с людьми", "Из уединения и тишины"]
    }
];

// 27 картинок (заранее загруженных на бесплатный хостинг картинок)
const imagePaths = [
    "https://i.ibb.co/YTNKbdD3/img1.jpg",
    "https://i.ibb.co/0Rfv4rF4/img2.jpg",
    "https://i.ibb.co/ccQ67LQ6/img3.jpg",
    "https://i.ibb.co/v4Qc4Yx0/img4.jpg",
    "https://i.ibb.co/4nvJb94m/img5.jpg",
    "https://i.ibb.co/wrBNhtgc/img7.jpg",
    "https://i.ibb.co/SzwYc4m/img8.jpg",
    "https://i.ibb.co/8ngjTqDY/img9.jpg",
    "https://i.ibb.co/27VN1nwJ/img10.jpg",
    "https://i.ibb.co/7tzk9gfT/img11.jpg",
    "https://i.ibb.co/SDzDSTG2/img12.jpg",
    "https://i.ibb.co/35Ny5nH1/img13.jpg",
    "https://i.ibb.co/FLhvJPy3/img14.jpg",
    "https://i.ibb.co/xS9W485X/img15.jpg",
    "https://i.ibb.co/RTXQxR5g/img16.jpg",
    "https://i.ibb.co/fYNxWTCC/img17.jpg",
    "https://i.ibb.co/JwDp84dR/img18.jpg",
    "https://i.ibb.co/d4P4T7Y8/img19.jpg",
    "https://i.ibb.co/bjRpnn0n/img20.jpg",
    "https://i.ibb.co/v4HKTxJq/img21.jpg",
    "https://i.ibb.co/KcbTZs2V/img22.jpg",
    "https://i.ibb.co/KcbTZs2V/img22.jpg",
    "https://i.ibb.co/tnHMPvp/img6.jpg",
    "https://i.ibb.co/tnHMPvp/img6.jpg",
    "https://i.ibb.co/tnHMPvp/img6.jpg",
    "https://i.ibb.co/tnHMPvp/img6.jpg",
    "https://i.ibb.co/tnHMPvp/img6.jpg"
];

let userAnswers = [];

function buildQuiz() {
    quizContainer.innerHTML = '';
    
    questions.forEach((currentQuestion, questionNumber) => {
        const questionDiv = document.createElement('div');
        questionDiv.classList.add('question');
        questionDiv.innerHTML = `<p>${currentQuestion.question}</p>`;

        currentQuestion.answers.forEach((answer, answerIndex) => {
            const label = document.createElement('label');
            const input = document.createElement('input');
            input.type = 'radio';
            input.name = `question${questionNumber}`;
            input.value = answerIndex;

            label.appendChild(input);
            label.appendChild(document.createTextNode(answer));
            questionDiv.appendChild(label);
        });

        quizContainer.appendChild(questionDiv);
    });

    const submitButton = document.createElement('button');
    submitButton.textContent = 'Получить мотивацию!';
    submitButton.addEventListener('click', showResult);
    quizContainer.appendChild(submitButton);
}

function showResult() {
    userAnswers = [];
    const answerSelectors = document.querySelectorAll('#quiz-container input[type=radio]:checked');

    if (answerSelectors.length !== questions.length) {
        alert("Пожалуйста, ответьте на все вопросы!");
        return;
    }

    answerSelectors.forEach(selector => {
        userAnswers.push(parseInt(selector.value));
    });

    // Логика для комбинации 3 ответов (3 вопроса * 3 варианта = 27 комбинаций)
    const imageIndex = userAnswers[0] * 9 + userAnswers[1] * 3 + userAnswers[2];
    
    // Используем реальный индекс или по модулю, если картинок меньше
    const finalIndex = imageIndex % imagePaths.length;
    
    motivationImage.src = imagePaths[finalIndex];
    motivationImage.alt = `Мотивационная картинка ${finalIndex + 1}`;
    
    quizContainer.style.display = 'none';
    resultDiv.style.display = 'block';
    
    // Плавная прокрутка к результату
    resultDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

retryBtn.addEventListener('click', () => {
    resultDiv.style.display = 'none';
    quizContainer.style.display = 'block';
    buildQuiz();
    
    // Прокрутка к началу теста
    quizContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

// Закрытие мобильного меню при клике вне его
document.addEventListener('click', (event) => {
    if (window.innerWidth <= 768) {
        const isClickInsideNav = mainNav.contains(event.target);
        const isClickOnToggle = mobileMenuToggle.contains(event.target);
        
        if (!isClickInsideNav && !isClickOnToggle && mainNav.classList.contains('active')) {
            mainNav.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        }
    }
});

// Обработка изменения размера окна
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        mainNav.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
    }
});

// Инициализация теста при загрузке страницы
document.addEventListener('DOMContentLoaded', buildQuiz);