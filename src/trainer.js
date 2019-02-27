class Trainer {
    constructor(id, name, pokemons) {
        this.id = id
        this.name = name
        this.pokemons = []
        pokemons.forEach(pokemon => {
            this.pokemons.push(new Pokemon(pokemon.id, pokemon.nickname, pokemon.species, this.id))
        })
        Trainer.all.push(this)
    }

    createDiv() {
        let tDiv = document.createElement('div')
        tDiv.className = 'card'
        tDiv.innerHTML = `<h2>${this.name}</h2>
                          <button id='add-${this.id}'>Add Pokemon</button>`
        let ul = document.createElement('ul')
        ul.id = `ul-${this.id}`
        tDiv.appendChild(ul)
        this.pokemons.forEach(pokemon => {
            ul.appendChild(pokemon.addLi())
        })
        return tDiv
    }

    findUl() {
        return document.querySelector(`#ul-${this.id}`)
    }

    activateButton() {
        let btn = document.getElementById(`add-${this.id}`)
        btn.addEventListener('click', ()=> {this.postPokemon()})
    }

    postPokemon() {
        Pokemon.newPokemon(this)

    }

    static fetchTrainers() {
        fetch(Trainer.api)
        .then(resp => resp.json())
        .then(jsonTrainulo => {
            jsonTrainulo.forEach(trainer => {
                let trnr = new Trainer(trainer.id, trainer.name, trainer.pokemons)
                document.querySelector('main').appendChild(trnr.createDiv())
                trnr.activateButton()
            })
        })
    }

    


}
Trainer.api = 'http://localhost:3000/trainers'
Trainer.all = []