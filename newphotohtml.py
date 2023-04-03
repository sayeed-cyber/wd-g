import os

folder = 'C:\\Users\\sayee\\OneDrive\\Desktop\\wd-g'

html_code = '''<!DOCTYPE html>
<html lang="en" class="no-js">
   <head>
      <link href="style.css" rel="stylesheet" type="text/css"/>
   </head>
   <body>
      <div class="container additional">
         <div class="row">'''

for filename in os.listdir(folder):
    if filename.endswith('.jpeg') or filename.endswith('.jpg') or filename.endswith('.dng'):
        html_code += f'''<div class="col-xl-4">
               <img src="{filename}" class="img-fluid" alt="{filename}">
            </div>'''

html_code += '''</div>
      </div>
   </body>
</html>
'''

with open('webphotos.html', 'w') as file:
    file.write(html_code)

file.close()


