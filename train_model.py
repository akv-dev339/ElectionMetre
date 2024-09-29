import pandas as pd
import mysql.connector
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report
import joblib

# Connect to MySQL database
db_connection = mysql.connector.connect(
    host="localhost",
    user="root",
    password="123456789",
    database="voteinfo"
)

# List of tables to fetch data from
tables = ['voterchanges2023', 'voterchanges2018','voterchanges2018','voterchanges2013','voterchanges2008','voterchanges2003']  # Add more tables as needed

# Fetch data from each table and combine into a single DataFrame
data_frames = []
for table in tables:
    query = f"SELECT NewlyAddedVoters, DeletedVoters FROM {table}"
    df = pd.read_sql(query, db_connection)
    data_frames.append(df)

# Combine all data frames
data = pd.concat(data_frames, ignore_index=True)

# Close the database connection
db_connection.close()

# Assuming you have a separate table for results
results_query = "SELECT Year, Result FROM results_table"
results_data = pd.read_sql(results_query, db_connection)

# Merge the election data with results
data = pd.merge(data, results_data, on='Year')

# Feature selection
features = ['NewlyAddedVoters', 'DeletedVoters', 'Year']
X = data[features]
y = data['Result']  # Assuming 'Result' is the target variable

# Split the data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Initialize and train the model
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Save the model
joblib.dump(model, 'random_forest_model.pkl')

# Evaluate the model
y_pred = model.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)
print(f'Accuracy: {accuracy}')
print(classification_report(y_test, y_pred))
