/**
 * Clase que maneja el contenido de un nodo DOM destinado
 * a mostrar mensajes de error.
 */
export class ErrorMessage {
    /**
     * Construye un nuevo mensaje de error.
     * @param {HTMLElement} domNode 
     * @param {{ timeout: number } | null} options
     */
    constructor(domNode, options) {
        this.domNode = domNode;
        this.domNode.classList.add("d-none");
        this.options = options;
    }

    /**
     * Muestra un mensaje de error.
     * @param {string} message Texto o HTML para renderizar.
     */
    show(message) {
        this.domNode.innerHTML = message;
        this.domNode.classList.remove("d-none");
        if (this.options.timeout == null) return;
        setTimeout(() => {
            this.domNode.classList.add("d-none");
        }, this.options.timeout);
    }
}