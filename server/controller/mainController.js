/**
 * Created by andrew on 2/2/17.
 */
var mainController = function (resource) {
    this.resource = resource;
}

mainController.prototype.index = function () {
    this.resource.writeHead(200);
    this.resource.end('this is index page');
}
// mainController.prototype.getCredentials = function (data) {
//
//     this.db(data, function (data) {
//         if (!data.length) {
//             throw new Error('error');
//         }
//         return data;
//     })
// }

mainController.prototype.get = function (){

}

mainController.prototype.getCredentials = function (data) {
    var object = this;

    this.db.users().getCredentials(data.email, data.password, function (data, error) {
        if (error) throw Error(error);

        if (Object.keys(data).length) {
            var token = crypto.randomBytes(256).toString('hex') // Synchronous
            //object.resource.setHeader('Token', token);

            if (!process.token) {
                process.token = [];
                process.token.push(token);
            }

            data = {
                token : token,
                body : data
            }

        } else {
            data = {
                body: []
            }
        }

        object.resource.writeHead(200, {
            'Content-Type': 'application/json'
        });
        object.resource.end(JSON.stringify(data));
    })
}

mainController.prototype.getById = function (id){
    //this.af.database.object(this.table+id);
}

mainController.prototype.save = function (id) {

}

module.exports = mainController;