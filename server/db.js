const {Sequelize} = require('sequelize');


const sequelize = new Sequelize('blogpost', 'admin', 'j1hs7hyay', {
    host: 'database-2.ccfgscpcrq2a.eu-north-1.rds.amazonaws.com',
    dialect: 'mysql',
    define: {
        timestamps: false
    }
})

const connectToDb = async ()=>{
    try{
        await sequelize.authenticate();
        console.log("Successfully connected to our db");
    }
    catch(error){
        console.log(error);
    }
}


module.exports = {sequelize , connectToDb}