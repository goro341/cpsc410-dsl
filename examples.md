
```
CREATE PAGE p1
CREATE TABLE t1
CREATE ROW r1
ADD “name”, “family name”, “national id” to r1
CREATE ROW r2
ADD “Masoud”, “Javeri”, “1190236719” to r2
ADD r1, r2 to t1
ADD t1 to p1
BUILD
```

--------------------
```
CREATE PAGE photo-album
CREATE TABLE t
CREATE ROW r1
ADD “title one” to r1
ADD r1 to t
CREATE PHOTO P1
ADD “url” to P1
ADD P1 to T
CREATE ROW r2
ADD “title two” to r2
ADD r2 to t
CREATE PHOTO p2
ADD “url” to p2
ADD p2 to 
Arash:
CREATE PAGE Index
CREATE TABLE t1
CREATE ROW r1
ADD “” to r1
CREATE ROW r2
ADD “row2 stuff” to r2
ADD r1 to t1
ADD r2 to t1
ADD t1 to Index
BUILD
```
---------------------
```
CREATE PAGE transcript
CREATE GRID2019w1
CREATE ROW r1
ADD “CPSC310”, “89” to r1
CREATE ROW r2
ADD “CPSC317”, “80” to r2
CREATE ROW r3
ADD “CPSC410”, “100” to r3
CREATE ROW r4
ADD “MATH200”, “84” to r4
ADD r1, r2, r3, r4 to 2019w1
ADD 2019w1 to transcript
BUILD
```
