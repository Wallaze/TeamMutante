// Função que trata os cliques nos botões de navegação
function handleButtonClick(targetPage, buttonId) {
    // Verifica se a página atual já corresponde ao destino
    if (window.location.href.includes(targetPage)) {
        const doodle = document.getElementById('doodle'); // Seleciona o doodle
        doodle.style.display = 'flex'; // Exibe o doodle como um popup
        setTimeout(() => {
            doodle.style.display = 'none'; // Oculta o doodle após 3 segundos
        }, 3000);
    } else {
        // Redireciona para a página correspondente
        location.href = targetPage;
    }
}

// Função que expande a imagem quando clicada
let currentCarouselImages = [];
let currentIndex = 0;

// Função que expande a imagem quando clicada
function expandImage(img) {
    const expandedContainer = document.getElementById('expandedImageContainer');
    const expandedImage = document.getElementById('expandedImage');

    // Pega todas as imagens do carrossel em que a imagem foi clicada
    const carousel = img.closest('.carousel');
    currentCarouselImages = Array.from(carousel.querySelectorAll('img'));

    // Descobre o índice da imagem clicada
    currentIndex = currentCarouselImages.indexOf(img);

    // Define a imagem inicial
    expandedImage.src = img.src;

    expandedContainer.style.display = 'flex'; // Mostra popup
}

// Função que fecha o popup da imagem expandida
function closeImage() {
    const expandedContainer = document.getElementById('expandedImageContainer');
    expandedContainer.style.display = 'none';
}

// Navegar entre imagens do carrossel
function navigateImage(direction) {
    if (!currentCarouselImages.length) return; // segurança

    currentIndex += direction;

    // Faz o loop infinito (se passar do fim, volta ao início)
    if (currentIndex < 0) {
        currentIndex = currentCarouselImages.length - 1;
    } else if (currentIndex >= currentCarouselImages.length) {
        currentIndex = 0;
    }

    const expandedImage = document.getElementById('expandedImage');
    expandedImage.src = currentCarouselImages[currentIndex].src;
}

// controle por teclado (Esc, setas esquerda/direita)
document.addEventListener("keydown", (e) => {
    const expandedContainer = document.getElementById('expandedImageContainer');
    if (expandedContainer.style.display === 'flex') {
        if (e.key === "Escape") closeImage();
        if (e.key === "ArrowLeft") navigateImage(-1);
        if (e.key === "ArrowRight") navigateImage(1);
    }
});

// Fechar popup ao clicar no fundo escuro
const expandedContainer = document.getElementById('expandedImageContainer');
expandedContainer.addEventListener("click", (e) => {
    if (e.target === expandedContainer) {
        closeImage();
    }
});

// Função que rola para o topo da página
function scrollToTop() {
    window.scrollTo({
        top: 0, // Rola até o topo
        behavior: 'smooth' // Adiciona uma animação suave
    });
}
// Verifica a posição de rolagem e exibe/oculta o botão
window.onscroll = function() {
    var button = document.getElementById("scrollToTop");

    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        // Quando rolar 100px ou mais, mostra o botão
        button.style.display = "block";
    } else {
        // Se estiver no topo da página, esconde o botão
        button.style.display = "none";
    }
}
    
// JavaScript para o quiz

