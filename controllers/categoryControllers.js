const { db } = require("../database");

module.exports = {
  listCategory: (req, res) => {
    if(req.query.type === "total"){
      let getQuery = `SELECT categories.id_category, categories.category, count(*) as total FROM categories INNER JOIN products ON categories.id_category = products.id_category GROUP BY categories.id_category;`
      db.query(getQuery, (err, result) => {
        if(err){
          return res.status(500).send({
            success: false,
            data: err
          })
        }else{
          return res.status(200).send({
            success: true,
            data: result
          })
        }
      })
    }else{
      let getQuery = `SELECT * FROM categories;
      `
      db.query(getQuery, (err, result) => {
        if(err){
          return res.status(500).send({
            success: false,
            data: err
          })
        }else{
          return res.status(200).send({
            success: true,
            data: result
          })
        }
      })
    }
  },
  getCategory : (req,res) => {
    if(req.user.id){
      let getQuery = `select * from categories where id_category = ${db.escape(req.query.id)}`
      db.query(getQuery, (err, result) => {
        if(err){
          return res.status(500).send({
            success: false,
            data: err
          })
        }else{
          return res.status(200).send({
            success: true,
            data: result[0]
          })
        }
      })
    }else{
      res.status(500).send({
        success: false,
        data: "Category id required!"
      })
    }
  },
  addCategory : (req, res) => {
    if(req.user.role === "admin"){
      let { name } = req.body;
      let addQuery = `insert into categories values (null, ${db.escape(name)}, 'true')`
      db.query(addQuery, (err, result) => {
        if(err){
          return res.status(500).send({
            success: false,
            data: err
          })
        }else if(result.insertId){
          let getQuery = `select * from categories where id_category='${result.insertId}'`
          db.query(getQuery, (err2, result2) => {
            if(err2){
              return res.status(500).send({
                success: false,
                data: err2
              })
            }else{
              return res.status(200).send({
                success: true,
                data: result2[0]
              })
            }
          })
        }
      })
    }else{
      return res.status(500).send({
        success: false,
        data: "User not allowed!"
      })
    }
  },
  editCategory: (req, res) => {
    if(req.user.role === "admin"){
      let { id, name} = req.body;
      let deleteQuery = `update categories set category = ${db.escape(name)} where id_category = ${db.escape(id)}`
      db.query(deleteQuery, (err, result) => {
        if(err){
          return res.status(500).send({
            success: false,
            data: err
          })
        }else{
          let getQuery = `select * from categories where id_category = ${db.escape(id)}`
          db.query(getQuery, (err2, result2) => {
            if(err2){
              return res.status(500).send({
                success: false,
                data: err2
              })
            }else{
              return res.status(200).send({
                success: true,
                data: result2[0]
              })
            }
          })
        }
      })
    }else{
      return res.status(500).send({
        success: false,
        data: "User not allowed!"
      })
    }
  },
  deleteCategory: (req, res) => {
    if(req.user.role === "admin"){
      let { id } = req.query;
      let deleteQuery = `update categories set active = 'false' where id_categories = ${db.escape(parseInt(id))}`
      db.query(deleteQuery, (err, result) => {
        if(err){
          return res.status(500).send({
            success: false,
            data: err
          })
        }else if(result){
          return res.status(200).send({
            success: true,
            data: "Delete succeed!"
          })
        }
      })
    }else{
      return res.status(500).send({
        success: false,
        data: "User not allowed!"
      })
    }
  }
}