echo 'Configuring githubdb'

export PGPASSWORD = 'node_password'

# dropdb -U node_user githubdb 
# createdb -U node_user githubdb

psql -U me githubdb < ./bin/sql/user.sql
psql -U me githubdb < ./bin/sql/githubs.sql
psql -U me githubdb < ./bin/sql/category.sql

echo 'githubdb configured'