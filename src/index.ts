
import { ImageLocal } from "./ImageLocal.js";
import { ImageType } from "./ImageType.js";
import { MathImg } from "./MathImg.js";
import { Particle } from "./particle.js";
import { ParticleText } from "./particle.js";
import { CanvasLocal } from './canvasLocal.js';

let lienzo1: HTMLCanvasElement;
let lienzo2: HTMLCanvasElement;
let lienzo3: HTMLCanvasElement;
let lienzo4: HTMLCanvasElement;
let pantalla1: CanvasRenderingContext2D;
let pantalla2: CanvasRenderingContext2D;
let pantalla3: CanvasRenderingContext2D;
let pantalla4: CanvasRenderingContext2D;

/* Este evento controla la forma de abrir un archivo mediante el evento de arrastrar y soltar */
function handleDragOver(evt:any) {
    evt.stopPropagation();
    evt.preventDefault(); //que no se abra en otra ventana sola la imagen
    evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
}

  /** Variables que controla el canvas de la imagen, el primero 
   * posteriormemte se volveran arreglos cuando ya controlemos las seis ventanas de nuestro frame
  */
lienzo1 = <HTMLCanvasElement>document.getElementById('img1');
pantalla1 = lienzo1.getContext("2d");
lienzo2 = <HTMLCanvasElement>document.getElementById('img2');
pantalla2 = lienzo2.getContext("2d");
lienzo3 = <HTMLCanvasElement>document.getElementById('img3');
pantalla3 = lienzo3.getContext("2d");
lienzo4 = <HTMLCanvasElement>document.getElementById('img4');
pantalla4 = lienzo4.getContext("2d");

var dropZone = lienzo1;//document.getElementById('img1');
var imgLocal: ImageLocal = new ImageLocal(pantalla1);
imgLocal.getImage().onload = imgLocal.onload;
var imgLocal4: ImageLocal = new ImageLocal(pantalla4);
imgLocal4.getImage().onload = imgLocal4.onload;

function convertirAGris(evt: any): void{
  var imagenSal:ImageType = new ImageType(pantalla1, imgLocal.getImage());
  imagenSal.imageArray2DtoData(pantalla2, MathImg.toGray(imagenSal));
}
function convertirANegativo(evt: any): void{
  var imagenSal:ImageType = new ImageType(pantalla1, imgLocal.getImage());
  imagenSal.imageArray2DtoData(pantalla2, MathImg.toNegative(imagenSal));
}
function convertirANegativoGrises(evt: any): void{
  var imagenSal:ImageType = new ImageType(pantalla1, imgLocal.getImage());
  imagenSal.imageArray2DtoData(pantalla2, MathImg.toNegativeGrises(imagenSal));
}
function convertirARojo(evt: any): void{
  var imagenSal:ImageType = new ImageType(pantalla1, imgLocal.getImage());
  imagenSal.imageArray2DtoData(pantalla2, MathImg.toRed(imagenSal));
}
function convertirAVerde(evt: any): void{
  var imagenSal:ImageType = new ImageType(pantalla1, imgLocal.getImage());
  imagenSal.imageArray2DtoData(pantalla2, MathImg.toGreen(imagenSal));
}
function convertirAAzul(evt: any): void{
  var imagenSal:ImageType = new ImageType(pantalla1, imgLocal.getImage());
  imagenSal.imageArray2DtoData(pantalla2, MathImg.toBlue(imagenSal));
}
//este codigo se agreo el 4 de abril de 2022
function convertirTricolor(evt: any): void{
  var imagenSal:ImageType = new ImageType(pantalla1, imgLocal.getImage());
  imagenSal.imageArray2DtoData(pantalla2, MathImg.toTricolor(imagenSal));
}
////////////hasta aqui
//este codigo se agreo el 23 de septiembre de 2023
function convertirTricolorHorizontal(evt: any): void{
  var imagenSal:ImageType = new ImageType(pantalla1, imgLocal.getImage());
  imagenSal.imageArray2DtoData(pantalla2, MathImg.toTricolorHorizontal(imagenSal));
}
function convertirTricolorGradual(evt: any): void{
  var imagenSal:ImageType = new ImageType(pantalla1, imgLocal.getImage());
  imagenSal.imageArray2DtoData(pantalla2, MathImg.toGradualTricolor(imagenSal));
}


//////////fiesta/////////////////
const colorPalette = [
  [255, 0, 0],   // Rojo
  [0, 255, 0],   // Verde
  [0, 0, 255],   // Azul
  [255, 255, 0], // Amarillo
  [255, 0, 255], // Magenta
  [0, 255, 255]  // Cian
];

