import { EndpointRequestInit as EndpointRequestInit_1 } from "@vaadin/hilla-frontend";
import client_1 from "./connect-client.default.js";
async function create_1(nombre: string | undefined, fecha: string | undefined, idBanda: number | undefined, init?: EndpointRequestInit_1): Promise<void> { return client_1.call("AlbumService", "create", { nombre, fecha, idBanda }, init); }
async function listAlbum_1(init?: EndpointRequestInit_1): Promise<Array<Record<string, unknown> | undefined> | undefined> { return client_1.call("AlbumService", "listAlbum", {}, init); }
async function listaBanda_1(init?: EndpointRequestInit_1): Promise<Array<Record<string, unknown> | undefined> | undefined> { return client_1.call("AlbumService", "listaBanda", {}, init); }
export { create_1 as create, listaBanda_1 as listaBanda, listAlbum_1 as listAlbum };
