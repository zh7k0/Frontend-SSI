import { get, post, update } from '@/services/ApiService';


interface F29Response extends Formulario29 {
  folio: number,
  periodo: string,
  rut: number
}

interface Periodo {
  month: number,
  year: number,
}

export interface F29ShortResponse {
  folio: number,
  periodo: string
}

const resource = 'f29';

function obtenerF29(folio?: number): Promise<F29Response> {
  return get(resource, folio);
}

function guardarF29(data: Formulario29, estado: string, periodo?: string) {
  let payload = {};
  if (periodo) {
    payload = {...data, 'estado': estado, 'periodo': periodo}
  } else {
    payload = {...data, 'estado': estado }; 
  }
  return post<F29Response>(resource, payload);
}

function actualizarF29(data: Formulario29, folio: number, nuevoEstado?: string) {
  let payload = {...data};
  if (typeof nuevoEstado != 'undefined') {
    payload = {...data, 'estado': nuevoEstado};
  }
  return update(resource, folio, payload);
}

function buscarF29(periodo: Periodo): Promise<F29Response> {
  const campoBusqueda = 'periodo';
  return post('buscar-f29-por', {...periodo, field: campoBusqueda});
}

function obtenerFormularios(): Promise<Object> {
  return get('f29');
}

function resumenF29Empresa(rut: number, year?: number): Promise<F29ShortResponse[]> {
  let url = `${resource}/${rut}`;
  if (typeof year != 'undefined') {
    url += `/${year}`;
  }
  return get<F29ShortResponse[]>(url);
}

export {
  obtenerF29,
  guardarF29,
  actualizarF29,
  buscarF29,
  obtenerFormularios,
  resumenF29Empresa
}