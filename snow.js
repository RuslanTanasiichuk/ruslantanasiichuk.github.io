function start(cont){
    //animation parameters
    let fps = cont.fps || 35;
    let density = cont.density || 65;
    let speedY = cont.speedY || 13;
    let speedX = cont.speedX || 2;
    let sizeSnowFlake = cont.sizeSnowFlake || 13;
    let opacity = cont.opacity || 0.8;
    let colorRGB = cont.colorRGB || {r:205, g:209, g:223};
    /*----------------------------------*/
    let canvas = document.createElement('canvas');
    canvas.width = window.innerWidth;
    canvas.height = Math.max(
        document.body.scrollHeight, document.documentElement.scrollHeight,
        document.body.offsetHeight, document.documentElement.offsetHeight,
        document.body.clientHeight, document.documentElement.clientHeight
    );
    document.body.appendChild(canvas);
    canvas.style.width = '100%';
    canvas.style.position = 'absolute';
    canvas.style.top = '0px';
    canvas.style.left = '0px';
    canvas.style.zIndex = "1000";
    canvas.style.pointerEvents = 'none';
    let ctx = canvas.getContext("2d");

    function rand(min, max){
        return Math.random() * (max - min) + min;
    }
    function SnowFlake(s){
        this.radius = s.radius;
        this.x = s.x;
        this.y = s.y;
        this.vx = s.vx;
        this.vy = s.vy;
    }
    let randRad;
    let snowFlakes = new Array(Math.floor(canvas.width * canvas.height / 307200 * density));
    for(let i = 0; i<snowFlakes.length; i++){
        snowFlakes[i] = new SnowFlake({
            radius: randRad = rand(sizeSnowFlake * 0.2, sizeSnowFlake * 0.8),
            x: rand(randRad, canvas.width - 2 * randRad),
            y: rand(randRad, canvas.height - 2 * randRad),
            vx: rand(-3, 3),
            vy: rand(-3, 3),
        });
    }

    ctx.fillStyle = `rgba(${colorRGB.r}, ${colorRGB.g}, ${colorRGB.b}, ${opacity})`;
    function show(){
        let now = +new Date();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        snowFlakes.forEach((item) => {
            item.date = item.date || now;
            let diff = now - item.date;
            item.x += (speedX + item.vx) * diff * 0.002;
            item.x += (item.x <= 0 ? 1 : 0) * canvas.width;
            item.x -= ~~(item.x / canvas.width) * canvas.width;
            item.y += (speedY + item.vy + item.radius) * diff * 0.002;
            item.y -= ~~(item.y / canvas.height) * (canvas.height + item.radius);
            item.vx += rand(-0.022, 0.022);
            item.vy += rand(-0.022, 0.022);

            ctx.beginPath();
            ctx.arc(item.x, item.y, item.radius, 0, 2 * Math.PI, !1);
            ctx.fill();
            item.date = now;
        });
        setTimeout(show, 1000/fps);
    }
    show();
}
