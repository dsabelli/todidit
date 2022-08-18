# todidit
toDidit is a productivity web application with an emphasis on archiving, built using the MERN stack.

## Why Did I Make This

toDidit is my first large scale solo project. After self-learning HTML, CSS, JavaScript and the MERN stack for over a year, I decided to put my skills to the test and see if I could build and deploy my own full-stack application successfully. 

I also built this application to solve my own real-world problem. In a work setting, I typically use a paginated notebook and record the date and all the tasks for the day, including tasks carried over from the previous day. I like being able to reference previous days, weeks and months from my notebook to remember what I was doing at a particular time, or how long a particular project took.

toDidit allows me the same functionality of my pen and paper, in a much neater, organized, and manageable package. It’s also responsive, so I only ever need to remember my phone.

## What Did I Learn

This project reinforced my HTML, CSS (TailwindCSS), and JavaScript skills and especially React and Git! 
Other skills I was able to improve on include: MERN stack, form validation, unit testing, Mongoose Schemas, MongoDB queries and working with Date objects. 

I learned how to use the Context API and React Router extensively, as well as: how to authenticate users with JSON Web Tokens, how to create and send emails to users with SendGrid, and how users can send emails to me with EmailJS.

Lastly I learned how to deploy the back-end on Heroku, the front-end on Netlify, and how to set up my own domain and email. Still working on CI/CD.


## How To Use

Visit todidit.com and click get started. Register using a valid email address and look out for an email with a verification link. For convenience, you will be automatically logged in after registration, but once logged out, you will need to verify your email address to continue using your account.

Upon account creation you will find a pre-populated project and tasks to help navigating through the application. Follow the task titles and descriptions to see toDidit’s features!
You can use the different page views in the menu to view certain tasks.

To create a task, click the Add Task button and fill in the Title and Description (optional) and select a Due Date and Project. 
Projects can be created in the menu bar and will be listed from oldest to newest. 
If you know the project you want to add a task to, you can select the project name to go to it’s page, and when you add a task the project field will be pre-populated.

Project titles and tasks can be edited at any time. Additionally you can click the star icon to make a task important.

When completing a task, simply click the round checkbox and it will move the task to the completed section. Navigate to the completed page and either delete tasks individually or click the trash can icon to delete all.

When a task is deleted, a Didit is created in its place. Didits are read-only tasks for archiving purposes. To view a specific Didit you can use the Didit search.
You can also view archived projects from the menu. Archived projects will show all related project tasks.

If you need to quickly write something down like a note or random information, you can do so in the notes page. Notes are only visible for the current day, but past notes can be viewed in the Time Machine.

The highlight feature of toDidit is the Time Machine. The Time Machine allows you to see snapshots of past days, showing you uncompleted tasks and their relative due dates, as well as tasks you completed that day and notes from that day.

Other features include user settings, in which you can change your preferred date format and theme. You can also choose to delete your account from the user profile page.

You can use the contact page to report an issue, or to let me know what other features might be useful!

