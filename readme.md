#                         "ONLINE TICKETING SYSTEM FLOW"
# 1. "Introduction"
 This proposal outlines the development of an online 
ticketing system using TypeScript for type safety and a user-friendly Command Line 
Interface (CLI) for interaction. This system will cater to users looking for a 
convenient way to browse events, purchase tickets, and potentially manage their 
purchase history

# 2. "Technology Stack"
 TypeScript for type safety and code correctness.
 npm as the package manager.
 Inquirer.js for CLI user interaction.

# 3. "System Flow":
## 3.1. User Browsing and Selection
 User visits the ticketing platform.
 User browses for events by category, date, keyword, etc.
 User selects the desired event and chooses a specific date/time (if 
applicable).

## 3.2. Ticket Selection and Purchase
 User views available seating options and pricing.
 User selects the number of tickets for each seating type.
 User may be prompted to create an account or sign in for purchase.
## 3.3. Payment Processing
 User enters their billing information and payment details (credit card, etc.).
 The system securely processes the payment.
 User receives confirmation and potentially an e-ticket upon successful 
purchase.

# 4. System Features
## 4.1. User Management
### 4.1.1 Signup
 Collect user details (name, email, password).
 Validate input data.
 Create a new user record.
## 4.1.2. Login
 Prompt user for login credentials.
 Validate credentials against existing user data.
## 4.1.3. Admin Access
 Implement a separate admin login functionality.
 Admins can create and manage events.
 Admins have access to event creation, editing, and deletion.
# 4.2. Event Management
### 4.2.1. Event Creation
 Admins can create new events.
 Gather event details (title, date, time, city, ticket stock).
 Validate and save event data. (date must be bigger than current date)
### 4.2.2. Event Listing
 Display available events to users
 Filter events based on availability (hide events with zero stock).
# 4.3. Ticketing
 Users can view available tickets for events.
 Choose an event to purchase tickets.
 Specify the number of tickets to purchase.
 Validate ticket availability and deduct stock upon purchase

# 4.4. Order History
 Users can view tickets they purchased.

# 5. Program Execution
 Clone the project repository locally.
 Install dependencies using npm.
 Run the CLI application.
 Follow prompts for signup, signin, event creation, ticket purchase, etc.

# 6. Utilizing TypeScript:
 TypeScript's type checking ensures data integrity throughout the program.
 Defining types for user input, event creations, and seats numbers can lead 
to a more robust and maintainable codebase.
Remember:
 The CLI interface should be clear and easy to navigate.
 User experience is key - offer clear instructions and feedback throughout 
the project





