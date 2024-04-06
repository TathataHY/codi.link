import { encode, decode } from "js-base64";
import Split from "split-grid";
import "./style.css";

// Variables para elementos del DOM
const $html = document.getElementById("html");
const $js = document.getElementById("js");
const $css = document.getElementById("css");
const $iframe = document.querySelector("iframe");

// Función para actualizar el contenido del iframe
const updateIframe = () => {
  const htmlContent = $html.value;
  const cssContent = $css.value;
  const jsContent = $js.value;

  $iframe.srcdoc = generateSrcDoc(htmlContent, cssContent, jsContent);
  updateHistory(htmlContent, cssContent, jsContent);
};

// Función para generar el contenido srcdoc del iframe
const generateSrcDoc = (htmlContent, cssContent, jsContent) => {
  return `
    <html>
        <body>${htmlContent}</body>
        <style>${cssContent}</style>
        <script>${jsContent}</script>
    </html>
  `;
};

// Función para actualizar el historial del navegador
const updateHistory = (htmlContent, cssContent, jsContent) => {
  const hashedCode = `/${encode(htmlContent)}|${encode(cssContent)}|${encode(
    jsContent
  )}`;
  window.history.replaceState(null, null, `${hashedCode}`);
};

// Función para recuperar el contenido de los campos HTML, JS y CSS
const recoverCode = () => {
  const [html, css, js] = window.location.pathname.slice(1).split("%7C");

  $html.value = decode(html);
  $css.value = decode(css);
  $js.value = decode(js);
};

// Función para inicializar la aplicación
const initializeApp = () => {
  // Escucha eventos de entrada en los campos HTML, JS y CSS
  $html.addEventListener("input", updateIframe);
  $js.addEventListener("input", updateIframe);
  $css.addEventListener("input", updateIframe);

  // Actualiza el contenido del iframe al cargar la ventana
  recoverCode();
  updateIframe();

  // Configura el plugin Split para las columnas y filas
  configureSplitPlugin();
};

// Función para configurar el plugin Split para las columnas y filas
const configureSplitPlugin = () => {
  Split({
    columnGutters: [
      {
        track: 1,
        element: document.querySelector(".gutter-col-1"),
      },
    ],
    rowGutters: [
      {
        track: 1,
        element: document.querySelector(".gutter-row-1"),
      },
    ],
  });
};

// Función que se ejecuta al cargar la ventana
window.onload = initializeApp;
