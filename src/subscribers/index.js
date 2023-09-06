import registerCheckEvents from "./checkChange.js";
import registerBackendStarted from "./backendStarted.js";

export default function registerEventListeners() {

    registerCheckEvents();
    registerBackendStarted();
}