import reveal from "../motion/reveal.js";
export class Component extends HTMLElement {

    constructor() {
        super();

        this.attachShadow({
            mode: "open",
            delegatesFocus: true
        });
    }

    connectedCallback() {
        this.render();
        render();
        reveal.observe(this.shadowRoot);
        this.afterRender?.();
    }

    disconnectedCallback() {
        this.beforeDestroy();
    }

    render() {}

    afterRender() {}

    beforeDestroy() {}

}