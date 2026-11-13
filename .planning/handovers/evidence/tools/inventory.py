from pathlib import Path
import subprocess,json,re
root=Path.cwd(); out=root/'.planning/handovers'; ev=out/'evidence/e0'
files=subprocess.check_output(['git','ls-files'],text=True).splitlines()
engine=[f for f in files if f.startswith('engine/src/')]
packages=[]
for f in files:
 if f.endswith('/package.json') and '/dist/' not in f and '/node_modules/' not in f:
  try:
   p=json.loads(Path(f).read_text())
   if p.get('name'): packages.append((f,p))
  except (ValueError,OSError): pass

def owner(f):
 if any(x in f for x in ['CanvasManager','RenderManager']): return '05 / E5,E7'
 if any(x in f for x in ['ParticlesManager','SpatialHashGrid','Ranges.ts']): return '06 / E6'
 if any(x in f for x in ['Particle.ts','Retina.ts']): return '07 / E5'
 if any(x in f for x in ['Container.ts','EventListeners','EventDispatcher']): return '04 / E4'
 if any(x in f for x in ['MathUtils','LogUtils','ErrorUtils','ErrorMessages']): return '02 / E2'
 if any(x in f for x in ['Engine.ts','PluginManager','index.ts','index.lazy.ts','browser.ts']): return '01 / E1'
 return '03 / E3 (color: E5)'
rows=['# V5 engine audit','',f'E0 inventory at `1944fa0f5c202b8af82841b5de9b2315f758a258`: {len(engine)} tracked source files.','', 'Owner means the technical handover and execution stage; implementation owner is the current v5 executor. These are inventory rows, **not completed source reviews**. Exports/consumers, shared state and dependency cost require inspection by each owner. Evidence: tracked-file enumeration; baseline build recorded in V5-BUNDLE-REPORT.md. Add new files when introduced.','', '| File | Responsibility / area | Owner | Exports, state, cost | Decision / verification |','| --- | --- | --- | --- | --- |']
for f in engine:
 rows.append(f'| `{f}` | {Path(f).parent.relative_to("engine/src")} / {Path(f).stem} | {owner(f)} | Pending source review | Pending; inventory only |')
rows+=['','## Required cross-cutting coverage','', '| Review | Owners / stages | Files and existing coverage | Missing verification |','| --- | --- | --- | --- |', '| G1 | 01/02/08; E1–E2,E8 | Emitters ShapeManager; PluginManager; LoadOrdering.ts | Same-name registration, reverse load, disposal, mutable-state classification |','| G2 | 03/04/08; E3–E4,E8 | NoiseFieldGenerator, move generator, motion, Poisson | Listener/timeout ownership, refresh, worker cleanup |','| G3 | 01/04/07/08; E1,E4,E5 | Engine.load, ImageDrawer, video export; LoadOrdering/StartCancellation/ReviewRegressions | Pre-start rollback, late assets after reuse, promise settlement |','| G4 | 02/03/04/07/08; E2–E5 | Container, Retina, move, Poisson; MoveTiming/ResizeLifecycle | Explicit clock and finite numeric domains |','| G5 | 06/08; E6 | SpatialHashGrid, Ranges, fluid; SpatialHashGrid.ts | Geometry fixtures and spatial mutation semantics |','| G6 | 02/07/08; E2,E5 | GridPathGenerator, canvasMask shuffle | Deterministic permutations, draw budgets |','| G7 | 01/03/04; E1,E3,E4 | Engine/items, EventDispatcher, deepExtend; lifecycle/options tests | Lifetime, public mutation, external-resource preservation |','']
(out/'V5-ENGINE-AUDIT.md').write_text('\n'.join(rows))
families={'plugins','interactions','updaters','shapes','effects','paths','presets','palettes','utils'}
plugins=[(f,p) for f,p in packages if f.split('/')[0] in families]
rows=['# V5 plugin audit','',f'E0 inventory: {len(plugins)} extension/runtime-utility package manifests. Includes palettes and test/config utilities so no standard build exclusion silently removes audit scope. All compatibility outcomes remain pending.','', 'G1–G7 ownership and scenarios are in [the engine audit](V5-ENGINE-AUDIT.md#required-cross-cutting-coverage). Every row requires inspection of explicit loaders, RNG/logger/scheduler chains, module state/caches, augmentations, ownership and tests; presence of an entry file does not prove its behavior.','', '| Package / manifest | Browser / lazy source entries | Owner | Service/state/extensions review | Build/test outcome / action |','| --- | --- | --- | --- | --- |']
for f,p in plugins:
 d=Path(f).parent; entries=[str(x.relative_to(d)) for x in sorted((d/'src').glob('*')) if x.name in ['browser.ts','index.lazy.ts','bundle.ts']]
 rows.append(f'| `{p["name"]}` — `{f}` | {", ".join(entries) or "None at src root"} | 08; E1–E8 | Pending G1–G7 classification | Pending per-package verification |')
(out/'V5-PLUGIN-AUDIT.md').write_text('\n'.join(rows)+'\n')
rows=['# V5 consumer and distribution inventory','', 'E0 tracked manifests. Support decisions: retire Vue 2, Nuxt 2 and Nuxt 3 integrations in E1, before factory adaptation. Retain all other existing integrations pending validation; this does not certify compatibility. Preserve format support during E1 and evaluate final composition in E9.','', '| Package | Manifest | Scope / owner | Export conditions | Verification |','| --- | --- | --- | --- | --- |']
for f,p in packages:
 if f.split('/')[0] not in {'wrappers','demo','templates','cli','bundles','engine'}: continue
 retired=any(x in Path(f).parts for x in ['vue2','nuxt2','nuxt3'])
 exp=json.dumps(p.get('exports',{}),separators=(',',':')).replace('|','\\|')
 rows.append(f'| `{p["name"]}` | `{f}` | {"Retire E1; closure E9" if retired else "Retain; 01/09, E1/E9"} | `{exp}` | Pending |')
(out/'V5-MIGRATION-MATRIX.md').write_text('\n'.join(rows)+'\n')
print(json.dumps({'engineFiles':len(engine),'extensionUtilityPackages':len(plugins),'trackedPackageManifests':len(packages)}))
# Keep exact search results, not inferred completeness.
for name,args in [('singleton-references.txt',['rg','-n','tsParticles|initEngine|__tsParticlesInternals','--glob','!pnpm-lock.yaml','--glob','!**/CHANGELOG.md','engine/src','wrappers','templates','cli','bundles']),('retirement-references.txt',['rg','-l','vue2|nuxt2|nuxt3|Vue 2|Nuxt 2|Nuxt 3','--glob','!pnpm-lock.yaml','--glob','!**/CHANGELOG.md','.']),('deprecated-apis.txt',['rg','-n','@deprecated','engine','plugins','interactions','updaters','shapes','effects','paths','wrappers','utils','--glob','*.ts','--glob','!**/dist/**'])]:
 r=subprocess.run(args,text=True,capture_output=True); (ev/name).write_text(r.stdout)
