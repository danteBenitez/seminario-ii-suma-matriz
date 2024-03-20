export const arrayWithLength = (length) => new Array(length).fill(0);

export const emptyMatrix = (rows, columns) =>
  arrayWithLength(rows).map((_) => arrayWithLength(columns));

export function addMatrix(matrix1, matrix2) {
    const rows = matrix1.length;
    const columns = matrix1[0].length;
    const result = emptyMatrix(rows, columns);

    for (let rowNumber = 0; rowNumber < rows; rowNumber++) {
        for (let colNumber = 0; colNumber < columns; colNumber++) {
            const elem1 = matrix1[rowNumber][colNumber];
            const elem2 = matrix2[rowNumber][colNumber];
            if (typeof elem1 != "number" || typeof elem2 != "number") {
                throw new TypeError("Valor no numérico encontrado en matriz");
            }

            result[rowNumber][colNumber] = elem1 + elem2;
        }
    }
    return result;
}
