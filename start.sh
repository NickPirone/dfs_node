#./clear.sh
node main.js & node dfs_server.js 8080 0 & node dfs_server.js 8081 1 & node dfs_server.js 8082 2
