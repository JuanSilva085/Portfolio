// barrinha ao rolar a página
window.addEventListener('scroll', () => {
    //calcula porcentagem página scrollada
    const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    
    document.getElementById('scrollProgress').style.width = scrolled + '%';
});

// animação suave ao clicar no navbar
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
anchor.addEventListener('click', function (e) {
e.preventDefault(); 

const target = document.querySelector(this.getAttribute('href'));

if (target) {
    
    target.scrollIntoView({
        behavior: 'smooth', 
        block: 'start'     
    });
  }
 });
});

//faz elementos aparecerem quando entram na tela
const observerCallback = (entries) => {
entries.forEach(entry => {
if (entry.isIntersecting) {
    
    entry.target.classList.add('visible');
   }
 });
};


const observer = new IntersectionObserver(observerCallback, {
    threshold: 0.1,           
    rootMargin: '0px 0px -50px 0px' 
});

document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});


//muda a cor de fundo do cabeçalho ao descer na página
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    
    if (window.scrollY > 100) {
        header.style.background = 'rgba(10, 10, 10, 0.95)';
    } else {
        header.style.background = 'rgba(10, 10, 10, 0.9)';
    }
});

//cria as formas geométricas
function addFloatingShape() {
    //container onde as formas vão aparecer
    const bgAnimation = document.querySelector('.bg-animation');
    
    //novo elemento div para ser nossa forma
    const shape = document.createElement('div');
    shape.classList.add('floating-shape');

    // aleatoriedade das formas
    const size = Math.random() * 60 + 40;      
    const left = Math.random() * 100;          
    const duration = Math.random() * 20 + 15; 
    const delay = Math.random() * 10;          

    //aplica o tamanho e a posição
    shape.style.width = size + 'px';
    shape.style.height = size + 'px';
    shape.style.left = left + '%';
    shape.style.animationDuration = duration + 's';
    shape.style.animationDelay = delay + 's';

    const shapes = [
        'polygon(50% 0%, 0% 100%, 100% 100%)',    
        'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)', 
        'circle(50%)',                              
        'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)', 
        'polygon(50% 0%, 82% 18%, 100% 50%, 82% 82%, 50% 100%, 18% 82%, 0% 50%, 18% 18%)',
        'polygon(25% 0%, 75% 0%, 100% 25%, 100% 75%, 75% 100%, 25% 100%, 0% 75%, 0% 25%)', 
    ];

    const gradients = [
        'linear-gradient(45deg, #ff6b6b, #4ecdc4)', 
        'linear-gradient(45deg, #a8e6cf, #ffd93d)', 
        'linear-gradient(45deg, #ff9a9e, #fecfef)', 
        'linear-gradient(45deg, #a18cd1, #fbc2eb)', 
        'linear-gradient(45deg, #ffecd2, #fcb69f)', 
        'linear-gradient(45deg, #667eea, #764ba2)'  
    ];

    //escolhe uma forma e cor aleatória
    shape.style.clipPath = shapes[Math.floor(Math.random() * shapes.length)];
    shape.style.background = gradients[Math.floor(Math.random() * gradients.length)];

    //adiciona a forma na tela
    bgAnimation.appendChild(shape);

    //remove forma depois que a animação termina para que o navegador nao fique cheio de formas 'invisíveis'
    setTimeout(() => {
        if (shape.parentNode) {
            shape.parentNode.removeChild(shape);
        }
    }, (duration + delay) * 1000); 
}

//cria uma nova forma a cada 3 segundos
setInterval(addFloatingShape, 3000);


//seção principal se mover mais devagar do que o resto da página para ficar agradavel visualmente
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset; 
    const hero = document.querySelector('.hero'); 
    const rate = scrolled * -0.5; 
    
    //aplicando o movimento
    hero.style.transform = `translateY(${rate}px)`;
});

//variáveis globais para o Three.js
let scene, camera, renderer, icosahedrons = [];

function initThree() {
    //onde os objetos 3D vão aparecer
    scene = new THREE.Scene();
    
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    
    renderer = new THREE.WebGLRenderer({ 
        canvas: document.getElementById('icosaedros'), 
        alpha: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);

    // 15 icosaedros
    for (let i = 0; i < 15; i++) {
        //forma do icosaedro
        const geometry = new THREE.IcosahedronGeometry(Math.random() * 2 + 1, 0);
        
        //cor e aparência do material
        const material = new THREE.MeshBasicMaterial({
            color: new THREE.Color().setHSL(Math.random(), 0.7, 0.5), 
            wireframe: true,   
            transparent: true,  
            opacity: 0.3       
        });
        
        const icosahedron = new THREE.Mesh(geometry, material);

        icosahedron.position.set(
            (Math.random() - 0.5) * 100, 
            (Math.random() - 0.5) * 100, 
            (Math.random() - 0.5) * 100  
        );

        icosahedron.rotation.set(
            Math.random() * Math.PI, 
            Math.random() * Math.PI, 
            Math.random() * Math.PI 
        );

        //adiciona o icosaedro 
        scene.add(icosahedron);
        icosahedrons.push(icosahedron);
    }
    camera.position.z = 30;
}
//função rodar continuamente para criar a animação
function animate() {
    requestAnimationFrame(animate);

    //animação icosaedros
    icosahedrons.forEach(icosahedron => {
       
        icosahedron.rotation.x += 0.005; 
        icosahedron.rotation.y += 0.005; 
        
        icosahedron.position.y += Math.sin(Date.now() * 0.001 + icosahedron.position.x) * 0.01;
    });

    renderer.render(scene, camera);
}
 
function handleResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    
   renderer.setSize(window.innerWidth, window.innerHeight);
}

initThree();  
animate();    
window.addEventListener('resize', handleResize); 