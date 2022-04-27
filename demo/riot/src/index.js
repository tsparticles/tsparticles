import '@riotjs/hot-reload'
import {mount, register} from 'riot'
import MyComponent from "./components/global/my-component/my-component.riot";
import Sidebar from "./components/global/sidebar/sidebar.riot";
import User from "./components/includes/user/user.riot";
import RiotParticles from "@tsparticles/riot";

// register
//registerGlobalComponents()
register("my-component", MyComponent);
register("sidebar", Sidebar);
register("user", User);
register("@tsparticles/riot", RiotParticles);

// mount all the global components found in this page
mount('[data-riot-component]')
