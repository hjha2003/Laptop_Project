const {pool} = require("../config/dbConfig");

const addempLaptopDetails = async (req, res) => {
    try {
      const {emp_id ,emp_name ,laptop_id ,laptop_name ,laptop_features , laptop_price} = req.body;
  
      await pool.query(`CREATE TABLE IF NOT EXISTS emp_laptop_table
          (   
              emp_id SERIAL PRIMARY KEY ,
              emp_name VARCHAR(255) NOT NULL ,
              laptop_id INT PRIMARY KEY NOT NULL,
              laptop_name VARCHAR(255) NOT NULL,
              laptop_features VARCHAR(255) NOT NULL ,
              laptop_price INT NOT NULL,
              PRIMARY KEY (emp_id , laptop_id)
          )`);
  
      const result = await pool.query(
        `INSERT INTO emp_laptop_table (emp_id, emp_name ,laptop_id,laptop_name ,laptop_features ,laptop_price) VALUES ($1, $2 ,$3,$4,$5,$6) RETURNING *`,
        [emp_id  ,emp_name , laptop_id  ,laptop_name , laptop_features ,  laptop_price]
      );
  
      res.status(201).json(result.rows[0]);
    } catch (error) {
      res.status(500).json({ error: error.stack });
    }
  };
  
  
  
  const getemplaptopDetails = async (req, res) => {
    const { emp_id } = req.query;
  
    // Check if laptop_id is valid
    if(!emp_id){
        return res.status(400).json({error:"Invalid  emp_id"})
    }
  
    try {
      const result = await pool.query(
        `SELECT * FROM emp_laptop_table WHERE emp_id = $1`,
        [emp_id]
      );
  
      // If no rows were found, return an error response
      if (result.rows.length === 0) {
        return res.status(404).json({ error: "Laptop  not found" });
      }
  
      // Return the updated record
      res.status(200).json(result.rows[0]);
    } catch (error) {
      res.status(500).json({ error: error.stack });
    }
  };
  
  
  
  const updateempLaptopDeatils = async (req, res) => {
    const {emp_id} = req.query;
  
    const {emp_name,laptop_id,laptop_name,laptop_features,laptop_price} = req.body;
    try {
      const { rows } = await pool.query(
        `UPDATE emp_laptop_table SET emp_name=$1,laptop_id=$2,laptop_name=$3,laptop_features = $4 ,laptop_price = $5 WHERE emp_id = $6 RETURNING *`,
        [emp_name,laptop_id,laptop_name,laptop_features,laptop_price,emp_id]
      );
  
      console.log(rows);
      
      if (rows.length === 0) {
        res.status(404).json({ error: "Laptop  not found" });
      } else {
        res.json(rows[0]);
      }
    } catch (error) {
      res.status(500).json({ error: error.stack });
    }
  };
  
  const deleteempLaptopDetails = async (req, res) => {
    const { emp_id } = req.query;
  
    try {
      const { rows } = await pool.query(
        `DELETE FROM emp_laptop_table WHERE emp_id = $1 RETURNING *`,
        [emp_id]
      );
      if (rows.length === 0) {
        res.status(404).json({ error: "Laptop not found" });
      } else {
        res.json({ message: "Laptop deleted successfully" });
      }
    } catch (error) {
      res.status(500).json({ error: error.stack });
    }
  };
  
  
  
  const getempLaptopAllDetails = async (req, res) => {
    // const { laptop_id } = req.query;
  
    // // Check if user_id is valid
    // if (!laptop_id) {
    //   return res.status(400).json({ error: "Invalid user_id" });
    // }
  
    try {
      //const filters = req.query; // Query parameters for filtering
  
      // Build the SQL query based on filters
      let sql = 'SELECT * FROM emp_laptop_table';
      const queryParams = [];
  
      // if (filters.category) {
      //   sql += ' WHERE laptop_id = $1';
      //   queryParams.push(filters.category);
      // }
  
      const result = await pool.query(sql, queryParams);
      res.json(result.rows);
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Error fetching data' });
    }
  };
  
  module.exports = {
    addempLaptopDetails,
    getemplaptopDetails,
    updateempLaptopDeatils,
    deleteempLaptopDetails,
    getempLaptopAllDetails
  };
  cd 