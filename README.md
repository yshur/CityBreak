Borrowed Books | API Documentation

	The Borrowed Books API allows directly interaction
	with the borrowing books platform, and get details about Borrowed Books.<br> 
	Some typical use cases include: 
	Get all Borrowed Books, Get books by category,
	Get books from search category & phone.

	The requests should be in GET / POST Method.
	The result will return in JSON Object.
	If your URL request is wrong you will will recieve Error JSON Object.

Get All Borrowed Books

	You can find all Borrowed Books, by entering the following URL:
	http://localhost:3000/getAllBooks
	Method: GET

Get Books By category

	You can find Borrowed Books by their category.
	You need sending parameter 'category' to the following URL:
	http://localhost:3000/getBooksByCategory
	Method: POST
	Parameter name: category

Get Books By Category and Borrower Phone (Category/Phone)

	You can find Borrowed Books with category and phone filter
	For get it, you need entering the following URL:
	http://localhost:3000/getBooksByCategoryAndPhone/[CATEGORY]/[PHONE]
	Method: POST
	Parameters name: /category/phone

Possible Errors

	There are 3 types of error:

	URL error:
		If you enter URL that no specified in the API, 
		you will recieve general error object.
		The error object includes the deatails of legitimate API

	Empty Result:
		If you enter parameters that dont match to any documents in my DB,
		you should recieve an empty array

	connection error to mlab:
		If my server have an error with connection to my DB,
		you should recieve an error object that describes the error
