const canvas = document.getElementById("starBackground");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");

let  TOTAL_POINTS = 50;
let  CONNECT_DISTANCE = 100;




const points = [];

var mouseX;
var mouseY;

window.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

const drawPoint = (point) => {
  ctx.beginPath();
  ctx.arc(point.x, point.y, 2, 0, 2 * Math.PI);
  ctx.fillStyle = "white";
  ctx.fill();
};

const movePoint = (point) => {
  point.x += point.s * Math.cos(point.a);

  point.y += point.s * Math.sin(point.a);
};

const distance = (p1, p2) => {
  return Math.sqrt((p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2);
};

const drawline = (p1, p2, d) => {
  ctx.beginPath();
  ctx.moveTo(p1.x, p1.y);
  ctx.lineTo(p2.x, p2.y);
  // ctx.strokeStyle = `rgba(86, 224, 250, ${Math.abs(d / CONNECT_DISTANCE - 1)})`;
  ctx.strokeStyle = "white"
  ctx.stroke();
};

const removeOutPoint = (point) => {
  if (
    point.x < 0 ||
    point.x > canvas.width ||
    point.y < 0 ||
    point.y > canvas.height
  ) {
    points.splice(points.indexOf(point), 1);
  }
};

const loop = () => {
  window.requestAnimationFrame(loop);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  while (points.length < TOTAL_POINTS) {
    points.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      a: Math.random() * 360,
      s: 0.5,
    });
  }

  points.forEach((point) => {
    drawPoint(point);
    movePoint(point);
    removeOutPoint(point);
  });

  points.forEach((point) => {
    points.forEach((point2) => {
      const d = distance(point, point2);
      if (d < CONNECT_DISTANCE) {
        drawline(point, point2, d);
      }
    });
  });

  points.forEach((point) => {
    const d = distance(point, { x: mouseX, y: mouseY });
    if (d < CONNECT_DISTANCE) {
      drawline(point, { x: mouseX, y: mouseY }, d);
    }
  });

};

loop();
