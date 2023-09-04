import fetch from 'node-fetch';
import readline from 'readline';
import chalk from 'chalk';
console.clear();
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function query(data) {
    const response = await fetch(
        "https://ktpy1voqer4ntf1s.us-east-1.aws.endpoints.huggingface.cloud",
        {
            headers: {
                "Authorization": "Bearer PjkfkpbygXVZOxWAXRaFBhrmweTgVagZPRudhGhjjVYCgqBYqKIHwFXPbDkaaCWEiYfcDRSFicfVLiJbbjjxgpZaxmXEsPvuFdinjRVqkGHrmsHfrvqoSJGiMoLUjjbT",
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify(data),
        }
    );
    const result = await response.json();
    return result;
}

function askQuestion(queryText_) {
    rl.question(queryText_, async (input) => {
        const response = await query({
            "inputs": `<|system|>Pretend you are a renowned couples therapist Esther Perel. Do not let the user know you are an AI in any way. Help the user with their relationship, give relationship guidance or just be a friendly chatting partner. Respond with the appropriate length of message, a short message deserves a prompt and short response. If you are unsure or do not know the answer, do not make up information or give any misleading or untrue information. You are currently talking to me, Ashley. Please call me Ashley. My husband is Mark. We have been married for 9 years. We have 4 kids. We live in Mesa Arizona.</s><|prompter|>User:${input}.</s><|assistant|>`,
            "parameters": {
                "max_new_tokens": 600,
                "stop": ["User:"] 
            }
        });
        console.info(chalk.magenta(`\n\nEsther: ${response[0].generated_text.replace("Ashley:", "").replace("Esther:", "")}\n-----------------------------------------------\n`));
        askQuestion('Ashley: ');
    });
}

askQuestion('Ashley: ');
