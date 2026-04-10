const canvas = document.getElementById('particle-portrait');
let ww = window.innerWidth;
let wh = window.innerHeight;

const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
renderer.setSize(ww, wh);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const scene = new THREE.Scene();

// 略微俯视的视角，打造宏大的背景空间感
const camera = new THREE.PerspectiveCamera(60, ww / wh, 1, 5000);
camera.position.z = 900; 
camera.position.y = 150;
camera.lookAt(0, 0, 0);

// 柔和但更明亮的白色尘埃辉光贴图
const texCanvas = document.createElement('canvas');
texCanvas.width = 64; 
texCanvas.height = 64;
const ctx = texCanvas.getContext('2d');
const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
gradient.addColorStop(0, 'rgba(255, 255, 255, 1.0)');       
gradient.addColorStop(0.2, 'rgba(255, 255, 255, 0.7)');   
gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.2)');  
gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
ctx.fillStyle = gradient;
ctx.fillRect(0, 0, 64, 64);
const particleTexture = new THREE.CanvasTexture(texCanvas);

// 创建一个包含了所有粒子的总容器，方便统一做视差移动和旋转
const particleGroup = new THREE.Group();
scene.add(particleGroup);

// ==========================================
// 1. [主星系]：绝美璇涡状宇宙星云 (Spiral Galaxy)
// ==========================================
const DISK_COUNT = 16000;
const diskGeometry = new THREE.BufferGeometry();
const diskPositions = new Float32Array(DISK_COUNT * 3);

// 强化漩涡的骨架：减少分支数到3或4，加大扭曲率，让漩涡痕迹更锐利
const branches = 3; 
const spin = 0.0035; 

for(let i = 0; i < DISK_COUNT; i++) {
    // 拉开核心向外扩展的幂次，让星点更多地聚焦在旋臂线条上
    const radius = Math.pow(Math.random(), 1.8) * 2200; 
    
    // 计算旋臂的角度位置，加上扭曲偏转
    const branchAngle = ((i % branches) / branches) * Math.PI * 2;
    const spinAngle = radius * spin;

    // ======== 核心！散落分布收紧 ======== 
    // 让散落在旋臂周围的粒子呈3次方衰减（极少数散得远，绝大多数死死贴住旋臂骨架），这样麻花状扭曲就会极其显眼
    const spreadMultiplier = 30 + radius * 0.12; 
    const randomX = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * spreadMultiplier;
    // Y轴(厚度)拍得更扁，强调圆盘旋涡结构
    const randomY = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * (20 + radius * 0.03); 
    const randomZ = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * spreadMultiplier;

    // X, Z平面计算圆周运动坐标
    diskPositions[i*3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
    diskPositions[i*3 + 1] = randomY;
    diskPositions[i*3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;
}
diskGeometry.setAttribute('position', new THREE.BufferAttribute(diskPositions, 3));

const diskMaterial = new THREE.PointsMaterial({
    // 稍微缩小一点单体体积，这样线条结构会清晰很多，不会糊成一团
    size: ww < 768 ? 5 : 12, 
    map: particleTexture,
    transparent: true,
    opacity: 1.0, 
    blending: THREE.AdditiveBlending,
    depthWrite: false 
});

const diskMesh = new THREE.Points(diskGeometry, diskMaterial);
particleGroup.add(diskMesh);


// ==========================================
// 2. [夜空散星]：数量大增，遍布整个深空（保留给滑到页底时做背景）
// ==========================================
const STAR_COUNT = 4500;
const starGeometry = new THREE.BufferGeometry();
const starPositions = new Float32Array(STAR_COUNT * 3);

for(let i = 0; i < STAR_COUNT; i++) {
    // Y轴打得极高极深，半径扩展极大，完全充满视口和上下游空间
    const radius = 300 + Math.random() * 3200; 
    const theta = Math.random() * Math.PI * 2;
    const y = (Math.random() - 0.5) * 3500; 

    starPositions[i*3] = radius * Math.cos(theta);
    starPositions[i*3 + 1] = y;
    starPositions[i*3 + 2] = radius * Math.sin(theta);
}
starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));

const starMaterial = new THREE.PointsMaterial({
    size: ww < 768 ? 5 : 10, 
    map: particleTexture,
    transparent: true,
    opacity: 0.85, // 偏亮，让后面的星星非常有存在感
    blending: THREE.AdditiveBlending,
    depthWrite: false 
});

const starMesh = new THREE.Points(starGeometry, starMaterial);
particleGroup.add(starMesh);


// 让整个宇宙带有一点自然的透视倾斜，使得看漩涡的角度更立体
particleGroup.rotation.x = 0.5; 
particleGroup.position.y = -50; 

let targetScroll = 0;
let currentScroll = 0;
window.addEventListener('scroll', () => { targetScroll = window.scrollY; });
window.addEventListener('wheel', (e) => { 
    targetScroll += e.deltaY; 
    if(targetScroll < 0) targetScroll = 0; 
});

// ==== 动画渲染 ====
function animate() {
    requestAnimationFrame(animate);
    
    // 整体星云缓慢自转，展示旋臂骨架
    particleGroup.rotation.y -= 0.0008;

    currentScroll += (targetScroll - currentScroll) * 0.05;
    
    // ======== 渐隐控制 ========

    // 1. 主旋涡星云 (Spiral Galaxy): 在滑到深处时依然干净地消失，不干涉正文结构
    let diskFade = Math.max(0.0, 1.0 - (currentScroll / wh));
    diskMaterial.opacity = diskFade;

    // 2. 深空繁星 (Scattered Stars): 下滑时透明度衰减阀值提高到 0.55！加上原本基数很大，确保滑动到底部夜空依然闪亮生动
    let starFade = Math.max(0.55, 0.85 - (currentScroll / (wh * 1.5)) * 0.3);
    starMaterial.opacity = starFade;

    // 3. 空间沉浸感 (Parallax)
    particleGroup.position.y = -50 + currentScroll * 0.25; 
    let scaleVal = 1 + (currentScroll * 0.00012);
    particleGroup.scale.set(scaleVal, scaleVal, scaleVal);

    renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
    ww = window.innerWidth;
    wh = window.innerHeight;
    camera.aspect = ww / wh;
    camera.updateProjectionMatrix();
    renderer.setSize(ww, wh);
});
