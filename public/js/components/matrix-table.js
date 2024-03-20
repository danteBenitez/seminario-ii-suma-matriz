// @ts-check
import { emptyMatrix } from "/matrix.util.js";
/**
 * Retorna un nuevo nodo DOM mostrando una matriz de 
 * `row` filas y `columns` columnas. 
 * @param {number} rows 
 * @param {number} columns 
 * @param {(row: number, column: number) => HTMLElement} renderCell Función utilizada para
 * renderizar cada celda de la matriz.
 * @returns {HTMLElement}
 */

export function Matrix(rows, columns, renderCell) {
    const element = document.createElement("div");
    /** @type {number[][]} */
    const matrix = emptyMatrix(rows, columns);
    const cellRows = matrix.map((row, rowNumber) => row.map((_, columnNumber) => {
        return renderCell(rowNumber, columnNumber);
    }));

    const cellRowElements = cellRows.map(cellRow => cellRow.map(cell => cell.innerHTML).join('')).join('');
    const div = document.createElement("div");

    div.classList.add("d-grid", "gap-2");
    div.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
    div.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
    div.innerHTML += cellRowElements;

    element.append(div);

    return element;
}