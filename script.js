
const toggleCheckbox = document.getElementById('theme-toggle');
const currentTheme = localStorage.getItem('theme');

if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
    if (currentTheme === 'dark') {
        toggleCheckbox.checked = true;
    }
    atualizarImagensDoTema(currentTheme === 'dark');
}

if (toggleCheckbox) {
    toggleCheckbox.addEventListener('change', function() {
        if (this.checked) {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            atualizarImagensDoTema(true);
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            atualizarImagensDoTema(false);
        }
    });
}

function atualizarImagensDoTema(isDark) {
    const foto2re = document.querySelector('.foto2re');
    const ladrilhos = document.querySelectorAll('.ladrilho');

    if (isDark) {
        if (foto2re) foto2re.src = ''; 
        ladrilhos.forEach(ladrilho => {
            ladrilho.src = 'ladrilho-escuro.png'; 
        });
    } else {
        if (foto2re) foto2re.src = 'foto2re.png';
        ladrilhos.forEach(ladrilho => {
            ladrilho.src = 'ladrilho.png';
        });
    }
}


document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const nomeInput = document.getElementById("nome");
    const emailInput = document.getElementById("email");
    const telefoneInput = document.getElementById("telefone");
    const mensagemInput = document.getElementById("mensagem");


    const modal = document.getElementById("custom-modal");
    const modalTexto = document.getElementById("modal-text");
    const modalFechar = document.getElementById("modal-close");

    function abrirModalPersonalizado(mensagem) {
        if (modal && modalTexto) {
            modalTexto.innerHTML = messageOrErrors(mensagem);
            modal.style.display = "flex"; 
        }
    }


    function messageOrErrors(msgArray) {
        if (Array.isArray(msgArray)) {
            return "<strong>Por favor, corrija os erros:</strong><br><br>" + msgArray.join("<br>");
        }
        return msgArray;
    }


    if (modalFechar && modal) {
        modalFechar.addEventListener("click", () => {
            modal.style.display = "none";
        });
    }


    if (nomeInput) {
        nomeInput.addEventListener("input", (e) => {
            e.target.value = e.target.value.replace(/[^a-zA-ZÀ-ÿ\s]/g, "");
        });
    }


    if (telefoneInput) {
        telefoneInput.addEventListener("input", (e) => {
            let numeros = e.target.value.replace(/\D/g, "");
            numeros = numeros.substring(0, 11);

            let formatado = "";
            if (numeros.length > 0) {
                formatado = "(" + numeros.substring(0, 2);
                if (numeros.length > 2) {
                    formatado += ") " + numeros.substring(2, 7);
                }
                if (numeros.length > 7) {
                    formatado += "-" + numeros.substring(7, 11);
                }
            }
            e.target.value = formatado;
        });
    }

    if (form) {
        form.addEventListener("submit", (e) => {
            let erros = [];

            const nomeValor = nomeInput ? nomeInput.value.trim() : "";
            if (nomeValor.length < 3) {
                erros.push("• Nome: Mínimo 3 letras.");
                if (nomeInput) nomeInput.style.borderColor = "#ff4d4d";
            } else {
                if (nomeInput) nomeInput.style.borderColor = "";
            }

            const emailValor = emailInput ? emailInput.value.trim() : "";

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailValor)) {
                erros.push("• Email inválido.");
                if (emailInput) emailInput.style.borderColor = "#ff4d4d";
            } else {
                if (emailInput) emailInput.style.borderColor = "";
            }

            const telefoneNumeros = telefoneInput ? telefoneInput.value.replace(/\D/g, "") : "";
            if (telefoneNumeros.length > 0 && telefoneNumeros.length < 11) {
                erros.push("• Telefone incompleto.");
                if (telefoneInput) telefoneInput.style.borderColor = "#ff4d4d";
            } else {
                if (telefoneInput) telefoneInput.style.borderColor = "";
            }

            const mensagemValor = mensagemInput ? mensagemInput.value.trim() : "";
            if (mensagemValor.length < 5) {
                erros.push("• Mensagem muito curta.");
                if (mensagemInput) mensagemInput.style.borderColor = "#ff4d4d";
            } else {
                if (mensagemInput) mensagemInput.style.borderColor = "";
            }

            if (erros.length > 0) {
                e.preventDefault(); 
                abrirModalPersonalizado(erros);
            }
        });
    }
});

    const targetTyping = document.querySelector(".apresentacao");
    if (targetTyping) {
        const textoOriginal = targetTyping.innerHTML;
        targetTyping.innerHTML = ""; 
        let i = 0;

        function digitar() {
            if (i < textoOriginal.length) {
                if (textoOriginal.charAt(i) === '<') {
                    let tagFechamento = textoOriginal.indexOf('>', i);
                    targetTyping.innerHTML += textoOriginal.substring(i, tagFechamento + 1);
                    i = tagFechamento + 1;
                } else {
                    targetTyping.innerHTML += textoOriginal.charAt(i);
                    i++;
                }
                setTimeout(digitar, 10); 
            }
        }
        digitar();
    }


    const elementosAnimados = document.querySelectorAll('.card-projeto, .secao-skills, #lista, .contato, .form-container');
    
    elementosAnimados.forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
        el.style.transition = "opacity 0.8s ease-out, transform 0.8s ease-out";
    });

    const checarRolagemTela = () => {
        elementosAnimados.forEach(el => {
            const topoElemento = el.getBoundingClientRect().top;
            const alturaGatilho = window.innerHeight * 0.85;

            if (topoElemento < alturaGatilho) {
                el.style.opacity = "1";
                el.style.transform = "translateY(0)";
            }
        });
    };

    window.addEventListener("scroll", checarRolagemTela);
    checarRolagemTela(); 
