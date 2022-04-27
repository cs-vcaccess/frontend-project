console.log("Lets do this")
var totalPokemon = 10
//create sidebar
$.get('https://pokeapi.co/api/v2/', (data) => {
  $('#sidebar').append('<ul></ul>')
  Object.keys(data).forEach((key) => {
    $('#sidebar > ul').append(`<li>${key}</li>`)
  })
})

// list all pokemon
$.get(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=${totalPokemon}`, (data) => {
  data.results.forEach((pokemon) => {
    let bin = $('<div class="bin"></div>')
    bin.text(pokemon.name)

    $.get(pokemon.url, (pokedata) => {
      let dropdown = $('<details></details>')
      pokedata.abilities.forEach((ability) => {
        dropdown.append($(`<a class="ability" href="${ability.ability.url}">${ability.ability.name}</a>`))
        dropdown.append($(`<li>${ability.is_hidden}</li>`))
        dropdown.append($(`<li>${ability.slot}</li>`))
      })
      bin.append(dropdown)
    })

    $('#content').append(bin)
  })
})