const quizQuestions = [
    // Perguntas sobre História do Jiu-Jitsu
    {
        question: "Quem foi o mestre japonês que ensinou a arte marcial que deu origem ao Jiu-Jitsu Brasileiro aos irmãos Gracie?",
        options: [
            "Jigoro Kano",
            "Mitsuyo Maeda (Conde Koma)",
            "Takeo Yano",
            "Masahiko Kimura"
        ],
        correctAnswer: 1,
        explanation: "Mitsuyo Maeda, conhecido como Conde Koma, foi um lutador japonês de judô (Kodokan) que viajou ao Brasil e ensinou a arte para Carlos Gracie, que a adaptou para o que conhecemos hoje."
    },
    {
        question: "Qual mestre de Jiu-Jitsu é frequentemente associado à popularização da arte nas classes mais populares do Rio de Janeiro, desafiando a hegemonia da família Gracie?",
        options: [
            "Oswaldo Fadda",
            "Helio Gracie",
            "Carlson Gracie",
            "Rolls Gracie"
        ],
        correctAnswer: 0,
        explanation: "Oswaldo Fadda, faixa preta de Luiz França, é famoso por ter levado o Jiu-Jitsu a comunidades mais humildes do Rio de Janeiro e por ter derrotado a equipe de Carlson Gracie em um desafio histórico."
    },
    // Perguntas sobre Nomenclatura e Tradição
    {
        question: "No Jiu-Jitsu, o termo 'O-goshi' refere-se a que tipo de técnica?",
        options: [
            "Uma finalização de braço",
            "Uma raspagem da guarda",
            "Um estrangulamento",
            "Uma queda (arremesso de quadril)"
        ],
        correctAnswer: 3,
        explanation: "O-goshi é uma queda de judô muito comum e eficaz, frequentemente usada no Jiu-Jitsu, que envolve um arremesso do adversário sobre o quadril."
    },
    {
        question: "Qual é o significado da faixa branca no contexto do Jiu-Jitsu?",
        options: [
            "Conhecimento avançado",
            "Pureza e o início do aprendizado",
            "Experiência em competições",
            "Habilidade de finalização"
        ],
        correctAnswer: 1,
        explanation: "A faixa branca simboliza a pureza e a ausência de conhecimento, representando o início da jornada no Jiu-Jitsu, onde o praticante começa a construir sua base técnica."
    },
    // Perguntas sobre Técnicas e Faixas
    {
        question: "Qual é o primeiro movimento que um iniciante deve aprender para não ser facilmente dominado no chão?",
        options: [
            "O-goshi",
            "Armlock",
            "Fuga de quadril (shrimping)",
            "Estrangulamento (mata-leão)"
        ],
        correctAnswer: 2,
        explanation: "A fuga de quadril, ou 'shrimping', é um movimento fundamental. Ele permite que o lutador crie espaço, fuja de posições de desvantagem e se reposicione, sendo a base de muitas defesas."
    },
    {
        question: "Para um faixa azul, qual é uma das principais exigências técnicas para a próxima graduação?",
        options: [
            "Ter um controle absoluto de todas as quedas",
            "Dominar os conceitos de raspagens e fugas de posições básicas",
            "Conseguir finalizar todos os faixas brancas",
            "Memorizar a história completa da arte marcial"
        ],
        correctAnswer: 1,
        explanation: "A faixa azul é a transição do básico para o intermediário. O lutador deve demonstrar uma base sólida, dominando as principais raspagens, fugas e defesas de posições de desvantagem."
    },
    // Perguntas sobre Nomenclatura em Português
    {
        question: "O golpe 'Armlock' é o nome em inglês para qual técnica de finalização?",
        options: [
            "Estrangulamento",
            "Chave de joelho",
            "Chave de braço",
            "Americana"
        ],
        correctAnswer: 2,
        explanation: "'Armlock' é o termo em inglês para a 'chave de braço', uma das finalizações mais tradicionais e eficientes do jiu-jitsu."
    },
    {
        question: "A posição de 'Guarda Aranha' se refere a uma guarda onde o praticante:",
        options: [
            "Envolve as pernas nas costas do adversário",
            "Controla o adversário com as mãos nas lapelas e os pés nos bíceps",
            "Controla o adversário com o ombro no peito",
            "Prende as pernas em torno da cintura do adversário"
        ],
        correctAnswer: 1,
        explanation: "A Guarda Aranha é caracterizada pelo controle do adversário com as mãos nas lapelas e os pés pressionando os bíceps, mantendo o oponente à distância."
    },
    // Mais perguntas
    {
        question: "Qual a principal função do kimono (o 'gi') no jiu-jitsu, além de ser o uniforme?",
        options: [
            "É apenas um acessório estético",
            "É usado para proteger o praticante de lesões",
            "É parte essencial da luta, servindo para pegadas e controles",
            "Serve apenas para indicar a graduação do lutador"
        ],
        correctAnswer: 2,
        explanation: "Diferente de outras lutas, o kimono no jiu-jitsu é um elemento ativo da luta. A lapela, a manga e a calça são usadas para pegadas, finalizações e controles, tornando-o essencial para a arte marcial."
    },
    {
        question: "Qual a faixa de transição entre a Faixa Branca e a Faixa Azul?",
        options: [
            "Faixa Amarela",
            "Faixa Verde",
            "Faixa Laranja",
            "Não há faixa de transição"
        ],
        correctAnswer: 3,
        explanation: "No jiu-jitsu adulto, não há faixas de transição entre a branca e a azul. A progressão é direta, baseada no tempo de treino e na proficiência técnica do aluno."
    },
    {
        question: "Qual faixa é considerada a transição para o nível de mestre, onde se espera que o praticante já tenha domínio técnico e tático completo?",
        options: [
            "Faixa Azul",
            "Faixa Roxa",
            "Faixa Marrom",
            "Faixa Preta"
        ],
        correctAnswer: 2,
        explanation: "A faixa marrom é a última etapa antes da faixa preta. Nela, espera-se que o praticante já tenha um jiu-jitsu completo, tanto em termos técnicos quanto em estratégia de luta, e se prepare para se tornar um professor."
    },
    {
        question: "No jiu-jitsu, o termo 'raspagens' se refere a qual ação?",
        options: [
            "Finalizar o oponente com uma chave de braço.",
            "Um movimento de defesa para fugir de uma posição ruim.",
            "Inverter a posição com o oponente, saindo de baixo e terminando por cima.",
            "A técnica de derrubar o oponente em pé."
        ],
        correctAnswer: 2,
        explanation: "Raspagem é o movimento de inversão de posição, geralmente feito a partir da guarda, onde o praticante consegue trocar a posição de desvantagem por uma de vantagem, pontuando na luta."
    },
    {
        question: "Qual dos movimentos abaixo é fundamental para se defender e escapar de posições de desvantagem no chão?",
        options: [
            "Apenas finalizar o oponente.",
            "Fazer o 'shrimping' (fuga de quadril).",
            "Levantar e tentar lutar em pé.",
            "Ficar parado e esperar uma abertura."
        ],
        correctAnswer: 1,
        explanation: "O 'shrimping', ou fuga de quadril, é a base da movimentação no chão. É o primeiro movimento que o aluno deve aprender para criar espaço e escapar de posições de controle."
    },
    {
        question: "Quem foi um dos principais disseminadores da arte marcial japonesa no Brasil, mestre que ensinou a Carlos Gracie?",
        options: [
            "Jigoro Kano",
            "Carlos Gracie",
            "Helio Gracie",
            "Mitsuyo Maeda"
        ],
        correctAnswer: 3,
        explanation: "Mitsuyo Maeda (Conde Koma) foi o mestre japonês que, por volta de 1917, ensinou a Carlos Gracie os fundamentos do judô (Kodokan), que foram adaptados para o jiu-jitsu brasileiro."
    },
    {
        question: "O que o praticante de jiu-jitsu espera conseguir ao alcançar a faixa preta?",
        options: [
            "Ter domínio absoluto de todas as técnicas.",
            "Ter concluído o aprendizado da arte marcial.",
            "Dominar o básico e se tornar um instrutor.",
            "Ter o direito de se tornar professor e ensinar a arte."
        ],
        correctAnswer: 3,
        explanation: "A faixa preta não é o fim, mas sim o início da jornada como instrutor e professor. É o momento em que o praticante está apto a passar o conhecimento adiante."
    },
    {
        question: "No jiu-jitsu, a posição de 'guarda aranha' é caracterizada por:",
        options: [
            "Controlar o oponente com os pés no peito e as mãos nas lapelas.",
            "O controle do oponente com as pernas presas nas suas costas.",
            "Controlar o oponente com as mãos nas lapelas e os pés nos bíceps.",
            "Uma forma de guarda onde o praticante fica de joelhos."
        ],
        correctAnswer: 2,
        explanation: "A guarda aranha é uma técnica de guarda aberta onde o praticante usa as mãos nas mangas e os pés nos bíceps do oponente para mantê-lo distante e criar oportunidades de ataque."
    },
    {
        question: "Qual a diferença entre um 'triângulo' e um 'mata-leão'?",
        options: [
            "O triângulo é uma finalização de perna e o mata-leão é de braço.",
            "Ambos são estrangulamentos, mas o triângulo usa as pernas e o mata-leão, os braços.",
            "O triângulo é um movimento de queda e o mata-leão é uma raspagem.",
            "Não há diferença, são nomes diferentes para o mesmo golpe."
        ],
        correctAnswer: 1,
        explanation: "Ambas são finalizações por estrangulamento. A principal diferença é a forma como são aplicadas: o triângulo usa a pressão das pernas do praticante no pescoço do oponente, e o mata-leão usa os braços."
    },
    {
        question: "A popularização do jiu-jitsu brasileiro nos Estados Unidos se deu, principalmente, através de quem?",
        options: [
            "Rolls Gracie e Carlson Gracie",
            "Helio Gracie e Oswaldo Fadda",
            "Rickson Gracie e Royce Gracie",
            "Carlos Gracie Jr. e Ryan Gracie"
        ],
        correctAnswer: 2,
        explanation: "Royce Gracie foi o grande responsável por apresentar e popularizar o jiu-jitsu no cenário internacional, especialmente através de suas vitórias nos primeiros torneios do UFC nos anos 90."
    },
    {
        question: "Qual das seguintes técnicas não é considerada uma finalização de estrangulamento?",
        options: [
            "Ezekiel",
            "Katagatame",
            "Americana",
            "Mata-leão"
        ],
        correctAnswer: 2,
        explanation: "A 'Americana' é uma finalização de braço, que pressiona a articulação do ombro. O Ezekiel, o Katagatame e o mata-leão são todos estrangulamentos."
    },
    {
        question: "Em uma luta de jiu-jitsu, o que é um 'esquiva de quadril' (hip escape)?",
        options: [
            "Um movimento ofensivo para atacar a perna do oponente.",
            "Uma técnica para defender um estrangulamento.",
            "Um movimento para ganhar pontos na luta.",
            "Um movimento defensivo para criar espaço e fugir de uma posição de controle."
        ],
        correctAnswer: 3,
        explanation: "O 'hip escape' é uma das bases de defesa no jiu-jitsu. É um movimento defensivo que permite que o praticante crie espaço entre ele e o oponente para se reposicionar e sair de posições de desvantagem."
    }
];

