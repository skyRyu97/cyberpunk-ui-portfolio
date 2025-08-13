import './index.css';
    import React, { useState, useEffect, useRef, useCallback } from 'react';

    // --- Main App Component ---
    const App = () => {
        const [windows, setWindows] = useState([]);
        const [highestZIndex, setHighestZIndex] = useState(10);

        const playSound = (soundId) => {
            const sound = document.getElementById(soundId);
            if (sound) {
                sound.currentTime = 0;
                sound.play().catch(e => {});
            }
        };

        const addWindow = (item) => {
            playSound('click-sound');
            const newZIndex = highestZIndex + 1;
            setHighestZIndex(newZIndex);
            
            const newWindow = {
                id: Date.now(),
                title: item.title,
                contentType: item.contentType,
                content: item.content,
                embedUrl: item.embedUrl,
                zIndex: newZIndex,
                position: { 
                    top: Math.random() * (window.innerHeight - 500), 
                    left: Math.random() * (window.innerWidth - 800) 
                }
            };
            setWindows(prev => [...prev, newWindow]);
        };

        const closeWindow = (id) => {
            playSound('click-sound');
            setWindows(prev => prev.filter(w => w.id !== id));
        };

        const bringToFront = (id) => {
            const newZIndex = highestZIndex + 1;
            setHighestZIndex(newZIndex);
            setWindows(prev => prev.map(w => w.id === id ? { ...w, zIndex: newZIndex } : w));
        };

        return (
            <div className="bg-[#0d0d0d] text-[#00f0ff] font-mono min-h-screen flex justify-center items-center p-2 sm:p-4 md:p-8 relative overflow-hidden">
                <style>
                    {`
                        @keyframes scroll-left {
                            0% { transform: translateX(0%); }
                            100% { transform: translateX(-100%); }
                        }
                        .animate-scroll-left {
                            animation: scroll-left 25s linear infinite;
                        }
                    `}
                </style>
                <Scanlines />
                
                <div className="ui-container w-full max-w-7xl border-2 border-[#0ab6c2] p-2 shadow-[0_0_5px_#00f0ff,0_0_10px_#00f0ff,0_0_15px_#0ab6c2] animate-flicker flex flex-col">
                    <KeystoneBar />
                    <Header onSendMessageClick={() => addWindow({ title: "SECURE TRANSMISSION", contentType: 'form' })} />
                    <MainGrid onGridItemClick={addWindow} />
                    <FooterBar />
                </div>

                {windows.map(win => (
                    <MovableWindow 
                        key={win.id} 
                        window={win} 
                        onClose={closeWindow} 
                        onBringToFront={bringToFront} 
                    />
                ))}
                
                <audio id="hover-sound" src="MUSIC1" preload="auto"></audio>
                <audio id="click-sound" src="MUSIC2" preload="auto"></audio>
            </div>
        );
    };

    // --- UI Components ---

    const Scanlines = () => (
        <div 
            className="fixed inset-0 w-full h-full pointer-events-none z-[9999]"
            style={{ backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.4), rgba(0,0,0,0.4) 1px, transparent 1px, transparent 3px)' }}
        />
    );

    const KeystoneBar = () => (
        <div className="flex flex-wrap items-center border border-[#0ab6c2] p-2 md:p-3 mb-2 font-orbitron">
            <div className="font-bold text-lg md:text-xl lg:text-2xl pr-4">
                <span className="mr-2">&#x2327;</span>KEYSTONE
            </div>
            <div className="flex-grow overflow-hidden">
                <div className="text-[#aaa] font-mono whitespace-nowrap inline-block animate-scroll-left pl-[100%]">
                    //h++p://Gagandeep_Singh_Dandiwal
                </div>
            </div>
        </div>
    );

    const Header = ({ onSendMessageClick }) => (
        <header className="flex flex-wrap gap-2 mb-2">
            <div className="border border-[#0ab6c2] p-2 flex-grow min-w-[220px]">
                <div 
                    className="flex items-center font-orbitron font-bold cursor-pointer border border-[#ff1b1b] p-1.5 animate-pulse"
                    onClick={onSendMessageClick}
                >
                    <span className="w-4 h-4 md:w-5 md:h-5 bg-[#ff1b1b] mr-2 shadow-[0_0_5px_var(--bright-red)]"></span>
                    Send Message
                </div>
            </div>
            <div className="border border-[#0ab6c2] p-2 flex-grow min-w-[220px]">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 md:w-10 md:h-10 border-2 border-[#00f0ff] rounded-full"></div>
                    <span>UID: JX-808 // NET</span>
                </div>
            </div>
        </header>
    );

    const MainGrid = ({ onGridItemClick }) => {
        const gridItems = [
            { title: "About", content: "<p>This is the about section. Information about the project or individual can go here.</p>", icon: "about", color: "pink" },
            { title: "Links", content: "<p>Place your important links here.</p>", icon: "links", color: "pink" },
            { title: "Works", content: "<p>Showcase your projects and work here.</p>", icon: "works", color: "yellow" },
            { title: "FAQ", content: "<p>Frequently Asked Questions can be answered here.</p>", icon: "faq", color: "yellow" },
            { title: "Contact", content: "<p>Contact information or a contact form can be placed here.</p>", icon: "Contact", color: "cyan" },
            { title: "SamuraiWeb", contentType: "embed", embedUrl: "https://www.youtube.com/embed/videoseries?list=PL4dX1IHww9p1D3ZzW8J2fX6q1FP5av2No", icon: "SamuraiWeb", color: "cyan" },
            { title: "PING TEST", contentType: "utility", icon: "PING TEST", color: "white" },
            { title: "AIM-TRAIN", contentType: "game", icon: "AIM-TRAIN", color: "orange" },
            { title: "JUMPY boi", contentType: "game", icon: "JUMPY boi", color: "blue" },
            { title: "FLAP-E", contentType: "game", icon: "FLAP-E", color: "yellow-fz" },
            { title: "DINO", contentType: "game", icon: "DINO", color: "red-f" },
            { title: "FatSnake", contentType: "game", icon: "FatSnake", color: "red-a" },
        ];
        
        const playSound = (soundId) => {
            const sound = document.getElementById(soundId);
            if (sound) {
                sound.currentTime = 0;
                sound.play().catch(e => {});
            }
        };

        return (
            <main className="border border-[#0ab6c2] p-2 flex-grow">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 md:gap-4 h-full">
                    {gridItems.map(item => (
                        <div 
                            key={item.title}
                            className={`grid-item bg-[#1a1a1a] border border-[#333] aspect-square flex flex-col justify-center items-center text-center cursor-pointer transition-all duration-200 hover:bg-[#2a2a2a] hover:border-[#00f0ff] hover:scale-105`}
                            onClick={() => onGridItemClick(item)}
                            onMouseOver={() => playSound('hover-sound')}
                        >
                            <div className={`icon-logo w-3/5 h-3/5 flex justify-center items-center font-orbitron text-2xl font-bold logo-${item.color}`}>
                                {/* ICON: {item.icon} */}
                            </div>
                            <p className="mt-2 text-xs uppercase">{item.title}</p>
                        </div>
                    ))}
                </div>
            </main>
        );
    };

    const FooterBar = () => (
        <div className="flex items-center border border-[#0ab6c2] p-1.5 mt-2 font-orbitron text-lg">
            <div className="flex gap-4">
                {/* INSTA ICON */}
                <a href="#" className="hover:text-white">Insta</a>
                {/* TWITTER ICON */}
                <a href="#" className="hover:text-white">Twitter</a>
            </div>
            <div className="flex-grow"></div>
            <div className="text-sm font-mono">
                <a href="#" className="hover:text-white">LINKS</a>
            </div>
        </div>
    );

    // --- Window & Content Components ---

    const MovableWindow = ({ window: win, onClose, onBringToFront }) => {
        const [position, setPosition] = useState(win.position);
        const [isDragging, setIsDragging] = useState(false);
        const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
        const windowRef = useRef(null);

        const handleMouseDown = (e) => {
            onBringToFront(win.id);
            setIsDragging(true);
            setDragStart({
                x: e.clientX - position.left,
                y: e.clientY - position.top
            });
        };

        const handleMouseMove = useCallback((e) => {
            if (isDragging) {
                setPosition({
                    top: e.clientY - dragStart.y,
                    left: e.clientX - dragStart.x
                });
            }
        }, [isDragging, dragStart]);

        const handleMouseUp = useCallback(() => {
            setIsDragging(false);
        }, []);

        useEffect(() => {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
            return () => {
                document.removeEventListener('mousemove', handleMouseMove);
                document.removeEventListener('mouseup', handleMouseUp);
            };
        }, [handleMouseMove, handleMouseUp]);

        const renderContent = () => {
            switch (win.contentType) {
                case 'form': return <MessageForm />;
                case 'embed': return <EmbeddedContent url={win.embedUrl} />;
                case 'utility':
                    if (win.title === 'PING TEST') return <PingTester />;
                    return null;
                case 'game':
                    if (win.title === 'DINO') return <DinoGame />;
                    if (win.title === 'FatSnake') return <SnakeGame />;
                    if (win.title === 'FLAP-E') return <FlappyBirdGame />;
                    if (win.title === 'JUMPY boi') return <PlatformerGame />;
                    if (win.title === 'AIM-TRAIN') return <AimTrainGame />;
                    return null;
                default: return <div dangerouslySetInnerHTML={{ __html: win.content }} />;
            }
        };

        return (
            <div
                ref={windowRef}
                className="movable-window absolute bg-[#0d0d0d] border-2 border-[#00f0ff] w-[90%] max-w-[800px] shadow-[0_0_5px_#00f0ff,0_0_10px_#00f0ff,0_0_15px_#0ab6c2] flex flex-col"
                style={{ top: `${position.top}px`, left: `${position.left}px`, zIndex: win.zIndex }}
                onMouseDown={() => onBringToFront(win.id)}
            >
                <div
                    className="window-header bg-[#0ab6c2] text-[#0d0d0d] p-1.5 cursor-move flex justify-between items-center font-orbitron font-bold"
                    onMouseDown={handleMouseDown}
                >
                    <span>{win.title}</span>
                    <span className="text-2xl text-[#ff1b1b] cursor-pointer px-2 hover:text-white" onClick={() => onClose(win.id)}>&times;</span>
                </div>
                <div className="window-body p-4 overflow-y-auto">
                    {renderContent()}
                </div>
            </div>
        );
    };

    const MessageForm = () => {
        const handleSubmit = (e) => {
            e.preventDefault();
            const recipientEmail = 'gagandeepsinghdandiwal@example.com';
            const subject = encodeURIComponent(e.target.subject.value);
            const message = encodeURIComponent(e.target.message.value);
            window.location.href = `mailto:${recipientEmail}?subject=${subject}&body=${message}`;
        };
        return (
            <form onSubmit={handleSubmit} className="message-form">
                <label htmlFor="subject" className="block mb-1 font-orbitron">SUBJECT:</label>
                <input type="text" id="subject" name="subject" required className="w-full bg-[#0a192f] border border-[#0ab6c2] text-[#00f0ff] p-2 mb-4 font-mono" />
                <label htmlFor="message" className="block mb-1 font-orbitron">MESSAGE:</label>
                <textarea id="message" name="message" required className="w-full bg-[#0a192f] border border-[#0ab6c2] text-[#00f0ff] p-2 mb-4 font-mono min-h-[150px] resize-vertical"></textarea>
                <button type="submit" className="bg-[#ff1b1b] border-none text-white font-orbitron p-2 px-4 cursor-pointer transition-all duration-300 uppercase hover:bg-white hover:text-[#ff1b1b]">SEND TRANSMISSION</button>
            </form>
        );
    };

    const EmbeddedContent = ({ url }) => (
        <iframe src={url} width="100%" height="450" style={{ border: 'none' }} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
    );

    // --- FULL GAME & UTILITY COMPONENTS ---

    const PingTester = () => {
        const [isTesting, setIsTesting] = useState(false);
        const [pingResult, setPingResult] = useState('> STANDBY');
        const intervalRef = useRef(null);

        const measureLatency = () => {
            return new Promise((resolve) => {
                const img = new Image();
                const startTime = Date.now();
                img.onload = () => resolve(Date.now() - startTime);
                img.onerror = () => resolve(-1);
                img.src = `https://via.placeholder.com/1.png?t=${Date.now()}`;
            });
        };

        const toggleTest = () => {
            if (!isTesting) {
                setIsTesting(true);
                setPingResult('> Establishing connection...');
                intervalRef.current = setInterval(async () => {
                    const ping = await measureLatency();
                    setPingResult(ping !== -1 ? `SAFE HOUSE PING : ${ping}ms` : `SAFE HOUSE PING : FAILED`);
                }, 1000);
            } else {
                setIsTesting(false);
                clearInterval(intervalRef.current);
                setPingResult(prev => prev + '\n> Connection terminated.');
            }
        };

        useEffect(() => {
            return () => clearInterval(intervalRef.current);
        }, []);

        return (
            <div>
                <div className="ping-results h-[300px] bg-[#0a192f] p-2 overflow-y-auto border border-[#0ab6c2] mb-4">
                    <p className="whitespace-pre-wrap">{pingResult}</p>
                </div>
                <button className="game-start-btn" onClick={toggleTest}>
                    {isTesting ? 'STOP PING TEST' : 'START PING TEST'}
                </button>
            </div>
        );
    };

    const GameWrapper = ({ gameLogic, buttonText }) => {
        const canvasRef = useRef(null);
        const startBtnRef = useRef(null);

        useEffect(() => {
            const canvas = canvasRef.current;
            const startBtn = startBtnRef.current;
            const cleanup = gameLogic(canvas, startBtn);
            return () => {
                if (cleanup) cleanup();
            };
        }, [gameLogic]);

        return (
            <div>
                <canvas ref={canvasRef} width="780" height="400" className="game-canvas w-full bg-[#0a192f]"></canvas>
                <button ref={startBtnRef} className="game-start-btn">
                    {buttonText}
                </button>
            </div>
        );
    };

    const DinoGame = () => <GameWrapper gameLogic={initializeDinoGame} buttonText="START DIAGNOSTIC" />;
    const SnakeGame = () => <GameWrapper gameLogic={initializeSnakeGame} buttonText="INITIALIZE DEFRAG" />;
    const FlappyBirdGame = () => <GameWrapper gameLogic={initializeFlappyBirdGame} buttonText="CALIBRATE WINGS" />;
    const PlatformerGame = () => <GameWrapper gameLogic={initializePlatformerGame} buttonText="INITIATE ASCENT" />;
    const AimTrainGame = () => <GameWrapper gameLogic={initializeAimTrainGame} buttonText="START REFLEX TEST" />;


    // --- VANILLA JS GAME LOGIC (for encapsulation in React components) ---

    function initializeDinoGame(canvas, startBtn) {
        const ctx = canvas.getContext('2d'); let score, player, gravity, obstacles, gameSpeed; let isGameRunning = false; let animationFrameId;
        const playerProps = { x: 50, y: canvas.height - 40, width: 20, height: 20, dy: 0, jumpForce: 7, groundY: canvas.height - 40, draw() { ctx.fillStyle = 'var(--bright-yellow)'; ctx.fillRect(this.x, this.y, this.width, this.height); }, jump() { if (this.y === this.groundY) { this.dy = -this.jumpForce; } }, update() { this.dy += gravity; this.y += this.dy; if (this.y > this.groundY) { this.y = this.groundY; this.dy = 0; } this.draw(); } };
        class Obstacle { constructor() { this.width = 10 + Math.random() * 20; this.height = 15 + Math.random() * 25; this.x = canvas.width; this.y = canvas.height - this.height - 20; } draw() { ctx.fillStyle = 'var(--hot-pink)'; ctx.fillRect(this.x, this.y, this.width, this.height); } update() { this.x -= gameSpeed; this.draw(); } }
        function spawnObstacle() { obstacles.push(new Obstacle()); }
        function startGame() { isGameRunning = true; startBtn.style.display = 'none'; score = 0; gameSpeed = 3; gravity = 0.4; obstacles = []; player = { ...playerProps }; setTimeout(spawnObstacle, 1000); updateGame(); }
        function updateGame() { if (!isGameRunning) return; animationFrameId = requestAnimationFrame(updateGame); ctx.clearRect(0, 0, canvas.width, canvas.height); ctx.strokeStyle = 'var(--dark-teal)'; ctx.beginPath(); ctx.moveTo(0, canvas.height - 20); ctx.lineTo(canvas.width, canvas.height - 20); ctx.stroke(); player.update(); if (Math.random() < 0.02 && obstacles.length < 3 && (!obstacles.length || (canvas.width - obstacles[obstacles.length-1].x > 200))) spawnObstacle(); obstacles.forEach((obs, i) => { obs.update(); if (player.x < obs.x + obs.width && player.x + player.width > obs.x && player.y < obs.y + obs.height && player.y + player.height > obs.y) endGame(); if (obs.x + obs.width < 0) { obstacles.splice(i, 1); score++; gameSpeed += 0.1; } }); ctx.fillStyle = 'var(--main-teal)'; ctx.font = "16px 'Share Tech Mono'"; ctx.fillText(`DIAGNOSTIC SCORE: ${score}`, 10, 20); }
        function endGame() { isGameRunning = false; cancelAnimationFrame(animationFrameId); ctx.fillStyle = 'var(--bright-red)'; ctx.font = "30px 'Orbitron'"; ctx.textAlign = 'center'; ctx.fillText('SYSTEM FAILURE', canvas.width / 2, canvas.height / 2 - 20); ctx.font = "16px 'Share Tech Mono'"; ctx.fillText(`FINAL SCORE: ${score}`, canvas.width / 2, canvas.height / 2 + 10); ctx.fillText('CLICK RESTART BELOW', canvas.width / 2, canvas.height / 2 + 40); ctx.textAlign = 'left'; startBtn.textContent = 'RESTART DIAGNOSTIC'; startBtn.style.display = 'block'; }
        const jumpHandler = e => { if (e.code === 'Space') player.jump(); };
        const touchHandler = e => { e.preventDefault(); player.jump(); };
        document.addEventListener('keydown', jumpHandler);
        canvas.addEventListener('touchstart', touchHandler);
        canvas.addEventListener('mousedown', touchHandler);
        startBtn.addEventListener('click', startGame);
        return () => { document.removeEventListener('keydown', jumpHandler); canvas.removeEventListener('touchstart', touchHandler); canvas.removeEventListener('mousedown', touchHandler); cancelAnimationFrame(animationFrameId); };
    }
    function initializeSnakeGame(canvas, startBtn) {
        const ctx = canvas.getContext('2d'); const gridSize = 20; let snake, food, score, dx, dy, isGameRunning, gameLoop;
        function startGame() { isGameRunning = true; startBtn.style.display = 'none'; snake = [{ x: 8 * gridSize, y: 8 * gridSize }]; dx = gridSize; dy = 0; score = 0; generateFood(); gameLoop = setInterval(updateGame, 150); }
        function updateGame() { if (!isGameRunning) return; const head = { x: snake[0].x + dx, y: snake[0].y + dy }; snake.unshift(head); if (checkCollision()) { endGame(); return; } if (head.x === food.x && head.y === food.y) { score++; generateFood(); } else { snake.pop(); } draw(); }
        function draw() { ctx.clearRect(0, 0, canvas.width, canvas.height); snake.forEach((segment, index) => { ctx.fillStyle = index === 0 ? 'var(--bright-yellow)' : 'var(--main-teal)'; ctx.fillRect(segment.x, segment.y, gridSize, gridSize); ctx.strokeStyle = 'var(--dark-teal)'; ctx.strokeRect(segment.x, segment.y, gridSize, gridSize); }); ctx.fillStyle = 'var(--hot-pink)'; ctx.fillRect(food.x, food.y, gridSize, gridSize); ctx.fillStyle = 'var(--main-teal)'; ctx.font = "16px 'Share Tech Mono'"; ctx.fillText(`FRAGMENTS: ${score}`, 10, 20); }
        function generateFood() { food = { x: Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize, y: Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize }; if (snake.some(segment => segment.x === food.x && segment.y === food.y)) { generateFood(); } }
        function changeDirection(e) { const keyPressed = e.keyCode; const goingUp = dy === -gridSize; const goingDown = dy === gridSize; const goingRight = dx === gridSize; const goingLeft = dx === -gridSize; if (keyPressed === 37 && !goingRight) { dx = -gridSize; dy = 0; } if (keyPressed === 38 && !goingDown) { dx = 0; dy = -gridSize; } if (keyPressed === 39 && !goingLeft) { dx = gridSize; dy = 0; } if (keyPressed === 40 && !goingUp) { dx = 0; dy = gridSize; } }
        function checkCollision() { const head = snake[0]; if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) return true; for (let i = 4; i < snake.length; i++) { if (snake[i].x === head.x && snake[i].y === head.y) return true; } return false; }
        function endGame() { isGameRunning = false; clearInterval(gameLoop); ctx.fillStyle = 'var(--bright-red)'; ctx.font = "30px 'Orbitron'"; ctx.textAlign = 'center'; ctx.fillText('DEFRAG FAILED', canvas.width / 2, canvas.height / 2 - 20); ctx.font = "16px 'Share Tech Mono'"; ctx.fillText(`FRAGMENTS COLLECTED: ${score}`, canvas.width / 2, canvas.height / 2 + 10); ctx.textAlign = 'left'; startBtn.textContent = 'RE-INITIALIZE'; startBtn.style.display = 'block'; }
        document.addEventListener('keydown', changeDirection);
        startBtn.addEventListener('click', startGame);
        return () => { document.removeEventListener('keydown', changeDirection); clearInterval(gameLoop); };
    }
    function initializeFlappyBirdGame(canvas, startBtn) {
        const ctx = canvas.getContext('2d'); let bird, pipes, score, isGameRunning, gameLoop; const gravity = 0.2; const pipeSpeed = 2; const pipeGap = 120;
        const birdProps = { x: 50, y: canvas.height / 2, width: 20, height: 20, velocity: 0, draw() { ctx.fillStyle = 'var(--bright-yellow)'; ctx.fillRect(this.x, this.y, this.width, this.height); }, jump() { this.velocity = -5; }, update() { this.velocity += gravity; this.y += this.velocity; this.draw(); } };
        class Pipe { constructor() { this.width = 30; this.x = canvas.width; this.y = Math.random() * (canvas.height - pipeGap - 40) + 20; } draw() { ctx.fillStyle = 'var(--hot-pink)'; ctx.fillRect(this.x, 0, this.width, this.y); ctx.fillRect(this.x, this.y + pipeGap, this.width, canvas.height - this.y - pipeGap); } update() { this.x -= pipeSpeed; this.draw(); } }
        function startGame() { isGameRunning = true; startBtn.style.display = 'none'; bird = { ...birdProps }; pipes = []; score = 0; spawnPipe(); gameLoop = setInterval(updateGame, 20); }
        function updateGame() { if (!isGameRunning) return; ctx.clearRect(0, 0, canvas.width, canvas.height); bird.update(); if (bird.y + bird.height > canvas.height || bird.y < 0) { endGame(); return; } if (pipes.length > 0 && pipes[0].x < -pipes[0].width) { pipes.shift(); score++; } if (pipes.length === 0 || pipes[pipes.length - 1].x < canvas.width - 300) { spawnPipe(); } pipes.forEach(pipe => { pipe.update(); if (bird.x < pipe.x + pipe.width && bird.x + bird.width > pipe.x && (bird.y < pipe.y || bird.y + bird.height > pipe.y + pipeGap)) { endGame(); } }); ctx.fillStyle = 'var(--main-teal)'; ctx.font = "16px 'Share Tech Mono'"; ctx.fillText(`SCORE: ${score}`, 10, 20); }
        function spawnPipe() { pipes.push(new Pipe()); }
        function endGame() { isGameRunning = false; clearInterval(gameLoop); ctx.fillStyle = 'var(--bright-red)'; ctx.font = "30px 'Orbitron'"; ctx.textAlign = 'center'; ctx.fillText('CALIBRATION FAILED', canvas.width / 2, canvas.height / 2 - 20); ctx.font = "16px 'Share Tech Mono'"; ctx.fillText(`FINAL SCORE: ${score}`, canvas.width / 2, canvas.height / 2 + 10); ctx.textAlign = 'left'; startBtn.textContent = 'RE-CALIBRATE'; startBtn.style.display = 'block'; }
        const jumpHandler = e => { if (e.code === 'Space') bird.jump(); };
        document.addEventListener('keydown', jumpHandler);
        canvas.addEventListener('touchstart', e => { e.preventDefault(); bird.jump(); });
        canvas.addEventListener('mousedown', e => { e.preventDefault(); bird.jump(); });
        startBtn.addEventListener('click', startGame);
        return () => { document.removeEventListener('keydown', jumpHandler); clearInterval(gameLoop); };
    }
    function initializePlatformerGame(canvas, startBtn) {
        const ctx = canvas.getContext('2d'); let player, platforms, score, isGameRunning, gameLoop, keys = {}; const gravity = 0.4; const playerSpeed = 4; const jumpForce = 10;
        const playerProps = { x: canvas.width / 2, y: canvas.height - 20, width: 20, height: 20, dx: 0, dy: 0, onGround: false, draw() { ctx.fillStyle = 'var(--bright-yellow)'; ctx.fillRect(this.x, this.y, this.width, this.height); }, update() { if (keys[37]) this.dx = -playerSpeed; else if (keys[39]) this.dx = playerSpeed; else this.dx = 0; this.dy += gravity; this.x += this.dx; this.y += this.dy; this.onGround = false; if (this.x < 0) this.x = 0; if (this.x + this.width > canvas.width) this.x = canvas.width - this.width; } };
        class Platform { constructor(x, y, width = 70) { this.x = x; this.y = y; this.width = width; this.height = 10; } draw() { ctx.fillStyle = 'var(--main-teal)'; ctx.fillRect(this.x, this.y, this.width, this.height); } }
        function startGame() { isGameRunning = true; startBtn.style.display = 'none'; score = 0; player = { ...playerProps }; platforms = [new Platform(canvas.width / 2 - 35, canvas.height - 10)]; for (let i = 1; i < 10; i++) { platforms.push(new Platform(Math.random() * (canvas.width - 70), platforms[i-1].y - 80)); } gameLoop = setInterval(updateGame, 20); }
        function updateGame() { if (!isGameRunning) return; ctx.clearRect(0, 0, canvas.width, canvas.height); player.update(); platforms.forEach(platform => { platform.draw(); if (player.dy > 0 && player.x < platform.x + platform.width && player.x + player.width > platform.x && player.y + player.height > platform.y && player.y + player.height < platform.y + platform.height + 10) { player.onGround = true; player.dy = 0; player.y = platform.y - player.height; } }); if (player.y > canvas.height) { endGame(); return; } if (player.y < canvas.height / 2) { platforms.forEach(p => { p.y -= player.dy; }); player.y -= player.dy; score += 1; if (platforms[0].y > canvas.height) { platforms.shift(); platforms.push(new Platform(Math.random() * (canvas.width - 70), platforms[platforms.length-1].y - 80)); } } player.draw(); ctx.fillStyle = 'var(--main-teal)'; ctx.font = "16px 'Share Tech Mono'"; ctx.fillText(`ALTITUDE: ${Math.floor(score / 10)}m`, 10, 20); }
        function endGame() { isGameRunning = false; clearInterval(gameLoop); ctx.fillStyle = 'var(--bright-red)'; ctx.font = "30px 'Orbitron'"; ctx.textAlign = 'center'; ctx.fillText('CONNECTION LOST', canvas.width / 2, canvas.height / 2 - 20); ctx.font = "16px 'Share Tech Mono'"; ctx.fillText(`MAX ALTITUDE: ${Math.floor(score / 10)}m`, canvas.width / 2, canvas.height / 2 + 10); ctx.textAlign = 'left'; startBtn.textContent = 'RE-ASCEND'; startBtn.style.display = 'block'; }
        const keydownHandler = e => { keys[e.keyCode] = true; if (e.keyCode === 38 && player.onGround) player.dy = -jumpForce; };
        const keyupHandler = e => { keys[e.keyCode] = false; };
        document.addEventListener('keydown', keydownHandler);
        document.addEventListener('keyup', keyupHandler);
        startBtn.addEventListener('click', startGame);
        return () => { document.removeEventListener('keydown', keydownHandler); document.removeEventListener('keyup', keyupHandler); clearInterval(gameLoop); };
    }
    function initializeAimTrainGame(canvas, startBtn) {
        const ctx = canvas.getContext('2d'); let score, misses, targets, isGameRunning, spawnInterval, gameLoop; const maxTargets = 15; let targetsSpawned = 0;
        class Target { constructor() { this.radius = 15; this.x = Math.random() * (canvas.width - this.radius * 2) + this.radius; this.y = Math.random() * (canvas.height - this.radius * 2) + this.radius; this.createdAt = Date.now(); this.lifetime = 2000; } draw() { ctx.fillStyle = 'var(--hot-pink)'; ctx.beginPath(); ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2); ctx.fill(); } isClicked(mouseX, mouseY) { const distance = Math.sqrt((mouseX - this.x)**2 + (mouseY - this.y)**2); return distance < this.radius; } }
        function startGame() { isGameRunning = true; startBtn.style.display = 'none'; score = 0; misses = 0; targets = []; targetsSpawned = 0; gameLoop = requestAnimationFrame(updateGame); spawnInterval = setInterval(spawnTarget, 800); }
        function clickHandler(e) { if (!isGameRunning) return; const rect = canvas.getBoundingClientRect(); const mouseX = e.clientX - rect.left; const mouseY = e.clientY - rect.top; let clicked = false; for (let i = targets.length - 1; i >= 0; i--) { if (targets[i].isClicked(mouseX, mouseY)) { targets.splice(i, 1); score++; clicked = true; break; } } if (!clicked) misses++; }
        function spawnTarget() { if (targetsSpawned >= maxTargets) { clearInterval(spawnInterval); return; } targets.push(new Target()); targetsSpawned++; }
        function updateGame() { if (!isGameRunning) return; ctx.clearRect(0, 0, canvas.width, canvas.height); const now = Date.now(); for (let i = targets.length - 1; i >= 0; i--) { if (now - targets[i].createdAt > targets[i].lifetime) { targets.splice(i, 1); misses++; } else { targets[i].draw(); } } if (misses >= 3 || (targetsSpawned >= maxTargets && targets.length === 0)) { endGame(); return; } ctx.fillStyle = 'var(--main-teal)'; ctx.font = "16px 'Share Tech Mono'"; ctx.fillText(`SCORE: ${score}`, 10, 20); ctx.fillStyle = 'var(--bright-red)'; ctx.fillText(`MISSES: ${misses}/3`, 10, 40); animationFrameId = requestAnimationFrame(updateGame); }
        function endGame() { isGameRunning = false; clearInterval(spawnInterval); cancelAnimationFrame(animationFrameId); ctx.fillStyle = 'var(--bright-red)'; ctx.font = "30px 'Orbitron'"; ctx.textAlign = 'center'; ctx.fillText('TEST COMPLETE', canvas.width / 2, canvas.height / 2 - 20); ctx.font = "16px 'Share Tech Mono'"; ctx.fillText(`FINAL SCORE: ${score}`, canvas.width / 2, canvas.height / 2 + 10); ctx.textAlign = 'left'; startBtn.textContent = 'RE-TEST'; startBtn.style.display = 'block'; }
        canvas.addEventListener('click', clickHandler);
        startBtn.addEventListener('click', startGame);
        let animationFrameId;
        return () => { canvas.removeEventListener('click', clickHandler); clearInterval(spawnInterval); cancelAnimationFrame(animationFrameId); };
    }

    export default App;
