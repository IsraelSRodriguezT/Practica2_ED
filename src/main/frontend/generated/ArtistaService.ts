import { EndpointRequestInit as EndpointRequestInit_1 } from "@vaadin/hilla-frontend";
import client_1 from "./connect-client.default.js";
async function create_1(nombre: string | undefined, nacionalidad: string | undefined, init?: EndpointRequestInit_1): Promise<void> { return client_1.call("ArtistaService", "create", { nombre, nacionalidad }, init); }
async function listArtista_1(init?: EndpointRequestInit_1): Promise<Array<Record<string, unknown> | undefined> | undefined> { return client_1.call("ArtistaService", "listArtista", {}, init); }
async function listCountry_1(init?: EndpointRequestInit_1): Promise<Array<string | undefined> | undefined> { return client_1.call("ArtistaService", "listCountry", {}, init); }
export { create_1 as create, listArtista_1 as listArtista, listCountry_1 as listCountry };