let currentQuizQuestions = [];
const numberOfQuestions = 5; // Define que serão 5 perguntas por rodada

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function loadQuiz() {
    const quizDiv = document.getElementById('quiz-questions');
    if (!quizDiv) return; // Evita erros se a div não existir na página

    quizDiv.innerHTML = '';
    const quizResultsDiv = document.getElementById('quiz-results');
    quizResultsDiv.innerHTML = '';
    quizResultsDiv.className = 'quiz-result';

    currentQuizQuestions = shuffleArray([...quizQuestions]).slice(0, numberOfQuestions);

    currentQuizQuestions.forEach((q, index) => {
        const questionHtml = `
            <div class="quiz-question-container">
                <div class="quiz-question">
                    ${index + 1}. ${q.question}
                </div>
                <div class="quiz-options">
                    ${q.options.map((option, i) => `
                        <label>
                            <input type="radio" name="question${index}" value="${i}">
                            ${option}
                        </label>
                    `).join('')}
                </div>
            </div>
        `;
        quizDiv.innerHTML += questionHtml;
    });
}

function checkQuizAnswers() {
    let correctCount = 0;
    const quizResultsDiv = document.getElementById('quiz-results');
    if (!quizResultsDiv) return; // Evita erros se a div não existir na página

    let resultsHtml = '';

    quizResultsDiv.className = 'quiz-result';

    currentQuizQuestions.forEach((q, index) => {
        const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
        const questionContainer = document.querySelector(`#quiz-questions > div:nth-child(${index + 1})`);

        questionContainer.classList.remove('correct-answer', 'incorrect-answer');

        if (selectedOption) {
            if (parseInt(selectedOption.value) === q.correctAnswer) {
                correctCount++;
                questionContainer.classList.add('correct-answer');
            } else {
                questionContainer.classList.add('incorrect-answer');
            }
        } else {
            questionContainer.classList.add('incorrect-answer');
        }

        resultsHtml += `
            <div class="quiz-result-item ${parseInt(selectedOption?.value) === q.correctAnswer ? 'correct' : 'incorrect'}">
                <strong>Pergunta ${index + 1}:</strong> ${parseInt(selectedOption?.value) === q.correctAnswer ? 'Correto!' : 'Incorreto.'}
                <br>
                <strong>Explicação:</strong> ${q.explanation}
            </div>
        `;
    });

    const finalMessage = `<p>Você acertou ${correctCount} de ${numberOfQuestions} perguntas.</p>`;
    quizResultsDiv.innerHTML = finalMessage + resultsHtml;

    if (correctCount === numberOfQuestions) {
        quizResultsDiv.classList.add('correct');
    } else if (correctCount > 0) {
        quizResultsDiv.classList.add('neutral');
    } else {
        quizResultsDiv.classList.add('incorrect');
    }
}

// Expõe as funções globalmente para serem acessadas pelo HTML
window.loadQuiz = loadQuiz;
window.checkQuizAnswers = checkQuizAnswers;

// Carrega o quiz quando a página é carregada
document.addEventListener('DOMContentLoaded', loadQuiz);
