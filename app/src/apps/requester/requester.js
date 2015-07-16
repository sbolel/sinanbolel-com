var requesterModule = angular.module('thinkcrazy.apps.requester', [
  'thinkcrazy.apps.requester.service'
  ]);

requesterModule.config(function ($stateProvider) {
  $stateProvider
    .state('apps.requester', {
      url: '/requester',
      controller: 'RequesterAppController',
      templateUrl: 'src/apps/requester/requester.html'
    });
});

requesterModule.controller('RequesterAppController', 
                  ['$log', '$scope', '$http', 'RequesterService', 'ServerService', 
          function($log, $scope, $http, RequesterService, ServerService){

  $scope.requester = {
    $loading: false,
    $requestKeys: [],
    params: {}
  };

  $scope.requester.response = '<response>  <inputs>    <system-size>1</system-size>    <derate>0.77</derate>    <dataset>tmy2</dataset>    <address>21042</address>    <azimuth>135</azimuth>    <tilt>22.62</tilt>    <track-mode>0</track-mode>    <State>MD</State>    <Electric-r>13.5</Electric-r>  </inputs>  <errors type="array"/>  <warnings type="array"/>  <version>4.4.0</version>  <ssc-info>    <version type="integer">45</version>    <build>Linux 64 bit GNU/C++ Jul  7 2015 14:24:09</build>  </ssc-info>  <station-info>    <lat type="float">39.18333435058594</lat>    <lon type="float">-76.66666412353516</lon>    <elev type="float">47.0</elev>    <tz type="float">-5.0</tz>    <location>93721</location>    <city>BALTIMORE</city>    <state>MD</state>    <file-name>93721.tm2</file-name>    <distance type="integer">21308</distance>  </station-info>  <outputs>    <ac-monthly type="array">      <ac-monthly type="float">64.36014556884766</ac-monthly>      <ac-monthly type="float">79.96857452392578</ac-monthly>      <ac-monthly type="float">101.2350082397461</ac-monthly>      <ac-monthly type="float">113.95150756835938</ac-monthly>      <ac-monthly type="float">123.16450500488281</ac-monthly>      <ac-monthly type="float">127.86200714111328</ac-monthly>      <ac-monthly type="float">125.375244140625</ac-monthly>      <ac-monthly type="float">112.94331359863281</ac-monthly>      <ac-monthly type="float">96.71019744873047</ac-monthly>      <ac-monthly type="float">91.93138885498047</ac-monthly>      <ac-monthly type="float">62.59172058105469</ac-monthly>      <ac-monthly type="float">50.46553039550781</ac-monthly>    </ac-monthly>    <poa-monthly type="array">      <poa-monthly type="float">83.13917541503906</poa-monthly>      <poa-monthly type="float">102.47535705566406</poa-monthly>      <poa-monthly type="float">134.54315185546875</poa-monthly>      <poa-monthly type="float">153.1523895263672</poa-monthly>      <poa-monthly type="float">172.24000549316406</poa-monthly>      <poa-monthly type="float">186.59803771972656</poa-monthly>      <poa-monthly type="float">184.2700653076172</poa-monthly>      <poa-monthly type="float">165.32232666015625</poa-monthly>      <poa-monthly type="float">139.547119140625</poa-monthly>      <poa-monthly type="float">127.59252166748047</poa-monthly>      <poa-monthly type="float">84.86299133300781</poa-monthly>      <poa-monthly type="float">68.06153869628906</poa-monthly>    </poa-monthly>    <solrad-monthly type="array">      <solrad-monthly type="float">2.6819088459014893</solrad-monthly>      <solrad-monthly type="float">3.659834146499634</solrad-monthly>      <solrad-monthly type="float">4.340101718902588</solrad-monthly>      <solrad-monthly type="float">5.105079650878906</solrad-monthly>      <solrad-monthly type="float">5.556128978729248</solrad-monthly>      <solrad-monthly type="float">6.219934463500977</solrad-monthly>      <solrad-monthly type="float">5.944195747375488</solrad-monthly>      <solrad-monthly type="float">5.332978248596191</solrad-monthly>      <solrad-monthly type="float">4.651570796966553</solrad-monthly>      <solrad-monthly type="float">4.115887641906738</solrad-monthly>      <solrad-monthly type="float">2.828766345977783</solrad-monthly>      <solrad-monthly type="float">2.195533514022827</solrad-monthly>    </solrad-monthly>    <dc-monthly type="array">      <dc-monthly type="float">72.02092742919922</dc-monthly>      <dc-monthly type="float">88.57991027832031</dc-monthly>      <dc-monthly type="float">111.9538345336914</dc-monthly>      <dc-monthly type="float">125.49819946289062</dc-monthly>      <dc-monthly type="float">136.00985717773438</dc-monthly>      <dc-monthly type="float">140.93710327148438</dc-monthly>      <dc-monthly type="float">138.2218017578125</dc-monthly>      <dc-monthly type="float">124.5772705078125</dc-monthly>      <dc-monthly type="float">107.09928131103516</dc-monthly>      <dc-monthly type="float">101.47077941894531</dc-monthly>      <dc-monthly type="float">70.3751449584961</dc-monthly>      <dc-monthly type="float">57.7104606628418</dc-monthly>    </dc-monthly>    <ac-annual type="float">1150.5592041015625</ac-annual>    <solrad-annual type="float">4.385993003845215</solrad-annual>  </outputs></response>';

  $scope.makeRequest = function(){
    $scope.requester.$loading = true;
    RequesterService.createRequest($scope.requester.url, $scope.requester.params)
      .then(function(data, status, headers, config){
        $scope.requester.response = data;
    }).catch(function(key, data, status, headers, config){
        $scope.requester.response = data;
    });
  };

  $scope.init = function(){
    ServerService.ping();
  };

  $scope.xmlToJson = function(){
    var xmlString = $scope.requester.response;
    if(xmlString){
      convertData(xmlString.replace(/(\r\n|\n|\r)/gm,""), 'xml', 'json');
    } else {
      $log.error('$scope.requester.response not set');
    }
  }

  function convertData(inputData, inputDataType, outputDataType){
    if(inputDataType==='xml'&&outputDataType==='json'){
      ServerService.request.xmlToJson(inputData).then(function(result){
        $log.debug('convertData.xmlToJson',result);
        $scope.requester.$jsonResult = JSON.parse(result.data);
      });
    } else {
      $log.error('Unknown conversion type.');
    }
  }
  function detectResponseType(){
    var key = $scope.requester.$requestKeys[$scope.requester.$requestKeys.length=1];
    var res = RequesterService.getRequestByKey(key);
    $log.debug('Got request[',key,']: ',res);
  }


}]);