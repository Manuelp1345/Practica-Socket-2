function search() {
    let searchBar = document.getElementById("search").value,
        contenedor = document.querySelector(".contenido")

    contenedor.innerHTML = `<div class="align-items-center mt-5 spinner-border" role="status"></div>`


    fetch(`api/${searchBar}`).then(e => e.json())
        .then(e => {

            let enlaces = e.enlaces,
                articulos = e.articulos


            contenedor.innerHTML = ""
            let i = 0
            for (let element of articulos) {
                contenedor.innerHTML += `
                <div class="col-3 card text-center  m-3">
                <a class="text-decoration-none " href="${enlaces[i]}">
                    <img class="img-fluid pt-3" width="300" src="${element.img}" alt="">
                    <h3 class="lead py-3">${element.titulo}</h3>
                    <p class="h5 precio font-weight-bold">${element.precio} Bs</p>
                </a>
            </div>`
                i++
            }
        })
}