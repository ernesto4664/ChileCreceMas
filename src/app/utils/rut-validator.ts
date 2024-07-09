// src/app/utils/rut-validator.ts
export function validarRut(rut: string): boolean {
    if (!rut || typeof rut !== 'string') {
      return false;
    }
  
    // Limpiar RUT: eliminar puntos, guiones y espacios
    rut = rut.replace(/\./g, '').replace(/-/g, '').replace(/\s+/g, '');
  
    // Verificar que tenga al menos 2 caracteres (un número y un dígito verificador)
    if (rut.length < 2) {
      return false;
    }
  
    // Extraer el dígito verificador
    const dv = rut.charAt(rut.length - 1).toUpperCase();
    const cuerpo = rut.slice(0, -1);
  
    // Verificar que el cuerpo sea un número
    if (!/^\d+$/.test(cuerpo)) {
      return false;
    }
  
    // Calcular el dígito verificador esperado
    let suma = 0;
    let multiplo = 2;
  
    for (let i = cuerpo.length - 1; i >= 0; i--) {
      suma += parseInt(cuerpo.charAt(i), 10) * multiplo;
      multiplo = multiplo < 7 ? multiplo + 1 : 2;
    }
  
    const dvEsperado = 11 - (suma % 11);
    let dvCalculado = '';
  
    if (dvEsperado === 11) {
      dvCalculado = '0';
    } else if (dvEsperado === 10) {
      dvCalculado = 'K';
    } else {
      dvCalculado = dvEsperado.toString();
    }
  
    return dvCalculado === dv;
  }
  