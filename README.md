# numeri

Lightweight analytics tool. No overkill, no fuss, just the essentials.

### API layer

#### Database
At the moment, the only supported database is SQLite.
To execute the migrations, make sure to run the `migrate:up` command preceded by the `SQLITE_STORAGE` environment variable, which will hold the path to a shared location, accessible by all the
resources in numeri.