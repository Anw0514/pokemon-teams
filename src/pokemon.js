class Pokemon {
    constructor(id, nickname, species, trainerId) {
        this.id = id
        this.nickname = nickname
        this.species = species
        this.trainerId = trainerId
        Pokemon.all.push(this)
    }

    addLi() {
        let li = document.createElement('li')
        li.innerHTML = `${this.nickname} (${this.species})  `
        li.id = `${this.id}-${this.trainerId}`
        let btn = document.createElement('button')
        btn.innerHTML = 'release'
        btn.addEventListener('click', () => {this.release()})
        li.appendChild(btn)
        return li
    }

    release() {
        this.removeLi()
        fetch(Pokemon.api + `/${this.id}`, {
            method: 'DELETE'
        })
    }

    removeLi() {
        let li = document.getElementById(`${this.id}-${this.trainerId}`)
        li.parentNode.removeChild(li)
    }

    static newPokemon(trainer) {
        fetch(Pokemon.api, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                trainer_id: trainer.id
            })
        }).then(resp => resp.json())
          .then(jsonPokulo => {
              let poke = new Pokemon(jsonPokulo.id, jsonPokulo.nickname, jsonPokulo.species, jsonPokulo.trainer_id)
              let ul = trainer.findUl()
              ul.appendChild(poke.addLi())
          })
    }
}
Pokemon.api = 'http://localhost:3000/pokemons'
Pokemon.all = []