As admin, i can go to a client's profile and add a project to the projects section, when client agree for the project and advance is received.

For that i will create a flow for admin on admin's dashboard where admin clicks on a button to start a project, where we will add choose the client profile, by searching email id, then admin adds the project details like client's requirement, title, client comments, etc.
In comment's section, client can add comment and admin can reply to it.
The initial details of project can be updated by admin or client. But once the project is discussed and requirements are finalized by admin after strategy call,it can't be modified by client, he can just add comments if any changes required.

Also, status of project will be updated by admin, where status should include necessary types like 'Strategy Call requested', 'Strategy Call Scheduled', 'Payment Pending', 'Advance Received', 'In Progress', 'Completed', 'Cancelled'.

Admin will be able to create a task list which will be shown to the client and admin will be updating the same while project is in progress.

After project completion, client will be asked to give a review and rating for the project. This review and rating will be shown on the projects section of the company. If he allows to share the project details publicly, then it will be shown on the projects section of the company. If he agree to share the project link, then it will be shown on the projects section of the company. User's can't edit rating if it's above 3 stars. If it's below 3 stars, then user can edit it.

Add projects page where user can see the projects shared by users after completion with rating and other details. Also the name of client and profile photo should be visible there.

Also I want to replace Audit Your Current Stack button with other name. In Audit your current stack button, currently we try to ask questions from users and simply provide them a prescription to grow their business. But i want modify this into a button with different name where user once clicks, we ask questions from users, one by one about their business and usecases. I save these questions with answer into the database. Then, based on these questions and answers i want to make a llm call to create their project requirement and what they need and auto fill the project form with all the details. We auto save it and they should be able to see in dashboard. For auto filled project from questionaire, we will show them Auto-filled status. After questionaire completion, we will show them the llm generated project requirements, title and estimated cost and other details that will help us convert users into clients and then we will show them option to schedule a call where they selects a date and time and a google meet link will be created and the call will be scheduled and a mail for call will be sent to the client email and admin email.

In llm call, we will send questionaire with prompt to generate the project requirements and title and other details with our pricing details, so that llm can think wisely and generate response. I want to use kimi k 2.5 llm.
