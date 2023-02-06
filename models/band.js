const {v4: uuidV4} = require('uuid');

class Band{
    constructor(name = 'no-name'){
        //instal npm i uuid
        this.id = uuidV4() //identificador unico
        this.name = name;
        this.votes = 0;
    }
}

module.exports = Band;