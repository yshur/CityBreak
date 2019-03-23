
Event Break | API Documentation

The Event Break API allows directly interaction with the Event Break platform,
and get details about all our events.

Some typical use cases include:

    Get all Events
    Get all users
    Get all Categories

The requests should be in GET / POST /DELETE Method.
The result will return in JSON Object.
If your URL request is wrong you will recieve JSON Object Error. 

Get All Events

You can find all Events, by entering the following URL:

    https://eventbreak.herokuapp.com/getAllEvents
    Method: GET

Get Event

You can find each Event, by entering the following URL:

    https://eventbreak.herokuapp.com/getEvent/5b268bac193d8f1d88fd309f
    Method: GET
    Parameters name: /eventid
 
Create Event

You can create your Event, by entering the following URL:

    https://eventbreak.herokuapp.com/createEvent
    Method: POST
    Parameters name:

        name: string of the event name
        description: string of the event description
        time: date format ("2018-06-20 20:19:00") of the event timing
        creator: user id of the creator
        place: string of the event place
        category: string with category

Add Category Event

Add category to event, by entering the following URL:

    https://eventbreak.herokuapp.com/addCategoryEvent
    Method: POST
    Parameters name:

        eventid: event id
        category: string with category

Set Equipment Event

Add equipment include max and min quantity to Event , by entering the following URL:

    https://eventbreak.herokuapp.com/setEqEvent
    Method: POST
    Parameters name:

        eventid: event id
        equipment: string
        max_quantity: number
        min_quantity: number

Set User Equipment

Set user Equipment to Event , by entering the following URL:

    https://eventbreak.herokuapp.com/setUserEquip
    Method: POST
    Parameters name:

        eventid: event id
        userid: user id
        equipment: string
        quantity: number

invite User

invite User, by entering the following URL:

    https://eventbreak.herokuapp.com/inviteUser
    Method: POST
    Parameters name:

        eventid: event id
        userid: user id

Set Time Event

Set time that you want the event will be.
call getEvent method to see your changed.
by entering the following URL:

    https://eventbreak.herokuapp.com/setTimeEvent
    Method: POST
    Parameters name:

        eventid: event id
        time: date format ("2018-06-20 20:19:00")

Set Place Event

Set the place thet you want the event will be.
call getEvent method to see your changed. by entering the following URL:

    https://eventbreak.herokuapp.com/setPlaceEvent
    Method: POST
    Parameters name:

        eventid: event id
        place: string

Get Chat

Here you can see all the messages has been sent in specific event.
by entering the following URL:

    https://eventbreak.herokuapp.com/getChat5/b268bac193d8f1d88fd309f
    Method: GET
    Parameters name: /eventid
Send Message

Send Message to chat, after you sent message call getChat method to see your meassge and all the outhers messages
by entering the following URL:

    https://eventbreak.herokuapp.com/sendMessage
    Method: POST
    Parameters name:

        eventid: event id
        userid: user id
        message: string

Delete Event

you can delete event by using event id, without any password or identification
by entering the following URL:

    https://eventbreak.herokuapp.com/deleteEvent
    Method: DELETE
    Parameters name:

        eventid: event id

Get All Users

You can get list of all users.

    https://eventbreak.herokuapp.com/getAllUsers

    Method: GET

Get User

You can get each user by their userid.

    https://eventbreak.herokuapp.com/getUser/5b1fbbc4422bdc38c84e530b

    Method: GET
    Parameters name: /userid

Create User

You can create user.

    https://eventbreak.herokuapp.com/createUser

    Method: POST
    Parameters name:

        full_name: string (like "Moshe Zuchmir")
        phone: phone format ("058-545-6578")
        email: email format ("ys@shenkar.com")
        password: string
        image: http url to image file

The json result should be same like Get User method

Update User

You can update each user.

    https://eventbreak.herokuapp.com/updateUser

    Method: POST
    Parameters name:

        userid: user id
        phone: phone format ("058-545-6578")
        email: email format ("ys@shenkar.com")

Delete User

you can delete user by using user id, without any password or identification
by entering the following URL:

    https://eventbreak.herokuapp.com/deleteUser

    Method: DELETE
    Parameters name:

        userid: user id

Get All Categories

You can get all categories list with their belong equipment.

    https://eventbreak.herokuapp.com/getAllCategories

    Method: GET

Get Category

You can get specific category with his belong equipment by category name.

    https://eventbreak.herokuapp.com/getCategory/5b222b0a2a59a929f4a17838

    Method: GET
    Parameters name: /category

Create Category

You can create category.

    https://eventbreak.herokuapp.com/createCategory

    Method: POST
    Parameters name:

        name: string

Add Equipment To Category

You can add equipment to category.

    https://eventbreak.herokuapp.com/addEquipmentToCategory

    Method: POST
    Parameters name:

        categoryid: category id
        equipment: string

Delete Category

You can delete each category.

    https://eventbreak.herokuapp.com/deleteCategory

    Method: DELETE
    Parameters name:

        categoryid: category id

URL error

If you enter URL that no specified in the API,
you will recieve general error object.
The error object includes the deatails of legitimate API.


Empty Result

If you enter parameters that dont match to any documents in our DB,
you should recieve an empty array.


Connection error to mlab

If our server have an error with connection to our DB,
you should recieve an error object that describes the error.


Format error

If you enter variables that their format don't match to our schema,
you will recieve mongoose validation error.
