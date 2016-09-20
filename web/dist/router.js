/**
 * Created by uv2sun on 16/6/13.
 */

angular.module('app.router', ['ui.router'])
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state('main', {
                url: '/main',
                abstract: true,
                controller: 'mainController',
                templateUrl: 'app/main/tpls/main.html'
            })
            /**
             * 项目
             */
            .state('project', {
                url: '/project',
                parent: 'main',
                template: '<ui-view flex layout="column"></ui-view>'
            })
            .state('project.list', {
                url: '/list',
                controller: 'projectListController',
                templateUrl: 'app/project/template/project_list.html'
            })
            .state('project.detail', {
                url: '/{project_id}',
                controller: 'projectDetailController',
                templateUrl: 'app/project/template/project_detail.html'
            })
            /**
             * 项目模块文件
             */
            .state('pd', {
                url: '/pd',
                parent: 'project.detail',
                template: '<ui-view  flex layout="column"></ui-view>'
            })
            .state('pd.ft', {
                url: '/file-type',
                controller: 'fileTypeController',
                templateUrl: 'app/file-type/template/file-type.html'
            })
            .state('pd.files', {
                url: '/files',
                controller: 'filesController',
                templateUrl: 'app/file/template/files.html'
            })
            .state('pd.module', {
                url: '/module',
                controller: 'moduleController',
                templateUrl: 'app/module/template/module.html'
            })
            .state('pd.mod-file-upd', {
                url: '/mod-file-upd',
                controller: 'moduleFileUpdateController',
                templateUrl: 'app/mod-file-upd/template/mod-file-upd.html'
            })
            .state('pd.deploy-instance', {
                url: '/deploy-instance',
                controller: 'deployInstanceController',
                templateUrl: 'app/deploy-instance/template/deploy-instance.html'
            })
            /**
             * 主机管理
             */
            .state('server', {
                url: '/server',
                parent: 'main',
                template: '<ui-view flex layout="column"></ui-view>'
            })
            .state('server.list', {
                url: '/list',
                controller: 'serverListController',
                templateUrl: 'app/server/template/server-list.html'
            })
            //数据库管理
            .state('pd.db-instance', {
                url: '/db-instance',
                controller: 'dbInstanceController',
                templateUrl: 'app/db-instance/template/db-instance.html'
            })
    }])
    .run(['$rootScope', '$state', function ($rootScope, $state) {
        console.log('app.router.run');
        /**
         * 项目功能树列表
         * @type {*[]}
         */
        $rootScope.treeList = [
            //一级模块
            {id: 1, name: '项目管理', pid: 0, state: 'project.detail', no_show_init: '1', root_distance: 1}
            , {id: 2, name: '项目列表', pid: 0, state: 'project.list', root_distance: 1}
            , {id: 3, name: '主机管理', pid: 0, state: 'server.list', root_distance: 1, admin: 1}

            //二级项目管理内容
            , {id: 11, name: '项目文件类型', pid: 1, state: 'pd.ft', root_distance: 2}
            , {id: 12, name: '项目文件', pid: 1, state: 'pd.files', root_distance: 2}
            , {id: 13, name: '项目模块', pid: 1, state: 'pd.module', root_distance: 2, admin: 1}
            , {id: 14, name: '数据库实例', pid: 1, state: 'pd.db-instance', root_distance: 2}
            , {id: 15, name: '部署实例', pid: 1, state: 'pd.deploy-instance', root_distance: 2}
            , {id: 16, name: '项目模块文件更新', pid: 1, state: 'pd.mod-file-upd', root_distance: 2}

        ];
        var root = {name: 'root', id: 0, pid: -1, root_distance: 0};

        /**
         * 项目树json,格式:{ID:节点对象,id:节电对象....}
         * @type {{}}
         */
        $rootScope.treeJSON = {};
        $rootScope.treeJSON[root.id] = root;
        /**
         * 项目树json对象,格式:{key:state,value:treeNode}
         * @type {{}}
         */
        $rootScope.treeStateJSON = {};
        /**
         * 生成项目数的id作为key和state作为key的json对象
         */
        for (var i = 0; i < $rootScope.treeList.length; i++) {
            $rootScope.treeStateJSON[$rootScope.treeList[i].state] = $rootScope.treeList[i];
            $rootScope.treeJSON[$rootScope.treeList[i].id] = $rootScope.treeList[i];
        }

        /**
         * 生成项目数的树结构
         * @type {{name: string, id: number, pid: number}}
         */
        $rootScope.tree = root;
        for (var i = 0; i < $rootScope.treeList.length; i++) {
            var tmpTreeNode = $rootScope.treeList[i];
            if (!$rootScope.treeJSON[tmpTreeNode.pid].children) {
                $rootScope.treeJSON[tmpTreeNode.pid].children = [];
            }
            $rootScope.treeJSON[tmpTreeNode.pid].children.push(tmpTreeNode);
        }

        /**
         * 强制刷新当前state
         */
        $rootScope.reloadState = function () {
            console.log("reloadState:" + $rootScope.currentStateName);
            $state.go($rootScope.currentStateName, $rootScope.currentStateParams, {reload: true});
        };
        /**
         * 转换state到node
         * @param node 树节点json
         * @param param
         */
        $rootScope.goState = function (node, param) {
            // $event.preventDefault();
            // $event.stopPropagation();
            $state.go(node.state, param);
        };
        console.log('app.router.run end');

    }]);