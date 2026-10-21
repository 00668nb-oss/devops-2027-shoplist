1. docker build -t greeter:v1 lessons/02-docker-basics/homework/greeter

2. docker run -d --name greeter -p 9000:8000 greeter:v1

3. מוסיפים -e GREETING=Shalom לפני שם ה-image:
   docker run -d --name greeter -p 9000:8000 -e GREETING=Shalom greeter:v1

4. {"message":"Shalom, Rivka!"}

5. ארבעת השלבים הראשונים (FROM, WORKDIR, COPY requirements.txt, RUN pip install)
   יסומנו CACHED, כי הם לא השתנו. השלבים COPY . . , EXPOSE ו-CMD ירוצו מחדש.
   הסיבה: שינינו את app.py, ולכן ההעתקה של הקוד משתנה, ומשם והלאה Docker
   בונה הכול מחדש. ההתקנה של Flask נשארת ב-cache כי requirements.txt לא השתנה.
