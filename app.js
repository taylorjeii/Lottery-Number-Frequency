angular.module('app', ['ngAnimate', 'angular-toArrayFilter']);

angular.module('app').controller('mainCtrl', mainCtrl);

function mainCtrl ($scope, $http){
  // Set graph height/width
  $scope.width = 1200;
  $scope.height= 100;

  // Set x and y axis labels
  $scope.yAxis= 'Times Drawn';
  $scope.xAxis= 'Lottery Numbers';

  // Set padding for bar text
  $scope.singleDigitVal = function(val){
    if (val < 10) {
      return true;
    }else{
      return false;
    }
  }

  $http.get('lottery.json').success(function(data){
    $scope.winning = data;
    var log = [];
    angular.forEach($scope.winning, function(item){
      var winning_numbers_str = item.winning_numbers;
      var winning_numbers_array = winning_numbers_str.split(' ');
      for(var i = 0; i<winning_numbers_array.length; i++){
        winning_numbers_array[i] = parseInt(winning_numbers_array[i], 10);
      }
      this.push(winning_numbers_array);
    }, log);


    $scope.frequency =  findCommonElements(log);
    $scope.max = 60;

    function findCommonElements(arr) {
      var lookupArray = [];
      var commonElementArray = [];

      for (var arrayIndex = 0; arrayIndex < arr.length; arrayIndex++) {
          for (var childArrayIndex = 0; childArrayIndex < arr[arrayIndex].length; childArrayIndex++) {
              if (lookupArray[arr[arrayIndex][childArrayIndex]]) {
                  lookupArray[arr[arrayIndex][childArrayIndex]]++;
              } else {
                  lookupArray[arr[arrayIndex][childArrayIndex]] = 1;
              }
              if (lookupArray[arr[arrayIndex][childArrayIndex]] == arr.length) {
                  commonElementArray.push(arr[arrayIndex][childArrayIndex]);
              }
          }
      }
      return lookupArray;
    }
  });
};

