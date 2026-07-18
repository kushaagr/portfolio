export function define(tag, klass) {
    if (!customElements.get(tag)) {
        customElements.define(tag, klass);
    }
}