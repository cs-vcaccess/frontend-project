console.log("Lets do this")
var totalPokemon = 3
//create sidebar
$.get('https://pokeapi.co/api/v2/', data => {
  $('#sidebar').append('<ul></ul>')
  Object.keys(data).forEach((key) => {
    let dropdown = $(`<details><summary>${key}</summary></details>`)
    dropdown.on('click', e => {
      $.get(`https://pokeapi.co/api/v2/${e.target.innerText}/`, data => {
        console.log(data);
        data.results.forEach((result, index) => {
          result.name ? dropdown.append($(`<li><a href="${result.url}">${result.name}</a></li>`))
          : dropdown.append(`<li><a href="${result.url}">${index}</a></li>`)
        })
      })
    })
    $('#sidebar').append(dropdown)
  })
})

// list all pokemon
$.get(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=${totalPokemon}`, data => {
  data.results.forEach((pokemon) => {
    let bin = $(`<ul class="bin"></ul>`)
    bin.text(pokemon.name)

    $.get(pokemon.url, (pokedata) => {
      process(pokedata, bin)
    })

    $('#content').append(bin)
  })
})

function process(obj, target) {
  if (obj)
  Object.keys(obj).forEach((key, pointer) => {
    if (typeof obj[key] == 'object') {
      // if it's an array, recurse and process it all
      if (Array.isArray(obj[key])) {
        if (obj[key].length) {
          let subtarget = $('<details></details>')
          subtarget.append(`<summary>${key}</summary>`)
          obj[key].forEach(x => process(x, subtarget))
          target.append(subtarget)
        } else target.append($(`<li>${key}: (no data)</li>`))
      }
      // otherwise, process each key in the object
      else {
        let subtarget = $('<details></details>')
        subtarget.append(`<summary>${key}</summary>`)
        process(obj[key], subtarget)
        target.append(subtarget)
      }
    } else {
      // handle name being a url. Just make it a link.
      if (key == 'name' && Array.from(Object.keys(obj))[pointer+1] == 'url')
      target.append($(`<a href="${obj[Array.from(Object.keys(obj))[pointer+1]]}">${obj[key]}</a>`))
      // if we're not looking at the url data (handled above already)
      else if (key != 'url') {
        // handle whatever other details
        target.append($(`<li>${key}: ${obj[key]}</li>`))
      }
    }
  })
}
