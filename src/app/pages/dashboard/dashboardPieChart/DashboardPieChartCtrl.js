/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboard')
      .controller('DashboardPieChartCtrl', DashboardPieChartCtrl);

  /** @ngInject */
  function DashboardPieChartCtrl($scope, $timeout, baConfig, baUtil) {


    var data;
    var current= new Date();
    var dif =0;     
     var list=[];
      var count=0;
    $.getJSON( "https://api.fixer.io/latest?base=USD", function(data  ) {


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

        dif =   new Date()-current;

        console.log(dif);



    var pieColor = baUtil.hexToRGB(baConfig.colors.defaultText, 0.2);
    $scope.charts = [{
      color: pieColor,
      description: 'API status',
      stats: '200',
      icon: 'person',
    }, {
      color: pieColor,
      description: 'Date' ,
      stats: data["date"].parse("March 21"),
      icon: '',
    }, {
      color: pieColor,
      description: 'Data size',
      stats: list.length,
      icon: 'face',
    }, {
      color: pieColor,
      description: 'Latency',
      stats: dif ,
      icon: 'refresh',
    }
    ];
    updatePieCharts();
  });

  var pieColor = baUtil.hexToRGB(baConfig.colors.defaultText, 0.2);
  $scope.charts = [{
    color: pieColor,
    description: 'API status',
    stats: '200',
    icon: 'person',
  }, {
    color: pieColor,
    description: 'Date' ,
    stats: '',
    icon: 'money',
  }, {
    color: pieColor,
    description: 'Data size',
    stats: data,
    icon: 'face',
  }, {
    color: pieColor,
    description: 'Latency',
    stats: dif +'ms' ,
    icon: 'refresh',
  }
  ];

    function getRandomArbitrary(min, max) {
      return Math.random() * (max - min) + min;
    }

    function loadPieCharts() {
      $('.chart').each(function () {
        var chart = $(this);
        chart.easyPieChart({
          easing: 'easeOutBounce',
          onStep: function (from, to, percent) {
            $(this.el).find('.percent').text(Math.round(percent));
          },
          barColor: chart.attr('rel'),
          trackColor: 'rgba(0,0,0,0)',
          size: 84,
          scaleLength: 0,
          animation: 2000,
          lineWidth: 9,
          lineCap: 'round',
        });
      });

      $('.refresh-data').on('click', function () {
        updatePieCharts();
      });
    }

    function updatePieCharts() {
      $('.pie-charts .chart').each(function(index, chart) {
        $(chart).data('easyPieChart').update(getRandomArbitrary(55, 90));
      });
    }

    $timeout(function () {
      loadPieCharts();
      updatePieCharts();
    }, 1000);    
  

  }
})();