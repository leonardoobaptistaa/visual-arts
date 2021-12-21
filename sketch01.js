const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [ 1080, 1080 ]
};

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);
    fixed_line_width = width * 0.01;
    context.lineWidth = fixed_line_width;

    const w   = width  * 0.10;
    const h   = height * 0.10;
    const gap = width  * 0.03;
    const ix  = width  * 0.17;
    const iy  = height * 0.17;

    const off = width  * 0.02;

    let x, y;

    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        context.lineWidth = fixed_line_width *
          getRandomArbitrary(0.5, 1.5);

        x = ix + (w + gap) * i;
        y = iy + (h + gap) * j;

        context.beginPath();
        context.rect(x, y, w, h);
        context.stroke();

        if (Math.random() > 0.5) {
          context.lineWidth = fixed_line_width *
            getRandomArbitrary(0.8, 1.2);

          context.beginPath();
          context.rect(x + off / 2, y + off / 2, w - off, h - off);
          context.stroke();
        }
      }
    }
  };
};

canvasSketch(sketch, settings);
