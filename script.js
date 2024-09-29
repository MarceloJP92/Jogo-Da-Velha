// Seleção de elementos do DOM
const cellElements = document.querySelectorAll("[data-cell]");
const board = document.querySelector("[data-board]");
const winningMessageTextElement = document.querySelector(
    "[data-winning-message-text]"
);
const winningMessage = document.querySelector("[data-winning-message]");
const restartButton = document.querySelector("[data-restart-button]");

// Variável para controlar o turno do jogador
let isCircleTurn;

// Combinations de vitória
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

// Função para iniciar o jogo
const startGame = () => {
    // Reiniciar o turno do jogador
    isCircleTurn = false;

    // Limpar as células do tabuleiro
    for (const cell of cellElements) {
        cell.classList.remove("circle");
        cell.classList.remove("x");
        cell.removeEventListener("click", handleClick);
        cell.addEventListener("click", handleClick, { once: true });
    }

    // Adicionar a classe de hover ao tabuleiro
    setBoardHoverClass();

    // Ocultar a mensagem de vitória
    winningMessage.classList.remove("show-winning-message");
};

// Função para terminar o jogo
const endGame = (isDraw) => {
    // Verificar se é um empate
    if (isDraw) {
        winningMessageTextElement.innerText = "Empate!";
    } else {
        // Verificar quem venceu
        winningMessageTextElement.innerText = isCircleTurn
            ? "O Venceu!"
            : "X Venceu!";
    }

    // Mostrar a mensagem de vitória
    winningMessage.classList.add("show-winning-message");
};

// Função para verificar se há vitória
const checkForWin = (currentPlayer) => {
    // Verificar se há vitória em alguma combinação
    return winningCombinations.some((combination) => {
        return combination.every((index) => {
            return cellElements[index].classList.contains(currentPlayer);
        });
    });
};

// Função para verificar se há empate
const checkForDraw = () => {
    // Verificar se todas as células estão preenchidas
    return [...cellElements].every((cell) => {
        return cell.classList.contains("x") || cell.classList.contains("circle");
    });
};

// Função para colocar uma marca (X ou O) em uma célula
const placeMark = (cell, classToAdd) => {
    // Adicionar a classe de marca à célula
    cell.classList.add(classToAdd);
};

// Função para definir a classe de hover do tabuleiro
const setBoardHoverClass = () => {
    // Remover as classes de hover do tabuleiro
    board.classList.remove("circle");
    board.classList.remove("x");
};

// Função para alternar o turno do jogador
const swapTurns = () => {
    // Alternar o turno do jogador
    isCircleTurn = !isCircleTurn;
};

// Função para lidar com o clique em uma célula
const handleClick = (e) => {
    // Colocar a marca (X ou O) na célula clicada
    const cell = e.target;
    const classToAdd = isCircleTurn ? "circle" : "x";

    placeMark(cell, classToAdd);

    // Verificar se há vitória
    const isWin = checkForWin(classToAdd);

    // Verificar se há empate
    const isDraw = checkForDraw();

    // Terminar o jogo se houver vitória ou empate
    if (isWin) {
        endGame(false);
    } else if (isDraw) {
        endGame(true);
    } else {
        // Alternar o turno do jogador
        swapTurns();
    }
};

// Iniciar o jogo
startGame();

// Adicionar evento de clique ao botão de reiniciar
restartButton.addEventListener("click", startGame);