let currentColorIndex = 0;

function changeColorEffect() {
  ctx.drawImage(imgLocal.getImage(), 0, 0, w, h);

  const imagenSal: ImageType = new ImageType(pantalla1, imgLocal.getImage());
  const color = colorPalette[currentColorIndex];

  // Aplicar el color a la imagen
  const colorEffect = MathImg.applyColorEffect(imagenSal, color);
  imagenSal.imageArray2DtoData(pantalla2, colorEffect);

  // Cambiar al próximo color en la paleta
  currentColorIndex = (currentColorIndex + 1) % colorPalette.length;

  // Solicitar la siguiente animación
  setTimeout(changeColorEffect, 500); // Cambia de color cada medio segundo
}

function startColorChange(evt: any): void {
  init();
  changeColorEffect();
}

/////movimiento//////

let shiftOffsetX = 0;
let shiftOffsetY = 0;

function shiftImageEffect() {
    ctx.drawImage(imgLocal.getImage(), 0, 0, w, h);

    const imagenSal: ImageType = new ImageType(pantalla1, imgLocal.getImage());
    const shiftedImage = MathImg.applyShiftEffect(imagenSal, shiftOffsetX, shiftOffsetY);
    imagenSal.imageArray2DtoData(pantalla2, shiftedImage);

    // Incrementa los desplazamientos para la próxima animación
    shiftOffsetX = (shiftOffsetX + 1) % w;
    shiftOffsetY = (shiftOffsetY + 1) % h;

    requestAnimationFrame(shiftImageEffect);
}

function startShiftEffect(evt: any): void {
    init();
    shiftImageEffect();
}


//rotacion////
let rotationAngle = 0;

function rotateImageEffect() {
    ctx.clearRect(0, 0, w, h);

    const imagenSal: ImageType = new ImageType(pantalla1, imgLocal.getImage());
    const rotatedImage = MathImg.applyRotationEffect(imagenSal, rotationAngle);
    imagenSal.imageArray2DtoData(pantalla2, rotatedImage);

    // Solicitar la siguiente rotación
    rotationAngle = (rotationAngle + 1) % 360;

    requestAnimationFrame(rotateImageEffect);
}

function startRotationEffect(evt: any): void {
    init();
    rotateImageEffect();
}

////espejo//
let mirrorOffsetX = 0;

function mirrorEffect() {
    ctx.clearRect(0, 0, w, h);

    const imagenSal: ImageType = new ImageType(pantalla1, imgLocal.getImage());
    
    // Dibujar la imagen original
    ctx.drawImage(imgLocal.getImage(), 0, 0, w, h);

    // Aplicar el efecto espejo
    const mirroredImage = MathImg.applyMirrorEffect(imagenSal, mirrorOffsetX);
    imagenSal.imageArray2DtoData(pantalla2, mirroredImage);

    // Incrementar el desplazamiento para la próxima animación
    mirrorOffsetX = (mirrorOffsetX + 1) % w;

    requestAnimationFrame(mirrorEffect);
}

function startMirrorEffect(evt: any): void {
    init();
    mirrorEffect();
}


