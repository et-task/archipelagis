# archipelagis
Data for the geospatial project. <br/>

<b> "population_2045.csv" <b/>
<br/>
How to upload the file "population_2045.csv" into QGIS: <br/>
In GQIS, go to Layer > Add Layer > Add Delimited Text Layer.

- Choose the csv file, give it a name. <br/>
- Encoding: utf-8
- File format: CSV
- Geometry definition: check "No geometry (attribute only table)".
- Add.
<br/>

<b> "paavo_municipality_codes_2024.csv" <b/>
<br/>
- Upload it into QGIS the same way as the "population_2045.csv", except change:
- File format: Custom delimiters > Semicolon
- Layer Settings: change "Municipality code" data type into "Text (string)"
<br/>
The paavo_municipality_codes_2024.csv is derived from <br/>
"Postal code - municipality key 2024" Excel file available at <br/>
https://stat.fi/tup/paavo/paavon_aineistokuvaukset_en.html.


