export interface Mascota {
  id: string;
  nombre: string;
  especie_id: string;
  raza_id: string;
  sexo: 'Macho' | 'Hembra';
  color: string;
  esterilizacion: boolean;
  propietario_id: string;
  propietario?: Propietario;
  especie?: {
    id: string;
    nombre: string;
    codigo: string;
  };
  raza?: {
    id: string;
    nombre: string;
  };
  alergias?: any[];
  condiciones?: any[];
}

export interface Propietario {
  id: string;
  nombre: string;
  paterno: string;
  materno?: string;
  tipo_documento_id?: string;
  nro_doc: number;
  email: string;
  celular?: string;
  nro_emergencia?: string;
}
