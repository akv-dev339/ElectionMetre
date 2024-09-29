import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report
import mysql.connector

# MySQL database configuration
db_config = {
    'user': 'root',
    'password': '123456789',  # replace with your MySQL password
    'host': 'localhost',  # or your MySQL server address
    'database': 'voteinfo'
}

tables = ['voterchanges2023', 'voterchanges2018', 'voterchanges2013', 'voterchanges2008', 'voterchanges2003']

def get_data_from_db():
    # Establish the connection
    conn = mysql.connector.connect(**db_config)
    all_data = []

    for table in tables:
        query = f"SELECT BoothID, NewlyAddedVoters, DeletedVoters FROM {table}"
        table_data = pd.read_sql(query, conn)
        all_data.append(table_data)

    conn.close()

    # Concatenate all the data into a single DataFrame
    combined_data = pd.concat(all_data, ignore_index=True)
    return combined_data

# Load your historical election data from MySQL
data = get_data_from_db()

# Preprocess data
data['NetChange'] = data['NewlyAddedVoters'] - data['DeletedVoters']

# For demonstration, create a mock target variable 'ElectionOutcome'
# This should be replaced with actual outcomes based on your data
data['ElectionOutcome'] = (data['NewlyAddedVoters'] > data['DeletedVoters']).astype(int)  # Example outcome

# Define features and target
X = data[['BoothID', 'NewlyAddedVoters', 'DeletedVoters', 'NetChange']]
y = data['ElectionOutcome']  # This should represent the outcome you're predicting

# Split the data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train the Random Forest model
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Make predictions
y_pred = model.predict(X_test)

# Evaluate the model
print(classification_report(y_test, y_pred))
