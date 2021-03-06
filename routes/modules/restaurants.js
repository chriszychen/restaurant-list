const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

// render search results
router.get('/search', (req, res) => {
  const userId = req.user._id
  const keyword = req.query.keyword.trim().toLowerCase()
  Restaurant.find({ $or: [{ name: { $regex: keyword, $options: 'i' }, userId }, { category: { $regex: keyword, $options: 'i' }, userId }] })
    .lean()
    .then(restaurants => {
      let noResult = false
      if (restaurants.length === 0) {
        noResult = true
      }
      res.render('index', { restaurants, noResult, keyword: req.query.keyword })
    })
    .catch(err => console.log(err))
})

// render sort results
router.get('/sort', (req, res) => {
  const userId = req.user._id
  const sortMethod = req.query.sort_method
  Restaurant.find({ userId })
    .lean()
    .sort(sortMethod)
    .then(restaurants => res.render('index', { restaurants, sortMethod }))
    .catch(err => console.log(err))
})

// render create page
router.get('/new', (req, res) => {
  res.render('new')
})
// CREATE function
router.post('', (req, res) => {
  const userId = req.user._id
  const newRestaurant = Object.assign({ userId }, req.body)
  let validationError = false
  if (!restaurantValidation(newRestaurant)) {
    // 回傳輸入資料錯誤提示
    validationError = true
    res.render('new', { validationError })
  } else {
    return Restaurant.create(newRestaurant)
      .then(() => res.redirect('/'))
      .catch(err => console.log(err))
  }
})

// READ function and render detail page
router.get('/:restaurant_id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.restaurant_id
  return Restaurant.findOne({ _id, userId })
    .lean()
    .then(restaurant => res.render('detail', { restaurant }))
    .catch(err => console.log(err))
})

// render edit page
router.get('/:restaurant_id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.restaurant_id
  return Restaurant.findOne({ _id, userId })
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(err => console.log(err))
})

// UPDATE function
router.put('/:restaurant_id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.restaurant_id
  const editedRestaurant = Object.assign({ _id }, req.body)

  let validationError = false
  if (!restaurantValidation(editedRestaurant)) {
    // 回傳輸入資料錯誤提示
    validationError = true
    res.render('edit', { restaurant: editedRestaurant, validationError })
  } else {
    return Restaurant.findOne({ _id, userId })
      .then(restaurant => {
        console.log(restaurant)
        Object.assign(restaurant, editedRestaurant)
        return restaurant.save()
      })
      .then(() => res.redirect(`/restaurants/${_id}`))
      .catch(err => console.log(err))
  }
})

// DELETE function
router.delete('/:restaurant_id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.restaurant_id

  return Restaurant.findOne({ _id, userId })
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

module.exports = router

function restaurantValidation(restaurant) {
  // Required validation
  for (const key in restaurant) {
    if (key !== 'name_en') {
      if (!restaurant[key]) return false
    }
  }
  // URL validation
  const urlRegex = /[Hh][Tt][Tt][Pp][Ss]?:\/\/.+/
  if (!urlRegex.test(restaurant.image) || !urlRegex.test(restaurant.google_map)) return false
  // Phone validation
  const phoneRegex = /^[0-9]{2}-[0-9]{4}-[0-9]{4}$|^09[0-9]{2}-[0-9]{6}$/
  if (!phoneRegex.test(restaurant.phone)) return false
  // Rating validation
  if (Number(restaurant.rating) < 0 || Number(restaurant.rating) > 5) return false
  // all validation pass
  return true
}
