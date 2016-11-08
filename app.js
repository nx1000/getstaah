angular.module('StaahApp', ['btford.socket-io'])

.factory('mySocket', function(socketFactory) {
    return socketFactory({
        ioSocket: io.connect('http://localhost:9090')
    });
})

.controller('StaahCtrl', function($scope, mySocket) {

    $scope.jsonstring = 'belum ada data';
    $scope.waiting = '0';

    $scope.pesans = [];

    mySocket.on("incoming", function(data) {
        // $scope.jsonstring = data;
        var skrg = new Date();
        $scope.pesans.push({
            tgl: skrg,
            isi: data
        });

    });

    mySocket.on("gagal", function(data) {
        // $scope.jsonstring = data;        
        $scope.waiting = data;

    });



})