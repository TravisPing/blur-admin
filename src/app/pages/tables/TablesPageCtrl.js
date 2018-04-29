/**
 * @author v.lugovsky
 * created on 16.12.2015
 */


(function () {
  'use strict';

  angular.module('BlurAdmin.pages.tables')
      .controller('TablesPageCtrl', TablesPageCtrl);

  var data;
  var list = [];
  var count= 0;




  /** @ngInject */
  function TablesPageCtrl($scope, $filter, editableOptions, editableThemes) {

    
    $scope.smartTableData=window.smartTableData;
    $.ajax({
        url: "https://api.fixer.io/latest?base=USD",
        async: false,
        success: function(data){
          console.log('json: ',data.rates);
       
          for (var x in data.rates){

            var a = {
              'id':++count,
              'key':x,
              'value':data.rates[x],
              'valuePlus10':(data.rates[x]+10.0002).toFixed(4),
              'even':(((data.rates[x]+10.0002).toFixed(4))*10000).toFixed(0)%2 == 0

            }
            list.push(a);
          }
          $scope.smartTableData =list; 
          console.log('arr: ',$scope.smartTableData);
        }
    });
    // $.getJSON( "https://api.fixer.io/latest?base=USD", function(data  ) {

    //   console.log('json: ',data.rates);
       
    //   for (var x in data.rates){

    //     var a = {
    //       'id':++count,
    //       'key':x,
    //       'value':data.rates[x],
    //       'valuePlus10':(data.rates[x]+10.0002).toFixed(4),
    //       'even':(((data.rates[x]+10.0002).toFixed(4))*10000).toFixed(0)%2 == 0

    //     }
    //     list.push(a);
    //   }
    //   $scope.smartTableData =list; 
    //   console.log('arr: ',$scope.smartTableData);


    // });
    

    $scope.smartTablePageSize = 10;


   

   // $scope.editableTableData = $scope.smartTableData.slice(0, 36);

    

    // $scope.showGroup = function(user) {
    //   if(user.group && $scope.groups.length) {
    //     var selected = $filter('filter')($scope.groups, {id: user.group});
    //     return selected.length ? selected[0].text : 'Not set';
    //   } else return 'Not set'
    // };

    // $scope.showStatus = function(user) {
    //   var selected = [];
    //   if(user.status) {
    //     selected = $filter('filter')($scope.statuses, {value: user.status});
    //   }
    //   return selected.length ? selected[0].text : 'Not set';
    // };


    // $scope.removeUser = function(index) {
    //   $scope.users.splice(index, 1);
    // };

    // $scope.addUser = function() {
    //   $scope.inserted = {
    //     id: $scope.users.length+1,
    //     name: '',
    //     status: null,
    //     group: null
    //   };
    //   $scope.users.push($scope.inserted);
    // };

    function onTimerTick() {
      $.getJSON( "https://api.fixer.io/latest?base=USD", function(data  ) {
        list=[];
        count=0;
  
        console.log('json: ',data.rates);
         
        for (var x in data.rates){
  
          var a = {
            'id':++count,
            'key':x,
            'value':data.rates[x],
            'valuePlus10':(data.rates[x]+10.0002).toFixed(4),
            'even':(((data.rates[x]+10.0002).toFixed(4))*10000).toFixed(0)%2 == 0
  
          }
          list.push(a);
        }
        window['smartTableData']=$scope.smartTableData;
        $scope.smartTableData =list; 
        console.log('arr: ',$scope.smartTableData);
  
        
      });
    }
    setInterval(onTimerTick, 3300);
    editableOptions.theme = 'bs3';
    editableThemes['bs3'].submitTpl = '<button type="submit" class="btn btn-primary btn-with-icon"><i class="ion-checkmark-round"></i></button>';
    editableThemes['bs3'].cancelTpl = '<button type="button" ng-click="$form.$cancel()" class="btn btn-default btn-with-icon"><i class="ion-close-round"></i></button>';

   
     // 33 milliseconds = ~ 30 frames per sec

  }

})();
