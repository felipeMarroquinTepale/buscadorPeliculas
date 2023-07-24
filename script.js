let searchInput = document.getElementById('searchInput');
let resultContainer = document.getElementById('results');
let msg_results = document.getElementById('msg-results');


let api_key = 'f1e8ae8cfe076a5de053945971c14fc6';
let urlBase = 'https://api.themoviedb.org/3/search/movie';
let urlImg = 'https://image.tmdb.org/t/p/w200';



const searchButtonMovies = async (e) => {
    try{
        e.preventDefault();
        const response = await fetch(`${urlBase}?query=${searchInput.value}&api_key=${api_key}&language=es-ES&region=ES`, {
            method: "GET",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
        })

        const result = await response.json();
        const {results} = result;
        console.log("result: ",results)
        displayMovies(results);


    }catch(e){
        console.log("error: ",e);
    }
}

function displayMovies(movies){

    msg_results.classList.remove("alert-success")
    msg_results.classList.remove("alert-danger")
    msg_results.innerHTML = ""

    if(movies.length === 0){
        msg_results.classList.add("alert-danger")
        msg_results.innerHTML = "<strong>Ups... parece que no se han econtrado peliculas</strong>"
        resultContainer.innerHTML = ""
        return
    }else{

        msg_results.classList.add("alert-success")
        msg_results.innerHTML = `<strong>Se han encontrado ${movies.length} resultados</strong>`

        const html = movies.map(movie => {

            let posterPath = urlImg + movie.poster_path


            return `

            <div class="col">
                <div class="card shadow">
                    <img src="${posterPath}" class="card-img-top" height="350" width="50" >
                    <div class="card-body">
                        <h5 class="card-title">${movie.title}</h5>
                        <h6 class="card-date-release"> Fecha Lanzamiento: ${movie.release_date}</h5>
                        <p class="card-overview">${movie.overview}</p>
                    </div>
                </div>
            </div>
            `;
        })

        resultContainer.innerHTML = html.join('');
    }
}

document.getElementById('searchButton').addEventListener("click",searchButtonMovies)
