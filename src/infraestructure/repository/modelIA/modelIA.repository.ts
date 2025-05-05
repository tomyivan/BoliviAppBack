import { query } from "express";
import { IAResponseModel, IAResponseQuery, IModelIA, Promp, ResponseIA, UserPetition } from "../../../domain";
import AxiosHelper from "../../../helper/axios.helper";
import { Execute } from "../datasource/querys.execute";
import { SchemaQuery } from "./squema.db"
import "dotenv/config";
import { GoogleGenAI, Type } from "@google/genai";
import { PresidentQuery } from "../query/president.query";
import { HistoryQuery } from "../query/history.query";
export class ModelIARepository implements IModelIA {
	private readonly _ai: GoogleGenAI;
	private readonly token: string;
	constructor() {
		this.token = process.env.AI_API_KEY || "your_token_here";
		this._ai = new GoogleGenAI({ apiKey: this.token });
	}
	async generateSql(promp: UserPetition, schema:string): Promise<IAResponseQuery> {
		const systemInstruction = `Eres un experto en SQL SERVER y la base de datos de Bolivia. 

				### Esquema actual:
				${schema}

				### Reglas estrictas:
				1. **Solo genera consultas en SQL SERVER válidas** para el esquema proporcionado.
				2. **Incluye siempre** \`WHERE activo = 1\` (a menos que el usuario pida explícitamente datos inactivos).
				3. **Columnas**: Siempre incluye la columna que tenga mayor que sea de tipo TEXT, pero evita \`SELECT *\`.
				4. **Usa JOINs** para relaciones entre tablas siempre debes usar el nombre de la tabla para evitar amibiguedades en la columna.
				5. **Si la tabla es presidente o historia**, siempre incluye \`id_presidente\` o \`id_historia\` en las columnas devueltas.
				6. **Evita consultas peligrosas**: No permitas DELETE, DROP, o UPDATE sin filtros.
				7. **Formatea el SQL**: Usa mayúsculas para palabras clave (SELECT, WHERE, etc.).
				8. **Respuesta mínima**: Solo devuelve la consulta SQL, sin explicaciones ni texto adicional.

				### Ejemplos válidos:
				- Si el usuario pide: "Presidentes del partido MAS":
				\`\`\`sql
				SELECT p.id_presidente, p.nombre, p.apellido, pp.nombre AS partido 
				FROM presidentes p 
				JOIN partido_politico pp ON p.id_partido_politico = pp.id_partido_politico 
				WHERE pp.nombre = 'MAS' AND p.activo = 1
				\`\`\`

				- Si pide: "Eventos históricos de 1800 a 1900":
				\`\`\`sql
				SELECT id_historia,titulo, resumen, fecha_ini 
				FROM historias 
				WHERE fecha_ini BETWEEN '1800-01-01' AND '1900-12-31' AND activo = 1
				\`\`\`
				`;
		try {
			const response = await this._ai.models.generateContent({
				model: "gemini-2.0-flash",
				contents: promp.text,
				config: {
					systemInstruction,
					responseMimeType: "application/json",
					responseSchema: {
						type: Type.OBJECT,
						properties: {
							'query': {
								type: Type.STRING,
								description: "Consulta SQL generada por el modelo.",
							},
							'table': {
								type: Type.STRING,
								description: "Nombre de la tabla si la consulta contiene la tabla presidentes, historias o cultura.",
							},
							'error': {
								type: Type.STRING,
								description: "Mensaje de error si la consulta no es valida pero lo diras como historiador y no usaras terminos de informaticos.",
							}
						},
					}
				}
			})
			return JSON.parse(response.text as string) as IAResponseQuery;
		} catch (error) {
			console.error("Error generating SQL:", error);
			throw error;
		}
	}
	async getDataDB(consult: IAResponseQuery): Promise<any[]> {
		if (consult.error) {

			console.error("Error in SQL query:", consult.error);
			throw new Error(consult.error);
		}
		return await Execute.getData(consult.query as string);
	}

	async getImg( data: any ): Promise<any[]> {
			if ( data.id_presidente ) {
				return Execute.getData(PresidentQuery.getImages(data.id_presidente, true));
			}
		
		return [];
	}


	async generateText(promp: UserPetition, data:string): Promise<IAResponseModel[]> {
		try {
			const systemInstruction = data.trim() === '[]' ? `Eres un historiador de bolivia solo de bolivia. Pero  no tienes datos disponibles para esta pregunta, por lo tanto, indica que no puedes proporcionar información útil`:`Eres un historiador experto en la historia de Bolivia pero solo de bolivia.
				responde de manera clara y concisa a las preguntas del usuario, utilizando un lenguaje accesible y evitando tecnicismos innecesarios.
				Responderas con los siguientes datos: 
				${data}

				### Reglas estrictas:
				1. **No uses tecnicismos**: Responde de manera clara y concisa, se lo mas humananamente posible.
				2. **No uses SQL**: No incluyas consultas SQL en tus respuestas.
				3. **No uses lenguaje de programacion**: No uses lenguaje de programacion en tus respuestas.
				5. **Id del campo**: Si contiene el id del campo tambien responderas con ese id solo el id.
				6. **fechas**: Siempre di las fechas si contiene en los datos
				7. **Complementar**: Siempre Complementa la respuesta con datos adicionales relevantes pero evita que sea tan extenso, pero siempre relacionados con los datos proporcionados.
				8. **Si es nombre de una persona**: siempre di el nombre y apellido de la persona, si es historia di el nombre de la historia, si es cultura di el nombre de la cultura.`

				;
			const response = await this._ai.models.generateContent({
				model: "gemini-2.0-flash",
				contents: promp.text,
				config: {
					systemInstruction,
					responseMimeType: "application/json",
					responseSchema: {
						type: Type.ARRAY,
						items: {
							type: Type.OBJECT,
							properties: {
								'id': {
									type: Type.STRING,
									description: "ID del elemento, si es historia o presidente solo numero.",
								},
								'name': {
									type: Type.STRING,
									description: "Aqui pondras el nombre junto al apellido o el titulo.",
								},
								'content': {
									type: Type.STRING,
									description: "Aqui pondras la o respues de la IA descripcion, detalle, informacion o biogragrafia.",
								},
								'date': {
									type: Type.STRING,
									description: "Aqui pondras las fechas o cualquier dato relacionado a la fecha.",
								},
								'summary': {
									type: Type.STRING,
									description: "Aqui pondras el resumen",
								}
							},
						}
					}
				}
			})
			return JSON.parse(response.text as string) as IAResponseModel[];
		} catch (error) {
			console.error("Error generating text:", error);
			throw error;
		}
	}
}