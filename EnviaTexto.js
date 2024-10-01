async function enviarScript(scriptText) {
    const lines = scriptText.split(/[\n\t]+/).map(line => line.trim()).filter(line => line);
    const main = document.querySelector("#main");
    const textarea = main.querySelector(`div[contenteditable="true"]`);

    if (!textarea) throw new Error("Não há uma conversa aberta");

    for (const line of lines) {
        console.log(line);

        textarea.focus();
        document.execCommand('insertText', false, line);
        textarea.dispatchEvent(new Event('change', { bubbles: true }));

        setTimeout(() => {
            (main.querySelector(`[data-testid="send"]`) || main.querySelector(`[data-icon="send"]`)).click();
        }, 100);

        await new Promise(resolve => setTimeout(resolve, 500)); 
    }

    return lines.length;
}

function retornaTexto() {
    return 'Olá Rochinha, como está o meu processo?';
}

async function loopInfinito() {
    while (true) {
        const texto = retornaTexto();
        await enviarScript(texto);
    }
}

loopInfinito().then(() => console.log('Loop finalizado')).catch(console.error);