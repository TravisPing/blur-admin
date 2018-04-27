/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.charts.amCharts')
      .controller('BarChartCtrl', BarChartCtrl);

  /** @ngInject */
  function BarChartCtrl($scope, baConfig, $element, layoutPaths) {
    var data;
    var list = [];
    function onTimerTick() {
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
  
  
      });
    }




    var layoutColors = baConfig.colors;
    var id = $element[0].getAttribute('id');
    var barChart = AmCharts.makeChart(id, {
      type: 'serial',
      theme: 'blur',
      color: layoutColors.defaultText,
      dataProvider: list,
      
      //[
        // {
        //   country: 'USA',
        //   visits: 3025,
        //   color: layoutColors.primary
        // },
        // {
        //   country: 'China',
        //   visits: 1882,
        //   color: layoutColors.danger

        // },
        // {
        //   country: 'Japan',
        //   visits: 1809,
        //   color: layoutColors.info
        // },
        // {
        //   country: 'Germany',
        //   visits: 1322,
        //   color: layoutColors.success
        // },
        // {
        //   country: 'UK',
        //   visits: 1122,
        //   color: layoutColors.warning
        // },
        // {
        //   country: 'France',
        //   visits: 1114,
        //   color: layoutColors.primaryLight
        // }
      //],
      valueAxes: [
        {
          axisAlpha: 0,
          position: 'left',
          title: 'Currency',
          gridAlpha: 0.5,
          gridColor: layoutColors.border,
        }
      ],
      startDuration: 1,
      graphs: [
        {
          balloonText: '<b>[[category]]: [[value]]</b>',
          fillColorsField: 'color',
          fillAlphas: 0.7,
          lineAlpha: 0.2,
          type: 'column',
          valueField: 'visits'
        }
      ],
      chartCursor: {
        categoryBalloonEnabled: false,
        cursorAlpha: 0,
        zoomable: false
      },
      categoryField: 'key',
      categoryAxis: {
        gridPosition: 'start',
        labelRotation: 45,
        gridAlpha: 0.5,
        gridColor: layoutColors.border,
      },
      export: {
        enabled: true
      },
      creditsPosition: 'top-right',
      pathToImages: layoutPaths.images.amChart
    });
  }
})();
