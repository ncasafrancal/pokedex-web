(function(){
    obtenerPokemones();
})();

async function obtenerPokemones() {
    let url = "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0";
    const response = await fetch(url);
    const data = await response.json()

    let inicio_html = `<div id="container-grid">`;   

    const promesasDetalles = data.results.map(async (pokemon, index) => {
        let indice = index + 1;
        
        // 1. Obtenemos el objeto de detalle completo
        const detalle = await obtenerDetallePokemon(pokemon.url);
        const imagenUrl = detalle.sprites?.other['official-artwork'].front_default ||
                          detalle.sprites?.other.home.front_default;
        
        // Retornamos el HTML usando la imagen oficial real que viene de la API
        return `
            <div id="item-grid">
                <div id='titulo'>${pokemon.name}</div>
                <img src="${imagenUrl}" alt="">
            </div>
        `;
    });

    const itemsHtmlArray = await Promise.all(promesasDetalles);
    let contenido_html = itemsHtmlArray.join('');
    let fin_html = "</div>";

    let resultado = inicio_html + contenido_html + fin_html;
    document.getElementById('contenido').innerHTML = resultado;

}

async function obtenerDetallePokemon(url) {
    const response = await fetch(url);
    return await response.json(); // Retorna el JSON completo con sprites, stats, etc.
}