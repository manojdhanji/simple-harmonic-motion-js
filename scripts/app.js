// app.js (ES module)

import {
    staticSketchFactory,
    animatedSketchFactory,
    resetDrawingState
} from "./drawing.js";

let radius = 5;
let mode = 4;
let angle = 0;

let sketchInstance = null;

function resetState() {
    angle = 0;
    resetDrawingState();

    if (sketchInstance) {
        sketchInstance.remove();
        sketchInstance = null;
    }
}

function startStaticSketch() {
    resetState();
    sketchInstance = new p5(staticSketchFactory(), "canvas-container");
}

function startAnimatedSketch() {
    resetState();

    const radiusRef = { value: radius };
    const modeRef = { value: mode };
    const angleRef = { value: angle };

    sketchInstance = new p5(
        animatedSketchFactory({ radiusRef, modeRef, angleRef }),
        "canvas-container"
    );
}

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("shmForm");
    const resetBtn = document.getElementById("resetBtn");
    const errorBox = document.getElementById("error");

    startStaticSketch();

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        errorBox.textContent = "";

        const r = Number(document.getElementById("radius").value);
        const m = Number(document.getElementById("mode").value);

        if (Number.isNaN(r) || r <= 0) {
            errorBox.textContent = "Radius must be a positive number.";
            return;
        }

        radius = r;
        mode = m;

        startAnimatedSketch();
    });

    resetBtn.addEventListener("click", () => {
        form.reset();
        startStaticSketch();
    });
});
