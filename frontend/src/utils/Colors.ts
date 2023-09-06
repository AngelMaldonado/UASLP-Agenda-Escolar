// Define un tipo llamado Color para representar colores
class Color
 {
    constructor(public red: number, public green: number, public blue: number)
    {}
  
    // Constructor estático para crear instancias de Color en formato RGB
    static RGB(red: number, green: number, blue: number) 
    {
      return new Color(red, green, blue);
    }
  }
  
  // Crea las instancias de Color utilizando el constructor estático RGBA
  const prim: Color = Color.RGB(0, 74, 152);
  const prim_80: Color = Color.RGB(30, 107, 188);
  const prim_50: Color = Color.RGB(66, 138, 215);
  const prim_20: Color = Color.RGB(140, 191, 245);

  const sec: Color = Color.RGB(0, 74, 152);
  const sec_80: Color = Color.RGB(0, 74, 152);
  const sec_50: Color = Color.RGB(0, 74, 152);
  const sec_20: Color = Color.RGB(0, 74, 152);

  const ter: Color = Color.RGB(0, 74, 152);
  const ter_80: Color = Color.RGB(0, 74, 152);
  const ter_50: Color = Color.RGB(0, 74, 152);
  const ter_20: Color = Color.RGB(0, 74, 152);

  const alerta: Color = Color.RGB(0, 74, 152);
  const alerta_80: Color = Color.RGB(0, 74, 152);
  const alerta_50: Color = Color.RGB(0, 74, 152);
  const alerta_20: Color = Color.RGB(0, 74, 152);

  const error: Color = Color.RGB(0, 74, 152);
  const error_80: Color = Color.RGB(0, 74, 152);
  const error_50: Color = Color.RGB(0, 74, 152);
  const error_20: Color = Color.RGB(0, 74, 152);

  const exito: Color = Color.RGB(0, 255, 56);
  const exito_80: Color = Color.RGB(60, 255, 103);
  const exito_50: Color = Color.RGB(109, 255, 141);
  const exito_20: Color = Color.RGB(160, 255, 181);
  
  const negro: Color = Color.RGB(0, 0, 0);
  const negro_80: Color = Color.RGB(54, 54, 54);
  const negro_50: Color = Color.RGB(87, 87, 87);
  const negro_20: Color = Color.RGB(114, 114, 114);

  const blanco: Color = Color.RGB(255, 255, 255);
  const blanco_80: Color = Color.RGB(243, 243, 243);

  