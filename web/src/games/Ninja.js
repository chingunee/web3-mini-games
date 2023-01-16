import React, { useState, useEffect, useRef } from "react";

export default function Ninja() {
  const canvasRef = useRef(null);
  const elemRef = useRef(null);

  let platforms = [];
  let sticks = [];
  let trees = [];
  let lastTimestamp;
  let phase = "waiting";

  // Configuration
  const canvasWidth = 375;
  const canvasHeight = 375;
  const platformHeight = 100;
  const heroDistanceFromEdge = 10; // While waiting
  const paddingX = 100; // The waiting position of the hero in from the original canvas size
  const perfectAreaSize = 10;

  // The background moves slower than the hero
  const backgroundSpeedMultiplier = 0.2;

  const hill1BaseHeight = 100;
  const hill1Amplitude = 10;
  const hill1Stretch = 1;
  const hill2BaseHeight = 70;
  const hill2Amplitude = 20;
  const hill2Stretch = 0.5;

  const stretchingSpeed = 4; // Milliseconds it takes to draw a pixel
  const turningSpeed = 4; // Milliseconds it takes to turn a degree
  const walkingSpeed = 4;
  const transitioningSpeed = 2;
  const fallingSpeed = 2;

  const heroWidth = 17; // 24
  const heroHeight = 30; // 40);

  const [heroX, setHeroX] = useState(null);
  const [heroY, setHeroY] = useState(null);
  const [sceneOffset, setSceneOffset] = useState(0);
  const [score, setScore] = useState(0);

  // element styles
  const [introductionOpacity, setIntroductionOpacity] = useState(1);
  const [perfectOpacity, setPerfectOpacity] = useState(0);
  const [restartDisplay, setRestartDisplay] = useState("hidden");
  const [ctx, setCtx] = useState(null);

  function resetGame() {
    console.log("reset Game");

    // Reset game progress
    phase = "waiting";
    lastTimestamp = undefined;
    setSceneOffset(0);
    setScore(0);

    setIntroductionOpacity(1);
    setPerfectOpacity(0);
    setRestartDisplay("none");

    // The first platform is always the same
    // x + w has to match paddingX
    platforms = [{ x: 50, w: 50 }];

    generatePlatform();
    generatePlatform();
    generatePlatform();
    generatePlatform();

    sticks = [{ x: platforms[0]?.x + platforms[0]?.w, length: 0, rotation: 0 }];

    trees = [];
    generateTree();
    generateTree();
    generateTree();
    generateTree();
    generateTree();
    generateTree();
    generateTree();
    generateTree();
    generateTree();
    generateTree();

    setHeroX(platforms[0]?.x + platforms[0]?.w - heroDistanceFromEdge);
    setHeroY(0);

    draw();
  }

  function generateTree() {
    const minimumGap = 30;
    const maximumGap = 150;

    // X coordinate of the right edge of the furthest tree
    const lastTree = trees[trees.length - 1];
    let furthestX = lastTree ? lastTree.x : 0;

    const x =
      furthestX +
      minimumGap +
      Math.floor(Math.random() * (maximumGap - minimumGap));

    const treeColors = ["#6D8821", "#8FAC34", "#98B333"];
    const color = treeColors[Math.floor(Math.random() * 3)];

    trees.push({ x, color });
  }

  function generatePlatform() {
    const minimumGap = 40;
    const maximumGap = 200;
    const minimumWidth = 20;
    const maximumWidth = 100;

    // X coordinate of the right edge of the furthest platform
    const lastPlatform = platforms[platforms.length - 1];
    let furthestX = lastPlatform?.x + lastPlatform?.w;

    const x =
      furthestX +
      minimumGap +
      Math.floor(Math.random() * (maximumGap - minimumGap));
    const w =
      minimumWidth + Math.floor(Math.random() * (maximumWidth - minimumWidth));

    platforms.push({ x, w });
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    setCtx(canvas.getContext("2d"));

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    animationFrame("useEffect");

    canvas.getContext("2d") && resetGame();
  }, []);

  function animationFrame(str) {
    const id = requestAnimationFrame(animate);

    console.log("id - " + str);
    console.log(id);

    return () => cancelAnimationFrame(id);
  }

  function animate(timestamp) {
    console.log("lastTimestamp");
    console.log(lastTimestamp);

    if (!lastTimestamp) {
      lastTimestamp = timestamp;
      animationFrame("animate");
      return;
    }

    switch (phase) {
      case "waiting":
        return; // Stop the loop
      case "stretching": {
        sticks[sticks.length - 1].length +=
          (timestamp - lastTimestamp) / stretchingSpeed;
        break;
      }
      case "turning": {
        sticks[sticks.length - 1].rotation +=
          (timestamp - lastTimestamp) / turningSpeed;

        if (sticks[sticks.length - 1].rotation > 90) {
          sticks[sticks.length - 1].rotation = 90;

          const [nextPlatform, perfectHit] = thePlatformTheStickHits();
          if (nextPlatform) {
            // Increase score
            setScore(score + perfectHit ? 2 : 1);

            if (perfectHit) {
              setPerfectOpacity(1);
              setTimeout(() => setPerfectOpacity(0), 1000);
            }

            generatePlatform();
            generateTree();
            generateTree();
          }

          phase = "walking";
        }
        break;
      }
      case "walking": {
        setHeroX(heroX + (timestamp - lastTimestamp) / walkingSpeed);

        const [nextPlatform] = thePlatformTheStickHits();
        if (nextPlatform) {
          // If hero will reach another platform then limit it's position at it's edge
          const maxHeroX =
            nextPlatform.x + nextPlatform.w - heroDistanceFromEdge;
          if (heroX > maxHeroX) {
            setHeroX(maxHeroX);
            phase = "transitioning";
          }
        } else {
          // If hero won't reach another platform then limit it's position at the end of the pole
          const maxHeroX =
            sticks[sticks.length - 1].x +
            sticks[sticks.length - 1].length +
            heroWidth;
          if (heroX > maxHeroX) {
            setHeroX(maxHeroX);
            phase = "falling";
          }
        }
        break;
      }
      case "transitioning": {
        setSceneOffset(
          sceneOffset + (timestamp - lastTimestamp) / transitioningSpeed
        );

        const [nextPlatform] = thePlatformTheStickHits();
        if (sceneOffset > nextPlatform.x + nextPlatform.w - paddingX) {
          sticks.push({
            x: nextPlatform.x + nextPlatform.w,
            length: 0,
            rotation: 0,
          });
          phase = "waiting";
        }
        break;
      }
      case "falling": {
        if (sticks[sticks.length - 1].rotation < 180)
          sticks[sticks.length - 1].rotation +=
            (timestamp - lastTimestamp) / turningSpeed;

        setHeroY(heroY + (timestamp - lastTimestamp) / fallingSpeed);
        const maxHeroY =
          platformHeight + 100 + (window.innerHeight - canvasHeight) / 2;
        if (heroY > maxHeroY) {
          setRestartDisplay("block");
          return;
        }
        break;
      }
      default:
        throw Error("Wrong phase");
    }

    draw();
    animationFrame("animate last");

    lastTimestamp = timestamp;
  }

  function thePlatformTheStickHits() {
    if (sticks[sticks.length - 1].rotation !== 90)
      throw Error(`Stick is ${sticks[sticks.length - 1].rotation}°`);
    const stickFarX =
      sticks[sticks.length - 1].x + sticks[sticks.length - 1].length;

    const platformTheStickHits = platforms.find(
      (platform) =>
        platform.x < stickFarX && stickFarX < platform.x + platform.w
    );

    // If the stick hits the perfect area
    if (
      platformTheStickHits &&
      platformTheStickHits.x +
        platformTheStickHits.w / 2 -
        perfectAreaSize / 2 <
        stickFarX &&
      stickFarX <
        platformTheStickHits.x +
          platformTheStickHits.w / 2 +
          perfectAreaSize / 2
    )
      return [platformTheStickHits, true];

    return [platformTheStickHits, false];
  }

  function draw() {
    ctx?.save();
    ctx?.clearRect(0, 0, window.innerWidth, window.innerHeight);

    drawBackground();

    // Center main canvas area to the middle of the screen
    ctx?.translate(
      (window.innerWidth - canvasWidth) / 2 - sceneOffset,
      (window.innerHeight - canvasHeight) / 2
    );

    // Draw scene
    drawPlatforms();
    drawHero();
    drawSticks();

    // Restore transformation
    ctx?.restore();
  }

  function drawPlatforms() {
    platforms.forEach(({ x, w }) => {
      // Draw platform
      if (ctx) {
        ctx.fillStyle = "black";
      }
      ctx?.fillRect(
        x,
        canvasHeight - platformHeight,
        w,
        platformHeight + (window.innerHeight - canvasHeight) / 2
      );

      // Draw perfect area only if hero did not yet reach the platform
      if (sticks[sticks.length - 1]?.x < x) {
        if (ctx) {
          ctx.fillStyle = "red";
        }
        ctx?.fillRect(
          x + w / 2 - perfectAreaSize / 2,
          canvasHeight - platformHeight,
          perfectAreaSize,
          perfectAreaSize
        );
      }
    });
  }

  function drawHero() {
    ctx?.save();
    if (ctx) {
      ctx.fillStyle = "black";
    }
    ctx?.translate(
      heroX - heroWidth / 2,
      heroY + canvasHeight - platformHeight - heroHeight / 2
    );

    // Body
    drawRoundedRect(
      -heroWidth / 2,
      -heroHeight / 2,
      heroWidth,
      heroHeight - 4,
      5
    );

    // Legs
    const legDistance = 5;
    ctx?.beginPath();
    ctx?.arc(legDistance, 11.5, 3, 0, Math.PI * 2, false);
    ctx?.fill();
    ctx?.beginPath();
    ctx?.arc(-legDistance, 11.5, 3, 0, Math.PI * 2, false);
    ctx?.fill();

    // Eye
    ctx?.beginPath();
    if (ctx) {
      ctx.fillStyle = "white";
    }
    ctx?.arc(5, -7, 3, 0, Math.PI * 2, false);
    ctx?.fill();

    // Band
    if (ctx) {
      ctx.fillStyle = "red";
    }
    ctx?.fillRect(-heroWidth / 2 - 1, -12, heroWidth + 2, 4.5);
    ctx?.beginPath();
    ctx?.moveTo(-9, -14.5);
    ctx?.lineTo(-17, -18.5);
    ctx?.lineTo(-14, -8.5);
    ctx?.fill();
    ctx?.beginPath();
    ctx?.moveTo(-10, -10.5);
    ctx?.lineTo(-15, -3.5);
    ctx?.lineTo(-5, -7);
    ctx?.fill();

    ctx?.restore();
  }

  function drawRoundedRect(x, y, width, height, radius) {
    ctx?.beginPath();
    ctx?.moveTo(x, y + radius);
    ctx?.lineTo(x, y + height - radius);
    ctx?.arcTo(x, y + height, x + radius, y + height, radius);
    ctx?.lineTo(x + width - radius, y + height);
    ctx?.arcTo(x + width, y + height, x + width, y + height - radius, radius);
    ctx?.lineTo(x + width, y + radius);
    ctx?.arcTo(x + width, y, x + width - radius, y, radius);
    ctx?.lineTo(x + radius, y);
    ctx?.arcTo(x, y, x, y + radius, radius);
    ctx?.fill();
  }

  function drawSticks() {
    sticks.forEach((stick) => {
      ctx?.save();

      // Move the anchor point to the start of the stick and rotate
      ctx?.translate(stick.x, canvasHeight - platformHeight);
      ctx?.rotate((Math.PI / 180) * stick.rotation);

      // Draw stick
      ctx?.beginPath();
      if (ctx) {
        ctx.lineWidth = 2;
      }
      ctx?.moveTo(0, 0);
      ctx?.lineTo(0, -stick.length);
      ctx?.stroke();

      // Restore transformations
      ctx?.restore();
    });
  }

  function drawBackground() {
    // Draw sky
    var gradient = ctx?.createLinearGradient(0, 0, 0, window.innerHeight);
    gradient?.addColorStop(0, "#BBD691");
    gradient?.addColorStop(1, "#FEF1E1");
    if (ctx) {
      ctx.fillStyle = gradient;
    }
    ctx?.fillRect(0, 0, window.innerWidth, window.innerHeight);

    // Draw hills
    drawHill(hill1BaseHeight, hill1Amplitude, hill1Stretch, "#95C629");
    drawHill(hill2BaseHeight, hill2Amplitude, hill2Stretch, "#659F1C");

    // Draw trees
    trees.forEach((tree) => drawTree(tree.x, tree.color));
  }

  function drawHill(baseHeight, amplitude, stretch, color) {
    ctx?.beginPath();
    ctx?.moveTo(0, window.innerHeight);
    ctx?.lineTo(0, getHillY(0, baseHeight, amplitude, stretch));
    for (let i = 0; i < window.innerWidth; i++) {
      ctx?.lineTo(i, getHillY(i, baseHeight, amplitude, stretch));
    }
    ctx?.lineTo(window.innerWidth, window.innerHeight);
    if (ctx) {
      ctx.fillStyle = color;
    }
    ctx?.fill();
  }

  function drawTree(x, color) {
    ctx?.save();
    ctx?.translate(
      (-sceneOffset * backgroundSpeedMultiplier + x) * hill1Stretch,
      getTreeY(x, hill1BaseHeight, hill1Amplitude)
    );

    const treeTrunkHeight = 5;
    const treeTrunkWidth = 2;
    const treeCrownHeight = 25;
    const treeCrownWidth = 10;

    // Draw trunk
    if (ctx) {
      ctx.fillStyle = "#7D833C";
    }
    ctx?.fillRect(
      -treeTrunkWidth / 2,
      -treeTrunkHeight,
      treeTrunkWidth,
      treeTrunkHeight
    );

    // Draw crown
    ctx?.beginPath();
    ctx?.moveTo(-treeCrownWidth / 2, -treeTrunkHeight);
    ctx?.lineTo(0, -(treeTrunkHeight + treeCrownHeight));
    ctx?.lineTo(treeCrownWidth / 2, -treeTrunkHeight);
    if (ctx) {
      ctx.fillStyle = color;
    }
    ctx?.fill();

    ctx?.restore();
  }

  function getHillY(windowX, baseHeight, amplitude, stretch) {
    const sineBaseY = window.innerHeight - baseHeight;
    return (
      Math.sin((sceneOffset * backgroundSpeedMultiplier + windowX) * stretch) *
        amplitude +
      sineBaseY
    );
  }

  function getTreeY(x, baseHeight, amplitude) {
    const sineBaseY = window.innerHeight - baseHeight;
    return Math.sin(x) * amplitude + sineBaseY;
  }

  function keydownEvent(event) {
    console.log("keydown");
    console.log(event);

    if (event.key == " ") {
      event.preventDefault();
      resetGame();
      return;
    }
  }

  function mousedownEvent(event) {
    console.log("mousedown");
    console.log(phase);

    if (phase == "waiting") {
      lastTimestamp = undefined;
      setIntroductionOpacity(0);
      phase = "stretching";
      animationFrame("mouse event");
    }
  }

  function mouseupEvent(event) {
    console.log("mouseup");
    console.log(phase);

    if (phase == "stretching") {
      phase = "turning";
    }
  }

  return (
    <div ref={elemRef} className="w-screen h-full bg-[#02121d]">
      <div
        onKeyDown={keydownEvent}
        onMouseDown={mousedownEvent}
        onMouseUp={mouseupEvent}
        className="container mx-auto cursor-pointer flex flex-col justify-center items-center h-full font-body"
      >
        <div
          id="score"
          className="absolute top-[30px] right-[30px] text-2xl font-bold"
        >
          {score}
        </div>
        <canvas ref={canvasRef} width="375" height="375" />
        <div
          id="introduction"
          className={`w-[200px] h-[150px] absolute font-semibold text-lg text-center opacity-${introductionOpacity}`}
        >
          Hold down the mouse to stretch out a stick
        </div>
        <div id="perfect" className={`absolute opacity-${perfectOpacity}`}>
          DOUBLE SCORE
        </div>
        <button
          id="restart"
          onClick={() => {
            resetGame();
            setRestartDisplay("hidden");
          }}
          className={`absolute border-none ${restartDisplay} w-[120px] h-[120px] rounded-full text-white bg-red-400 font-semibold text-xl cursor-pointer`}
        >
          RESTART
        </button>
      </div>
    </div>
  );
}
