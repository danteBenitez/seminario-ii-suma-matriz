import { ErrorMessage } from "./components/error-message.js";
import { Matrix } from "./components/matrix-table.js";
import { safeParseInt, safeParseNumber } from "./utils/safe-parse-number.js";
import { emptyMatrix } from "/matrix.util.js";

const rowInput = document.querySelector("input[name=rows]");
const columnInput = document.querySelector("input[name=columns]");
const [matrixContainer1, matrixContainer2] =
  document.querySelectorAll("[data-id=matrix]");
const resultMatrixContainer = document.querySelector("[data-id=matrix-result]");
const sendButton = document.querySelector("#send-btn");
const generateMatrixButton = document.querySelector("#generate-matrix-btn");

const appState = {
  selectedRows: safeParseInt(rowInput.value) || 10,
  selectedColumns: safeParseInt(columnInput.value) || 10,
};

const errorDomNode = document.querySelector("#error-message");
const errorMessage = new ErrorMessage(errorDomNode, { timeout: null });

rowInput.addEventListener("input", (e) => {
    e.preventDefault();
    appState.selectedRows = safeParseInt(rowInput.value + e.key) || 0;
});

columnInput.addEventListener("input", (e) => {
    e.preventDefault();
    appState.selectedColumns = safeParseInt(columnInput.value + e.key) || 0;
});

generateMatrixButton.addEventListener("click", () => {
  if (appState.selectedRows <= 0 || appState.selectedColumns <= 0) {
    errorMessage.show(`
            <p class="">
                Los valores de filas y columnas deben ser mayores a 0
            </p>
        `);
    return;
  }
  const rows = safeParseNumber(rowInput.value);
  const columns = safeParseNumber(columnInput.value);
  if (rows == null || columns == null) {
    errorMessage.show(`
            <p class="">
                Los valores de filas y columnas deben ser números
            </p>
        `);
    return;
  }
  renderMatrix();
});

class InvalidMatrixValueError extends Error {
  constructor(message) {
    super(message);
    this.name = "InvalidMatrixValueError";
  }
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
    const [_, row, column] = input.getAttribute("data-cell").split("-");
    let num = safeParseNumber(input.value);
    if (num == null) {
      throw new InvalidMatrixValueError("Algún valor ingresado no es un número válido");
    }
    arr[parseInt(row)][parseInt(column)] = num;
  }
  return arr;
}

function renderCell(matrixNumber, row, column) {
  const element = document.createElement("div");
  element.innerHTML = `
        <input type="text" name="cell" data-cell="${matrixNumber}-${row}-${column}" />
    `;
  return element;
}

function deleteMatrix() {
  matrixContainer1.innerHTML = "";
  matrixContainer2.innerHTML = "";
}

function renderMatrix() {
  deleteMatrix();
  const { selectedColumns: columns, selectedRows: rows } = appState;
  const matrix1 = Matrix(rows, columns, (row, col) => renderCell(1, row, col));
  const matrix2 = Matrix(rows, columns, (row, col) => renderCell(2, row, col));
  matrixContainer1.append(matrix1);
  matrixContainer2.append(matrix2);
}

sendButton.addEventListener("click", async () => {
  try {
    const matrix1Values = getMatrixFrom(
      matrixContainer1,
      appState.selectedRows,
      appState.selectedColumns
    );
    const matrix2Values = getMatrixFrom(
      matrixContainer2,
      appState.selectedRows,
      appState.selectedColumns
    );
    const response = await fetch("/api/matrix/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        values: [matrix1Values, matrix2Values],
      }),
    });

    const { result } = await response.json();
    errorMessage.hide();
    resultMatrixContainer.innerHTML = "";

    const resultMatrix = Matrix(result.length, result[0].length, (row, col) => {
      const cell = document.createElement("div");
      cell.innerHTML = `
                <p class="border border-1 m-2 p-2">
                    ${result[row][col].toFixed(2)} 
                </p>
            `;
      return cell;
    });
    resultMatrixContainer.append(resultMatrix);
  } catch (err) {
    errorMessage.show(`
            <p class="">
                ${err.message || "Ha ocurrido un error inesperado"}
            </p>
        `);
  }
});