//AGUA//////
function startWaterEffect(evt: any): void {
  // Inicializar la imagen
  const imagenSal: ImageType = new ImageType(pantalla1, imgLocal.getImage());

  // Inicializar el tiempo para simular movimiento en las ondas
  let time = 0;

  function animateWaterEffect() {
      // Aplicar el efecto de agua utilizando la función en MathImg
      const waterImage = MathImg.applyWaterEffect(imagenSal, time);

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


///ANIME////

function animeEffect() {
  ctx.clearRect(0, 0, w, h);

  const imagenSal: ImageType = new ImageType(pantalla1, imgLocal.getImage());
  
  // Dibujar la imagen original
  ctx.drawImage(imgLocal.getImage(), 0, 0, w, h);

  // Aplicar el efecto anime
  const animeImage = MathImg.applyAnimeEffect(imagenSal);
  imagenSal.imageArray2DtoData(pantalla2, animeImage);

  requestAnimationFrame(animeEffect);
}

function startAnimeEffect(evt: any): void {
  init();
  animeEffect();
}

///GLICHT//
let glitchInterval: number | null = null;

function glitchEffect() {
    ctx.clearRect(0, 0, w, h);

    const imagenSal: ImageType = new ImageType(pantalla1, imgLocal.getImage());

    // Dibujar la imagen original
    ctx.drawImage(imgLocal.getImage(), 0, 0, w, h);

    // Aplicar el efecto de Glitch
    const glitchedImage = MathImg.applyGlitchEffect(imagenSal);
    imagenSal.imageArray2DtoData(pantalla2, glitchedImage);

    if (glitchInterval === null) {
        // Iniciar un intervalo para el efecto de Glitch
        glitchInterval = setInterval(() => {
            const glitchedImage = MathImg.applyGlitchEffect(imagenSal);
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


///DESTRUCION EN PUNTOS BLANCOS//
let BLANCOSInterval: number | null = null;
let startTime: number = 0;

function BLANCOSSnapEffect(): void {
  ctx.clearRect(0, 0, w, h);

  const imagenSal: ImageType = new ImageType(pantalla1, imgLocal.getImage());

  // Dibujar la imagen original
  ctx.drawImage(imgLocal.getImage(), 0, 0, w, h);

  // Aplicar el efecto de BLANCOS Snap
  const snappedImage = MathImg.applyBLANCOSSnapEffect(imagenSal);
  imagenSal.imageArray2DtoData(pantalla2, snappedImage);

  // Verificar si han pasado 3 segundos
  if (Date.now() - startTime >= 3000) {
    // Después de 3 segundos, hacer que la imagen se vuelva completamente negra
    ctx.clearRect(0, 0, w, h);
    ctx.fillRect(0, 0, w, h);  // Rellenar el lienzo con un rectángulo negro
  } else {
    // Seguir animando hasta que pasen los 3 segundos
    requestAnimationFrame(BLANCOSSnapEffect);
  }
}

function startBLANCOSSnapEffect(): void {
  init();

  // Iniciar el temporizador de 3 segundos antes de aplicar el efecto
  BLANCOSInterval = setTimeout(() => {
    // Guardar el tiempo de inicio
    startTime = Date.now();
    BLANCOSSnapEffect();
  }, 30);
}



///confeti//
let confetiInterval: number | null = null;

function confetiEffect(): void {
  ctx.clearRect(0, 0, w, h);

  const imagenSal: ImageType = new ImageType(pantalla1, imgLocal.getImage());

  // Dibujar la imagen original
  ctx.drawImage(imgLocal.getImage(), 0, 0, w, h);

  // Aplicar el efecto confeti
  const confetiImage = MathImg.applyconfetiEffect(imagenSal);
  imagenSal.imageArray2DtoData(pantalla2, confetiImage);

  requestAnimationFrame(confetiEffect);
}

function startconfetiEffect(evt: any): void {
  init();

  // Iniciar el efecto confeti
  confetiInterval = setInterval(() => {
    confetiEffect();
  }, 100); // Ajusta la velocidad 
}



///STARPARALLAXEFFECT//
let parallaxOffsetX = 0;
let parallaxOffsetY = 0;

function parallaxEffect() {
  ctx.clearRect(0, 0, w, h);

  const imagenSal: ImageType = new ImageType(pantalla1, imgLocal.getImage());

  // Dibujar la imagen original
  ctx.drawImage(imgLocal.getImage(), 0, 0, w, h);

  // Aplicar el efecto Parallax
  const parallaxImage = MathImg.applyParallaxEffect(imagenSal, parallaxOffsetX, parallaxOffsetY);
  imagenSal.imageArray2DtoData(pantalla2, parallaxImage);

  parallaxOffsetX += 1;  //  ajustar la velocidad en X
  parallaxOffsetY += 0.5;  //  ajustar la velocidad en Y

  requestAnimationFrame(parallaxEffect);
}

// Función para iniciar el efecto Parallax
function startParallaxEffect(evt: any): void {
  init();
  parallaxEffect();
}


//vortice//
let vortexCenterX: number;
let vortexCenterY: number;

function vortexEffect(): void {
  ctx.clearRect(0, 0, w, h);

  const imagenSal: ImageType = new ImageType(pantalla1, imgLocal.getImage());

  // Dibujar la imagen original
  ctx.drawImage(imgLocal.getImage(), 0, 0, w, h);

  // Aplicar el efecto de vórtice
  const vortexedImage = MathImg.applyVortexEffect(imagenSal, vortexCenterX, vortexCenterY);
  imagenSal.imageArray2DtoData(pantalla2, vortexedImage);

  requestAnimationFrame(vortexEffect);
}

function startVortexEffect(evt: any): void {
  init();

  // Definir el centro del vórtice 
  vortexCenterX = w / 2;
  vortexCenterY = h / 2;

  vortexEffect();
}
//CIELO ESTRELLADO//
let starfieldInterval: number | null = null;

function starfieldEffect(): void {
  ctx.clearRect(0, 0, w, h);

  const imagenSal: ImageType = new ImageType(pantalla1, imgLocal.getImage());

  // Dibujar la imagen original
  ctx.drawImage(imgLocal.getImage(), 0, 0, w, h);

  // Aplicar el efecto de Desplazamiento de Cielo Estrellado
  const starfieldImage = MathImg.applyStarfieldEffect(imagenSal);
  imagenSal.imageArray2DtoData(pantalla2, starfieldImage);

  requestAnimationFrame(starfieldEffect);
}

function startStarfieldEffect(evt: any): void {
  init();

  // Iniciar la animación del efecto de Desplazamiento de Cielo Estrellado
  starfieldInterval = setInterval(() => {
    starfieldEffect();
  }, 50); //  velocidad del efecto
}


////espiral///
function startSwirlEffect(evt: any): void {
  // Inicializar la imagen
  const imagenSal: ImageType = new ImageType(pantalla1, imgLocal.getImage());

  // Inicializar el ángulo para simular el movimiento del torbellino
  let angle = 0;

  function animateSwirlEffect() {
    // Aplicar el efecto de torbellino utilizando la función en MathImg
    const swirlImage = MathImg.applySwirlEffect(imagenSal, angle);

    // Mostrar la imagen resultante
    imagenSal.imageArray2DtoData(pantalla2, swirlImage);

    // Incrementar el ángulo para la próxima animación
    angle += 0.05;

    // Solicitar la siguiente animación
    requestAnimationFrame(animateSwirlEffect);
  }

  // Iniciar la animación
  animateSwirlEffect();
}

































function convertirEfectoMarciano(evt: any): void{
  var imagenSal:ImageType = new ImageType(pantalla1, imgLocal.getImage());
  imagenSal.imageArray2DtoData(pantalla2, MathImg.toMartianEffect(imagenSal));
}

function realce(evt: any): void{
  var args = prompt('Ingresa el valor del realce');
  var umbral = parseFloat(args);
  var imagenSal:ImageType = new ImageType(pantalla1, imgLocal.getImage());
  imagenSal.imageArray2DtoData(pantalla2, MathImg.toluster(imagenSal, umbral));
}

function realcedef(evt: any): void {
  var args = prompt('Ingresa el valor separados por comas ejemplo: "5, 8")');
    var parametros = args.split(',').map(elem => parseFloat(elem));
    var porcion = parametros[0];
    var factor = parametros[1];
    var imagenSal: ImageType = new ImageType(pantalla1, imgLocal.getImage());
    imagenSal.imageArray2DtoData(pantalla2, MathImg.realcedefido(imagenSal, porcion, factor));
}



function vren(evt: any): void{
  var args = prompt('Ingresa el renglon');
  var r = parseFloat(args);
  const imagenSal: ImageType = new ImageType(pantalla1, imgLocal.getImage());
  let canvas1: HTMLCanvasElement = lienzo3;
  let graphics1: CanvasRenderingContext2D = pantalla3;

  let hist = MathImg.ren(imagenSal, r);
  const miCanvas1:CanvasLocal = new CanvasLocal(graphics1, canvas1, hist);
  miCanvas1.paint();
}
function vcol(evt: any): void{
  var args = prompt('Ingresa el columna');
  var r = parseFloat(args);
  const imagenSal: ImageType = new ImageType(pantalla1, imgLocal.getImage());
  let canvas1: HTMLCanvasElement = lienzo3;
  let graphics1: CanvasRenderingContext2D = pantalla3;

  let hist = MathImg.col(imagenSal, r);
  const miCanvas1:CanvasLocal = new CanvasLocal(graphics1, canvas1, hist);
  miCanvas1.paint();
}

///nuevo codigo
function correccionGamma(evt: any): void{
  var args = prompt('Ingresa los factores de correccion Gamma, separados por coma');
  var factores = args.split(',').map(elem => parseFloat(elem));
  var imagenSal:ImageType = new ImageType(pantalla1, imgLocal.getImage());
  imagenSal.imageArray2DtoData(pantalla2, MathImg.correctionGamma(imagenSal, factores));
}

function umbralizado(evt: any): void{
  var args = prompt('Ingresa el valor del umbral');
  var umbral = parseFloat(args);
  var imagenSal:ImageType = new ImageType(pantalla1, imgLocal.getImage());
  imagenSal.imageArray2DtoData(pantalla2, MathImg.toUmbral(imagenSal, umbral));
}
function desfaseX(evt: any): void{
  var args = prompt('Ingresa el valor del desfase en X');
  var des = parseFloat(args);
  var imagenSal:ImageType = new ImageType(pantalla1, imgLocal.getImage());
  imagenSal.imageArray2DtoData(pantalla2, MathImg.toDesfaceX(imagenSal, des));
}
function desfaseY(evt: any): void{
  var args = prompt('Ingresa el valor del desfase en Y');
  var desy = parseFloat(args);
  var imagenSal:ImageType = new ImageType(pantalla1, imgLocal.getImage());
  imagenSal.imageArray2DtoData(pantalla2, MathImg.toDesfaceY(imagenSal, desy));
}
function desfaseD(evt: any): void{
  var args = prompt('Ingresa el valor del desfase y angulo');
  var rangos = args.split(',').map(elem => parseFloat(elem));
  var imagenSal:ImageType = new ImageType(pantalla1, imgLocal.getImage());
  imagenSal.imageArray2DtoData(pantalla2, MathImg.toDesfaceD(imagenSal, rangos[0], rangos[1]));
}
function umbral2limites(evt: any): void{
    var args = prompt('Ingresa el rango minimo y el maximo separado por comas');
    var rangos = args.split(',').map(elem => parseFloat(elem));
    var imagenSal:ImageType = new ImageType(pantalla1, imgLocal.getImage());
    imagenSal.imageArray2DtoData(pantalla2, MathImg.toUmbral2limites(imagenSal, rangos));
}


function changeBrightness(evt: any): void {
    var factor = prompt ("Ingresa un valor en el rango de 0-2, como un porcentaje");
    var imagenSal:ImageType = new ImageType(pantalla1, imgLocal.getImage());
    imagenSal.imageArray2DtoData(pantalla2, MathImg.changeBrightness(imagenSal,  parseFloat(factor)));
}

function cambioFtransferencia(evt: any): void {
  var args = prompt('Ingresa los valores de la funcion de transferencia, separados por coma');
  var factores = args.split(',').map(elem => parseFloat(elem));
  //console.log(factores, factores.length)
  var imagenSal:ImageType = new ImageType(pantalla1, imgLocal.getImage());
  imagenSal.imageArray2DtoData(pantalla2, MathImg.cambioFTransferencia(imagenSal, factores));
}
function colorGradienteX(evt: any): void{
  var args = prompt("Ingresa color de Inicio y final en formato r,g,b, separados por coma");
  var factores = args.split(',').map(elem => parseFloat(elem));
  var imagenSal:ImageType=new ImageType(pantalla1, imgLocal.getImage());
  imagenSal.imageArray2DtoData(pantalla2, MathImg.colorGradienteX(imagenSal, factores));
}
function colorGradienteY(evt: any): void{
  var args = prompt("Ingresa color de Inicio y final en formato r,g,b, separados por coma");
  var factores = args.split(',').map(elem => parseFloat(elem));
  var imagenSal:ImageType=new ImageType(pantalla1, imgLocal.getImage());
  imagenSal.imageArray2DtoData(pantalla2, MathImg.colorGradientY(imagenSal, factores));
}
function opchangeContraste(evt: any): void{
    var argss = prompt('Ingresa un valor entre el rango de -100 a 100');
    var valor = parseFloat(argss);
    var imagenSal:ImageType=new ImageType(pantalla1, imgLocal.getImage());
    imagenSal.imageArray2DtoData(pantalla2, MathImg.changeContraste(imagenSal, valor));
}
function opgetPow(evt: any): void{
  var argss = prompt('Ingresa un numero ( potencia )');
  var valor = parseFloat(argss);
  var imagenSal:ImageType=new ImageType(pantalla1, imgLocal.getImage());
  imagenSal.imageArray2DtoDataWithResizing(pantalla2, MathImg.pow(imagenSal, valor));
}
function coseno(evt: any): void{
  var imagenSal:ImageType=new ImageType(pantalla1, imgLocal.getImage());
  imagenSal.imageArray2DtoDataWithResizing(pantalla2, MathImg.toCos(imagenSal));
}
function multiplicacion(evt: any): void{
  var argss = prompt('Ingresa un numero real');
  var valor = parseFloat(argss);
  var imagenSal:ImageType=new ImageType(pantalla1, imgLocal.getImage());
  imagenSal.imageArray2DtoDataWithResizing(pantalla2, MathImg.toMultiplication(imagenSal, valor));
}
function subtract(evt: any): void{
  var argss = prompt('Ingresa un numero real');
  var restar = parseFloat(argss);
  var imagenSal:ImageType=new ImageType(pantalla1, imgLocal.getImage());
  imagenSal.imageArray2DtoDataWithResizing(pantalla2, MathImg.toSubtract(imagenSal, restar));
} 
function funcionSine(evt: any): void{
  var imagenSal:ImageType = new ImageType(pantalla1, imgLocal.getImage());
  imagenSal.imageArray2DtoDataWithResizing(pantalla2, MathImg.toSine(imagenSal));
}
function add(evt: any): void{
  var argss = prompt('Ingresa un numero real');
  var sumar = parseFloat(argss);
  var imagenSal:ImageType=new ImageType(pantalla1, imgLocal.getImage());
  imagenSal.imageArray2DtoData(pantalla2, MathImg.toAdd(imagenSal, sumar));
}
function sqrt(evt: any): void{
  var imagenSal:ImageType=new ImageType(pantalla1, imgLocal.getImage());
  imagenSal.imageArray2DtoDataWithResizing(pantalla2, MathImg.toSqrt(imagenSal));
}  
function div(evt: any): void{
  var argss = prompt('Ingresa un numero real');
  var dividir = parseFloat(argss);
  if(dividir===0){
    var argss = prompt('Ingresa un valor diferente de 0');
    var dividir = parseFloat(argss);
    var imagenSal:ImageType=new ImageType(pantalla1, imgLocal.getImage());
    imagenSal.imageArray2DtoDataWithResizing(pantalla2, MathImg.toDividir(imagenSal, dividir));
  }
  else{
    var imagenSal:ImageType=new ImageType(pantalla1, imgLocal.getImage());
    imagenSal.imageArray2DtoDataWithResizing(pantalla2, MathImg.toDividir(imagenSal, dividir));
  }
}
function tan(evt: any): void{
  var imagenSal:ImageType = new ImageType(pantalla1, imgLocal.getImage());
  imagenSal.imageArray2DtoDataWithResizing(pantalla2, MathImg.toTan(imagenSal));
} 

function sumaImg(evt: any): void{
  var imagenSal: ImageType = new ImageType(pantalla1, imgLocal.getImage());
  var imagen2:ImageType = new ImageType(pantalla4, imgLocal4.getImage());
  imagenSal.imageArray2DtoData(pantalla2, MathImg.addImg(imagenSal, imagen2));
} 

function marcaAguaCentro(evt: any): void{
  var imagenSal: ImageType = new ImageType(pantalla1, imgLocal.getImage());
  var imagen2:ImageType = new ImageType(pantalla4, imgLocal4.getImage());
  imagenSal.imageArray2DtoDataWithResizing(pantalla2, MathImg.marcaAguaCentro(imagenSal, imagen2, 1));
} 

function marcaAguaArray(evt: any): void{
  let argss = prompt('Ingresa porcentaje de ponderacion ');
  let porc = parseFloat(argss);
  var imagenSal: ImageType = new ImageType(pantalla1, imgLocal.getImage());
  var imagen2:ImageType = new ImageType(pantalla4, imgLocal4.getImage());
  imagenSal.imageArray2DtoDataWithResizing(pantalla2, MathImg.marcaAguaArray(imagenSal, imagen2, porc));
}

//variables adicionales para el efecto rain
let ctx = pantalla2;
let w:number;
let h:number;
const numberOfParticles = 1000;
let particlesArray: Particle[];
particlesArray = new Array(0);
var imagenSal: ImageType;

function init() {
  //init
  var imagenSal: ImageType = new ImageType(pantalla1, imgLocal.getImage());
  let tmp = MathImg.relativeBrightness(imagenSal);
  w = imagenSal.getWidth();
  h = imagenSal.getHeight();
  for (let i = 0; i < numberOfParticles; i++){
    particlesArray.push(new Particle(w, h, ctx, tmp));
  }
}

function animate() {
  ctx.drawImage(imgLocal.getImage(), 0, 0, w, h);
  ctx.globalAlpha = 0.25;
  ctx.fillStyle = 'rgb(0,0,0)';
  ctx.fillRect(0, 0, w, h);
  for (let i = 0; i < particlesArray.length; i++){
    particlesArray[i].update();
    particlesArray[i].draw();
  }
  requestAnimationFrame(animate);
}

function animate2() {
  ctx.globalAlpha = 0.25;
  ctx.fillStyle = 'rgb(0,0,0)';
  ctx.fillRect(0, 0, w, h);
  for (let i = 0; i < particlesArray.length; i++){
    particlesArray[i].update();
    ctx.globalAlpha = particlesArray[i].getSpeed()*0.5;
    particlesArray[i].draw();
  }
  requestAnimationFrame(animate2);
}

function rain(evt: any): void { 
  init();
  animate();
}

function rain2(evt: any): void { 
  init();
  animate2();
}

//codigo para efecto de particulas
let particleArray: ParticleText[];
let mouse:any = {
  x: null,
  y: null,
  radius: 50
};

function handleMouse(e: any) {
  mouse.x = e.x;// - canvasPosition.left;
  mouse.y = e.y;// - canvasPosition.top;
  //console.log(mouse.x, mouse.y)
}

function textEfects(evt: any): void{
  var args = prompt("Ingresa texto, tamaño de texto y coord x y y, separados por coma:");
  
  var factores = args.split(',');//.map(elem => parseInt(elem));
  pantalla1.font = 'bold  ' + factores[1] + 'px Verdana';
  //let cadena = 
  pantalla1.fillText(factores[0], parseInt(factores[2]), parseInt(factores[3]));
  imagenSal = new ImageType(pantalla1, null, 300, 300, true);
  initParticles();
  animateParticles();
}

function initParticles() {
  particleArray = [];
  let arrImage = imagenSal.getArrayImg();
  for (let i = 0; i < 300; i++){
    for (let j = 0; j < 300; j++) { 
      if (arrImage[0][i][j] > 128) {
        particleArray.push(new ParticleText(j, i, pantalla1));
      }
    }
  } 
}

function animateParticles(){
  pantalla1.clearRect(0,0,300,300);
  for (let i = 0; i < particleArray.length; i++){
      particleArray[i].update(mouse);
      particleArray[i].draw();
  }
  requestAnimationFrame(animateParticles);
}
//seccion de histogramas  
function histogramas(evt: any): void{
  const imagenSal: ImageType = new ImageType(pantalla1, imgLocal.getImage());
  let canvas1: HTMLCanvasElement = lienzo2;
  let graphics1: CanvasRenderingContext2D = pantalla2;
  let canvas2: HTMLCanvasElement = lienzo4;
  let graphics2: CanvasRenderingContext2D = pantalla4;

  let hist = MathImg.hist(imagenSal);
  const miCanvas1:CanvasLocal = new CanvasLocal(graphics1, canvas1, hist);
  miCanvas1.paint();
  let histAc = MathImg.histAcum(hist);
  const miCanvas2:CanvasLocal = new CanvasLocal(graphics2, canvas2, histAc);
  miCanvas2.paint();
 
} 
function ecualizado(evt: any): void{
  var imagenSal:ImageType = new ImageType(pantalla1, imgLocal.getImage());
  imagenSal.imageArray2DtoData(pantalla2, MathImg.ecualizar(imagenSal));
} 

function erosionarImg(evt: any): void{
  var imagenSal:ImageType = new ImageType(pantalla1, imgLocal.getImage());
  imagenSal.imageArray2DtoData(pantalla2, MathImg.erosionar(imagenSal, true));
}

function dilatarImg(evt: any): void{
  var imagenSal:ImageType = new ImageType(pantalla1, imgLocal.getImage());
  imagenSal.imageArray2DtoData(pantalla2, MathImg.dilatar(imagenSal, true));
} 
function aperturaImg(evt: any): void{
  var imagenSal:ImageType = new ImageType(pantalla1, imgLocal.getImage());
  imagenSal.imageArray2DtoData(pantalla2, MathImg.apertura(imagenSal, true));
}
function cierreImg(evt: any): void{
  var imagenSal:ImageType = new ImageType(pantalla1, imgLocal.getImage());
  imagenSal.imageArray2DtoData(pantalla2, MathImg.cierre(imagenSal, true));
}

function opchangeFalsoColor(evt: any): void{
  var argss = prompt('Ingresa un valor de color Hue');
  var hue = parseFloat(argss);
  var imagenSal: ImageType = new ImageType(pantalla1, imgLocal.getImage());
  imagenSal.imageArray2DtoData(pantalla2, MathImg.fromHSItoRGB(MathImg.falseColorByHue( MathImg.fromRGBtoHSI(imagenSal), hue, 210)));
}

function generarPulso(evt: any): void{
  var imagenSal: ImageType = new ImageType(pantalla1, imgLocal.getImage());
  imagenSal.imageArray2DtoData(pantalla2, MathImg.pulso(imgLocal.getImage().width, imgLocal.getImage().height));
}

function generarRuido(evt: any): void{
  var imagenSal: ImageType = new ImageType(pantalla1, imgLocal.getImage());
  imagenSal.imageArray2DtoData(pantalla2, MathImg.ruido(imgLocal.getImage().width, imgLocal.getImage().height));
}

function generarRampaX(evt: any): void{
  var imagenSal: ImageType = new ImageType(pantalla1, imgLocal.getImage());
  imagenSal.imageArray2DtoDataWithResizing(pantalla1, MathImg.rampaX(imgLocal.getImage().width, imgLocal.getImage().height));
}

function generarRampaY(evt: any): void{
  var imagenSal: ImageType = new ImageType(pantalla1, imgLocal.getImage());
  imagenSal.imageArray2DtoDataWithResizing(pantalla1, MathImg.rampaY(imgLocal.getImage().width, imgLocal.getImage().height));
}

function escalarImagen(evt: any): void{
  var argss = prompt('Ingresa un factor de escala');
  var factor = parseFloat(argss);
  //var imagenSal: ImageType = new ImageType(pantalla1, imgLocal.getImage());
  var imagenSal: ImageType = new ImageType(pantalla2, null, Math.floor(imgLocal.getImage().width*factor), Math.floor(imgLocal.getImage().height*factor));
  imagenSal.imageArray2DtoData(pantalla2, MathImg.escalar(imagenSal, factor));
}
function escalarImagen2(evt: any): void{
  var argss = prompt('Ingresa un factor de escala');
  var factor = parseFloat(argss);
  pantalla2.drawImage(imgLocal.getImage(), 0,0, Math.floor(imgLocal.getImage().width*factor), Math.floor(imgLocal.getImage().height*factor));
 }

function rotarImagen(evt: any): void{
  var argss = prompt('Ingresa un angulo de rotacion');
  var angulo = parseFloat(argss);
  var imagenSal: ImageType = new ImageType(pantalla1, imgLocal.getImage());
  imagenSal.imageArray2DtoData(pantalla2, MathImg.rotar(imagenSal, angulo));
}
function rotarImagen2(evt: any): void{
  var argss = prompt('Ingresa un angulo de rotacion');
  var angulo = parseFloat(argss);
  //pantalla2.drawImage(imgLocal.getImage(), 0,0)
  pantalla2.translate(Math.floor(imgLocal.getImage().width/2), Math.floor(imgLocal.getImage().height/2));
  pantalla2.rotate(angulo* Math.PI / 180);
  pantalla2.translate(-Math.floor(imgLocal.getImage().width/2), -Math.floor(imgLocal.getImage().height/2));
  pantalla2.drawImage(imgLocal.getImage(), 0,0);
 }
function shearingX(evt: any): void{
  var argss = prompt('Ingresa un factor de shearing');
  var factor = parseFloat(argss);
  var imagenSal: ImageType = new ImageType(pantalla1, imgLocal.getImage());
  imagenSal.imageArray2DtoData(pantalla2, MathImg.shearingX(imagenSal, factor));
}

function shearingY(evt: any): void{
  var argss = prompt('Ingresa un factor de shearing');
  var factor = parseFloat(argss);
  var imagenSal: ImageType = new ImageType(pantalla1, imgLocal.getImage());
  imagenSal.imageArray2DtoData(pantalla2, MathImg.shearingY(imagenSal, factor));
}
function tAfin(evt: any): void{
  var argss = prompt('Ingresa 6 valores para t Afin, con x3<x1<x2 y y1<y2, y1<y3');
  var factores = argss.split(',').map(elem => parseInt(elem));
  var imagenSal: ImageType = new ImageType(pantalla1, imgLocal.getImage());
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



document.getElementById("op-shift-effect")?.addEventListener('click', startShiftEffect, false);
document.getElementById("op-color-change")?.addEventListener('click', startColorChange, false);
document.getElementById("op-rotation").addEventListener('click', startRotationEffect, false);
document.getElementById('applyMirrorEffect').addEventListener('click', startMirrorEffect);
document.getElementById("op-water").addEventListener('click', startWaterEffect, false); 
document.getElementById('applyAnimeEffect').addEventListener('click', startAnimeEffect);
document.getElementById('applyGlitchEffect').addEventListener('click', glitchEffect);
document.getElementById('applyBLANCOSSnapEffect')?.addEventListener('click', startBLANCOSSnapEffect);
document.getElementById('applyconfetiEffect').addEventListener('click', startconfetiEffect);
document.getElementById('startParallaxEffect').addEventListener('click', startParallaxEffect);
document.getElementById('startVortexEffect').addEventListener('click', startVortexEffect);
document.getElementById('applyStarfieldEffect').addEventListener('click', startStarfieldEffect);
document.getElementById('applySwirlEffect').addEventListener('click', startSwirlEffect);











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