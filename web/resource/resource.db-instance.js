/**
 * Created by uv2sun on 16/9/20.
 */

angular.module('resource.db-instance', [])
    .service('dbInstanceService', ['$http', function ($http) {

        this.getDBInstances = function (projectID) {
            return $http.get('project/' + projectID + '/db-instances').then(function (res) {
                return res.data;
            })
        };

        this.saveDBInstance = function (projectID, dbInstance) {
            return $http.post('project/' + projectID + '/db-instance', dbInstance).then(function (res) {
                return res.data;
            })
        };

        this.delDBInstance = function (projectID, db_id) {
            return $http.delete('project/' + projectID + '/db-instance/' + db_id).then(function (res) {
                return res.data;
            })
        };

        /**
         * 在数据库实例db_id上执行sql
         * @param db_id
         * @param sql
         * @returns {angular.IPromise<TResult>}
         */
        this.execSql = function (db_id, sql) {
            return $http.put('db-instance/' + db_id + '/execsql', sql).then(function (res) {
                return res.data;
            })
        }

    }]);