import { type ISourceOptions, tsParticles } from "tsparticles-engine";
import a from "./a";
import b from "./b";
import c from "./c";
import d from "./d";
import e from "./e";
import f from "./f";
import g from "./g";
import h from "./h";
import i from "./i";
import j from "./j";
import k from "./k";
import l from "./l";
import m from "./m";
import n from "./n";
import o from "./o";
import p from "./p";
import q from "./q";
import r from "./r";
import s from "./s";
import t from "./t";
import u from "./u";
import v from "./v";
import w from "./w";
import x from "./x";
import y from "./y";
import z from "./z";

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
    ...z
};

for (const key of Object.keys(configs)) {
    tsParticles.addConfig((configs as { [key: string]: ISourceOptions })[key]);
}

export default configs;
