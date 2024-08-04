export default function setTheme(): void {
    const themeData = localStorage.getItem('themeData');

    if (themeData != null) {
        const theme = JSON.parse(themeData);
        const themeStyleData = theme.string;
        const themeFontData = theme.font;

        let themeStyle = document.getElementById('customStyle') as HTMLStyleElement;

        if (!themeStyle) {
            themeStyle = document.createElement('style');
            themeStyle.id = 'customStyle';
            document.head.appendChild(themeStyle);
        }

        themeStyle.innerHTML = themeStyleData;
    } else {
        console.log('No theme data found in local storage.');
    }
}
