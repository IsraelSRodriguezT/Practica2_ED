import { EndpointRequestInit as EndpointRequestInit_1 } from "@vaadin/hilla-frontend";
import client_1 from "./connect-client.default.js";
async function create_1(nombre: string | undefined, idGenero: number | undefined, duracion: number | undefined, url: string | undefined, tipo: string | undefined, idAlbum: number | undefined, init?: EndpointRequestInit_1): Promise<void> { return client_1.call("CancionService", "create", { nombre, idGenero, duracion, url, tipo, idAlbum }, init); }
async function listCancion_1(init?: EndpointRequestInit_1): Promise<Array<Record<string, unknown> | undefined> | undefined> { return client_1.call("CancionService", "listCancion", {}, init); }
async function listTipo_1(init?: EndpointRequestInit_1): Promise<Array<string | undefined> | undefined> { return client_1.call("CancionService", "listTipo", {}, init); }
async function listaAlbum_1(init?: EndpointRequestInit_1): Promise<Array<Record<string, unknown> | undefined> | undefined> { return client_1.call("CancionService", "listaAlbum", {}, init); }
async function listaGenero_1(init?: EndpointRequestInit_1): Promise<Array<Record<string, unknown> | undefined> | undefined> { return client_1.call("CancionService", "listaGenero", {}, init); }
export { create_1 as create, listaAlbum_1 as listaAlbum, listaGenero_1 as listaGenero, listCancion_1 as listCancion, listTipo_1 as listTipo };
