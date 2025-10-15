const canvas = document.getElementById('cyber-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 2 + 1;
    }
    
    update() {
        this.x += this.vx;
        this.y += this.vy;
        
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }
    
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#20c6e7ff';
        ctx.fill();
    }
}

class BinaryCode {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.speed = Math.random() * 0.5 + 0.2;
        this.text = Math.random() > 0.5 ? '1' : '0';
        this.opacity = Math.random() * 0.5 + 0.3;
    }
    
    update() {
        this.y += this.speed;
        if (this.y > canvas.height) {
            this.y = 0;
            this.x = Math.random() * canvas.width;
        }
    }
    
    draw() {
        ctx.font = '14px monospace';
        ctx.fillStyle = '#3b82f6';
        ctx.fillText(this.text, this.x, this.y);
    }
}

// Linhas de scan
class ScanLine {
    constructor() {
        this.y = Math.random() * canvas.height;
        this.speed = Math.random() * 2 + 1;
        this.opacity = Math.random() * 0.3 + 0.1;
    }
    
    update() {
        this.y += this.speed;
        if (this.y > canvas.height) this.y = 0;
    }
    
    draw() {
        ctx.beginPath();
        ctx.strokeStyle = "#20c6e7ff";
        ctx.lineWidth = 2;
        ctx.moveTo(0, this.y);
        ctx.lineTo(canvas.width, this.y);
        ctx.stroke();
    }
}

// Hexágonos
class Hexagon {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 30 + 20;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.01;
        this.opacity = Math.random() * 0.2 + 0.05;
    }
    
    update() {
        this.rotation += this.rotationSpeed;
    }
    
    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.beginPath();
        
        for (let i = 0; i < 6; i++) {
            const angle = (Math.PI / 3) * i;
            const x = this.size * Math.cos(angle);
            const y = this.size * Math.sin(angle);
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        
        ctx.closePath();
        ctx.strokeStyle = "#20c6e7ff";
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.restore();
    }
}

const particles = Array.from({length: 30}, () => new Particle());
const hexagons = Array.from({length: 5}, () => new Hexagon());

function connectParticles() {
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 150) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(59, 130, 246, ${0.2 * (1 - distance / 150)})`;
                ctx.lineWidth = 1;
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }
}

function animate() {
    ctx.fillStyle = 'rgba(15, 20, 25, 0.15)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    hexagons.forEach(hex => {
        hex.update();
        hex.draw();
    });
    
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    
    connectParticles();
    
    requestAnimationFrame(animate);
}

animate();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});