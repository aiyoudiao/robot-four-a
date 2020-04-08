<!--
 * @Descripttion: aiyoudiao
 * @version: 1.0.0
 * @Author: aiyoudiao
 * @Date: 2020-03-30 11:10:25
 * @LastEditTime: 2020-03-30 11:21:44
 * @LastEditors: aiyoudiao
 * @FilePath: \my-robot\src\app\orm-core\typeorm.md
 -->

## 根据数据库来生成模型

npm i -g typeorm-model-generator  
typeorm-model-generator -h localhost -d tempdb -u sa -x !Passw0rd -e mysql -o .  
typeorm-model-generator -h localhost -p 3306 -d robot-four-a-db -u root -x 123456 -e mysql -o .
typeorm-model-generator -h localhost -p 3306 -d robot-four-a-db -u root -x 123456 -e mysql
