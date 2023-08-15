<?php
   function  connection(){
      global $config;
      $db = new mysqli(
         $config['db']['host'],
         $config['db']['username'],
         $config['db']['password'],
         $config['db']['dbname']
      ) or die($db -> error);
      $db -> query("SET NAMES utf8");
      return $db;
   }

   // tabele Prefix
   function table_prefix($table_name){
      global $config;
      return $config['db']['tabel_prefix'].$table_name;
   }


   function getAll($table_name){
      $db = connection();

      $sql = $db -> QUERY(
         "SELECT * FROM ".table_prefix($table_name)
      );
      $arrey = [];
      $i = 0;
      while($row = $sql -> fetch_array()){
         $array[$i] = $row;
         $i++;
      }
      return $arrey;


   }


?>