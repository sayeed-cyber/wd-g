import os

folder = 'C:\\Users\\sayee\\OneDrive\\Desktop\\wd-g'

html_code = '''<!DOCTYPE html>
<html lang="en" class="no-js">
   <head>
      <link href="style.css" rel="stylesheet" type="text/css"/>
      <style>
         .download-btn {
            display: inline-block;
            background-color: #4CAF50;
            color: white;
            padding: 10px 20px;
            text-align: center;
            text-decoration: none;
            border-radius: 5px;
            font-size: 16px;
            margin-top: 10px;
            cursor: pointer;
         }
         .download-btn:hover {
            background-color: #3e8e41;
         }
      </style>
   </head>
   <body>
      <div class="container additional">
         <div class="row">
            '''

for filename in os.listdir(folder):
    if filename.endswith('.jpeg') or filename.endswith('.jpg') or filename.endswith('.dng'):
        html_code += f'''<div class="col-xl-4">
               <img src="{filename}" class="img-fluid" alt="{filename}">
               <a href="{filename}" class="download-btn" onclick="downloadImage()">Download Image</a>

            </div> '''

html_code += '''    </div>
      </div>
      <script>
         function downloadImage() {
            var link = document.createElement('a');
            link.setAttribute('href', 'IMG_20210215_183608.jpg');
            link.setAttribute('download', 'IMG_20210215_183608.jpg');
            link.style.display = 'none';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
         }
      </script>
   </body>
</html>
'''

with open('index.html', 'w') as file:
    file.write(html_code)

file.close()


