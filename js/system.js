// ==========================
// CONFIGURAÇÃO 3D
// ==========================

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
    antialias: true
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.z = 5;

// Cubo sólido
const geometry = new THREE.BoxGeometry(2, 2, 2);

const material = new THREE.MeshStandardMaterial({
    color: 0x00ff41,
    metalness: 0.6,
    roughness: 0.3
});

const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Luz
const pointLight = new THREE.PointLight(0xffffff, 1.5);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);

// Movimento com mouse
document.addEventListener('mousemove', (event) => {
    const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    const mouseY = (event.clientY / window.innerHeight) * 2 - 1;

    cube.rotation.y = mouseX * Math.PI;
    cube.rotation.x = mouseY * Math.PI;
});

// Animação
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();

// Ajuste responsivo
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// ==========================
// SISTEMA DE CHAT MAGI
// ==========================

function sendMessage() {
    const input = document.getElementById("user-input");
    const chatBox = document.getElementById("chat-box");

    const userText = input.value.trim();
    if (userText === "") return;

    chatBox.innerHTML += `<p><strong>Você:</strong> ${userText}</p>`;
    input.value = "";

    // Modo PROCESSANDO
    chatBox.innerHTML += `<p id="processing"><strong>MAGI:</strong> PROCESSANDO...</p>`;
    chatBox.scrollTop = chatBox.scrollHeight;

    // Cubo muda de cor enquanto processa
    material.color.set(0xff0000);

    setTimeout(() => {
        const processingMsg = document.getElementById("processing");
        if (processingMsg) processingMsg.remove();

        const response = generateResponse(userText);

        chatBox.innerHTML += `<p><strong>MAGI:</strong> ${response}</p>`;
        chatBox.scrollTop = chatBox.scrollHeight;

        // Volta para verde
        material.color.set(0x00ff41);

    }, 1000);
}

// Respostas simuladas
function generateResponse(message) {
    message = message.toLowerCase();

    if (message.includes("status")) {
        return "Sistema operacional. Todos os módulos ativos.";
    }

    if (message.includes("versão")) {
        return "Versão atual: v0.4 - Núcleo interativo ativado.";
    }

    if (message.includes("robô")) {
        return "Integração robótica em desenvolvimento.";
    }

    if (message.includes("magi")) {
        return "Eu sou o núcleo central do Projeto MAGI.";
    }

    return "Comando reconhecido. Processamento concluído.";
}

// Permitir Enter para enviar
document.getElementById("user-input")
    .addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            sendMessage();
        }
    });