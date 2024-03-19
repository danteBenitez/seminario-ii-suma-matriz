import { addMatrix } from "../utils/matrix.js";

export function matrixAdd(req, res) {
    const { values } = req.body;
    try {

        if (!values) {
            throw { status: 400, message: 'Cuerpo de peticióno inválido' };
        }

        const [matrix1, matrix2] = values;

        if (matrix1.length == matrix2.length) {
            throw {
                status: 400,
                message: 'La suma requiere que las matrices tengan la misma cantidad' +
                         'de filas'
            }
        }

        if (matrix1[0].length == matrix2[0].length) {
            throw {
                status: 400,
                message: 'La suma requiere que las matrices tengan la misma cantidad' +
                         'de columnas'
            }
        }

        const result = addMatrix(matrix1, matrix2);

        res.status(200).json({
            message: 'Matrices sumadas exitosamente',
            result,
        });

    } catch(err) {
        res.status(err.status || 500).json({
            message: err.message || 'Error interno del servidor'
        })
    }


}