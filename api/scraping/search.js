const puppeteer = require("puppeteer");


let buscar = async(search) => {
    //abrir navegador
    const browser = await puppeteer.launch()
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

    const enlaces = await page.evaluate(() => {
        const enlace = document.querySelectorAll(".ui-search-result__image a")
        const links = []

        for (let element of enlace) {
            links.push(element.href)
            console.log(element.href);
        }
        return links
    })

    enlaces.length = (enlaces.length - enlaces.length) + 6
    console.log(enlaces.length);

    let artiuclos = []

    for (let element of enlaces) {
        await page.goto(element)
        await page.waitForSelector(".ui-pdp-title")

        const artiuclo = await page.evaluate(() => {
            const temp = {}
            temp.titulo = document.querySelector(".ui-pdp-title").innerText
            temp.img = document.querySelector(".ui-pdp-gallery__figure img").src
            temp.precio = document.querySelector(".price-tag-fraction").textContent
            return temp

        })
        artiuclos.push(artiuclo)
    }

    let books = {
        enlaces,
        artiuclos
    }

    await browser.close();
    return books

}

module.exports = { buscar }