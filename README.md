# :loudspeaker: Ouvidoria API
 API to handle complaints about city districts public services.

## :construction_worker: Installation
You need [Git](https://git-scm.com/), [Node.js](https://nodejs.org/) and [Yarn](https://yarnpkg.com/) to run this API

First of all, clone the repository:
```bash
git clone https://github.com/kortkamp/ouvidoria-api.git
```
Then enter the folder and install dependencies
```bash
cd ouvidoria_dev
yarn install
```
Create your .env file and put there your configs
```bash
cp .env.example .env
```

## :book: References 

### Endpoints:

* [Users](#users)
* [Districts](#districts)
* [Complaints](#complaints)
* [Answers]()




### Users


* Creating an admin user
```http
POST http://your.url/api/users
```

```json
{
	"name":"admin",
	"email":"admin@email.com",
	"admin":true,
	"password":"123456"
}
```
* Creating a standard user
```http
POST http://your.url/api/users
```
```json
{
	"name":"user",
	"email":"user@email.com",
	"admin":false,
	"password":"123456"
}
```
 ### Districts


Only admin can create districts
 ```http
POST http://your.url/api/districts
```
```json
{
	"name":"Downtown",
}
```
Any authenticated  user can retrieve a list of districts with GET request

```http
GET http://your.url/api/districts
```
And gonna receive a list with all districts

```json
[
  {
    "id": "5560ef05-d2a3-43d3-bd94-2898cd14fc76",
    "name": "Richmond",
  },
  {
    "id": "c7ce804e-e22c-41d9-ab82-3744f27fdada",
    "name": "Downtown",
  },
  {
    "id": "d496fe2c-873b-49c2-b4ab-37e5922eda58",
    "name": "North Beach",
  }
]
```

A datailed district overview with complaints and asnwers can be obtained by sendind a GET request to:
```http
GET http://your.url/api/districts/district-uuid
```
and the reponse will gonna be like : 
```json
{
  "id": "4c766fe5-7413-4202-8a1b-cc9b510652c9",
  "name": "Downtown",
  "complaints": [
    {
      "id": "c2920c4f-8639-48f6-94a9-a1b3fdf79e86",
      "message": "To much traffic on streets.",
      "created_at": "2021-07-23T13:44:29.465Z",
      "user": {
        "name": "John",
        "admin": false
      },
      "answers": [
        {
          "id": "9cb620a7-17ee-40bf-9e77-512a687f948b",
          "message": "Not my problem!!",
          "created_at": "2021-07-23T13:45:56.701Z",
          "user": {
            "name": "Mayor",
            "admin": true
          }
        }
      ]
    }
  ],
  "name_custom": "#Downtown"
}
```

### Complaints

Any authenticated user should be able to send a complaint by making a POST request.

```http
POST http://your.url/api/complaints
```
```json
{
	"district_id":"4c766fe5-7413-4202-8a1b-cc9b510652c9",
	"message":"To much traffic on streets."
}
```

### Answers
Only admin can answer a complaint by making a POST request:

```http
POST http://your.url/api/complaints
```
```json
{
	"complaint_id":"c2920c4f-8639-48f6-94a9-a1b3fdf79e86",
	"message":"We gonna solve this in 2 days"
}
```

gonna stop doc here cuz will be implemented a Solve Service to complaints and a deadline time to auto checked as solved or not.
