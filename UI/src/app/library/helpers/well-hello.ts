const texts = [
    "Hello",         // English
    "Hola",          // Spanish
    "Bonjour",       // French
    "Ciao",          // Italian
    "Olá",           // Portuguese
    "Привет",        // Russian
    "こんにちは",     // Japanese
    "你好",           // Chinese (Mandarin)
    "안녕하세요",       // Korean
    "مرحبا",          // Arabic
    "שלום",          // Hebrew
    "नमस्ते",         // Hindi
    "สวัสดี",         // Thai
    "Kamusta",       // Filipino
    "Hej",           // Swedish
    "Hei",           // Norwegian
    "Hallo",         // Dutch
    "Selam",         // Turkish
    "Ahoj",          // Czech
    "Merhaba",       // Azerbaijani
    "Sawubona",      // Zulu
    "Jambo",         // Swahili
    "Xin chào",      // Vietnamese
    "Bula",          // Fijian
    "Halo",          // Indonesian
    "Chào",          // Vietnamese
    "Terve",         // Finnish
    "Salut",         // Romanian
    "Kia ora",       // Maori
    "Sveiki",        // Latvian
    "Tere",          // Estonian
    "Sain baina uu", // Mongolian
    "Zdravo",        // Serbian
    "Sziasztok",     // Hungarian
    "Salam",         // Persian
    "Hallå",         // Icelandic
    "Dzień dobry",   // Polish
    "Γειά σου",      // Greek
    "Hallo",         // Afrikaans
    "Aloha"          // Hawaiian
];
let currentIndex = 0;

export default function rotateText() {
    const spanElement = document.getElementById('rotateText');

    if (spanElement) {
        // Update the text content
        spanElement.innerText = texts[currentIndex];
        // Move to the next text
        currentIndex = (currentIndex + 1) % texts.length;
    }
}
