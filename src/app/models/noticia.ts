export interface Tag {
    idtags: number;
    nombre: string;
  }
  
  export interface Noticia {
    idnoticia: number;
    titulo: string;
    descripcion: string;
    imagen?: string;
    fecha_hora: string;
    status: string;
    privilegio: string;
    tags: Tag[];
  }