let x = 0;
let alpha = 0;

let angulox = 0;
let anguloy = 0;
let anguloz = 0;
let escala = 1;

let deltax = 0;
let deltay = 0;
let deltaz = 0.01;
let deltaescala = 0;

const trailLength = 150;

t=0;

let trail = [
  [],
  [],
  [],
  []
]

let Helice = [
  [0, 0, 0, 1],

  [200, 0, 0, 1],
  [50, -50, 0, 1],
  [50, -25, 50, 1],

  [0, -200, 0, 1],
  [-50, -50, 0, 1],
  [-25, -50, 50, 1],

  [-200, 0, 0, 1],
  [-50, 50, 0, 1],
  [-50, 25, 50, 1],

  [0, 200, 0, 1],
  [50, 50, 0, 1],
  [25, 50, 50, 1]

]


function updateTrail(qual, newPoint) {
  if (t==0) {
    trail[qual].shift();
    return;
  }
  
  trail[qual].push(newPoint);
  if (trail[qual].length > trailLength) {
    trail[qual].shift();
  }
}


function multmat(p, m) {
  linhas = p.length;
  colunas = m[0].length;
  let result = Array.from({ length: linhas }, () => Array(colunas).fill(0));
  for (i = 0; i < linhas; i++) {
    for (j = 0; j < colunas; j++) {
      s = 0;
      for (z = 0; z < m.length; z++) {
        s = s + p[i][z] * m[z][j];
      }
      result[i][j] = s;
    }
  }
  return result;
}



function Scala(f) {
  return [
    [f, 0, 0, 0],
    [0, f, 0, 0],
    [0, 0, f, 0],
    [0, 0, 0, 1]
  ];
}

function Translada(dist) {
  return [
    [1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 1, 0],
    [dist, dist, 0, 0]
  ]
}

function Rotx(angulo) {
  m = [[1, 0, 0, 0],
  [0, cos(angulo), -sin(angulo), 0],
  [0, sin(angulo), cos(angulo), 0],
  [0, 0, 0, 1]
  ];
  return m;
}


function Rotz(angulo) {
  m = [[cos(angulo), -sin(angulo), 0, 0],
  [sin(angulo), cos(angulo), 0, 0],
  [0, 0, 1, 0],
  [0, 0, 0, 1]
  ];
  return m;
}


function Roty(angulo) {
  m = [[cos(angulo), 0, -sin(angulo), 0],
  [0, 1, 0, 0],
  [sin(angulo), 0, cos(angulo), 0],
  [0, 0, 0, 1]
  ];
  return m;
}

function keyPressed() {

  if (key == 't') {
    t == 0 ? t=1 : t = 0;
    
  }


  if (key == 's') {
  
    if(deltaescala > 0){
      deltaescala = 0;
    } else  {
      deltaescala = 0.01;
    }
  }

  if (key == 'y') {
    deltay += 0.01;
  }
  if (key == 'Y') {
    deltay -= 0.01;
  }

  if (key == 'z') {
    deltaz += 0.01;
  }
  if (key == 'Z') {
    deltaz -= 0.01;
  }

  if (key == 'x') {
    deltax += 0.01;
  }
  if (key == 'X') {
    deltax -= 0.01;
  }

  if (key == 'r') {
    deltaescala = angulox = anguloy = anguloz = deltax = deltay = deltaz = 0;
    escala = 1;
  }
}



function setup() {
  createCanvas(500, 500);

}


function draw() {
  background(0);

  //stroke(255,255,255);
  fill(255);
  text('teclas z, Z, x, X, y, Y = rotações.\ns = escala\nr = reset', 0, 10);


  c = Helice;


  let m = [];
  for (let i = 0; i < c.length; i++) {
    let ponto = [c[i]];
    ponto = multmat(ponto, Rotz(-1 * anguloz));
    ponto = multmat(ponto, Rotx(-1 * angulox));
    ponto = multmat(ponto, Roty(-1 * anguloy));
    m.push(ponto[0]);
  }


  c = m;
  c = multmat(c, Scala(escala));
  c = multmat(c, Translada(250));

  updateTrail(0, c[1]);
  updateTrail(1, c[4]);
  updateTrail(2, c[7]);
  updateTrail(3, c[10]);

  

  stroke(255, 255, 255);

  for (i = 0; i < c.length; i++)
    circle(c[i][0], c[i][1], 5);



  stroke(255, 0, 0);

  for (const point of trail[0]) {
    if (point) {
      circle(point[0], point[1], 2);
    }
  }

  line(c[0][0], c[0][1], c[1][0], c[1][1])
  line(c[1][0], c[1][1], c[2][0], c[2][1])
  line(c[2][0], c[2][1], c[0][0], c[0][1])

  stroke(255, 150, 150);

  line(c[0][0], c[0][1], c[3][0], c[3][1])
  line(c[1][0], c[1][1], c[3][0], c[3][1])
  line(c[2][0], c[2][1], c[3][0], c[3][1])

  stroke(0, 255, 0);

  for (const point of trail[1]) {
    if (point) {
      circle(point[0], point[1], 2);      
    }
  }

  line(c[0][0], c[0][1], c[4][0], c[4][1])
  line(c[4][0], c[4][1], c[5][0], c[5][1])
  line(c[5][0], c[5][1], c[0][0], c[0][1])

  stroke(150, 255, 150);
  line(c[0][0], c[0][1], c[6][0], c[6][1])
  line(c[4][0], c[4][1], c[6][0], c[6][1])
  line(c[5][0], c[5][1], c[6][0], c[6][1])

  stroke(0, 0, 255);

  for (const point of trail[2]) {
    if (point) {
      circle(point[0], point[1], 2);
    }
  }


  line(c[0][0], c[0][1], c[7][0], c[7][1])
  line(c[7][0], c[7][1], c[8][0], c[8][1])
  line(c[8][0], c[8][1], c[0][0], c[0][1])

  stroke(150, 150, 255);
  line(c[0][0], c[0][1], c[9][0], c[9][1])
  line(c[7][0], c[7][1], c[9][0], c[9][1])
  line(c[8][0], c[8][1], c[9][0], c[9][1])

  stroke(100, 123, 255);
  for (const point of trail[3]) {
    if (point) {
      circle(point[0], point[1], 2);
    }
  }

  line(c[0][0], c[0][1], c[10][0], c[10][1])
  line(c[10][0], c[10][1], c[11][0], c[11][1])
  line(c[11][0], c[11][1], c[0][0], c[0][1])

  stroke(150, 173, 255);
  line(c[0][0], c[0][1], c[12][0], c[12][1])
  line(c[10][0], c[10][1], c[12][0], c[12][1])
  line(c[11][0], c[11][1], c[12][0], c[12][1])

  stroke(255, 0, 0);

  escala += deltaescala;
  angulox -= deltax;
  anguloy -= deltay;
  anguloz -= deltaz;

  if ((escala > 1.5)) {
    escala = 1.5;
    deltaescala = -0.01;
  }
  if ((escala < 0.1)) {
    escala = 0.1;
    deltaescala = +0.01;
  }

}