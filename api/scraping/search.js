const puppeteer = require("puppeteer");

let buscar = async(search) => {
    //abrir navegador
    const browser = await puppeteer.launch({ headless: true, defaultViewport: { deviceScaleFactor: 5, width: 1500, height: 900 } })
        //nueva pestaña
    const page = await browser.newPage()

    //visitar una pagina en espesifico
    await page.goto("https://www.mercadolibre.com.ve/")

    // buscar en la barra de busquedas de una pagina 
    await page.type(".nav-search-input", search)

    //hacer click en el bonton de buscar de la pagina
    await page.click(".nav-search-btn")
        // esperar a que aparesca un selector
    await page.waitForSelector(".ui-search-layout")

    const enlaces = await page.evaluate(async() => {
        const enlace = document.querySelectorAll(".ui-search-result__image a")
        const links = []
        const titulo = document.querySelectorAll(".ui-search-item__title")
        const titulos = []
        const img = document.querySelectorAll(".ui-search-result-image__element")
        const imgs = []
        const precio = document.querySelectorAll(".price-tag-fraction")
        const precios = []

        const artiuculos = {}

        for (let element of enlace) {
            links.push(element.href)
        }
        for (let element of titulo) {
            titulos.push(element.innerText)
        }
        for (let element of img) {
            imgs.push(element.src)
        }
        for (let element of precio) {
            precios.push(element.innerText)
        }

        artiuculos.enlaces = links
        artiuculos.titulo = titulos
        artiuculos.img = imgs
        artiuculos.precio = precios

        console.log(imgs);
        return artiuculos
    })

    await browser.close();
    return enlaces

}

module.exports = { buscar }