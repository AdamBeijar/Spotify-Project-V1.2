import mysql.connector as connector


mydb = connector.connect(
    host="localhost",
    user="Admin",
    password="AdminPassword",
    database="spotifybot"
)
print(mydb)
myCursor = mydb.cursor(buffered=True, dictionary=True)
