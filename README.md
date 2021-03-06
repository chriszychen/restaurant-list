# 簡易餐廳清單
利用Node.js + Express打造的美食餐廳網站
![login image](https://github.com/chriszychen/ac_restaurant-list/blob/main/public/image/login.PNG)
![index image](https://github.com/chriszychen/ac_restaurant-list/blob/main/public/image/index_new.PNG)
## Features - 專案功能描述
1. 可以使用自訂名字、Email和密碼進行註冊
2. 可以使用註冊好的Email或是使用Facebook進行登入
3. 可以總覽自己建立的所有餐廳之名稱、分類、評分
4. 可以使用中文關鍵字對餐廳名稱或分類進行搜尋
5. 可以使用排序選單對餐廳依不同項目進行排序
6. 可以點擊自己建立的餐廳的照片或詳細資訊查看該餐廳的詳細資訊，如地址、電話、簡介以及Google map連結
7. 可以點擊按鈕新增餐廳
8. 可以點擊編輯按鈕修改自己建立的餐廳內容
9. 可以點擊刪除按鈕刪除自己建立的餐廳

## Prerequisites - 環境建置與需求

* [Node.js v14.16.1](https://nodejs.org/en/)
* [MongoDB v4.2.14](https://www.mongodb.com/try/download/community)

## Installation and Execution - 安裝與執行步驟
1.打開終端機，使用git clone將專案下載至本地資料夾
```
git clone https://github.com/chriszhchen/ac_restaurant-list.git
```

2.進入專案資料夾
```
cd ac_restaurant-list
```

3.安裝專案需求套件
```
npm install 
npm i nodemon
```

4.啟動MongoDB資料庫<br/>
5.修改.env.example檔名為.env並將自己的Facebook App ID和Facebook App Secret填入後存檔<br/>

6.啟動伺服器
```
npm run dev
```

終端機顯示 ```The server is listening on http://localhost:3000``` 代表伺服器成功啟動<br/>
顯示 ```mongodb connected!``` 代表伺服器成功與資料庫連接 <br/>
<br/>
7.新增種子資料
```
npm run seed
```
終端機出現 ```Seeder Done.``` 後即可至瀏覽器網址輸入 http://localhost:3000 瀏覽專案功能
