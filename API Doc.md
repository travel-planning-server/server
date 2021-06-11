# Travel Planning API Doc

API Endpoints Documentation for Travel Planning!

List of Endpoints:
| HTTP Method | URL        | Deskripsi                                                                                   |
| ----------- | ---------- | ------------------------------------------------------------------------------------------- |
| **GET**     | /travels     | Menampilkan semua travel yang ada di database                                                 |
| **GET**     | /travels/:id | Menampilkan travel berdasarkan param **id**                                                   |
| **POST**    | /travels     | Membuat travel baru                                                                           |
| **PUT**     | /travels/:id | Mengupdate kolom travel destination, travel city, travel date, berdasarkan param **id** yang dikirim |
| **DELETE**  | /travels/:id | Menghapus travel berdasarkan param **id** yang dikirim                                        |
| **POST** | /register | Register user baru |
| **POST** | /login | Melakukan proses login |
| **GET** | /province | Menampilkan list provinsi seluruh indonesia |
| **POST** | /covid/:province | Menampilkan data covid berdasarkan province |
| **GET** | /holidays/:date | Menampilkan data hari libur berdasarkan date |
----------

### Menampilkan semua todo yang ada di database
- **URL** : `/travel
- **Method** : `GET`
- **URL Param** : none
- **Data Param** : none
- **Success response** :
  - **Response Code** : `200`
  - **Content** :
    ```json
    [
      {
          "id": 6,
          "travelDestinationProvince": "Aceh",
          "travelDestinationCity": "Banda Aceh",
          "travelDate": {
            "value": "2020-06-02T00:00:00.000Z",
            "holiday": null
          },
          "userId": 1,
          "createdAt": "2021-06-10T16:23:33.442Z",
          "updatedAt": "2021-06-10T16:23:33.442Z"
      }
    ]
     ```
- **Error response** :
    - **Response Code** : `500`
    - **Content** : 
        ```json
        {
          "message": "error",
          "error": "TypeError",
        }
        ```
----------

### Menampilkan Travel By Id
- **URL** : `/travel/:id`
- **Method** : `GET`
- **URL Param** : `id`
- **Data Param** : none
- **Success response** : 
  - **Response Code** : `200`
  - **Content** :
    ```json
    {
      "id": 6,
      "travelDestinationProvince": "Aceh",
      "travelDestinationCity": "Banda Aceh",
      "travelDate": {
        "value": "2020-06-01T00:00:00.000Z",
        "holiday": {
            "holiday_name": "Pancasila Day",
            "holiday_date": "2020-06-01T00:00:00.000Z",
            "holiday_description": "Pancasila Day is a national holiday in Indonesia",
            "holiday_type": "National holiday"
        }
      },
      "userId": 1,
      "createdAt": "2021-06-10T16:23:33.442Z",
      "updatedAt": "2021-06-10T16:23:33.442Z"
    }
    ```
- **Error response** :
    - **Response Code** : `404`
    - **Content** :
      ```json
      {
         "status": "Error",
         "name": "NotFound",
         "message": "Travel with id <id> not found"
      }
      ```
    - **Response Code** : `500`
    - **Content** :
      ```json
      {
        "message": "error",
        "error": "TypeError",
      }
      ```

----------
### Membuat travel baru
- **URL** : `/travels`
- **Method** : `POST`
- **URL Param** : none
- **Body** :
  ```json
  {
    "travelDestinationProvince": "Aceh",
    "travelDestinationCity": "Banda Aceh",
    "travelDate": "2020-01-01"
  }
  ```
- **Success response** :
  - **Response Code** : `201`
  - **Content** :
    ```json
    {
      "message": "success",
      "data": {
          "id": 6,
          "travelDestinationProvince": "Aceh",
          "travelDestinationCity": "Banda Aceh",
          "travelDate": "2020-01-01T00:00:00.000Z",
          "userId": 1,
          "updatedAt": "2021-06-10T16:23:33.442Z",
          "createdAt": "2021-06-10T16:23:33.442Z"
      }
    }
    ```
- **Error response** :    
    - **Response Code** : `500`
    - **Content** :
       ```json
      {
        "message": "error",
        "error": "TypeError",
      }
      ```
----------
### Mengupdate kolom travel destination, travel city, travel date, berdasarkan param **id** yang dikirim
- **URL** : `/travels/:id`
- **Method** : `PUT`
- **URL Param** : `id`
- **Body** :
  ```json
  {
    "travelDestinationProvince": "DKI Jakarta",
    "travelDestinationCity": "Jakarta Selatan",
    "travelDate": "2020-01-01"
  }
  ```
- **Success response** :
  - **Response Code** : `200`
  - **Content** :
    ```json
    {
      "message": "success",
      "data": {
          "id": 6,
          "travelDestinationProvince": "DKI Jakarta",
          "travelDestinationCity": "Jakarta Selatan",
          "travelDate": "2020-01-01T00:00:00.000Z",
          "userId": 1,
          "createdAt": "2021-06-10T16:23:33.442Z",
          "updatedAt": "2021-06-10T16:29:06.553Z"
      }
    }
    ```
- **Error response** :    
    - **Response Code** : `404`
    - **Content** :
      ```json
      {        
        "status": "Error",
        "name": "NotFound",
        "message": "Travel with id <id> was not found"
      }
      ```
    - **Response Code** : `500`
    - **Content** :
      ```json
      {
        "message": "error",
        "error": "TypeError",
      }
      ```
----------
### Menghapus travel berdasarkan param **id** yang dikirim
- **URL** : `/travels/:id`
- **Method** : `DELETE`
- **URL Param** : `id`
- **Body** : none   
- **Success response** :
  - **Response Code** : `200`
  - **Content** :
    ```json
    {
      "message": "Success delete"
    }
    ```
- **Error response** :    
    - **Response Code** : `404`
    - **Content** :
      ```json
      {        
        "message": "Travel with id <id> was not found"      
      }
      ```
    - **Response Code** : `500`
    - **Content** : 
       ```json
      {
        "message": "error",
        "error": "TypeError",
      }
       ```

----------
### Register user baru
- **URL** : `/register`
- **Method** : `POST`
- **URL Param** : none
- **Body** : 
    ```json
    {
        "email": "jhondoe@mail.com",
        "password": "my password"
    }
    ```
- **Success response** :
  - **Response Code** : `201`
  - **Content** :
    ```json
    {
      "message": "User Registered",
      "email": "anton1@mail.com"
    }
    ```
- **Error response** :    
    - **Response Code** : `400`
    - **Content** :
      ```json
      {
        "status": "Error",
        "name": "SequelizeValidationError",
        "message": "Wrong email format"
      }
      ```
    - **Response Code** : `500`
    - **Content** :
      ```json
      {
        "message": "error",
        "error": "TypeError",
      }
      ```

----------
### Melakukan proses login
- **URL** : `/login`
- **Method** : `POST`
- **URL Param** : none
- **Body** : 
    ```json
    {
        "email": "jhondoe@mail.com",
        "password": "my password"
    }
    ```
- **Success response** :
  - **Response Code** : `200`
  - **Content** :
    ```json
    {
      "message": "login successful",
      "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhbnRvbkBtYWlsLmNvbSIsImlhdCI6MTYyMzM0Mjg4NX0.  0NB0tCKjj21AWplckArvlalBdQeOSpi1oajhLnfETfQ"
    }
    ```
- **Error response** :    
    - **Response Code** : `400`
    - **Content** :
      ```json
      {
        "status": "Error",
        "name": "SequelizeValidationError",
        "message": "Please provide field username or password"
      }
      ```
    - **Response Code** : `401`
    - **Content** :
      ```json
      {
        "status": "Error",
        "name": "JSONWebTokenError",
        "message": "invalid credentials"
      }
      ```
    - **Response Code** : `500`
    - **Content** : `Internal Server Error`
      ```json
      {
        "message": "error",
        "error": "TypeError",
      }
      ```
----------
### Menampilkan list provinsi seluruh indonesia
- **URL** : `/province`
- **Method** : `GET`
- **URL Param** : none
- **Body** : none    
- **Success response** :
  - **Response Code** : `200`
  - **Content** :
    ```json
    {
      "provinsi": [
          {
              "id": 11,
              "nama": "Aceh"
          },
          {
              "id": 12,
              "nama": "Sumatera Utara"
          },
          {
              "id": 13,
              "nama": "Sumatera Barat"
          },
      ]
    }
    ```
- **Error response** :    
    - **Response Code** : `500`
    - **Content** : `Internal Server Error`
      ```json
      {
        "message": "error",
        "error": "TypeError",
      }
      ```

----------
### Menampilkan data covid berdasarkan province
- **URL** : `/covid/:province`
- **Method** : `GET`
- **URL Param** : province
- **Body** : none    
- **Success response** :
  - **Response Code** : `200`
  - **Content** :
    ```json
    {
      "last_date": "2021-06-09",
      "list_data": {
          "key": "NUSA TENGGARA TIMUR",
          "jumlah_kasus": 16981,
          "jumlah_sembuh": 15869,
          "jumlah_meninggal": 439,
          "jumlah_dirawat": 673
      }
    }
    ```
- **Error response** :    
    - **Response Code** : `500`
    - **Content** : `Internal Server Error`
      ```json
      {
        "message": "error",
        "error": "TypeError",
      }
      ```
----------
### Menampilkan data hari libur berdasarkan date
- **URL** : `/holidays/:date`
- **Method** : `GET`
- **URL Param** : date
- **Body** : none    
- **Success response** :
  - **Response Code** : `200`
  - **Content** :
    ```json
    {
      "message": "success",
      "holiday": {
          "holiday_name": "Pancasila Day",
          "holiday_date": "2020-06-01",
          "holiday_description": "Pancasila Day is a national holiday in Indonesia",
          "holiday_type": "National holiday"
      }
    }
    ```
- **Error response** :    
    - **Response Code** : `500`
    - **Content** : `Internal Server Error`
      ```json
      {
        "message": "error",
        "error": "TypeError",
      }
      ```