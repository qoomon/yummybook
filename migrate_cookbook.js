#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

const data_dir = path.join(__dirname, 'data_migration')
fs.mkdirSync(data_dir)

// create cookbook asset
getCookbook().recipes.forEach(recipe => {
  recipe.times = recipe.times.reduce((times, time) => {
    times[time.name] = time.time
    return times
  }, {})
  
  recipe.parts.forEach(part => {
    part.ingredients = part.ingredients.reduce((ingredients, ingredient) => {
      ingredients[ingredient.name] = ingredient.amount
      return ingredients
    }, {})
  })
  
  let recipe_dir = path.join(data_dir, recipe.name)
  fs.mkdirSync(recipe_dir)
  let recipe_file = path.join(recipe_dir, 'recipe.json')
  fs.writeFileSync(
    recipe_file,
    JSON.stringify(recipe, null, 2)
  )
  
  // copy pictures
  recipe.pictures.forEach((picture, index) => {
    fs.copyFileSync(
      path.join(data_dir, picture),
      path.join(recipe_dir, 'picture-' + index + path.extname(picture))
    )
  })
})  

function getCookbook(){
  return {
      title: "Yummy Cat",
      recipes: [{
          "date": "10.08.2018",
          "source": "Hello Fresh",
          "name": "Porree-Flammkuchen mit Salat",
          "tags": [
              "Quiche & Flammkuchen",
              "Lunchbox"
          ],
          "notes": [
          ],
          "servings": "",
          "times": [
              {"name": "Zubereitungszeit", "time": "25 min"}
          ],
          "parts": [
              {
                  "name": "Für den Porree-Flammkuchen",
                  "ingredients": [
                      {"name": "Porree", "amount": "1"},
                      {"name": "Kerbel", "amount": "5 g"},
                      {"name": "Schmand", "amount": "75 g"},
                      {"name": "Flammkuchen Teig", "amount": "1"},
                      {"name": "Mozzarella", "amount": "1"},
                      {"name": "Schnittlauch", "amount": "5 g g"}

                  ],
                  "steps": [
                    "Ofen auf 220°C Ober- / Unterhitze vorheizen",
                    "Porree gründlich waschen und nur den weißen und hellgrünen Teil in feine Ringe schneiden",
                    "Kerbel fein hacken, anschlißend gründlich mit dem Schmand verrühren",
                    "1 Tl Olivenöl udn 1 Tl Butter in einer großen beschichteten Pfanne erwärmen",
                    "Porree zugeben und 5-8 Min. zugedeckt bei schwacher Hitze weich garen",
                    "Flammkuchenteig auf einem mit Backpapier ausgelegtem Backblech ausrollen",
                    "Teig gleichmäßig mit Kerbel-Schmand bestreichen, dabei ca. 1 cm Rand frei lassen",
                    "Mit Salz und Pfeffer würzen und Porree drauf geben und mit Mozzarella bestreuen",
                    "Flammkuchen auf mittlerer Schiene des Ofens nach Packungsanleitung knusprig backen",
                    "Flammkuchen auf Tellern verteilen und mit Schnittlauch garnieren"
                  ]
              },
              {
                  "name": "Für den Salat",
                  "ingredients": [
                    {"name": "Salatherzen", "amount": "1"},
                    {"name": "Birne", "amount": "1"},
                    {"name": "Kürbiskerne", "amount": "20 g"}

                  ],
                  "steps": [
                      "Salatblätter vom Kopf lösen, waschen und abtropfen lassen",
                      "Birne waschen, Kerngehäuse entfernen und in feine Scheiben scheniden",
                      "Kürbiskerne in einer kleinen Pfanne ohne Zusatz von Fett rösten, bis sie duften, kurz abkühlen lassen",
                      "Für das Dressing: 2 El Olivenöl, 1 El Essig, 1 Tl Senf und 1/2 Tl Honig mit etwas Salz und Pfeffer in einer kleinen Schüssel verrühren",
                      "Salat, Birne und Kürbiskerne in eine große Schüssel geben und das Dressing vorsichtig unterheben"
                  ]
              }
          ],
          "pictures": [
              "pictures/picture-1.jpg"
          ]
      }]
  };
}