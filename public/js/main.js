form = document.querySelector("form")

form.addEventListener("submit", (e) => {
    e.preventDefault()
    search()
})

function search() {
    let searchBar = document.getElementById("search").value,
        contenedor = document.querySelector(".contenido")

    if (searchBar == "") {
        contenedor.innerHTML = `<div class="col-12 alert alert-danger" role="alert">
        Por favor rellene el campo 
      </div>`

    } else {
        contenedor.innerHTML = `<div class="align-items-center mt-5 spinner-border" role="status"></div>`



        fetch(`api/${searchBar}`).then(e => e.json())
            .then(e => {
                let enlaces = e.enlaces,
                    titulo = e.titulo
                precio = e.precio,
                    img = e.img

                enlaces.length = (enlaces.length / 2) + 3
                console.log(enlaces.length);
                contenedor.innerHTML = ""
                let i = 0
                for (let element of enlaces) {
                    contenedor.innerHTML += `
                <div class="col-3 card text-center  m-3">
                <a class="text-decoration-none " href="${element}">
                    <img class="img-fluid pt-3" width="300" src="${img[i]}" alt="">
                    <h3 class="lead py-3">${titulo[i]}</h3>
                    <p class="h5 precio font-weight-bold">${precio[i]} Bs</p>
                </a>
            </div>`
                    i++
                }
            })
    }
}