/**
 * Created by uv2sun on 16/6/13.
 */
angular.module('resource.project', [])
    .service('projectService', ['$http', function ($http) {
        this.getAllProject = function () {
            return $http.get('projects').then(function (res) {
                return res.data;
            })
        };
        this.addProject = function (project) {
            if (project) {
                return $http.post('project', project).then(function (res) {
                    return res.data;
                });
            }
        };
        this.getProject = function (project) {
            if (project && project.project_id) {
                return $http.get('project/' + project.project_id).then(function (res) {
                    return res.data;
                })
            }
        }
    }])
;