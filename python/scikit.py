from datetime import datetime, timedelta
from sklearn.linear_model import LinearRegression

reference_date = datetime(2022, 1, 1)
x_numeric = [(date - reference_date).days for date in xArray]

X = [[day] for day in x_numeric]

model = LinearRegression()
model.fit(X, yArray)

tomorrow_numeric = (datetime.today() + timedelta(days=1) - reference_date).days
prediction = model.predict([[tomorrow_numeric]])

print("Prediction for Tomorrow:", prediction[0])