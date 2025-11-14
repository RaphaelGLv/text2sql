"use server";

import { ChatGroq } from "@langchain/groq";
import { BaseActionResponse } from "../types/action-response";
import { TurnTextToSqlRequestDto } from "./dtos/turn-text-to-sql.request.dto";
import { TurnTextToSqlResponseDto } from "./dtos/turn-text-to-sql.response.dto";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { ChatPromptTemplate } from "@langchain/core/prompts";

export async function turnTextToSqlAction(
  body: TurnTextToSqlRequestDto
): Promise<BaseActionResponse<TurnTextToSqlResponseDto>> {
  try {
    const model = new ChatGroq({ 
      temperature: 0,
      model: "llama-3.3-70b-versatile",
      apiKey: process.env.GROQ_API_KEY || "",
    });

    const prompt = ChatPromptTemplate.fromMessages([
      [
        "system",
        `Você é um especialista em SQL. Dado um esquema de banco de dados SQL, gere uma consulta SQL para responder à pergunta do usuário.
        
        IMPORTANTE:
        - Gere APENAS o código SQL.
        - Não inclua explicacões.
        - Não use blocos de código markdown (\`\`\`sql).
        
        Schema SQL:
        {schema}`
      ],
      ["human", "{question}"],
    ]);

    const chain = prompt.pipe(model).pipe(new StringOutputParser());

    const sqlResult = await chain.invoke({
      schema: body.sqlSchemaScript,
      question: body.question,
    });

    return {
      success: true,
      message: "SQL gerado com sucesso.",
      data: {
        id: crypto.randomUUID(),
        answer: sqlResult.trim(),
        question: body.question,
      },
    };

  } catch (error) {
    const typedError = error as Error;
    
    return {
      success: false,
      message: typedError.message || "Falha ao converter texto para SQL",
      data: null,
    };
  }
}