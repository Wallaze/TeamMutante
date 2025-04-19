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
function expandImage(img) {
    const expandedContainer = document.getElementById('expandedImageContainer'); // Seleciona o container do popup
    const expandedImage = document.getElementById('expandedImage'); // Seleciona a imagem expandida
    expandedImage.src = img.src; // Define o caminho da imagem clicada
    expandedContainer.style.display = 'flex'; // Exibe o popup com a imagem
}

// Função que fecha o popup da imagem expandida
function closeImage() {
    const expandedContainer = document.getElementById('expandedImageContainer'); // Seleciona o container do popup
    expandedContainer.style.display = 'none'; // Oculta o popup
}

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
};
