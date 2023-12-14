var _a, _b, _c;
import { ImageLocal } from "./ImageLocal.js";
import { ImageType } from "./ImageType.js";
import { MathImg } from "./MathImg.js";
import { Particle } from "./particle.js";
import { ParticleText } from "./particle.js";
import { CanvasLocal } from './canvasLocal.js';
var lienzo1;
var lienzo2;
var lienzo3;
var lienzo4;
var pantalla1;
var pantalla2;
var pantalla3;
var pantalla4;
/* Este evento controla la forma de abrir un archivo mediante el evento de arrastrar y soltar */
function handleDragOver(evt) {
    evt.stopPropagation();
    evt.preventDefault(); //que no se abra en otra ventana sola la imagen
    evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
}
/** Variables que controla el canvas de la imagen, el primero
 * posteriormemte se volveran arreglos cuando ya controlemos las seis ventanas de nuestro frame
*/
lienzo1 = document.getElementById('img1');
pantalla1 = lienzo1.getContext("2d");
lienzo2 = document.getElementById('img2');
pantalla2 = lienzo2.getContext("2d");
lienzo3 = document.getElementById('img3');
pantalla3 = lienzo3.getContext("2d");
lienzo4 = document.getElementById('img4');
pantalla4 = lienzo4.getContext("2d");
var dropZone = lienzo1; //document.getElementById('img1');
var imgLocal = new ImageLocal(pantalla1);
imgLocal.getImage().onload = imgLocal.onload;
var imgLocal4 = new ImageLocal(pantalla4);
imgLocal4.getImage().onload = imgLocal4.onload;
function convertirAGris(evt) {
    var imagenSal = new ImageType(pantalla1, imgLocal.getImage());
    imagenSal.imageArray2DtoData(pantalla2, MathImg.toGray(imagenSal));
}
function convertirANegativo(evt) {
    var imagenSal = new ImageType(pantalla1, imgLocal.getImage());
    imagenSal.imageArray2DtoData(pantalla2, MathImg.toNegative(imagenSal));
}
function convertirANegativoGrises(evt) {
    var imagenSal = new ImageType(pantalla1, imgLocal.getImage());
    imagenSal.imageArray2DtoData(pantalla2, MathImg.toNegativeGrises(imagenSal));
}
function convertirARojo(evt) {
    var imagenSal = new ImageType(pantalla1, imgLocal.getImage());
    imagenSal.imageArray2DtoData(pantalla2, MathImg.toRed(imagenSal));
}
function convertirAVerde(evt) {
    var imagenSal = new ImageType(pantalla1, imgLocal.getImage());
    imagenSal.imageArray2DtoData(pantalla2, MathImg.toGreen(imagenSal));
}
function convertirAAzul(evt) {
    var imagenSal = new ImageType(pantalla1, imgLocal.getImage());
    imagenSal.imageArray2DtoData(pantalla2, MathImg.toBlue(imagenSal));
}
//este codigo se agreo el 4 de abril de 2022
function convertirTricolor(evt) {
    var imagenSal = new ImageType(pantalla1, imgLocal.getImage());
    imagenSal.imageArray2DtoData(pantalla2, MathImg.toTricolor(imagenSal));
}
////////////hasta aqui
//este codigo se agreo el 23 de septiembre de 2023
function convertirTricolorHorizontal(evt) {
    var imagenSal = new ImageType(pantalla1, imgLocal.getImage());
    imagenSal.imageArray2DtoData(pantalla2, MathImg.toTricolorHorizontal(imagenSal));
}
function convertirTricolorGradual(evt) {
    var imagenSal = new ImageType(pantalla1, imgLocal.getImage());
    imagenSal.imageArray2DtoData(pantalla2, MathImg.toGradualTricolor(imagenSal));
}
//////////fiesta/////////////////
var colorPalette = [
    [255, 0, 0],
    [0, 255, 0],
    [0, 0, 255],
    [255, 255, 0],
    [255, 0, 255],
    [0, 255, 255] // Cian
];
var currentColorIndex = 0;
function changeColorEffect() {
    ctx.drawImage(imgLocal.getImage(), 0, 0, w, h);
    var imagenSal = new ImageType(pantalla1, imgLocal.getImage());
    var color = colorPalette[currentColorIndex];
    // Aplicar el color a la imagen
    var colorEffect = MathImg.applyColorEffect(imagenSal, color);
    imagenSal.imageArray2DtoData(pantalla2, colorEffect);
    // Cambiar al próximo color en la paleta
    currentColorIndex = (currentColorIndex + 1) % colorPalette.length;
    // Solicitar la siguiente animación
    setTimeout(changeColorEffect, 500); // Cambia de color cada medio segundo
}
function startColorChange(evt) {
    init();
    changeColorEffect();
}
/////movimiento//////
var shiftOffsetX = 0;
var shiftOffsetY = 0;
function shiftImageEffect() {
    ctx.drawImage(imgLocal.getImage(), 0, 0, w, h);
    var imagenSal = new ImageType(pantalla1, imgLocal.getImage());
    var shiftedImage = MathImg.applyShiftEffect(imagenSal, shiftOffsetX, shiftOffsetY);
    imagenSal.imageArray2DtoData(pantalla2, shiftedImage);
    // Incrementa los desplazamientos para la próxima animación
    shiftOffsetX = (shiftOffsetX + 1) % w;
    shiftOffsetY = (shiftOffsetY + 1) % h;
    requestAnimationFrame(shiftImageEffect);
}
function startShiftEffect(evt) {
    init();
    shiftImageEffect();
}
///burbujaaaaaaas/////
var Bubble = /** @class */ (function () {
    function Bubble(x, y, radius, speedX, speedY) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.speedX = speedX;
        this.speedY = speedY;
    }
    Bubble.prototype.update = function () {
        this.x += this.speedX;
        this.y += this.speedY;
        // Rebote en los bordes 
        if (this.x - this.radius < 0 || this.x + this.radius > w) {
            this.speedX = -this.speedX;
        }
        if (this.y - this.radius < 0 || this.y + this.radius > h) {
            this.speedY = -this.speedY;
        }
    };
    Bubble.prototype.draw = function () {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(2, 25, 55, 0.5)';
        ctx.fill();
        ctx.closePath();
    };
    return Bubble;
}());
export { Bubble };
var numberOfBubbles = 100;
var bubblesArray = [];
function initBubbles() {
    for (var i = 0; i < numberOfBubbles; i++) {
        var radius = Math.random() * 20 + 5; // Radio aleatorio entre 5 y 25
        var x = Math.random() * (w - 2 * radius) + radius;
        var y = Math.random() * (h - 2 * radius) + radius;
        var speedX = (Math.random() - 0.5) * 4; // Velocidad aleatoria entre -2 y 2
        var speedY = (Math.random() - 0.5) * 4;
        var bubble = new Bubble(x, y, radius, speedX, speedY);
        bubblesArray.push(bubble);
    }
}
function animateBubbles() {
    ctx.clearRect(0, 0, w, h);
    var imagenSal = new ImageType(pantalla1, imgLocal.getImage());
    var bubbleImage = MathImg.createBubblesEffect(w, h, bubblesArray);
    // Dibujar la imagen original
    ctx.globalAlpha = 0.5; //opacidad
    ctx.drawImage(imgLocal.getImage(), 0, 0, w, h);
    ctx.globalAlpha = 1; // Restaurar la opacidad
    // Aplicar el efecto de burbujas
    imagenSal.imageArray2DtoData(pantalla2, bubbleImage);
    for (var i = 0; i < bubblesArray.length; i++) {
        bubblesArray[i].update();
        bubblesArray[i].draw();
    }
    requestAnimationFrame(animateBubbles);
}
function startBubblesEffect(evt) {
    init();
    initBubbles();
    animateBubbles();
}
//rotacion////
var rotationAngle = 0;
function rotateImageEffect() {
    ctx.clearRect(0, 0, w, h);
    var imagenSal = new ImageType(pantalla1, imgLocal.getImage());
    var rotatedImage = MathImg.applyRotationEffect(imagenSal, rotationAngle);
    imagenSal.imageArray2DtoData(pantalla2, rotatedImage);
    // Solicitar la siguiente rotación
    rotationAngle = (rotationAngle + 1) % 360;
    requestAnimationFrame(rotateImageEffect);
}
function startRotationEffect(evt) {
    init();
    rotateImageEffect();
}
////espejo//
var mirrorOffsetX = 0;
function mirrorEffect() {
    ctx.clearRect(0, 0, w, h);
    var imagenSal = new ImageType(pantalla1, imgLocal.getImage());
    // Dibujar la imagen original
    ctx.drawImage(imgLocal.getImage(), 0, 0, w, h);
    // Aplicar el efecto espejo
    var mirroredImage = MathImg.applyMirrorEffect(imagenSal, mirrorOffsetX);
    imagenSal.imageArray2DtoData(pantalla2, mirroredImage);
    // Incrementar el desplazamiento para la próxima animación
    mirrorOffsetX = (mirrorOffsetX + 1) % w;
    requestAnimationFrame(mirrorEffect);
}
function startMirrorEffect(evt) {
    init();
    mirrorEffect();
}
//AGUA//////
function startWaterEffect(evt) {
    // Inicializar la imagen
    var imagenSal = new ImageType(pantalla1, imgLocal.getImage());
    // Inicializar el tiempo para simular movimiento en las ondas
    var time = 0;
    function animateWaterEffect() {
        // Aplicar el efecto de agua utilizando la función en MathImg
        var waterImage = MathImg.applyWaterEffect(imagenSal, time);
        // Mostrar la imagen resultante
        imagenSal.imageArray2DtoData(pantalla2, waterImage);
        // Incrementar el tiempo para la próxima animación
        time++;
        // Solicitar la siguiente animación
        requestAnimationFrame(animateWaterEffect);
    }
    // Iniciar la animación
    animateWaterEffect();
}
///mariposas///
var Butterfly = /** @class */ (function () {
    function Butterfly(x, y, size, speedX, speedY, texture) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.speedX = speedX;
        this.speedY = speedY;
        this.texture = texture;
    }
    Butterfly.prototype.update = function () {
        this.x += this.speedX;
        this.y += this.speedY;
        // Lógica de rebote en los bordes
        if (this.x < 0 || this.x + this.size > w) {
            this.speedX = -this.speedX;
        }
        if (this.y < 0 || this.y + this.size > h) {
            this.speedY = -this.speedY;
        }
    };
    Butterfly.prototype.draw = function (ctx) {
        ctx.drawImage(this.texture, this.x, this.y, this.size, this.size);
    };
    return Butterfly;
}());
export { Butterfly };
// Textura de la mariposa
var butterflyTexture = new Image();
butterflyTexture.src = 'mariposa.png';
// Número de mariposas y array de mariposas
var numberOfButterflies = 20;
var butterfliesArray = [];
// Inicializar mariposas
function initButterflies() {
    for (var i = 0; i < numberOfButterflies; i++) {
        var size = Math.random() * 30 + 20; // Tamaño aleatorio entre 20 y 50
        var marginX = 50; // Márgenes en el eje X
        var marginY = 50; // Márgenes en el eje Y
        var x = Math.random() * (w - size - 2 * marginX) + marginX; // Ajusta el margen en el eje X
        var y = Math.random() * (h - size - 2 * marginY) + marginY; // Ajusta el margen en el eje Y
        var speedX = (Math.random() - 0.5) * 2; // Velocidad aleatoria entre -1 y 1
        var speedY = (Math.random() - 0.5) * 2;
        var butterfly = new Butterfly(x, y, size, speedX, speedY, butterflyTexture);
        butterfliesArray.push(butterfly);
    }
}
// Animar mariposas
function animateButterflies() {
    ctx.clearRect(0, 0, w, h);
    for (var i = 0; i < butterfliesArray.length; i++) {
        butterfliesArray[i].update();
        butterfliesArray[i].draw(ctx);
    }
    requestAnimationFrame(animateButterflies);
}
// Función para iniciar el efecto de mariposas
function startButterfliesEffect(evt) {
    init();
    initButterflies();
    animateButterflies();
}
///ANIME////
function animeEffect() {
    ctx.clearRect(0, 0, w, h);
    var imagenSal = new ImageType(pantalla1, imgLocal.getImage());
    // Dibujar la imagen original
    ctx.drawImage(imgLocal.getImage(), 0, 0, w, h);
    // Aplicar el efecto anime
    var animeImage = MathImg.applyAnimeEffect(imagenSal);
    imagenSal.imageArray2DtoData(pantalla2, animeImage);
    requestAnimationFrame(animeEffect);
}
function startAnimeEffect(evt) {
    init();
    animeEffect();
}
///GLICHT//
var glitchInterval = null;
function glitchEffect() {
    ctx.clearRect(0, 0, w, h);
    var imagenSal = new ImageType(pantalla1, imgLocal.getImage());
    // Dibujar la imagen original
    ctx.drawImage(imgLocal.getImage(), 0, 0, w, h);
    // Aplicar el efecto de Glitch
    var glitchedImage = MathImg.applyGlitchEffect(imagenSal);
    imagenSal.imageArray2DtoData(pantalla2, glitchedImage);
    if (glitchInterval === null) {
        // Iniciar un intervalo para el efecto de Glitch
        glitchInterval = setInterval(function () {
            var glitchedImage = MathImg.applyGlitchEffect(imagenSal);
            imagenSal.imageArray2DtoData(pantalla2, glitchedImage);
        }, 100); // Ajusta el tiempo 
    }
}
function stopGlitchEffect() {
    // Detener el intervalo de Glitch
    if (glitchInterval !== null) {
        clearInterval(glitchInterval);
        glitchInterval = null;
    }
}
///thanos//
var thanosInterval = null;
function thanosSnapEffect() {
    ctx.clearRect(0, 0, w, h);
    var imagenSal = new ImageType(pantalla1, imgLocal.getImage());
    // Dibujar la imagen original
    ctx.drawImage(imgLocal.getImage(), 0, 0, w, h);
    // Aplicar el efecto de Thanos Snap
    var snappedImage = MathImg.applyThanosSnapEffect(imagenSal);
    imagenSal.imageArray2DtoData(pantalla2, snappedImage);
    // Verificar si han pasado 3 segundos
    if (Date.now() - startTime >= 3000) {
        // Después de 3 segundos, hacer que la imagen se vuelva completamente negra
        ctx.clearRect(0, 0, w, h);
        ctx.fillRect(0, 0, w, h); // Rellenar el lienzo con un rectángulo negro
    }
    else {
        // Seguir animando hasta que pasen los 3 segundos
        requestAnimationFrame(thanosSnapEffect);
    }
}
function startThanosSnapEffect(evt) {
    init();
    // Iniciar el temporizador de 3 segundos antes de aplicar el efecto
    thanosInterval = setTimeout(function () {
        // Guardar el tiempo de inicio
        startTime = Date.now();
        thanosSnapEffect();
    }, 3000);
}
// Variable para almacenar el tiempo de inicio
var startTime = 0;
///MATRIX//
var matrixInterval = null;
function matrixEffect() {
    ctx.clearRect(0, 0, w, h);
    var imagenSal = new ImageType(pantalla1, imgLocal.getImage());
    // Dibujar la imagen original
    ctx.drawImage(imgLocal.getImage(), 0, 0, w, h);
    // Aplicar el efecto Matrix
    var matrixImage = MathImg.applyMatrixEffect(imagenSal);
    imagenSal.imageArray2DtoData(pantalla2, matrixImage);
    requestAnimationFrame(matrixEffect);
}
function startMatrixEffect(evt) {
    init();
    // Iniciar el efecto Matrix
    matrixInterval = setInterval(function () {
        matrixEffect();
    }, 100); // Ajusta la velocidad 
}
////BATMAN///
var batmanInterval = null;
function batmanEffect() {
    ctx.clearRect(0, 0, w, h);
    var imagenSal = new ImageType(pantalla1, imgLocal.getImage());
    // Dibujar la imagen original
    ctx.drawImage(imgLocal.getImage(), 0, 0, w, h);
    // Aplicar el efecto de Batman
    var batmanImage = MathImg.applyBatmanEffect(imagenSal);
    imagenSal.imageArray2DtoData(pantalla2, batmanImage);
    requestAnimationFrame(batmanEffect);
}
function startBatmanEffect(evt) {
    init();
    batmanEffect();
}
///STARPARALLAXEFFECT//
var parallaxOffsetX = 0;
var parallaxOffsetY = 0;
function parallaxEffect() {
    ctx.clearRect(0, 0, w, h);
    var imagenSal = new ImageType(pantalla1, imgLocal.getImage());
    // Dibujar la imagen original
    ctx.drawImage(imgLocal.getImage(), 0, 0, w, h);
    // Aplicar el efecto Parallax
    var parallaxImage = MathImg.applyParallaxEffect(imagenSal, parallaxOffsetX, parallaxOffsetY);
    imagenSal.imageArray2DtoData(pantalla2, parallaxImage);
    parallaxOffsetX += 1; //  ajustar la velocidad en X
    parallaxOffsetY += 0.5; //  ajustar la velocidad en Y
    requestAnimationFrame(parallaxEffect);
}
// Función para iniciar el efecto Parallax
function startParallaxEffect(evt) {
    init();
    parallaxEffect();
}
//vortice//
var vortexCenterX;
var vortexCenterY;
function vortexEffect() {
    ctx.clearRect(0, 0, w, h);
    var imagenSal = new ImageType(pantalla1, imgLocal.getImage());
    // Dibujar la imagen original
    ctx.drawImage(imgLocal.getImage(), 0, 0, w, h);
    // Aplicar el efecto de vórtice
    var vortexedImage = MathImg.applyVortexEffect(imagenSal, vortexCenterX, vortexCenterY);
    imagenSal.imageArray2DtoData(pantalla2, vortexedImage);
    requestAnimationFrame(vortexEffect);
}
function startVortexEffect(evt) {
    init();
    // Definir el centro del vórtice 
    vortexCenterX = w / 2;
    vortexCenterY = h / 2;
    vortexEffect();
}
//CIELO ESTRELLADO//
var starfieldInterval = null;
function starfieldEffect() {
    ctx.clearRect(0, 0, w, h);
    var imagenSal = new ImageType(pantalla1, imgLocal.getImage());
    // Dibujar la imagen original
    ctx.drawImage(imgLocal.getImage(), 0, 0, w, h);
    // Aplicar el efecto de Desplazamiento de Cielo Estrellado
    var starfieldImage = MathImg.applyStarfieldEffect(imagenSal);
    imagenSal.imageArray2DtoData(pantalla2, starfieldImage);
    requestAnimationFrame(starfieldEffect);
}
function startStarfieldEffect(evt) {
    init();
    // Iniciar la animación del efecto de Desplazamiento de Cielo Estrellado
    starfieldInterval = setInterval(function () {
        starfieldEffect();
    }, 50); //  velocidad del efecto
}
function convertirEfectoMarciano(evt) {
    var imagenSal = new ImageType(pantalla1, imgLocal.getImage());
    imagenSal.imageArray2DtoData(pantalla2, MathImg.toMartianEffect(imagenSal));
}
function realce(evt) {
    var args = prompt('Ingresa el valor del realce');
    var umbral = parseFloat(args);
    var imagenSal = new ImageType(pantalla1, imgLocal.getImage());
    imagenSal.imageArray2DtoData(pantalla2, MathImg.toluster(imagenSal, umbral));
}
function realcedef(evt) {
    var args = prompt('Ingresa el valor separados por comas ejemplo: "5, 8")');
    var parametros = args.split(',').map(function (elem) { return parseFloat(elem); });
    var porcion = parametros[0];
    var factor = parametros[1];
    var imagenSal = new ImageType(pantalla1, imgLocal.getImage());
    imagenSal.imageArray2DtoData(pantalla2, MathImg.realcedefido(imagenSal, porcion, factor));
}
function vren(evt) {
    var args = prompt('Ingresa el renglon');
    var r = parseFloat(args);
    var imagenSal = new ImageType(pantalla1, imgLocal.getImage());
    var canvas1 = lienzo3;
    var graphics1 = pantalla3;
    var hist = MathImg.ren(imagenSal, r);
    var miCanvas1 = new CanvasLocal(graphics1, canvas1, hist);
    miCanvas1.paint();
}
function vcol(evt) {
    var args = prompt('Ingresa el columna');
    var r = parseFloat(args);
    var imagenSal = new ImageType(pantalla1, imgLocal.getImage());
    var canvas1 = lienzo3;
    var graphics1 = pantalla3;
    var hist = MathImg.col(imagenSal, r);
    var miCanvas1 = new CanvasLocal(graphics1, canvas1, hist);
    miCanvas1.paint();
}
///nuevo codigo
function correccionGamma(evt) {
    var args = prompt('Ingresa los factores de correccion Gamma, separados por coma');
    var factores = args.split(',').map(function (elem) { return parseFloat(elem); });
    var imagenSal = new ImageType(pantalla1, imgLocal.getImage());
    imagenSal.imageArray2DtoData(pantalla2, MathImg.correctionGamma(imagenSal, factores));
}
function umbralizado(evt) {
    var args = prompt('Ingresa el valor del umbral');
    var umbral = parseFloat(args);
    var imagenSal = new ImageType(pantalla1, imgLocal.getImage());
    imagenSal.imageArray2DtoData(pantalla2, MathImg.toUmbral(imagenSal, umbral));
}
function desfaseX(evt) {
    var args = prompt('Ingresa el valor del desfase en X');
    var des = parseFloat(args);
    var imagenSal = new ImageType(pantalla1, imgLocal.getImage());
    imagenSal.imageArray2DtoData(pantalla2, MathImg.toDesfaceX(imagenSal, des));
}
function desfaseY(evt) {
    var args = prompt('Ingresa el valor del desfase en Y');
    var desy = parseFloat(args);
    var imagenSal = new ImageType(pantalla1, imgLocal.getImage());
    imagenSal.imageArray2DtoData(pantalla2, MathImg.toDesfaceY(imagenSal, desy));
}
function desfaseD(evt) {
    var args = prompt('Ingresa el valor del desfase y angulo');
    var rangos = args.split(',').map(function (elem) { return parseFloat(elem); });
    var imagenSal = new ImageType(pantalla1, imgLocal.getImage());
    imagenSal.imageArray2DtoData(pantalla2, MathImg.toDesfaceD(imagenSal, rangos[0], rangos[1]));
}
function umbral2limites(evt) {
    var args = prompt('Ingresa el rango minimo y el maximo separado por comas');
    var rangos = args.split(',').map(function (elem) { return parseFloat(elem); });
    var imagenSal = new ImageType(pantalla1, imgLocal.getImage());
    imagenSal.imageArray2DtoData(pantalla2, MathImg.toUmbral2limites(imagenSal, rangos));
}
function changeBrightness(evt) {
    var factor = prompt("Ingresa un valor en el rango de 0-2, como un porcentaje");
    var imagenSal = new ImageType(pantalla1, imgLocal.getImage());
    imagenSal.imageArray2DtoData(pantalla2, MathImg.changeBrightness(imagenSal, parseFloat(factor)));
}
function cambioFtransferencia(evt) {
    var args = prompt('Ingresa los valores de la funcion de transferencia, separados por coma');
    var factores = args.split(',').map(function (elem) { return parseFloat(elem); });
    //console.log(factores, factores.length)
    var imagenSal = new ImageType(pantalla1, imgLocal.getImage());
    imagenSal.imageArray2DtoData(pantalla2, MathImg.cambioFTransferencia(imagenSal, factores));
}
function colorGradienteX(evt) {
    var args = prompt("Ingresa color de Inicio y final en formato r,g,b, separados por coma");
    var factores = args.split(',').map(function (elem) { return parseFloat(elem); });
    var imagenSal = new ImageType(pantalla1, imgLocal.getImage());
    imagenSal.imageArray2DtoData(pantalla2, MathImg.colorGradienteX(imagenSal, factores));
}
function colorGradienteY(evt) {
    var args = prompt("Ingresa color de Inicio y final en formato r,g,b, separados por coma");
    var factores = args.split(',').map(function (elem) { return parseFloat(elem); });
    var imagenSal = new ImageType(pantalla1, imgLocal.getImage());
    imagenSal.imageArray2DtoData(pantalla2, MathImg.colorGradientY(imagenSal, factores));
}
function opchangeContraste(evt) {
    var argss = prompt('Ingresa un valor entre el rango de -100 a 100');
    var valor = parseFloat(argss);
    var imagenSal = new ImageType(pantalla1, imgLocal.getImage());
    imagenSal.imageArray2DtoData(pantalla2, MathImg.changeContraste(imagenSal, valor));
}
function opgetPow(evt) {
    var argss = prompt('Ingresa un numero ( potencia )');
    var valor = parseFloat(argss);
    var imagenSal = new ImageType(pantalla1, imgLocal.getImage());
    imagenSal.imageArray2DtoDataWithResizing(pantalla2, MathImg.pow(imagenSal, valor));
}
function coseno(evt) {
    var imagenSal = new ImageType(pantalla1, imgLocal.getImage());
    imagenSal.imageArray2DtoDataWithResizing(pantalla2, MathImg.toCos(imagenSal));
}
function multiplicacion(evt) {
    var argss = prompt('Ingresa un numero real');
    var valor = parseFloat(argss);
    var imagenSal = new ImageType(pantalla1, imgLocal.getImage());
    imagenSal.imageArray2DtoDataWithResizing(pantalla2, MathImg.toMultiplication(imagenSal, valor));
}
function subtract(evt) {
    var argss = prompt('Ingresa un numero real');
    var restar = parseFloat(argss);
    var imagenSal = new ImageType(pantalla1, imgLocal.getImage());
    imagenSal.imageArray2DtoDataWithResizing(pantalla2, MathImg.toSubtract(imagenSal, restar));
}
function funcionSine(evt) {
    var imagenSal = new ImageType(pantalla1, imgLocal.getImage());
    imagenSal.imageArray2DtoDataWithResizing(pantalla2, MathImg.toSine(imagenSal));
}
function add(evt) {
    var argss = prompt('Ingresa un numero real');
    var sumar = parseFloat(argss);
    var imagenSal = new ImageType(pantalla1, imgLocal.getImage());
    imagenSal.imageArray2DtoData(pantalla2, MathImg.toAdd(imagenSal, sumar));
}
function sqrt(evt) {
    var imagenSal = new ImageType(pantalla1, imgLocal.getImage());
    imagenSal.imageArray2DtoDataWithResizing(pantalla2, MathImg.toSqrt(imagenSal));
}
function div(evt) {
    var argss = prompt('Ingresa un numero real');
    var dividir = parseFloat(argss);
    if (dividir === 0) {
        var argss = prompt('Ingresa un valor diferente de 0');
        var dividir = parseFloat(argss);
        var imagenSal = new ImageType(pantalla1, imgLocal.getImage());
        imagenSal.imageArray2DtoDataWithResizing(pantalla2, MathImg.toDividir(imagenSal, dividir));
    }
    else {
        var imagenSal = new ImageType(pantalla1, imgLocal.getImage());
        imagenSal.imageArray2DtoDataWithResizing(pantalla2, MathImg.toDividir(imagenSal, dividir));
    }
}
function tan(evt) {
    var imagenSal = new ImageType(pantalla1, imgLocal.getImage());
    imagenSal.imageArray2DtoDataWithResizing(pantalla2, MathImg.toTan(imagenSal));
}
function sumaImg(evt) {
    var imagenSal = new ImageType(pantalla1, imgLocal.getImage());
    var imagen2 = new ImageType(pantalla4, imgLocal4.getImage());
    imagenSal.imageArray2DtoData(pantalla2, MathImg.addImg(imagenSal, imagen2));
}
function marcaAguaCentro(evt) {
    var imagenSal = new ImageType(pantalla1, imgLocal.getImage());
    var imagen2 = new ImageType(pantalla4, imgLocal4.getImage());
    imagenSal.imageArray2DtoDataWithResizing(pantalla2, MathImg.marcaAguaCentro(imagenSal, imagen2, 1));
}
function marcaAguaArray(evt) {
    var argss = prompt('Ingresa porcentaje de ponderacion ');
    var porc = parseFloat(argss);
    var imagenSal = new ImageType(pantalla1, imgLocal.getImage());
    var imagen2 = new ImageType(pantalla4, imgLocal4.getImage());
    imagenSal.imageArray2DtoDataWithResizing(pantalla2, MathImg.marcaAguaArray(imagenSal, imagen2, porc));
}
//variables adicionales para el efecto rain
var ctx = pantalla2;
var w;
var h;
var numberOfParticles = 1000;
var particlesArray;
particlesArray = new Array(0);
var imagenSal;
function init() {
    //init
    var imagenSal = new ImageType(pantalla1, imgLocal.getImage());
    var tmp = MathImg.relativeBrightness(imagenSal);
    w = imagenSal.getWidth();
    h = imagenSal.getHeight();
    for (var i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle(w, h, ctx, tmp));
    }
}
function animate() {
    ctx.drawImage(imgLocal.getImage(), 0, 0, w, h);
    ctx.globalAlpha = 0.25;
    ctx.fillStyle = 'rgb(0,0,0)';
    ctx.fillRect(0, 0, w, h);
    for (var i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
    }
    requestAnimationFrame(animate);
}
function animate2() {
    ctx.globalAlpha = 0.25;
    ctx.fillStyle = 'rgb(0,0,0)';
    ctx.fillRect(0, 0, w, h);
    for (var i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        ctx.globalAlpha = particlesArray[i].getSpeed() * 0.5;
        particlesArray[i].draw();
    }
    requestAnimationFrame(animate2);
}
function rain(evt) {
    init();
    animate();
}
function rain2(evt) {
    init();
    animate2();
}
//codigo para efecto de particulas
var particleArray;
var mouse = {
    x: null,
    y: null,
    radius: 50
};
function handleMouse(e) {
    mouse.x = e.x; // - canvasPosition.left;
    mouse.y = e.y; // - canvasPosition.top;
    //console.log(mouse.x, mouse.y)
}
function textEfects(evt) {
    var args = prompt("Ingresa texto, tamaño de texto y coord x y y, separados por coma:");
    var factores = args.split(','); //.map(elem => parseInt(elem));
    pantalla1.font = 'bold  ' + factores[1] + 'px Verdana';
    //let cadena = 
    pantalla1.fillText(factores[0], parseInt(factores[2]), parseInt(factores[3]));
    imagenSal = new ImageType(pantalla1, null, 300, 300, true);
    initParticles();
    animateParticles();
}
function initParticles() {
    particleArray = [];
    var arrImage = imagenSal.getArrayImg();
    for (var i = 0; i < 300; i++) {
        for (var j = 0; j < 300; j++) {
            if (arrImage[0][i][j] > 128) {
                particleArray.push(new ParticleText(j, i, pantalla1));
            }
        }
    }
}
function animateParticles() {
    pantalla1.clearRect(0, 0, 300, 300);
    for (var i = 0; i < particleArray.length; i++) {
        particleArray[i].update(mouse);
        particleArray[i].draw();
    }
    requestAnimationFrame(animateParticles);
}
//seccion de histogramas  
function histogramas(evt) {
    var imagenSal = new ImageType(pantalla1, imgLocal.getImage());
    var canvas1 = lienzo2;
    var graphics1 = pantalla2;
    var canvas2 = lienzo4;
    var graphics2 = pantalla4;
    var hist = MathImg.hist(imagenSal);
    var miCanvas1 = new CanvasLocal(graphics1, canvas1, hist);
    miCanvas1.paint();
    var histAc = MathImg.histAcum(hist);
    var miCanvas2 = new CanvasLocal(graphics2, canvas2, histAc);
    miCanvas2.paint();
}
function ecualizado(evt) {
    var imagenSal = new ImageType(pantalla1, imgLocal.getImage());
    imagenSal.imageArray2DtoData(pantalla2, MathImg.ecualizar(imagenSal));
}
function erosionarImg(evt) {
    var imagenSal = new ImageType(pantalla1, imgLocal.getImage());
    imagenSal.imageArray2DtoData(pantalla2, MathImg.erosionar(imagenSal, true));
}
function dilatarImg(evt) {
    var imagenSal = new ImageType(pantalla1, imgLocal.getImage());
    imagenSal.imageArray2DtoData(pantalla2, MathImg.dilatar(imagenSal, true));
}
function aperturaImg(evt) {
    var imagenSal = new ImageType(pantalla1, imgLocal.getImage());
    imagenSal.imageArray2DtoData(pantalla2, MathImg.apertura(imagenSal, true));
}
function cierreImg(evt) {
    var imagenSal = new ImageType(pantalla1, imgLocal.getImage());
    imagenSal.imageArray2DtoData(pantalla2, MathImg.cierre(imagenSal, true));
}
function opchangeFalsoColor(evt) {
    var argss = prompt('Ingresa un valor de color Hue');
    var hue = parseFloat(argss);
    var imagenSal = new ImageType(pantalla1, imgLocal.getImage());
    imagenSal.imageArray2DtoData(pantalla2, MathImg.fromHSItoRGB(MathImg.falseColorByHue(MathImg.fromRGBtoHSI(imagenSal), hue, 210)));
}
function generarPulso(evt) {
    var imagenSal = new ImageType(pantalla1, imgLocal.getImage());
    imagenSal.imageArray2DtoData(pantalla2, MathImg.pulso(imgLocal.getImage().width, imgLocal.getImage().height));
}
function generarRuido(evt) {
    var imagenSal = new ImageType(pantalla1, imgLocal.getImage());
    imagenSal.imageArray2DtoData(pantalla2, MathImg.ruido(imgLocal.getImage().width, imgLocal.getImage().height));
}
function generarRampaX(evt) {
    var imagenSal = new ImageType(pantalla1, imgLocal.getImage());
    imagenSal.imageArray2DtoDataWithResizing(pantalla1, MathImg.rampaX(imgLocal.getImage().width, imgLocal.getImage().height));
}
function generarRampaY(evt) {
    var imagenSal = new ImageType(pantalla1, imgLocal.getImage());
    imagenSal.imageArray2DtoDataWithResizing(pantalla1, MathImg.rampaY(imgLocal.getImage().width, imgLocal.getImage().height));
}
function escalarImagen(evt) {
    var argss = prompt('Ingresa un factor de escala');
    var factor = parseFloat(argss);
    //var imagenSal: ImageType = new ImageType(pantalla1, imgLocal.getImage());
    var imagenSal = new ImageType(pantalla2, null, Math.floor(imgLocal.getImage().width * factor), Math.floor(imgLocal.getImage().height * factor));
    imagenSal.imageArray2DtoData(pantalla2, MathImg.escalar(imagenSal, factor));
}
function escalarImagen2(evt) {
    var argss = prompt('Ingresa un factor de escala');
    var factor = parseFloat(argss);
    pantalla2.drawImage(imgLocal.getImage(), 0, 0, Math.floor(imgLocal.getImage().width * factor), Math.floor(imgLocal.getImage().height * factor));
}
function rotarImagen(evt) {
    var argss = prompt('Ingresa un angulo de rotacion');
    var angulo = parseFloat(argss);
    var imagenSal = new ImageType(pantalla1, imgLocal.getImage());
    imagenSal.imageArray2DtoData(pantalla2, MathImg.rotar(imagenSal, angulo));
}
function rotarImagen2(evt) {
    var argss = prompt('Ingresa un angulo de rotacion');
    var angulo = parseFloat(argss);
    //pantalla2.drawImage(imgLocal.getImage(), 0,0)
    pantalla2.translate(Math.floor(imgLocal.getImage().width / 2), Math.floor(imgLocal.getImage().height / 2));
    pantalla2.rotate(angulo * Math.PI / 180);
    pantalla2.translate(-Math.floor(imgLocal.getImage().width / 2), -Math.floor(imgLocal.getImage().height / 2));
    pantalla2.drawImage(imgLocal.getImage(), 0, 0);
}
function shearingX(evt) {
    var argss = prompt('Ingresa un factor de shearing');
    var factor = parseFloat(argss);
    var imagenSal = new ImageType(pantalla1, imgLocal.getImage());
    imagenSal.imageArray2DtoData(pantalla2, MathImg.shearingX(imagenSal, factor));
}
function shearingY(evt) {
    var argss = prompt('Ingresa un factor de shearing');
    var factor = parseFloat(argss);
    var imagenSal = new ImageType(pantalla1, imgLocal.getImage());
    imagenSal.imageArray2DtoData(pantalla2, MathImg.shearingY(imagenSal, factor));
}
function tAfin(evt) {
    var argss = prompt('Ingresa 6 valores para t Afin, con x3<x1<x2 y y1<y2, y1<y3');
    var factores = argss.split(',').map(function (elem) { return parseInt(elem); });
    var imagenSal = new ImageType(pantalla1, imgLocal.getImage());
    imagenSal.imageArray2DtoData(pantalla2, MathImg.tAfin(imagenSal, factores));
}
lienzo1.addEventListener('mousemove', handleMouse);
lienzo1.addEventListener("mousemove", imgLocal.drawSmallImg);
document.getElementById('files').addEventListener('change', imgLocal.handleFileSelect, false);
document.getElementById('files2').addEventListener('change', imgLocal4.handleFileSelect, false);
dropZone.addEventListener('dragover', handleDragOver, false);
dropZone.addEventListener('drop', imgLocal.handleFileSelect, false);
//menu op basicas
document.getElementById("op-gris").addEventListener('click', convertirAGris, false);
document.getElementById("op-negativo").addEventListener('click', convertirANegativo, false);
document.getElementById("op-neg-gris").addEventListener('click', convertirANegativoGrises, false);
document.getElementById("op-rojo").addEventListener('click', convertirARojo, false);
document.getElementById("op-verde").addEventListener('click', convertirAVerde, false);
document.getElementById("op-azul").addEventListener('click', convertirAAzul, false);
document.getElementById("op-tricolor").addEventListener('click', convertirTricolor, false);
document.getElementById("op-TricolorHorizontal").addEventListener('click', convertirTricolorHorizontal, false);
document.getElementById("op-tricolorGradual").addEventListener('click', convertirTricolorGradual, false);
(_a = document.getElementById("op-shift-effect")) === null || _a === void 0 ? void 0 : _a.addEventListener('click', startShiftEffect, false);
(_b = document.getElementById("op-color-change")) === null || _b === void 0 ? void 0 : _b.addEventListener('click', startColorChange, false);
(_c = document.getElementById("op-bubbles-effect")) === null || _c === void 0 ? void 0 : _c.addEventListener('click', startBubblesEffect, false);
document.getElementById("op-rotation").addEventListener('click', startRotationEffect, false);
document.getElementById('applyMirrorEffect').addEventListener('click', startMirrorEffect);
document.getElementById("op-water").addEventListener('click', startWaterEffect, false);
document.getElementById("op-butterflies").addEventListener('click', startButterfliesEffect, false);
document.getElementById('applyAnimeEffect').addEventListener('click', startAnimeEffect);
document.getElementById('applyGlitchEffect').addEventListener('click', glitchEffect);
document.getElementById('applyThanosSnapEffect').addEventListener('click', startThanosSnapEffect);
document.getElementById('applyMatrixEffect').addEventListener('click', startMatrixEffect);
document.getElementById('applyBatmanEffect').addEventListener('click', startBatmanEffect);
document.getElementById('startParallaxEffect').addEventListener('click', startParallaxEffect);
document.getElementById('startVortexEffect').addEventListener('click', startVortexEffect);
document.getElementById('applyStarfieldEffect').addEventListener('click', startStarfieldEffect);
document.getElementById("op-realce").addEventListener('click', realce, false);
document.getElementById("op-realcedefinido").addEventListener('click', realcedef, false);
document.getElementById("op-marciano").addEventListener('click', convertirEfectoMarciano, false);
document.getElementById("op-vren").addEventListener('click', vren, false);
document.getElementById("op-vcol").addEventListener('click', vcol, false);
//document.getElementById("op-vcol").addEventListener('click', vcol, false);
document.getElementById("op-gamma").addEventListener('click', correccionGamma, false);
document.getElementById("op-umbral1").addEventListener('click', umbralizado, false);
document.getElementById("op-umbral-2-limites").addEventListener('click', umbral2limites, false);
document.getElementById("op-desfaseX").addEventListener('click', desfaseX, false);
document.getElementById("op-desfaseY").addEventListener('click', desfaseY, false);
document.getElementById("op-desfaseD").addEventListener('click', desfaseD, false);
//menu op. edicion
document.getElementById("op-brillo").addEventListener('click', changeBrightness, false);
document.getElementById("op-ftrans").addEventListener('click', cambioFtransferencia, false);
document.getElementById("op-gradienteX").addEventListener('click', colorGradienteX, false);
document.getElementById("op-gradienteY").addEventListener('click', colorGradienteY, false);
document.getElementById("op-contraste").addEventListener('click', opchangeContraste, false);
document.getElementById("op-falsocolor").addEventListener('click', opchangeFalsoColor, false);
//op matematicas
document.getElementById("op-pow").addEventListener('click', opgetPow, false);
document.getElementById("op-sqrt").addEventListener('click', sqrt, false);
document.getElementById("op-sine").addEventListener('click', funcionSine, false);
document.getElementById("op-cos").addEventListener('click', coseno, false);
document.getElementById("op-tan").addEventListener('click', tan, false);
document.getElementById("op-add").addEventListener('click', add, false);
document.getElementById("op-subtract").addEventListener('click', subtract, false);
document.getElementById("op-multiplicacion").addEventListener('click', multiplicacion, false);
document.getElementById("op-div").addEventListener('click', div, false);
//op con imagenes compuestas
document.getElementById("op-addimg").addEventListener('click', sumaImg, false);
document.getElementById("op-marca-agua-centro").addEventListener('click', marcaAguaCentro, false);
document.getElementById("op-marca-agua-array").addEventListener('click', marcaAguaArray, false);
//op con efectos
document.getElementById("op-rain").addEventListener('click', rain, false);
document.getElementById("op-rain2").addEventListener('click', rain2, false);
//op con texto.
document.getElementById("op-text").addEventListener('click', textEfects, false);
//histogramas
document.getElementById("op-hist").addEventListener('click', histogramas, false);
document.getElementById("op-ecualizar").addEventListener('click', ecualizado, false);
//mortfologia
document.getElementById("op-eros").addEventListener('click', erosionarImg, false);
document.getElementById("op-dila").addEventListener('click', dilatarImg, false);
document.getElementById("op-aper").addEventListener('click', aperturaImg, false);
document.getElementById("op-cier").addEventListener('click', cierreImg, false);
//operacion con imagenes siteticas
document.getElementById("op-pulso").addEventListener('click', generarPulso, false);
document.getElementById("op-ruido").addEventListener('click', generarRuido, false);
document.getElementById("op-rampax").addEventListener('click', generarRampaX, false);
document.getElementById("op-rampay").addEventListener('click', generarRampaY, false);
//operaciones geometricas
document.getElementById("op-escalamiento").addEventListener('click', escalarImagen2, false);
document.getElementById("op-rotacion").addEventListener('click', rotarImagen2, false);
document.getElementById("op-shearingX").addEventListener('click', shearingX, false);
document.getElementById("op-shearingY").addEventListener('click', shearingY, false);
document.getElementById("op-afin").addEventListener('click', tAfin, false);
