# Ticketbloom

<ol>
  <li>Download the files</li>
  <li>Open a Terminal in the directory of the project</li>
  <li>node ./server.js</li>
  <li>Open a web browser and in the url put “http://127.0.0.1:3000”</li>
</ol>
  <h4>Mongodb Data</h4>
<ul>
  <li><h5>Single Users:{'email': email, 'username': username, 'fullname': fullname, 'password': password, 'type': "simple_user"}</h5></li>
  <li><h5>Admin Users:{'email': email, 'username': username, 'password': password, 'type': "admin_user"}</h5></li>
  <li><h5>Notes:{username': username, 'title': title, 'noteText': noteText, 'keywords': keywords, 'date': date}</h5></li>
  </ul>
  
<h4>Default Admin</h4>
  
| Username  | Password |
| ------ | -------|
| admin  | admin |

<h4>Default User</h4>
  
| Username  | Password |
| ------ | -------|
| user0  | 12345 |
<h3> Functions</h3>
<ul>
  <li>
     <h3>Home page</h3>
      <h5>Functions:Sign up,Log in</h5>
      <img src='Screenshots/Screenshot from 2022-07-06 00-44-52.png'></img> 
      <h4>Sign up</h4>
      <h5>User Inserts the Email,Username and Fullname to Sign up.</h5>
      <img src='Screenshots/Screenshot from 2022-07-06 00-47-03.png'></img>
      <h4>User Sign up (When there is already a user with this e-mail)</h4>
      <img src='Screenshots/Screenshot from 2022-07-06 00-47-43.png'></img>
      <h4>User Sign up (When there is already a user with this username)</h4>
      <img src='Screenshots/Screenshot from 2022-07-06 00-48-34.png'></img>    
      <h4>User/Admin Log in.</h4>
      <img src='Screenshots/Screenshot from 2022-07-06 00-49-49.png'></img> 
      <h4>User/Admin Log in (In case of wrong email or username).</h4>
      <img src='Screenshots/Screenshot from 2022-07-06 00-50-20.png'></img> 
      <h4>User/Admin Log in (In case of wrong password).</h4>
      <img src='Screenshots/Screenshot from 2022-07-06 00-50-55.png'></img> 
    </li>
    <li>
      <h3>User Home page</h3>
      <h4>Functions:Create Note,Delete Note by Title,Logout,Delete Account</h4>
      <img src='Screenshots/Screenshot from 2022-07-06 00-51-10.png'></img>
      <h4>Create Note</h4>
      <h5>User Enters Note Title,Note Text and Keywords.</h5>
      <img src='Screenshots/Screenshot from 2022-07-06 00-54-08.png'></img>
      <h5>Note Created.</h5>
      <img src='Screenshots/Screenshot from 2022-07-06 00-54-37.png'></img>
      <h4>Delete by Title</h4>
      <img src='Screenshots/Screenshot from 2022-07-06 00-55-06.png'></img>
      <h5>Note Successfully Deleted</h4>
      <img src='Screenshots/Screenshot from 2022-07-06 00-55-21.png'></img>
      <h4>Delete User Account</h4>
      <h5>Users before Delete Account</h5>
      <img src='Screenshots/Screenshot from 2022-07-06 00-56-34.png'></img>
      <h5>Users after Delete Account.</h5>
      <img src='Screenshots/Screenshot from 2022-07-06 00-56-59.png'></img>
      <h5>Returns to login/Register screen.</h5>
      <img src='Screenshots/Screenshot from 2022-07-06 00-44-52.png'></img>
    </li>
    <li>
      <h3>Admin Home page</h3>
      <h4>Functions: Create Admin,Delete User by Username,Logout</h4>
      <img src='Screenshots/Screenshot from 2022-07-06 00-57-34.png'></img>
      <h4>Create Admin</h4>   
      <h5>Admin Inserts New Admin Username,Email and Password.</h5>
      <img src='Screenshots/Screenshot from 2022-07-06 00-58-08.png'></img>
      <h4>Admin Created</h4>
      <img src='Screenshots/Screenshot from 2022-07-06 00-58-30.png'></img>
      <h4>Delete User</h4>
      <h5>Delete User (In case of username not found).</h5>
      <img src='Screenshots/Screenshot from 2022-07-06 00-59-18.png'></img>
      <h4>Logout</h4> 
      <h5>Returns to login/Register screen.</h5>
      <img src='Screenshots/Screenshot from 2022-07-06 00-44-52.png'></img> 
    </li>
</ul>
