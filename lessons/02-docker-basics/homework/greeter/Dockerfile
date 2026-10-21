# מתחילים מ-image מוכן שיש בו Python בגרסה מדויקת 3.12
FROM python:3.12-slim

# קובעים את /app כתיקיית העבודה בתוך ה-image
WORKDIR /app

# מעתיקים קודם רק את קובץ התלויות, כדי ששלב ההתקנה יישמר ב-cache
COPY requirements.txt .

# מתקינים את הספריות שמופיעות ב-requirements.txt (כלומר Flask)
RUN pip install --no-cache-dir -r requirements.txt

# מעתיקים את שאר הקוד, כולל app.py
COPY . .

# רושמים שהשרת מאזין על פורט 8000
EXPOSE 8000

# הפקודה שרצה כשה-container מתחיל: מפעילה את השרת
CMD ["python", "app.py"]
