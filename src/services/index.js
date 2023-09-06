import FilesHandler from "../../helpers/filesHandler.js";
import { EventEmitter } from "node:events";
import _ from "lodash";

class Service extends EventEmitter {

    constructor(Repo, imagesNames, routes) {

        super();
        
        this.Repo = Repo;
        this.imagesNames = imagesNames;
        this.routes = routes;
    }

    async get(id) {

        return this.Repo.get(id)
            .then((row) => {

                const responseData = _.cloneDeep(row.dataValues);
                    
                responseData.relationShips = {};
                    
                // Fill relationShips object with children routes
                this.routes.children.forEach((child) => {
    
                    responseData.relationShips[child] = `${this.routes.parent}/${row.id}/${child}`;
                });

                return responseData;
            });
    }

    async getByFilter(filter) {

        return this.Repo.getByFilter(filter)
            .then((rows) => {

                const responseData = [];
                rows.forEach((row, index) => {
                    
                    const responseDataElement = _.cloneDeep(row.dataValues);
                    
                    responseDataElement.relationShips = {};
                    
                    // Fill relationShips object with children routes
                    this.routes.children.forEach((child) => {
    
                        responseDataElement.relationShips[child] = `${this.routes.parent}/${row.id}/${child}`;
                    });
    
                    responseData.push(responseDataElement);
                });

                return responseData;
            });
    }

    async doesRowExist(id) {
                
        return this.Repo.get(id)
            .then((row) => {
                
                let rowExists = false;

                if (row) {
                    rowExists = true;
                }

                return rowExists;
            })
            .catch(() => {

                return false;
            });
    }

    async getAll(filter) {

        return this.Repo.getAll(filter)
            .then((rows) => {

                const responseData = [];
                rows.forEach((row, index) => {

                    const responseDataElement = _.cloneDeep(row.dataValues);
                    
                    responseDataElement.relationShips = {};
                    
                    // Fill relationShips object with children routes
                    this.routes.children.forEach((child) => {
    
                        responseDataElement.relationShips[child] = `${this.routes.parent}/${row.id}/${child}`;
                    });
    
                    responseData.push(responseDataElement);
                });
                return responseData;
            });

    }

    /**
     * Make row data object and pass it to the repo to 
     * add a new row to the database.
     * 
     * @memberof WeaponService
     * @name create
     * @param {Object} rowData
     * @param {Object} images
     * @returns {Promise<any>} row object or error
     */
    
    async create(rowData) {

        return this.Repo.create(rowData)
            .then((row) => {

                return row;
            });
    }

    
    async update(rowData, images) {
        
        const destroyedRow = await this.Repo.get(rowData.id);
        
        // delete old images from the disk
        images.forEach((imageObject) => {

            // Delete image if exists
            if (destroyedRow.dataValues[imageObject.fieldname]) {

                FilesHandler.deleteFile(destroyedRow.dataValues[imageObject.fieldname]);
            }
            
        });


        return this.Repo.update(rowData)
            .then((row) => {
                return row;
            });
    }

    async delete(id) {

        /**
         * To make sure that the record exists, maybe removed and dealed with better in future upgrades
         * 
         * */
        await this.Repo.get(id);

        return this.Repo.delete(id)
            .then((row) => {

                return row;
            });
    }

    async restore(id) {

        return this.Repo.restore(id)
            .then((row) => {

                return row;
            });
    }

}
const service = new Service();

export { service, Service };
