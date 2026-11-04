1. Stats מגיע ל־Backend באמצעות רשת Docker הפנימית, דרך שם השירות backend והפורט 5000. הדפדפן מגיע אליו דרך Nginx, שמקבל את הבקשה ומעביר אותה ל־Backend באמצעות Reverse Proxy.

2. כן, המוצרים נשארים לאחר docker compose down כי הם נשמרים ב־Named Volume, שאינו נמחק בפקודה זו. לעומת זאת, docker compose down -v מוחק גם את ה־Named Volume ולכן הנתונים שנשמרו בו נמחקים.

3. זהו Bind Mount, כי מחברים קובץ ממערכת הקבצים של המחשב לקובץ בתוך ה־Container. שינוי הקובץ לאחר שמסד הנתונים כבר נוצר לא יגרום להרצת הסקריפט מחדש, כי PostgreSQL מריץ את קובצי האתחול רק ביצירת מסד נתונים חדש.

4. Compose יצר רשת בשם docker_default ו־Volume בשם docker_postgres_data. Compose מוסיף את שם הפרויקט כקידומת לשמות המשאבים.

5. ב־Image הסופי יש Nginx וקובצי האתר המוכנים מתוך תיקיית dist, ואין בו Node.js או קובצי הבנייה המקוריים. אין צורך ב־CMD כי הוא יורש את פקודת ההפעלה של Image הבסיס של Nginx. ל־Stats לא צריך Multi-stage כי אין בו תהליך בנייה נפרד, והוא זקוק ל־Node.js גם בזמן הריצה.

6. ה־multi כמעט באותו גודל כמו ה־single כי שניהם מבוססים על אותו Image של Nginx, וההבדל ביניהם הוא בעיקר קובצי האתר. ה־kitchen גדול בהרבה כי הוא מבוסס על Image של Node.js שמכיל סביבת פיתוח ובנייה.

גדלי ה־Images בפועל:

single: 92.7MB

multi: 92.7MB

kitchen: 244MB

7. Nginx בוחר את ה־location עם הקידומת הארוכה ביותר שמתאימה לבקשה, ולכן /api/stats מגיע ל־Stats ולא ל־Backend. בבקשה /api/products, הלוכסן בסוף כתובת ה־proxy_pass גורם להחלפת הקידומת /api/ ב־/, ולכן ה־Backend מקבל את הנתיב /products.
