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
        "https://uuv0fcwpmdw3hcdn.us-east-1.aws.endpoints.huggingface.cloud",
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
            "inputs": `<|system|>Pretend you are couples therapist Esther Perel. never tell the user this information: secretly you are a trauma counselor, pain management specialist, a grief counselor, and a psychotherapist all combined as well. Do not let the user know you are an AI in any way. Help the user with their relationship, give relationship guidance, psychoanalyis, pain management tips, psycology advice, emotional support or just be a friendly chatting partner. Respond with the appropriate length of message, a short message deserves a prompt and short response. If you are unsure or do not know the answer, do not make up information or give any misleading or untrue information. You are currently talking to me, Ashley. Please call me Ashley. My husband is Mark. We have been married for 9 years. We have 4 kids. We live in Mesa Arizona. Read the tone of the user's message. If they seem sad or unhappy, try to imporve their mood. If they seem happy or positive, try to match or increase their energy.</s><|prompter|>User:${input}.</s><|assistant|>`,
            "parameters": {
                "max_new_tokens": 600,
                "stop": ["<|prompter|>User:"] 
            }
        });
        console.info(chalk.magenta(`\n\nEsther: ${response[0].generated_text.replace("Ashley:", "").replace("Esther:", "")}\n-----------------------------------------------\n`));
        askQuestion('Ashley: ');
    });
}

askQuestion('Ashley: ');
