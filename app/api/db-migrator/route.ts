import { DBMigrator } from "@/AI/OpenRouter";

export async function POST(request: Request) {
    try {
        debugger;
        const { code } = await request.json();
        const response = await DBMigrator(code);
        return new Response(JSON.stringify({ result: response.content }));
    } catch (error) {
        debugger;

        console.error(error);
        return new Response(JSON.stringify({ error: 'An error occurred during migration.' }), { status: 500 });
    }
}