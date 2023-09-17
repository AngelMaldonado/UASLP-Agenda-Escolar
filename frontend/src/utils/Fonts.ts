/**
 * TODO: Mover tokens dentro de :root en index.css
 */

/*
const Display = "Display";
const Tipografia_Display = "OpenSans";
const Tamanio_Display = "35px";
const Estilo_Display = "Bold";

const elemento_Display = document.getElementById("Display");

elemento_Display?.style.fontFamily = "";

class Tipografia
 {
    constructor(public display: string, public titulo2: string, public titulo3: number, 
        public textomd: string, public textomd1: string, public textosm: string, public textosm1: string
        public textoxs: string,public textoxs1: string )
    {}

 }

 const tipo_Display: Tipografia = Tipografia.

 // Constante que representa la configuración de tipografía "Display"
const TIPOGRAFIA_DISPLAY_CONFIG = {
    familia: "OpenSans",
    tamaño: "35px",
    estilo: "bold",
  };
  
  // Uso de la constante en un ejemplo
  console.log(`Familia: ${TIPOGRAFIA_DISPLAY_CONFIG.familia}`);
  console.log(`Tamaño: ${TIPOGRAFIA_DISPLAY_CONFIG.tamaño}`);
  console.log(`Estilo: ${TIPOGRAFIA_DISPLAY_CONFIG.estilo}`);
  
  */
  // Constante para Display
const DISPLAY: TypographyConfig = {
  fontFamily: "OpenSans",
  fontSize: "35px",
  fontWeight: "bold",
};

// Constante para TituloNivel2
const TITULO_NIVEL_2: TypographyConfig = {
  fontFamily: "OpenSans",
  fontSize: "35px",
  fontWeight: "bold",
};

// Constante para TituloNivel3
const TITULO_NIVEL_3: TypographyConfig = {
  fontFamily: "OpenSans",
  fontSize: "35px",
  fontWeight: "600", // Semibold generalmente se representa como 600 en el valor de fontWeight
};

// Constantes adicionales
const TEXTO_LG: TypographyConfig = {
  fontFamily: "OpenSans",
  fontSize: "25px",
  fontWeight: "light",
};

const TEXTO_MD: TypographyConfig = {
  fontFamily: "OpenSans",
  fontSize: "22px",
  fontWeight: "light",
};

const TEXTO_MD_1: TypographyConfig = {
  fontFamily: "OpenSans",
  fontSize: "22px",
  fontWeight: "600", // Semibold
};

const TEXTO_SM: TypographyConfig = {
  fontFamily: "OpenSans",
  fontSize: "20px",
  fontWeight: "regular",
};

const TEXTO_SM_1: TypographyConfig = {
  fontFamily: "OpenSans",
  fontSize: "20px",
  fontWeight: "regular",
};

const TEXTO_XS: TypographyConfig = {
  fontFamily: "OpenSans",
  fontSize: "18px",
  fontWeight: "regular",
};

const TEXTO_XS_1: TypographyConfig = {
  fontFamily: "OpenSans",
  fontSize: "18px",
  fontWeight: "light",
};

// Tipo personalizado para representar la configuración de tipografía
interface TypographyConfig {
  fontFamily: string;
  fontSize: string;
  fontWeight: string;
}

// Ejemplo de uso de las constantes
console.log("DISPLAY:", DISPLAY);
console.log("TITULO_NIVEL_2:", TITULO_NIVEL_2);
console.log("TITULO_NIVEL_3:", TITULO_NIVEL_3);
console.log("TEXTO_LG:", TEXTO_LG);
console.log("TEXTO_MD:", TEXTO_MD);
console.log("TEXTO_MD_1:", TEXTO_MD_1);
console.log("TEXTO_SM:", TEXTO_SM);
console.log("TEXTO_SM_1:", TEXTO_SM_1);
console.log("TEXTO_XS:", TEXTO_XS);
console.log("TEXTO_XS_1:", TEXTO_XS_1);
