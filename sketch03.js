const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');

const settings = {
  //dimensions: [ 1080 * 2, 1080 ],
  dimensions: [ 1080, 1920 ],
  animate: true,
  scaleContext: false,
  scaleToFit: false
};

const sketch = ({ context, width, height }) => {
  const agents = [];
  const numAgents = 350;

  for(let i = 0; i < numAgents; i++) {
    const x = random.range(30, width - 30);
    const y = random.range(30, height - 30);
    agents.push(new Agent(x, y));
  }

  return ({ context, width, height }) => {
    context.fillStyle = '#fafbfd';
    context.fillRect(0, 0, width, height);
    fixed_line_width = width * 0.01;
    //context.lineWidth = fixed_line_width;

    for(let i = 0; i < agents.length; i++) {
      const agent = agents[i];
      agent.connections = 0;
    }

    for(let i = 0; i < agents.length; i++) {
      const agent = agents[i];

      for(let j = i+1; j < agents.length; j++) {
        const other = agents[j];

        const dist = agent.pos.getDistance(other.pos);
        const maxDist = 100;
        if (dist > maxDist) continue;

        agent.connections += 1;
        other.connections += 1;

        context.lineWidth = math.mapRange(dist, 0, maxDist, 8, 0.5);

        context.beginPath();
        context.moveTo(agent.pos.x, agent.pos.y);
        context.lineTo(other.pos.x, other.pos.y);
        context.stroke();
      }
    }

    agents.forEach(agent => {
      agent.update();
      agent.draw(context);
      agent.bounce(width, height);
    });
  };
};

canvasSketch(sketch, settings);

class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  getDistance(v) {
    const dx = this.x - v.x;
    const dy = this.y - v.y;

    return Math.sqrt(dx*dx + dy * dy);
  }
}

const colorConnections = [
  '#D1D4F9',
  '#D1D4F9',
  '#B6E3F4',
  '#B6E3F4',
  '#C0EADE',
  '#C0EADE',
  '#FFDFBF',
  '#FFDFBF',
  '#FFD5DC',
]

class Agent {
  constructor(x, y) {
    this.pos = new Vector(x, y);
    this.vel = new Vector(random.range(-1.8, 1.8), random.range(-1.8, 1.8));
    this.radius = random.range(4, 12);
    this.connections = 0;
  }

  bounce(width, height) {
    if (this.pos.x < (0 + this.radius + 5) || this.pos.x >= (width - this.radius - 5)) this.vel.x *= -1;
    if (this.pos.y < (0 + this.radius + 5) || this.pos.y >= (height - this.radius - 5)) this.vel.y *= -1;
  }

  update() {
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;

    this.radius = Math.min(8 + (this.connections * 0.5), 20);


  }

  draw(context) {
    const colorIndex = Math.min(this.connections, colorConnections.length -1);
    context.fillStyle = colorConnections[colorIndex];
    context.save();
    context.translate(this.pos.x, this.pos.y);

    context.lineWidth = Math.min((this.connections * 0.3) + 1.5, 3);

    context.beginPath();
    context.arc(0, 0, this.radius, 0, Math.PI * 2);
    context.fill();
    context.stroke();

    context.restore();
  }
}
