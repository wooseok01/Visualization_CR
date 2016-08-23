<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <title>Visualization</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/3.0.3/normalize.css">
  <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css">
  <link rel="stylesheet" href="resources/style/home2.css">
</head>
<body>

  <div id="treeArea">
    <div id="buttonList">
      <input type="radio" name="click" value="kmmseList" class="listChange" checked="checked"> kmmse<br>
      <input type="radio" name="click" value="kdsqlList" class="listChange"> kdsqlList<br>
      <input type="radio" name="click" value="siadlList" class="listChange"> siadlList<br>
      <input type="radio" name="click" value="npiList" class="listChange"> npiList<br>
      <input type="radio" name="click" value="cdrList" class="listChange"> cdrList<br>
      <input type="radio" name="click" value="hisList" class="listChange"> hisList<br>
      <input type="radio" name="click" value="ksfList" class="listChange"> ksfList<br>
    </div>
  </div>
  
  <div id="matrixArea">
  
  </div>
  
  <div id="hoverDiv"></div>

  <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.17/d3.min.js"></script>
  <script src="//code.jquery.com/jquery.min.js"></script>
  <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/async/1.5.2/async.js"></script>
  <script type="text/javascript" src="resources/script/d3_basicFunction.js"></script>
  <script type="text/javascript" src="resources/script/home5.js"></script>
</body>
</html>