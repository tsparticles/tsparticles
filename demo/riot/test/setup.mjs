import { register } from "node:module";
import "jsdom-global/register.js";

register("@riotjs/register", import.meta.url);
