import { EndpointRequestInit as EndpointRequestInit_1 } from "@vaadin/hilla-frontend";
import client_1 from "./connect-client.default.js";
async function create_1(rol: string | undefined, idArtista: number | undefined, idBanda: number | undefined, init?: EndpointRequestInit_1): Promise<void> { return client_1.call("Artista_BandaService", "create", { rol, idArtista, idBanda }, init); }
async function listArtista_Banda_1(init?: EndpointRequestInit_1): Promise<Array<Record<string, unknown> | undefined> | undefined> { return client_1.call("Artista_BandaService", "listArtista_Banda", {}, init); }
async function listRol_1(init?: EndpointRequestInit_1): Promise<Array<string | undefined> | undefined> { return client_1.call("Artista_BandaService", "listRol", {}, init); }
async function listaArtista_1(init?: EndpointRequestInit_1): Promise<Array<Record<string, unknown> | undefined> | undefined> { return client_1.call("Artista_BandaService", "listaArtista", {}, init); }
async function listaBanda_1(init?: EndpointRequestInit_1): Promise<Array<Record<string, unknown> | undefined> | undefined> { return client_1.call("Artista_BandaService", "listaBanda", {}, init); }
export { create_1 as create, listaArtista_1 as listaArtista, listaBanda_1 as listaBanda, listArtista_Banda_1 as listArtista_Banda, listRol_1 as listRol };
