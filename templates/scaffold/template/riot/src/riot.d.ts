declare module "*.riot" {
  import type { RiotComponent, RiotComponentWrapper } from "riot";

  const component: RiotComponentWrapper<RiotComponent>;
  export default component;
}
