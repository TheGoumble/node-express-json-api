const express = require("express")
const cors = require("cors")
const data = require("./restaurants.json")
// to read file
const fs = require("fs")

const app = express()
app.use(cors())
app.use(express.json())

app.listen(4000, () => console.log("Our API running on 4000"))

// this is a func to do the write file
const handleWriteFile = () => {
  const dataJson = JSON.stringify(data) // converting to back to JSON
  fs.writeFile("restaurants.json", dataJson, (err) => console.error(err)) //writing json
}

// get all items from JSON
app.get("/", (req, res) => {
  res.send(data)
})

// add new restaurant
app.post("/add-restaurant", (req, res) => {
  data.push(req.body) // add new restaurant
  handleWriteFile()
  res.send(data)
})

//  find and update a resturant
app.patch("/update-restaurant", (req, res) => {
  const { name } = req.query
  // find item to update req.query
  const itemFound = data.find((eachRestaurant) => eachRestaurant.name === name)
  const indexOFItem = data.indexOf(itemFound) //getting index of item found
  data[indexOFItem] = req.body // overwriting the item with req.body
  handleWriteFile()

  res.send(data)
  // then modify the info
})

//  find and delete a resturant
app.delete("/delete", (req, res) => {
  const { name } = req.query
  //find the item
  const itemFound = data.find((eachRestaurant) => eachRestaurant.name === name)
  const indexOFItem = data.indexOf(itemFound) //getting index of item found
  
  data.splice(indexOFItem, 1)
  handleWriteFile()

  res.send(data)
})
console.log(data)