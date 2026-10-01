# SE Schedule

Small site I made so me and the rest of the group don't have to squint at the
timetable PDF every week. your group (1a/1b/2a/2b/3a), your English
subgroup (A/B/C/D), and a week, and it shows you just your classes for that
week, Mon-Fri.

It's literally static HTML/CSS/JS that reads from one data file. Runs anywhere.

## Running it

**Quickest way (just open it):**

```
python3 -m http.server 8765
```

then go to `http://localhost:8765/`.

**With Docker (if you want it always running somewhere):**

```
docker compose up -d --build
```

goes to `http://localhost:8080/`. Healthcheck is in there too so it'll
restart itself if nginx dies for some reason.

## How it's structured

```
index.html        the page
css/style.css      all the styling
js/app.js          week math + rendering logic
data/schedule.js    THE ACTUAL SCHEDULE DATA — edit this if something's wrong
```

If the uni changes a room/professor/time, you don't need to touch any of the
logic, just edit `data/schedule.js`. Each class is one object:

```js
{ day: "Mon", start: "08:00", end: "11:15", subject: "ООП 1 (упражнения)",
  type: "exercise", groups: ["1a"], room: "433 к.з.",
  professor: "гл.ас. Й.Тодоров", weekStart: 8, weekEnd: 15 }
```

`weekStart`/`weekEnd` are week numbers (1-15), not dates — the site figures
out which week a given date falls into based on `SEMESTER_START` at the top
of that file. If the semester start date is ever wrong, that's the only
place to fix it.

## Things about the project

- All the time/room data was transcribed from the official schedule PDF by
  hand. Should be accurate now but if something looks off, 
  trust the real PDF over this site.
- Weeks before the semester officially starts just won't show a "today"
  highlight, that's intentional.
- Only tested in Chrome/Safari. Probably fine elsewhere, not promising
  anything.
