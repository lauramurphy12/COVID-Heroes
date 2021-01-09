
const {Sequelize, DataTypes} = require("sequelize");
const mariadb = require("mariadb");
const config = require('./config/config.json').production;

let dbC = {
  sConn: "",
    openConnection:async() => {
        try{
            dbC.sConn = await new Sequelize(
                config.database, 
                config.username, 
                config.password, 
                {
                    port: 3306,
                    dialect: config.dialect,
                    dialectModule: mariadb,
                },
            );
            await dbC.sConn.authenticate();
            console.log("Connection established. Authenticated.");
        }catch(e){
            console.log(e); 
        }
        return dbC.sConn;
    },
    dbName:config.database,
    printSelf: () => {
        console.log(dbC);
        return;
        
    },
    showdbName: () => {
       return dbC.dbName;
    },
    getAllTables: async() => {
        let q = "";
        try{
            q = await dbC.sConn.query("SHOW TABLES;");
        }catch(e){
           console.log(e); 
        }
        return q;
    },
    // get all table entries using raw query
    getAllRows: async(tableName) => {
        let tableRows = [];
        let res = await dbC.sConn.query("SELECT * from "+ tableName);
        for(let i of res){
            tableRows.push(i);
        }
        return tableRows;
    },
    
    // find all instances from model
    findAll: async(modelName) => {
        let allModelInstances = await modelName.findAll(); 
        return allModelInstances;
    },
    //inner join of two models
    innerJoin: async(firstModel, secondModel, id) => {
        console.log("user id from server is: ", id);
        innerJoin = await firstModel.findAll({
            include: [{
                model: secondModel,    
                required: true,
                raw: true,
               where: {id: id}
            }]
        });
        return innerJoin;
    },
    // find the most recently created instance of a given model
    findLastCreated: async(model, FK) => {
        console.log("foreign key pair is: ", FK);
        mostRecent = await model.findOne({
                where: FK,
                order: [[ 'createdAt', 'DESC' ]]
        });
        console.log("most recent is: ", mostRecent);
        return mostRecent;
    },
    
    findByPK: async(modelName, id) => {
        modelInstance = await modelName.findByPk(id);
        return modelInstance;
    },
    
    insert: async(modelName, reqParams) => {
        console.log("reqParams are: ", reqParams);
        console.log(modelName.rawAttributes);
        const modelAttributes = [];
        for(let key in modelName.rawAttributes){
            modelAttributes.push(key);
        }
        var insertionParams = {};
        Object.keys(reqParams).forEach(function(key){
            for(var i = 0; i < modelAttributes.length; i++){
                if(key == modelAttributes[i]){
                    insertionParams[key] = reqParams[key];
                    break;
                }
            }
        });
        modelName.create(insertionParams);
    },
 
    update: async(modelName, reqParams) => {
        const modelAttributes = [];
        for(let key in modelName.rawAttributes){
            modelAttributes.push(key);
        }
        var updateParams = {};
        Object.keys(reqParams).forEach(function(key){
            for(var i = 0; i < modelAttributes.length; i++){
                if(key == modelAttributes[i]){
                    updateParams[key] = reqParams[key];
                    break;
                }
            }
        });
        modelName.update(updateParams);
        
    },
    getInstance: async(modelName, reqParam) => {
       let modelAttributeName = "";
       let requestParamValue = "";
        Object.keys(reqParam).forEach(function(key){
            for(let attributeName in modelName.rawAttributes){
                if(attributeName == Object.keys(reqParam)){
                    modelAttributeName = attributeName; 
                    requestParamValue = reqParam[key];
                }
            }
        });
        let Obj = {};
        Obj[Object.keys(reqParam)[0]] = requestParamValue;
       let instance = await modelName.findOne({ where: Obj });
       return instance;
    },
    /*
    update: async(modelName, id) => {
        model = await modelName.findByPk(id);
        updated = await model.update({
            req.body,
            //firstName: req.body.firstName,
            //lastName: req.body.lastName;
        });
    },*/
    
    close: () => {
        try{
            dbC.sConn.close();
            console.log("Closed conn");
        }
        catch(e){
            console.log("Bad release");
            console.log(e);
        }
    },
}; 
module.exports = dbC;




    


