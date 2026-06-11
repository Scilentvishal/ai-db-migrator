import OpenAI from 'openai';

const client = new OpenAI({
    baseURL: 'https://openrouter.ai/api/v1',
    apiKey: process.env.OPEN_ROUTER_API_KEY,
});



export async function DBMigrator(code: string) {

    const DB_MIGRATOR_PROMPT = `
You are a senior database migration agent.

Steps:
1. Identify current database.
2. Detect models.
3. Detect connection files.
4. Detect queries.
5. Convert everything to MySQL Sequelize.
6. Preserve business logic.
7. Return migrated code.
`;

    const apiResponse = await client.chat.completions.create({
        model: 'openrouter/free',
        messages: [
            {
                role: 'system' as const,
                content: DB_MIGRATOR_PROMPT,
            },
            {
                role: 'user' as const,
                content: code,
            },
        ]
    });

    // Extract the assistant message with reasoning_details
    type ORChatMessage = (typeof apiResponse)['choices'][number]['message'] & {
        reasoning_details?: unknown;
    };
    const response = apiResponse.choices[0].message as ORChatMessage;

    return response;
}