This is a simple Copilot seat management system.

## How to run
### prerequisites
You need a mysql database for data storage.

### backend
At first, you need prepare a config file under backend directory, the following is a sample:

```
DB_NAME={your-db-name}
DB_USER={your-db-user}
DB_PASSWORD={your-db-password}
DB_HOST={your-db-host}
DB_PORT={your-db-port}
GITHUB_ORG={your-github-org}
GITHUB_TOKEN={your-github-token}
```

Then you can run command under backend:
`npm run dev`

### frontend

You can run command under frontend directory:
`npm run serve`