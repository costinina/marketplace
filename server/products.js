const Chance = require("chance")
const express = require("express")

const productsRoutes = express.Router()
const chance = new Chance()

const products = Array.from({ length: 25 }, (_, i) => {
  const name = chance.pickone([
    "Rolex",
    "Vacheron Constantin",
    "Patek Philippe",
    "Hublot",
    "Louis Moinet"
  ])

  const imageId = i % 10 + 1

  return {
    id: chance.guid(),
    price: chance.floating({ min: 900, max: 9000, fixed: 2}),
    name,
    description: chance.paragraph({ sentences: 3 }),
    image: `http://0.0.0.0:3000/products/product-${imageId}.jpeg`,
    thumbnail: `http://0.0.0.0:3000/products/product-${imageId}-thumb.jpeg`,
    info: {
      listingNumber: chance.bb_pin(),
      referenceNumber: chance.bb_pin(),
      model: chance.word({ capitalize: true }),
      brand: name,
      year: chance.year({ min: 1600, max: 2019 }),
      gender: chance.gender()
    },
    calibre: {
      powerReserve: chance.natural({ min: 10, max: 50 }),
      movement: chance.pickone(["Automatic", "Manual"]),
      movementPerCalibre: chance.natural({ min: 1000, max: 5000 })
    },
    case: {
      material: chance.pickone(["leather", "gold", "steel"]),
      diameter: chance.natural({ min: 30, max: 60 }),
      glass: chance.pickone([
        "red",
        "blue",
        "green",
        "salmon",
        "brown",
        "black"
      ])
    },
    strap: {
      material: chance.pickone(["leather", "gold", "steel"]),
      braceletColor: chance.pickone([
        "red",
        "blue",
        "green",
        "salmon",
        "brown",
        "black"
      ])
    }
  }
})

productsRoutes.get("/", (req, res) => {
  res.json(products)
})
productsRoutes.get("/carousel", (req, res) => {
  res.json(products.slice(0,8))
})

productsRoutes.get("/:productId", (req, res) => {
  const watchId = req.params.productId

  res.json(products.find(w => w.id == watchId))
})

module.exports = productsRoutes
