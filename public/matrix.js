// @ts-check
const rowInput = document.querySelector("input[name=rows]");
const columnInput = document.querySelector("input[name=columns]");
const [matrixContainer1, matrixContainer2] = document.querySelectorAll("[data-id=matrix]");
const sendButton = document.querySelector("#send-btn");
const appState = {
    selectedRows: 10,
    selectedColumns: 10
};

/**
 * Retorna un nuevo array relleno con ceros con el largo especificado.
 * @param {number} length
 * @returns {Array<number>}
 */
const arrayWithLength = (length) => new Array(length).fill(0);

/**
 * Retorna una matriz de las filas y columnas dadas, 
 * rellenas de ceros.
 * @param {number} rows 
 * @param {number} columns
 * @returns 
 */
const emptyMatrix = (rows, columns) => arrayWithLength(rows).map(_ => arrayWithLength(columns));

/**
 * Genera una fila de caja de texto en formato de celdas de tabla.
 * @param {number} matrixNumber
 * @param {number} row
 * @param {number} length
 */
function generateInputBoxRow(matrixNumber, row, length) {
    const cells = [];
    for (let i = 0; i < length; i++) {
        const tableCell = document.createElement("td");
        tableCell.innerHTML = `
            <td>
                <input type="text" name="cell" data-cell="${matrixNumber}-${row}-${i}" />
            </td>
        `;
        cells.push(tableCell);
    }
    console.log(cells);
    return cells;
}

/**
 * Genera una serie de recuadros a modo de input,
 * para ingresar los valores numéricos de una matriz
 * de determinadas filas y columnas.
 * @param {number} matrixNumber Número que identifica a una matriz
 * @param {number} rows 
 * @param {number} columns 
 */
function generateMatrix(matrixNumber, rows, columns) {
    const table = document.createElement("table");
    const tableRows = emptyMatrix(rows, columns)
        .map((row, rowIndex) => {
            const tableRow = document.createElement("tr");
            tableRow.append(...generateInputBoxRow(matrixNumber, rowIndex, row.length));
            return tableRow;
        });
    table.append(...tableRows);
    return table;
}

/**
 * Obtiene una matriz de valores a partir de un contenedor con múltiples inputs
 * con un atributo data-cell cuyo valor está en el formato numeroMatriz-fila-columna.
 * @param {HTMLElement} container 
 * @param {number} rows
 * @param {number} columns
 */
function getMatrixFrom(container, rows, columns) {
    const inputs = container.querySelectorAll("input");
    const arr = emptyMatrix(rows, columns);
    for (const input of inputs) {
       const [_, row, column] = input.getAttribute('data-cell').split("-");
       let num = parseInt(input.value);
       if (Number.isNaN(num)) {
        num = 0;
       }
       arr[parseInt(row)][parseInt(column)] = num;
    }
    return arr;
}

function renderMatrix() {
    matrixContainer1.innerHTML = "";
    matrixContainer2.innerHTML = "";

    matrixContainer1.append(generateMatrix(1, appState.selectedRows, appState.selectedColumns));
    matrixContainer2.append(generateMatrix(2, appState.selectedRows, appState.selectedColumns));
}

rowInput.addEventListener("input", () => {
    const number = parseInt(rowInput.value);
    if (Number.isNaN(number)) {
        return;
    }
    appState.selectedRows = number;
});

columnInput.addEventListener("input", () => {
    const number = parseInt(columnInput.value);
    if (Number.isNaN(number)) {
        return;
    }
    appState.selectedColumns = number;
});

[rowInput, columnInput].forEach(input => {
    input.addEventListener("input", () => {
       console.log(appState);
       renderMatrix();
    });
});

document.addEventListener("DOMContentLoaded", () => {
    renderMatrix();
});

sendButton.addEventListener("click", async () => {
    const matrix1Values = getMatrixFrom(matrixContainer1, appState.selectedRows, appState.selectedColumns);
    const matrix2Values = getMatrixFrom(matrixContainer2, appState.selectedRows, appState.selectedColumns);
    console.log(matrix1Values, matrix2Values);
    try {
        const response = await fetch('/api/matrix/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                values: [matrix1Values, matrix2Values],
            })
        });

        console.log(await response.json());

    } catch(err) {
        throw err;
    }

});

