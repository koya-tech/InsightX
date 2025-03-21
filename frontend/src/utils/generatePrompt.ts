export default function generatePrompt({
    Question,
    RelevantDocument,
}: {
    Question: string;
    RelevantDocument: string;
}) {
    const prompt = `Please create a concise text that fits as an answer to the question.
                - Question: ${Question}
                - Relevant document: ${RelevantDocument}`;
    return prompt;
}
