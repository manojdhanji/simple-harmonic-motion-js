// drawing.js (ES module)

export const SCALE = 16;
export const DOT = 6;
export const STEP = 0.01;
export const maxAngle = 4 * Math.PI;

let midX, midY;
let axisX, axisY;

let dispPoints = [];
let velPoints = [];
let accPoints = [];

export function resetDrawingState() {
    dispPoints = [];
    velPoints = [];
    accPoints = [];
}

export function getSnappedSize() {
    const container = document.getElementById("canvas-container");
    return {
        w: Math.floor(container.clientWidth / SCALE) * SCALE,
        h: Math.floor(container.clientHeight / SCALE) * SCALE
    };
}

export function computeAxes(p) {
    midX = p.width / 2;
    midY = p.height / 2;

    axisX = Math.round(midX / SCALE) * SCALE;
    axisY = Math.round(midY / SCALE) * SCALE;
}

export function computeSHM(angle, radius) {
    return {
        x: radius * Math.cos(angle),
        y: -radius * Math.sin(angle),
        disp: Math.cos(angle + Math.PI / 2),
        vel: -Math.sin(angle + Math.PI / 2),
        acc: -Math.cos(angle + Math.PI / 2)
    };
}

export function drawAxes(p) {
    for (let x = 0; x <= p.width; x += SCALE) {
        if (x === axisX) {
            p.stroke(255, 255, 180);
            p.strokeWeight(2);
        } else {
            p.stroke(80);
            p.strokeWeight(1);
        }
        p.line(x, 0, x, p.height);
    }

    for (let y = 0; y <= p.height; y += SCALE) {
        if (y === axisY) {
            p.stroke(255, 255, 180);
            p.strokeWeight(2);
        } else {
            p.stroke(80);
            p.strokeWeight(1);
        }
        p.line(0, y, p.width, y);
    }

    p.noStroke();
    p.fill(255, 255, 180);
    p.circle(axisX, axisY, 8);

    p.fill(255, 0, 0);
    p.circle(axisX, axisY, 4);
}

export function drawCircle(p, radius) {
    p.noFill();
    p.stroke(200);
    p.strokeWeight(1.5);
    p.circle(axisX, axisY, radius * 2 * SCALE);
}

export function plot({ p, angle, value, radius, color, label, storage, rowIndex }) {
    const px = axisX + angle * SCALE;
    const py = axisY + value * radius * SCALE;

    storage.push({ x: px, y: py });

    p.stroke(color);
    p.strokeWeight(2);
    p.noFill();
    p.beginShape();
    for (let pt of storage) p.vertex(pt.x, pt.y);
    p.endShape();

    p.noStroke();
    p.fill(color);
    p.textAlign(p.LEFT, p.TOP);
    p.text(
        `${label}: (${p.nf(angle, 3, 2)}, ${p.nf(value, 1, 2)})`,
        10,
        10 + (rowIndex - 1) * 16
    );
}

export function staticSketchFactory() {
    return (p) => {
        p.setup = () => {
            const { w, h } = getSnappedSize();
            p.createCanvas(w, h);
            p.pixelDensity(1);

            computeAxes(p);
            p.background(0);
            drawAxes(p);
        };

        p.draw = () => { };

        p.windowResized = () => {
            const { w, h } = getSnappedSize();
            p.resizeCanvas(w, h);
            computeAxes(p);
            p.background(0);
            drawAxes(p);
        };
    };
}

export function animatedSketchFactory({ radiusRef, modeRef, angleRef }) {
    return (p) => {
        p.setup = () => {
            const { w, h } = getSnappedSize();
            p.createCanvas(w, h);
            p.pixelDensity(1);

            computeAxes(p);
            p.angleMode(p.RADIANS);
            p.textFont("monospace", 12);

            p.background(0);
            drawAxes(p);
            drawCircle(p, radiusRef.value);
        };

        p.draw = () => {
            if (angleRef.value > maxAngle) {
                p.noLoop();
                return;
            }

            const { x, y, disp, vel, acc } = computeSHM(angleRef.value, radiusRef.value);

            p.background(0);
            drawAxes(p);
            drawCircle(p, radiusRef.value);

            p.fill(255);
            p.noStroke();
            p.circle(axisX + x * SCALE, axisY + y * SCALE, DOT);

            p.fill(255, 200, 0);
            p.circle(axisX, axisY + y * SCALE, DOT);

            if (modeRef.value === 1 || modeRef.value === 4)
                plot({
                    p, angle: angleRef.value, value: disp, radius: radiusRef.value,
                    color: p.color(0, 255, 0), label: "Displacement",
                    storage: dispPoints, rowIndex: 4
                });

            if (modeRef.value === 2 || modeRef.value === 4)
                plot({
                    p, angle: angleRef.value, value: vel, radius: radiusRef.value,
                    color: p.color(0, 200, 255), label: "Velocity",
                    storage: velPoints, rowIndex: 5
                });

            if (modeRef.value === 3 || modeRef.value === 4)
                plot({
                    p, angle: angleRef.value, value: acc, radius: radiusRef.value,
                    color: p.color(255, 100, 0), label: "Acceleration",
                    storage: accPoints, rowIndex: 6
                });

            angleRef.value += STEP;
        };

        p.windowResized = () => {
            const { w, h } = getSnappedSize();
            p.resizeCanvas(w, h);
            computeAxes(p);
        };
    };
}
