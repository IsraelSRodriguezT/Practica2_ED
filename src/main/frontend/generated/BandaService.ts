import { EndpointRequestInit as EndpointRequestInit_1 } from "@vaadin/hilla-frontend";
import type Banda_1 from "./com/unl/practica2/base/models/Banda.js";
import client_1 from "./connect-client.default.js";
async function create_1(nombre: string | undefined, fecha: string | undefined, init?: EndpointRequestInit_1): Promise<void> { return client_1.call("BandaService", "create", { nombre, fecha }, init); }
async function listAllBanda_1(init?: EndpointRequestInit_1): Promise<Array<Banda_1 | undefined> | undefined> { return client_1.call("BandaService", "listAllBanda", {}, init); }
async function listBanda_1(init?: EndpointRequestInit_1): Promise<Array<Record<string, unknown> | undefined> | undefined> { return client_1.call("BandaService", "listBanda", {}, init); }
export { create_1 as create, listAllBanda_1 as listAllBanda, listBanda_1 as listBanda };
