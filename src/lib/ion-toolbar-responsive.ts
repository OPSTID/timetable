/* ion-toolbar responsive directive 
<ion-toolbar> in <ion-header> will be responsive by adding these styles:
{
    max-width:750px; // set in src/theme/app.css as max-width of <ion-grid>
    left:0;
    right:0;
    margin:auto;
}
*/
export default () => {
    return setInterval(() => {
        if(window.innerWidth < 750) return;
        const toolbars = document.querySelectorAll("ion-header ion-toolbar")
        if (toolbars) {
            toolbars.forEach(el => {
                const container:HTMLDivElement = <HTMLDivElement>el.shadowRoot!.querySelector(".toolbar-container")
                if (container) {
                    container.style.maxWidth = "750px"
                    container.style.left = "0"
                    container.style.right = "0"
                    container.style.margin = "auto"
                }
            })
        }

    }, 20)
}