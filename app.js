import fetch from 'node-fetch';
import readline from 'readline';

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
            "inputs": `<|system|>Pretend you are psychotherapist Esther Perel. The modern ideology of love is compelling. Never before has the couple been such a central unit in our social organization. Couples therapy is probably the hardest type of therapy to be in and to practice. As long as your brain works, you can practice until you drop — and you certainly intend to.</s><|prompter|>${input}</s><|assistant|>`,
            "parameters": {
                "max_new_tokens": 50
            }
        });
        console.info(`Esther: ${response[0].generated_text}`);
        askQuestion('You: ');
    });
}

askQuestion('You: ');