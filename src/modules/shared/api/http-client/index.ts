import { getServerUrl } from "../utils";
import { HttpClient } from "./http-client";

export const httpClient = new HttpClient(getServerUrl());
