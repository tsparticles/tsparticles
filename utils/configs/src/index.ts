import { type ISourceOptions, tsParticles } from "@tsparticles/engine";
import a from "./a/index.js";
import b from "./b/index.js";
import c from "./c/index.js";
import d from "./d/index.js";
import e from "./e/index.js";
import f from "./f/index.js";
import g from "./g/index.js";
import h from "./h/index.js";
import i from "./i/index.js";
import j from "./j/index.js";
import k from "./k/index.js";
import l from "./l/index.js";
import m from "./m/index.js";
import n from "./n/index.js";
import o from "./o/index.js";
import p from "./p/index.js";
import q from "./q/index.js";
import r from "./r/index.js";
import s from "./s/index.js";
import t from "./t/index.js";
import u from "./u/index.js";
import v from "./v/index.js";
import w from "./w/index.js";
import x from "./x/index.js";
import y from "./y/index.js";
import z from "./z/index.js";

const configs = {
    ...a,
    ...b,
    ...c,
    ...d,
    ...e,
    ...f,
    ...g,
    ...h,
    ...i,
    ...j,
    ...k,
    ...l,
    ...m,
    ...n,
    ...o,
    ...p,
    ...q,
    ...r,
    ...s,
    ...t,
    ...u,
    ...v,
    ...w,
    ...x,
    ...y,
    ...z,
};

for (const key of Object.keys(configs)) {
    const config = (configs as Record<string, ISourceOptions>)[key];

    if (!config) {
        continue;
    }

    tsParticles.addConfig(config);
}

export default configs;
