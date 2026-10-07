# ShopList: קורס DevOps 2027

ברוכות הבאות! בריפו הזה נמצאים כל הקוד וכל החומר של הקורס.

ShopList היא אפליקציה קטנה לניהול רשימת מוצרים. היא מלווה אותנו לאורך כל הקורס. האפליקציה עצמה לא משתנה. מה שמשתנה משיעור לשיעור זו **הדרך שבה מריצים אותה**: Docker, אחר כך Kubernetes, Helm, CI/CD, ובסוף שרת אמיתי בענן.

```
Browser → frontend (Nginx :80) → backend (Flask :5000) → postgres (PostgreSQL :5432)
                               → stats (Node.js :3000) ───→ backend
```

## השיעורים

| # | נושא | תיקייה |
|---|---|---|
| 1 | מה זה DevOps, מיקרו-סרוויסים והכרת ShopList | [01-devops-intro](lessons/01-devops-intro/) |
| 2 | Docker: images, containers ו-Dockerfile | [02-docker-basics](lessons/02-docker-basics/) |
| 3 | Nginx, Docker Compose ושמירת נתונים | יעלה בהמשך |
| 4 | Kubernetes: מושגים, cluster ו-kubectl | יעלה בהמשך |
| 5 | Kubernetes: Secret, ConfigMap, PVC והפעלת ShopList | יעלה בהמשך |
| 6 | Helm | יעלה בהמשך |
| 7 | CI/CD: מושגים וכתיבת pipeline | יעלה בהמשך |
| 8 | Registry, חיבור ל-Kubernetes ו-GitHub Actions | יעלה בהמשך |
| 9 | ענן, Terraform ו-Ansible | יעלה בהמשך |
| 10 | פרויקט הגמר: מ-GitHub ועד AWS | יעלה בהמשך |

בכל תיקיית שיעור יש `README.md`, ואחריו מדריך ותרגילים. החומר של כל שיעור עולה לריפו לקראת השיעור.

## מבנה הריפו

בהתחלה יש בריפו רק את הקוד של האפליקציה. את כל השאר כותבות בעצמכן במהלך הקורס.

```
app/
  backend/    Flask (Python): app.py, requirements.txt
  stats/      Node.js: server.js, package.json
  frontend/   HTML, JavaScript ו-CSS
lessons/      חומר הלימוד לפי שיעור
```

מה תוסיפו לאורך הקורס:

| שיעור | מה כותבות |
|---|---|
| 2 | `Dockerfile` ל-backend ול-stats |
| 3 | `Dockerfile` ו-`nginx.conf` ל-frontend, `docker/init.sql` ו-`docker/docker-compose.yml` |
| 4–5 | מניפסטים של Kubernetes בתיקייה `kubernetes/` |
| 6 | Helm chart בתיקייה `helm/` |
| 7–8 | pipelines: `.gitlab-ci.yml` ו-`.github/workflows/` |
| 9–10 | `terraform/` ו-`ansible/` |

## סביבת העבודה

- Windows עם Docker Desktop, על מחשבי הכיתה.
- הפקודות רצות בטרמינל: PowerShell, Git Bash או WSL, לבחירתכן (ראו למטה).

## איזה טרמינל?

אפשר לעבוד בכל אחד משלושת הטרמינלים. פקודות `docker` ו-`git` זהות בכולם, וההבדלים הם רק בכמה פרטים קטנים:

| | PowerShell | Git Bash | WSL (Ubuntu) |
|---|---|---|---|
| **למי** | ברירת המחדל, קיים בכל Windows | מי שהתרגלה אליו בקורס Git | רק מי שכבר עובדת איתו |
| **לבדוק שרת** | `curl.exe -i <כתובת>` | `curl -i <כתובת>` | `curl -i <כתובת>` |
| **כמה פקודות בשורה** | `;` | `;` או `&&` | `;` או `&&` |
| **התיקייה הנוכחית ב-`-v`** | `${PWD}` | `$(pwd -W)` | `$(pwd)` |
| **`docker exec -it`** | עובד | אם מופיע `the input device is not a TTY`: `winpty docker exec -it ...` | עובד |

**Git Bash, פעם אחת בהתחלה:**
```bash
echo 'export MSYS_NO_PATHCONV=1' >> ~/.bashrc
```
ואז לפתוח Git Bash מחדש. בלי זה Git Bash הופך נתיבים כמו `/app` ל-`C:/Program Files/Git/app`, ופקודות כמו `docker exec stats ls /app` נכשלות.

**WSL:** עובד רק אם ב-Docker Desktop מופעל Settings → Resources → WSL integration להפצה שלכן. לא חובה, ובמחשבי הכיתה עדיף בלי.

## עבודה עם Git בקורס

עובדות רק על `main`: `git add`, `git commit` ו-`git push`.
