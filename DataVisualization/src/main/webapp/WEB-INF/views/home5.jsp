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
    <select id="buttonList">
      <option value="kdsqlList" selected="selected">KDSQ</option>
      <option value="siadlList">SIADL</option>
      <option value="cdrList">CDR</option>
      <option value="ksfList">KSF-GDS</option>
      <option value="kmmseList">K-MMSE</option>
    </select>
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