

export interface ContactosResponse{
    id: number;
    nombre: string;
    apellido: string;
    cedula: string;
    correos: Correo[];
    telefonos: Telefono[]
}


interface Correo {
    id: number;
    direccionCorreo: string;
    contactoId: string
}

interface Telefono {
    id: number;
    numeroTelefono: string;
    contactoId: string
}