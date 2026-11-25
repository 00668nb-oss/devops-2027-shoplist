# שיעור 6 — תשובות

## 1. שמות ה-images ו-`imagePullPolicy: Never`

Compose נותן ל-images שמות לפי התיקייה והסרוויס (`docker-backend`), ואנחנו רצינו שמות קבועים שנכתוב ב-YAML, לכן בנינו עם `-t shoplist-backend:local`. בלי `imagePullPolicy: Never`, Kubernetes היה מנסה להוריד את ה-image מהאינטרנט (Docker Hub), לא היה מוצא image בשם הזה, והיה נכשל עם `ErrImagePull`, למרות שה-image קיים על המחשב.

## 2. פענוח הסיסמה מה-Secret

הרצתי `printf %s c2hvcHBhc3M= | base64 -d`, וקיבלתי `shoppass`. זה אומר ש-Secret הוא רק **קידוד** ולא הצפנה: כל מי שיכול לקרוא את הקובץ או את ה-Secret ב-cluster יכול לפענח אותו בשנייה, ולכן חשוב להגביל מי רשאי לקרוא Secrets, ולא לעשות commit לסיסמאות אמיתיות.

## 3. למה המוצרים נשארו

הקובץ שאחראי לזה הוא `postgres-pvc.yml`, יחד עם ה-`volumes` וה-`volumeMounts` ב-`postgres-deployment.yml`: קבצי המסד נשמרים על דיסק שיושב מחוץ ל-pod, וה-pod החדש מתחבר לאותו דיסק. מחיקה של ה-PVC (`kubectl delete pvc postgres-pvc -n shoplist`) הייתה מוחקת את הנתונים, וכך גם מחיקה של כל ה-namespace.

## 4. `depends_on` ו-readiness

אם ה-backend עולה לפני ש-postgres מוכן, החיבור למסד נכשל, ה-backend יכול לקרוס ולהתחיל מחדש עד ש-postgres עולה, ובסוף זה מסתדר לבד. ה-`readinessProbe` הוא זה שדואג שה-backend לא יקבל בקשות לפני שהוא מוכן: כל עוד הבדיקה (`/health`) נכשלת, ה-pod לא נכנס לרשימת ה-endpoints של ה-Service.

## 5. לשבור ולתקן: מדבקה שגויה

כששיניתי את ה-selector ל-`app: backnd`, הדפדפן הציג **502 Bad Gateway**: הדף נטען, אבל הנתונים לא. ה-pods של backend **לא נפלו**, והם נשארו `1/1 Running`, אבל `kubectl get endpoints backend` הראה `<none>`. ה-Service מוצא pods לפי **תווית** ולא לפי שם, ואין pod עם התווית `backnd`, ולכן אין למי להעביר את הבקשות. אחרי התיקון ל-`app: backend`, חזרו שתי כתובות ב-endpoints והאפליקציה עבדה שוב.

## 6. שינוי ב-ConfigMap שלא נכנס

משתני סביבה נקראים רק **כשה-pod עולה**, ולכן pod שכבר רץ ממשיך לראות את הערך הישן גם אחרי `apply` על ה-ConfigMap. הפתרון: `kubectl rollout restart deployment/backend -n shoplist`, שיוצר pods חדשים שקוראים את הערך החדש.

## 7. כמה פעמים `shoplist`

`namespace: shoplist` כתוב ב-12 מתוך 13 הקבצים (כולם חוץ מ-`namespace.yml`), ועוד פעם אחת בשם של ה-namespace עצמו ב-`namespace.yml`. כדי להריץ עותק שני ב-`shoplist-test`, נצטרך לשנות את **כל 13 הקבצים**, או להעתיק אותם. זה הרמז לשיעור הבא: צריך כלי כמו Helm, שבו כותבים את השם במקום אחד ומשתמשים בו בכל הקבצים.
